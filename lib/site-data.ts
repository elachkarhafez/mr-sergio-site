import instagramManifest from "@/public/media/instagram/manifest.json";

export type ProductCategory =
  | "suits"
  | "blazers"
  | "dress-shirts"
  | "shoes"
  | "accessories"
  | "tuxedos"
  | "wedding-formal";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  priceRange: string;
  summary: string;
  details: string[];
  fabricNotes: string;
  availability: string;
  colors: string[];
  sizes: string[];
  images: string[];
  featured?: boolean;
};

type InstagramMediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  postUrl?: string;
  shortcode?: string;
  title?: string;
  description?: string;
};

const importedInstagramMedia = ((instagramManifest as { media?: InstagramMediaItem[] })
  .media ?? []) as InstagramMediaItem[];
const importedInstagramImages = importedInstagramMedia.filter(
  (item) => item.type === "image",
);
const importedInstagramVideos = importedInstagramMedia.filter(
  (item) => item.type === "video",
);

function imageAt(index: number, fallback: string) {
  return importedInstagramImages[index]?.src ?? fallback;
}

function imageSet(startIndex: number, fallbacks: [string, string, string]) {
  return fallbacks.map((fallback, index) => imageAt(startIndex + index, fallback));
}

export const business = {
  name: "Mr. Sergio",
  phoneDisplay: "(313) 597-3541",
  phoneHref: "+13135973541",
  addressLine: "22732 Ford Rd, Dearborn Heights, MI 48127",
  addressQuery: "22732 Ford Rd Dearborn Heights MI 48127",
  instagramHandle: "@mr.sergiostore",
  instagramUrl: "https://www.instagram.com/mr.sergiostore/",
  description:
    "Local menswear boutique offering elevated suits, formalwear, and sharp casual styling with tailored service in Dearborn Heights.",
  profileSnapshot: {
    followersLabel: "16K",
    postsLabel: "148",
    sourceDate: "March 24, 2026",
    sourceNote:
      "Public Instagram media was imported from a logged-in browser session and wired directly into this site build.",
  },
};

export const weeklyHours = [
  { day: "Monday", hours: "10:00 AM - 8:00 PM" },
  { day: "Tuesday", hours: "10:00 AM - 8:00 PM" },
  { day: "Wednesday", hours: "10:00 AM - 8:00 PM" },
  { day: "Thursday", hours: "10:00 AM - 8:00 PM" },
  { day: "Friday", hours: "10:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 8:00 PM" },
  { day: "Sunday", hours: "11:30 AM - 6:30 PM" },
] as const;

export const categoryDetails: Record<
  ProductCategory,
  { label: string; intro: string }
> = {
  suits: {
    label: "Suits",
    intro: "Sharp two- and three-piece sets built for presence.",
  },
  blazers: {
    label: "Blazers",
    intro: "Structured layers for elevated day-to-night styling.",
  },
  "dress-shirts": {
    label: "Dress Shirts",
    intro: "Crisp foundations in event-ready palettes.",
  },
  shoes: {
    label: "Shoes",
    intro: "Formal and statement footwear for complete looks.",
  },
  accessories: {
    label: "Accessories",
    intro: "Finishing details that pull every outfit together.",
  },
  tuxedos: {
    label: "Tuxedos",
    intro: "Black-tie options with premium evening character.",
  },
  "wedding-formal": {
    label: "Wedding / Formal",
    intro: "Curated ceremony and celebration looks for your full party.",
  },
};

