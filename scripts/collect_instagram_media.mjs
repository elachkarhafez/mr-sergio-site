import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

import puppeteer from "puppeteer-core";

const PROFILE_URL =
  process.env.IG_PROFILE_URL ?? "https://www.instagram.com/mr.sergiostore/";
const HANDLE = process.env.IG_HANDLE ?? "@mr.sergiostore";
const MAX_LINKS = Number(process.env.IG_MAX_LINKS ?? 36);
const MAX_IMAGES = Number(process.env.IG_MAX_IMAGES ?? 24);
const MAX_VIDEOS = Number(process.env.IG_MAX_VIDEOS ?? 4);
const CHROME_USER_DATA_DIR = process.env.IG_CHROME_USER_DATA_DIR ?? null;
const CHROME_PROFILE_DIR = process.env.IG_CHROME_PROFILE_DIR ?? null;
const INTERACTIVE_LOGIN = process.env.IG_INTERACTIVE_LOGIN === "1";
const INTERACTIVE_WINDOW_WIDTH = Number(process.env.IG_WINDOW_WIDTH ?? 1680);
const INTERACTIVE_WINDOW_HEIGHT = Number(process.env.IG_WINDOW_HEIGHT ?? 1000);

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public", "media", "instagram");
const IMAGE_DIR = path.join(OUTPUT_DIR, "images");
const VIDEO_DIR = path.join(OUTPUT_DIR, "videos");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");
const LINK_CAPTURE_PATH = path.join(OUTPUT_DIR, "links.json");
const LOGIN_URL =
  "https://www.instagram.com/accounts/login/?next=%2Fmr.sergiostore%2F";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";

const BROWSER_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function slug(index) {
  return String(index).padStart(2, "0");
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getBrowserPath() {
  for (const candidate of BROWSER_CANDIDATES) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    "No Chromium browser executable found. Set CHROME_PATH to your local Chrome/Edge path.",
  );
}

function unique(list) {
  return [...new Set(list)];
}

function cleanInstagramUrl(raw) {
  if (!raw) return null;
  try {
    const parsed = new URL(raw.startsWith("http") ? raw : `https://www.instagram.com${raw}`);
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const typeIndex = pathParts.findIndex((part) => ["p", "reel", "tv"].includes(part));
    if (typeIndex === -1 || !pathParts[typeIndex + 1]) return null;
    const type = pathParts[typeIndex];
    const shortcode = pathParts[typeIndex + 1];
    if (!["p", "reel", "tv"].includes(type)) return null;
    if (!/^[A-Za-z0-9_-]+$/.test(shortcode)) return null;
    return `https://www.instagram.com/${type}/${shortcode}/`;
  } catch {
    return null;
  }
}

