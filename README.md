# Mr. Sergio Website

Premium, conversion-focused website for **Mr. Sergio** (Dearborn Heights, MI), built with a Vercel-optimized stack.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4)
- Reusable component architecture
- Vercel-ready API routes for inquiries

## Implemented Pages

- `/` Home
- `/shop` Style-lane shopping flow (`Casual` / `Dressy`) + category filters
- `/shop/[slug]` Product detail + prefilled text availability flow
- `/custom-suits` Custom suit experience + premium form
- `/lookbook` Editorial gallery
- `/about` Brand story
- `/contact` Contact/visit + map + call/text CTAs

## Customer Flows

### Merchandise Availability (No Online Checkout)
- Products are browse-only.
- If an item is over `$100`, it displays a `Free Shipping` badge.
- Product detail includes a one-tap SMS flow that pre-fills:
  - Product
  - Style
  - Size
  - Color
- SMS target: `(313) 597-3541` (`sms:+13135973541`)

### Custom Suit Inquiry
Endpoint: `POST /api/custom-suit`

Captures:
- Full name
- Phone
- Email
- Event type
- Preferred appointment date
- Preferred style
- Preferred color
- Approximate size/measurements
- Budget range
- Timeline needed
- Notes
- Optional inspiration image metadata

### Optional Legacy Endpoint
- `POST /api/inquiry` remains in codebase if you want to re-enable a web inquiry form later.

## Environment Variables

Create `.env.local` if needed:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain-or-vercel-url
FORMS_WEBHOOK_URL=https://your-webhook-endpoint
```

Notes:
- `FORMS_WEBHOOK_URL` is optional. If set, form submissions are forwarded to your endpoint.
- Without webhook, submissions are still validated and logged server-side.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Checks

```bash
npm run lint
npm run build
```

## Media Workflow

- Imported Instagram assets live under `public/media/instagram`
- Brand crest is stored at `public/media/brand/mr-sergio-crest.jpg`
- Homepage and lookbook use downloaded local visuals from `@mr.sergiostore`
- Refresh media import:

```bash
IG_CHROME_USER_DATA_DIR=.ig-session npm run media:import
```

- If Instagram blocks anonymous access, run interactive login mode once:

```bash
IG_INTERACTIVE_LOGIN=1 IG_CHROME_USER_DATA_DIR=.ig-session npm run media:import
```

- After import, media wiring is handled in `lib/site-data.ts` (`instagramCinematic`, `lookbookFrames`, and product image sets)
- See:
  - `MEDIA_MANIFEST.md`
  - `public/media/README.md`

## GitHub + Vercel Deployment

1. Push this project to a GitHub repository.
2. Import the repo in Vercel.
3. Add env vars in Vercel project settings (if used).
4. Deploy.

CLI option (after login):

```bash
npx vercel
npx vercel --prod
```

## Business Data Used

- Mr. Sergio
- 22732 Ford Rd, Dearborn Heights, MI 48127
- (313) 597-3541
- Instagram: `@mr.sergiostore`

Hours are included from public listing data and should be reconfirmed seasonally.