export const products: Product[] = [
  {
    slug: "obsidian-three-piece",
    name: "Obsidian Three-Piece",
    category: "suits",
    priceRange: "$",
    summary: "A clean-cut three-piece with peak-lapel authority for major moments.",
    details: [
      "Structured shoulder line with sharp drape",
      "Vest included for layered formal presentation",
      "Designed for wedding, prom, and reception transitions",
    ],
    fabricNotes: "Mid-weight woven blend with subtle sheen under directional light.",
    availability: "Most sizes in-store. Select colors by request.",
    colors: ["Black", "Midnight", "Graphite"],
    sizes: ["36-52 Regular", "Select Long", "Tailoring available"],
    images: imageSet(0, [
      "/media/placeholders/obsidian-three-piece.svg",
      "/media/placeholders/midnight-peak-lapel.svg",
      "/media/placeholders/black-tie-tuxedo.svg",
    ]),
    featured: true,
  },
  {
    slug: "midnight-peak-lapel",
    name: "Midnight Peak Lapel",
    category: "tuxedos",
    priceRange: "$$",
    summary: "A black-tie profile with satin contrast and formal edge.",
    details: [
      "Peak lapel for classic evening posture",
      "Elegant contrast trim details",
      "Built for gala, black tie, and formal receptions",
    ],
    fabricNotes: "Dense evening cloth with clean texture and controlled shine.",
    availability: "Core sizes available. Fittings recommended.",
    colors: ["Midnight", "Black", "Smoke"],
    sizes: ["36-50 Regular", "Tailored fit options"],
    images: imageSet(3, [
      "/media/placeholders/midnight-peak-lapel.svg",
      "/media/placeholders/black-tie-tuxedo.svg",
      "/media/placeholders/obsidian-three-piece.svg",
    ]),
    featured: true,
  },
  {
    slug: "graphite-windowpane-blazer",
    name: "Graphite Windowpane Blazer",
    category: "blazers",
    priceRange: "$",
    summary: "An editorial blazer with subtle pattern depth and modern shoulders.",
    details: [
      "Windowpane-inspired texture",
      "Designed to pair with dress trousers or dark denim",
      "Strong smart-casual to formal crossover",
    ],
    fabricNotes: "Breathable blend with slight texture and structure retention.",
    availability: "Rotating seasonal stock.",
    colors: ["Graphite", "Charcoal", "Steel Blue"],
    sizes: ["S-XXL", "Slim and Modern fits"],
    images: imageSet(6, [
      "/media/placeholders/graphite-crosshatch.svg",
      "/media/placeholders/charcoal-windowpane.svg",
      "/media/placeholders/steel-blue-blazer.svg",
    ]),
    featured: true,
  },
  {
    slug: "ceremony-ivory-jacket",
    name: "Ceremony Ivory Jacket",
    category: "wedding-formal",
    priceRange: "$$",
    summary: "A standout light jacket for wedding ceremonies and refined celebrations.",
    details: [
      "High-contrast look for ceremony photos",
      "Pairs with black or charcoal trousers",
      "Built for groom and host styling",
    ],
    fabricNotes: "Textured finish with strong lighting response for photography.",
    availability: "Limited drops. Reserve recommended.",
    colors: ["Ivory", "Cream", "Champagne"],
    sizes: ["36-50 Regular", "Tailoring available"],
    images: imageSet(9, [
      "/media/placeholders/ivory-evening-jacket.svg",
      "/media/placeholders/black-tie-tuxedo.svg",
      "/media/placeholders/charcoal-windowpane.svg",
    ]),
  },
  {
    slug: "signature-white-shirt",
    name: "Signature White Dress Shirt",
    category: "dress-shirts",
    priceRange: "$",
    summary: "A crisp foundation layer designed for tuxedos, suits, and formal events.",
    details: [
      "Sharp collar stance and clean front",
      "Designed to hold shape under jackets",
      "Event-ready from ceremony to after-party",
    ],
    fabricNotes: "Lightweight breathable cotton blend with wrinkle resistance.",
    availability: "Regularly restocked.",
    colors: ["White", "Ice", "Light Blue"],
    sizes: ["S-3XL", "Neck fit options"],
    images: imageSet(12, [
      "/media/placeholders/ivory-evening-jacket.svg",
      "/media/placeholders/graphite-crosshatch.svg",
      "/media/placeholders/steel-blue-blazer.svg",
    ]),
  },
  {
    slug: "espresso-formal-loafer",
    name: "Espresso Formal Loafer",
    category: "shoes",
    priceRange: "$",
    summary: "Polished formal loafer with confident profile and event comfort.",
    details: [
      "Streamlined toe shape",
      "Flexible sole for long event wear",
      "Designed to pair with tuxedos and suiting",
    ],
    fabricNotes: "Gloss-finish upper with durable dress sole.",
    availability: "Popular sizes move quickly.",
    colors: ["Espresso", "Black"],
    sizes: ["8-13 US"],
    images: imageSet(15, [
      "/media/placeholders/espresso-loafer.svg",
      "/media/placeholders/black-tie-tuxedo.svg",
      "/media/placeholders/obsidian-three-piece.svg",
    ]),
  },
  {
    slug: "ceremony-accessory-set",
    name: "Ceremony Accessory Set",
    category: "accessories",
    priceRange: "$",
    summary: "Pocket squares, ties, and formal accents curated for coordinated looks.",
    details: [
      "Color matching for wedding parties",
      "Style guidance for groom and groomsmen",
      "Easy add-ons for final polish",
    ],
    fabricNotes: "Mixed premium textures selected by event and suit tone.",
    availability: "In-store variety changes weekly.",
    colors: ["Ivory", "Black", "Burgundy", "Navy", "Silver"],
    sizes: ["One size / adjustable"],
    images: imageSet(18, [
      "/media/placeholders/ceremony-accessory-set.svg",
      "/media/placeholders/midnight-peak-lapel.svg",
      "/media/placeholders/obsidian-three-piece.svg",
    ]),
  },
  {
    slug: "prom-night-signature",
    name: "Prom Night Signature",
    category: "wedding-formal",
    priceRange: "$",
    summary: "A bold formal set designed for standout prom and celebration looks.",
    details: [
      "Camera-ready line and color options",
      "Built for statement accessories",
      "Fast styling support for event deadlines",
    ],
    fabricNotes: "Smooth finish with light-catching texture for evening settings.",
    availability: "Seasonal. Contact for current color availability.",
    colors: ["Black", "Royal", "Deep Wine"],
    sizes: ["34-48 Regular"],
    images: imageSet(21, [
      "/media/placeholders/prom-night-signature.svg",
      "/media/placeholders/black-tie-tuxedo.svg",
      "/media/placeholders/ceremony-accessory-set.svg",
    ]),
  },
];