function extractMetaTag(html, attribute, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]*${attribute}=["']${escaped}["'][^>]*content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']+)["'][^>]*${attribute}=["']${escaped}["'][^>]*>`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1]);
  }
  return null;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function extensionFrom(contentType, url, fallback) {
  const byType = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
  };

  if (contentType) {
    const clean = contentType.split(";")[0].trim().toLowerCase();
    if (byType[clean]) return byType[clean];
  }

  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if (ext) return ext;
  } catch {
    // no-op
  }

  return fallback;
}

function decodeEfgParam(urlString) {
  try {
    const parsed = new URL(urlString);
    const efg = parsed.searchParams.get("efg");
    if (!efg) return null;
    const normalized = decodeURIComponent(efg).replace(/-/g, "+").replace(/_/g, "/");
    const padded =
      normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
    const decoded = Buffer.from(padded, "base64").toString("utf8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function normalizeVideoUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    parsed.searchParams.delete("bytestart");
    parsed.searchParams.delete("byteend");
    return parsed.toString();
  } catch {
    return urlString;
  }
}

async function normalizeInteractiveViewport(page) {
  try {
    await page.bringToFront();
  } catch {
    // no-op
  }

  try {
    await page.setViewport({
      width: INTERACTIVE_WINDOW_WIDTH,
      height: INTERACTIVE_WINDOW_HEIGHT,
      deviceScaleFactor: 1,
    });
  } catch {
    // no-op
  }

  try {
    await page.keyboard.down("Control");
    await page.keyboard.press("Digit0");
    await page.keyboard.up("Control");
  } catch {
    // no-op
  }

  try {
    await page.evaluate(() => {
      document.documentElement.style.zoom = "100%";
      document.body.style.zoom = "100%";
      window.scrollTo(0, 0);
    });
  } catch {
    // no-op
  }
}

async function downloadToFile(url, destination) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      referer: PROFILE_URL,
    },
    redirect: "follow",
  });

  if (!response.ok || !response.body) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }

  await fs.mkdir(path.dirname(destination), { recursive: true });
  const nodeStream = Readable.fromWeb(response.body);
  await pipeline(nodeStream, createWriteStream(destination));
  return response.headers.get("content-type");
}

function parsePostMetadataFromHtml(html, postUrl) {
  const imageUrl =
    extractMetaTag(html, "property", "og:image") ??
    extractMetaTag(html, "name", "twitter:image");
  const videoUrl =
    extractMetaTag(html, "property", "og:video:secure_url") ??
    extractMetaTag(html, "property", "og:video");
  const title =
    extractMetaTag(html, "property", "og:title") ??
    extractMetaTag(html, "name", "title");
  const description = extractMetaTag(html, "name", "description");
  const type = videoUrl ? "video" : "image";

  const shortCodeMatch = postUrl.match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)\//);
  const shortcode = shortCodeMatch?.[1] ?? null;

  if (!imageUrl && !videoUrl) {
    return null;
  }

  return {
    postUrl,
    shortcode,
    type,
    title,
    description,
    imageUrl,
    videoUrl,
  };
}

async function scrapePostLinks() {
  async function collectLinksFromCurrentPage(page) {
    const anchors = await page.$$eval(
      'a[href*="/p/"], a[href*="/reel/"], a[href*="/tv/"]',
      (items) => items.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
    );
    const html = await page.content();
    const fromHtml = [
      ...html.matchAll(/https:\/\/www\.instagram\.com\/(?:p|reel|tv)\/[A-Za-z0-9_-]+\/?/g),
    ].map((match) => match[0]);

    return unique([...anchors, ...fromHtml].map(cleanInstagramUrl).filter(Boolean)).slice(
      0,
      MAX_LINKS,
    );
  }

  const browserPath = await getBrowserPath();
  const browser = await puppeteer.launch({
    headless: INTERACTIVE_LOGIN ? false : true,
    executablePath: browserPath,
    defaultViewport: INTERACTIVE_LOGIN
      ? null
      : { width: 1440, height: 1800, deviceScaleFactor: 1 },
    userDataDir: CHROME_USER_DATA_DIR ?? undefined,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--force-device-scale-factor=1",
      ...(INTERACTIVE_LOGIN
        ? [
            "--start-maximized",
            `--window-size=${INTERACTIVE_WINDOW_WIDTH},${INTERACTIVE_WINDOW_HEIGHT}`,
          ]
        : []),
      ...(CHROME_PROFILE_DIR ? [`--profile-directory=${CHROME_PROFILE_DIR}`] : []),
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(USER_AGENT);
    if (!INTERACTIVE_LOGIN) {
      await page.setViewport({ width: 1280, height: 1800 });
    } else {
      await normalizeInteractiveViewport(page);
    }
    await page.goto(PROFILE_URL, { waitUntil: "networkidle2", timeout: 120000 });

    for (let i = 0; i < 10; i += 1) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    const html = await page.content();
    let links = await collectLinksFromCurrentPage(page);

    if (links.length === 0 && INTERACTIVE_LOGIN) {
      try {
        await page.goto(LOGIN_URL, { waitUntil: "networkidle2", timeout: 120000 });
        await normalizeInteractiveViewport(page);
      } catch {
        // If login route fails, continue polling the profile page.
      }
      process.stdout.write(
        [
          "",
          "Interactive mode active.",
          "Please log in in the opened Instagram browser window.",
          "If the page appears zoomed, press Ctrl+0 once to reset zoom.",
          "The script will automatically detect profile access and continue. No terminal input is required.",
          "",
        ].join("\n"),
      );

      const timeoutMs = Number(process.env.IG_INTERACTIVE_TIMEOUT_MS ?? 900000);
      const pollMs = Number(process.env.IG_INTERACTIVE_POLL_MS ?? 5000);
      const deadline = Date.now() + timeoutMs;

      while (Date.now() < deadline && links.length === 0) {
        try {
          await page.goto(PROFILE_URL, { waitUntil: "networkidle2", timeout: 120000 });
          await normalizeInteractiveViewport(page);
          for (let i = 0; i < 6; i += 1) {
            await page.evaluate(() => {
              window.scrollTo(0, document.body.scrollHeight);
            });
            await new Promise((resolve) => setTimeout(resolve, 900));
          }
          links = await collectLinksFromCurrentPage(page);
        } catch {
          // Retry until timeout.
        }

        if (links.length === 0) {
          await new Promise((resolve) => setTimeout(resolve, pollMs));
        }
      }
    }

    if (links.length === 0) {
      const debugUrl = page.url();
      const debugTitle = await page.title();
      const debugPath = path.join(OUTPUT_DIR, "debug-page.html");
      const debugShot = path.join(OUTPUT_DIR, "debug-page.png");
      await fs.writeFile(debugPath, html, "utf8");
      await page.screenshot({ path: debugShot, fullPage: true });
      throw new Error(
        `No post links detected. Captured debug page (${debugTitle} at ${debugUrl}) in ${OUTPUT_DIR}.`,
      );
    }

    return links;
  } finally {
    await browser.close();
  }
}

async function getPostMetadata(postUrl) {
  const response = await fetch(postUrl, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html,*/*",
      "accept-language": "en-US,en;q=0.9",
      referer: PROFILE_URL,
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post page: ${response.status} ${postUrl}`);
  }

  const html = await response.text();
  return parsePostMetadataFromHtml(html, postUrl);
}

