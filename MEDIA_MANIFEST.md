# Mr. Sergio Media Manifest

Date generated: 2026-03-24 (America/New_York)

## Current status

- Instagram media is imported and stored locally in `public/media/instagram`.
- Current import output:
  - `24` image assets
  - `4` reel video assets
  - `manifest.json` with post URLs and asset mapping

## Source and ownership constraints

- Source account: [`@mr.sergiostore`](https://www.instagram.com/mr.sergiostore/)
- Assets were collected from publicly viewable business posts/reels via logged-in browser session.
- Only business-owned media should be used for future refreshes.

## Import command

```bash
IG_CHROME_USER_DATA_DIR=.ig-session npm run media:import
```

If Instagram requires login:

```bash
IG_INTERACTIVE_LOGIN=1 IG_CHROME_USER_DATA_DIR=.ig-session npm run media:import
```

## Runtime usage

- `lib/site-data.ts` maps imported media into:
  - homepage cinematic reel section (`instagramCinematic`)
  - lookbook frames (`lookbookFrames`)
  - product gallery sets (`products[*].images`)
