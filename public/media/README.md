# Media Pipeline Notes

This project ships with branded placeholder visuals plus one verified brand-owned public asset:
- `brand/mr-sergio-crest.jpg` (public Instagram profile image)

## Replace Placeholder Media

1. Add approved business-owned files to these folders:
- `/public/media/placeholders`
- `/public/media/lookbook`

2. Keep high-resolution files with clear names.

3. Update paths in `lib/site-data.ts` under:
- `products[].images`
- `lookbookFrames[]`

## Recommended Asset Specs

- Product portrait images: `1200x1600` minimum
- Lookbook hero/editorial images: `1600px` shortest side minimum
- Short clips: 1080x1920 vertical or 1920x1080 horizontal, MP4 (H.264)
- Keep files under 5MB when possible for fast load

## Instagram Note

Public profile metadata was reachable in this environment, but direct post media extraction was restricted. The site is designed so approved post media can be inserted cleanly without changing layout code.