async function getPostMetadataWithBrowser(links) {
  const browserPath = await getBrowserPath();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: browserPath,
    defaultViewport: { width: 1280, height: 900, deviceScaleFactor: 1 },
    userDataDir: CHROME_USER_DATA_DIR ?? undefined,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--force-device-scale-factor=1",
      ...(CHROME_PROFILE_DIR ? [`--profile-directory=${CHROME_PROFILE_DIR}`] : []),
    ],
  });

  try {
    const records = [];
    for (const postUrl of links) {
      try {
        const page = await browser.newPage();
        await page.setUserAgent(USER_AGENT);

        const networkVideoCandidates = new Map();
        const onResponse = async (response) => {
          try {
            const headers = response.headers();
            const contentType = headers["content-type"] ?? "";
            if (!contentType.includes("video/mp4")) {
              return;
            }

            const rawUrl = response.url();
            const normalizedUrl = normalizeVideoUrl(rawUrl);
            const efg = decodeEfgParam(rawUrl);
            const vencodeTag = String(efg?.vencode_tag ?? "");
            const isAudioTrack = /audio|heaac/i.test(vencodeTag);

            if (isAudioTrack) {
              return;
            }

            const bitrate = Number(efg?.bitrate ?? 0);
            const existing = networkVideoCandidates.get(normalizedUrl);
            if (!existing || bitrate > existing.bitrate) {
              networkVideoCandidates.set(normalizedUrl, { bitrate });
            }
          } catch {
            // Ignore response parse failures.
          }
        };

        page.on("response", onResponse);
        await page.goto(postUrl, { waitUntil: "networkidle2", timeout: 120000 });
        await new Promise((resolve) => setTimeout(resolve, 2500));
        const html = await page.content();
        const parsed = parsePostMetadataFromHtml(html, postUrl);
        const bestNetworkVideo = [...networkVideoCandidates.entries()]
          .sort((a, b) => b[1].bitrate - a[1].bitrate)
          .at(0)?.[0];

        if (parsed && !parsed.videoUrl && bestNetworkVideo) {
          parsed.videoUrl = bestNetworkVideo;
          parsed.type = "video";
        }
        if (parsed) {
          records.push(parsed);
        }
        page.off("response", onResponse);
        await page.close();
      } catch {
        // Continue through the list.
      }
    }

    return records;
  } finally {
    await browser.close();
  }
}