export const reviewHighlights = [
  {
    quote: "Elegant suits and casual wear.",
    author: "Google reviewer",
    date: "April 2024",
  },
  {
    quote:
      "Best suits ever and casual wear as well... the price was very reasonable according to the high quality.",
    author: "Google reviewer",
    date: "April 2024",
  },
  {
    quote: "Right when we walked in they helped us out and it is a very nice place.",
    author: "Google reviewer",
    date: "April 2024",
  },
];

export const whyChoose = [
  {
    title: "Boutique-Level Styling",
    body: "Looks are assembled with fit, event type, and personal style in mind.",
  },
  {
    title: "Formalwear Depth",
    body: "From daily sharp casual to black-tie, inventory is built around complete outfits.",
  },
  {
    title: "Local, Personal Service",
    body: "A Dearborn Heights store experience focused on confidence, not rushed transactions.",
  },
  {
    title: "Event Timeline Support",
    body: "Wedding, prom, and special event deadlines are handled with practical styling guidance.",
  },
];

export const customSuitJourney = [
  {
    step: "01",
    title: "Style Consultation",
    body: "Discuss your event, silhouette preference, and the statement you want to make.",
  },
  {
    step: "02",
    title: "Fabric + Color Direction",
    body: "Select tone, texture, and finish aligned to season, venue, and lighting.",
  },
  {
    step: "03",
    title: "Measurements + Fit Profile",
    body: "Capture fit priorities for shoulder, chest, waist, and trouser break.",
  },
  {
    step: "04",
    title: "Final Styling Coordination",
    body: "Complete the look with shirt, footwear, and accessories for a cohesive result.",
  },
];

const lookbookLabels = [
  "Evening Precision",
  "Peak Lapel Statement",
  "Tailored Texture",
  "Wedding Formal Direction",
  "Ceremony Contrast",
  "Black Tie Depth",
  "Prom Night Energy",
  "Modern Suiting",
  "Formal Essentials",
];

export const lookbookFrames = lookbookLabels.map((label, index) => ({
  src: imageAt(index, `/media/lookbook/look-0${(index % 6) + 1}.svg`),
  label,
  href: importedInstagramImages[index]?.postUrl ?? business.instagramUrl,
}));

export const mediaFallbackNotes = {
  title: "Media Import Status",
  body:
    importedInstagramMedia.length > 0
      ? "Instagram photos and reels are imported and live in this build from @mr.sergiostore."
      : "Instagram media import did not complete in this environment. Provide approved assets or rerun scripts/collect_instagram_media.mjs.",
};

export const instagramCinematic = {
  profileUrl: business.instagramUrl,
  note:
    importedInstagramVideos.length > 0
      ? "Cinematic homepage module is powered by downloaded reels and post imagery from @mr.sergiostore."
      : "No reel videos were imported yet. Run scripts/collect_instagram_media.mjs after Instagram login.",
  importedAt:
    (instagramManifest as { extractedAt?: string }).extractedAt ?? business.profileSnapshot.sourceDate,
  videos: importedInstagramVideos.slice(0, 4).map((item, index) => ({
    src: item.src,
    poster: item.poster ?? imageAt(index, "/media/placeholders/black-tie-tuxedo.svg"),
    postUrl: item.postUrl ?? business.instagramUrl,
    label: item.shortcode ? `Reel ${item.shortcode}` : `Reel ${index + 1}`,
  })),
  stills: importedInstagramImages.slice(0, 12).map((item, index) => ({
    src: item.src,
    postUrl: item.postUrl ?? business.instagramUrl,
    label: `Look ${index + 1}`,
  })),
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}


