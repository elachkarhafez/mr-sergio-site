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
- `/shop` Shop categories + catalog
- `/shop/[slug]` Product detail + inquiry
- `/custom-suits` Custom suit experience + premium form
- `/lookbook` Editorial gallery
- `/about` Brand story
- `/contact` Contact/visit + map + inquiry

## Forms

### Product Inquiry
Endpoint: `POST /api/inquiry`

Captures:
- Name
- Phone
- Email
- Selected product
- Size
- Color
- Preferred contact method
- Notes

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

- Placeholder and editorial slot assets live under `public/media`
- Brand crest is stored at `public/media/brand/mr-sergio-crest.jpg`
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