async function main() {
  await fs.mkdir(IMAGE_DIR, { recursive: true });
  await fs.mkdir(VIDEO_DIR, { recursive: true });

  const links = await scrapePostLinks();
  await fs.writeFile(
    LINK_CAPTURE_PATH,
    JSON.stringify(
      {
        handle: HANDLE,
        profileUrl: PROFILE_URL,
        capturedAt: new Date().toISOString(),
        count: links.length,
        links,
      },
      null,
      2,
    ),
    "utf8",
  );

  const metadataList =
    CHROME_USER_DATA_DIR || INTERACTIVE_LOGIN
      ? await getPostMetadataWithBrowser(links)
      : (await Promise.all(links.map((link) => getPostMetadata(link).catch(() => null)))).filter(
          Boolean,
        );

  const media = [];
  let imageCount = 0;
  let videoCount = 0;

  for (const post of metadataList) {
    if (!post) continue;

    try {
      if (post.type === "video" && post.videoUrl && videoCount < MAX_VIDEOS) {
        videoCount += 1;
        const videoBase = `reel-${slug(videoCount)}`;
        const videoExt = extensionFrom(null, post.videoUrl, ".mp4");
        const videoPath = path.join(VIDEO_DIR, `${videoBase}${videoExt}`);
        const videoContentType = await downloadToFile(post.videoUrl, videoPath);
        const normalizedVideoExt = extensionFrom(videoContentType, post.videoUrl, ".mp4");

        let finalVideoPath = videoPath;
        if (normalizedVideoExt !== videoExt) {
          finalVideoPath = path.join(VIDEO_DIR, `${videoBase}${normalizedVideoExt}`);
          await fs.rename(videoPath, finalVideoPath);
        }

        let posterSrc = null;
        if (post.imageUrl) {
          const posterPath = path.join(IMAGE_DIR, `${videoBase}-poster.jpg`);
          await downloadToFile(post.imageUrl, posterPath);
          posterSrc = `/media/instagram/images/${path.basename(posterPath)}`;
        }

        media.push({
          id: `ig-video-${videoCount}`,
          type: "video",
          postUrl: post.postUrl,
          shortcode: post.shortcode,
          title: post.title,
          description: post.description,
          src: `/media/instagram/videos/${path.basename(finalVideoPath)}`,
          poster: posterSrc,
        });
      } else if (post.imageUrl && imageCount < MAX_IMAGES) {
        imageCount += 1;
        const imageBase = `look-${slug(imageCount)}`;
        const imageExt = extensionFrom(null, post.imageUrl, ".jpg");
        const imagePath = path.join(IMAGE_DIR, `${imageBase}${imageExt}`);
        const imageContentType = await downloadToFile(post.imageUrl, imagePath);
        const normalizedImageExt = extensionFrom(imageContentType, post.imageUrl, ".jpg");

        let finalImagePath = imagePath;
        if (normalizedImageExt !== imageExt) {
          finalImagePath = path.join(IMAGE_DIR, `${imageBase}${normalizedImageExt}`);
          await fs.rename(imagePath, finalImagePath);
        }

        media.push({
          id: `ig-image-${imageCount}`,
          type: "image",
          postUrl: post.postUrl,
          shortcode: post.shortcode,
          title: post.title,
          description: post.description,
          src: `/media/instagram/images/${path.basename(finalImagePath)}`,
        });
      }
    } catch (error) {
      console.warn(
        `Skipping ${post.postUrl}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  const videos = media.filter((item) => item.type === "video");
  const images = media.filter((item) => item.type === "image");

  const manifest = {
    handle: HANDLE,
    profileUrl: PROFILE_URL,
    extractedAt: new Date().toISOString(),
    counts: {
      linksDiscovered: links.length,
      videos: videos.length,
      images: images.length,
      total: media.length,
    },
    media,
    videos,
    images,
  };

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(
    `Saved ${media.length} media assets (${videos.length} videos, ${images.length} images) to ${OUTPUT_DIR}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
