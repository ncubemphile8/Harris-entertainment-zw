# Harris Entertainment Zimbabwe

Cinematic, mobile-first events website for Harris Entertainment, developed by VanillaWebz.

## Stack
- Next.js App Router
- React + TypeScript
- Framer Motion
- Lucide icons
- Vercel deployment target

## Run locally
```bash
npm install
npm run dev
```

## Current website experience
- Cinematic video hero (requires approved media in `public/media`)
- Upcoming event cards for the supplied DJ Maphorisa promotion, Harris Music Festival (5 Dec 2026), and Stance Nation (12 Dec 2026)
- Interactive event detail modals
- Month-view event calendar
- Gallery lightbox/video viewer
- Ticket category and quantity selection for published festival prices
- WhatsApp enquiry and booking-request buttons for +263 77 239 9483
- Responsive mobile navigation, motion effects and reduced-motion support

## Important ticketing status
The current ticket flow is a booking-request prototype that hands the order details to Harris Entertainment over WhatsApp. It does **not** collect money or issue valid tickets yet. Before live sales, configure and test a Zimbabwe-supported payment provider, authoritative ticket inventory, secure order creation, payment webhooks, QR ticket generation/validation, refunds, and an admin workflow. Do not advertise online payment as active until these pieces are implemented and tested.

## Media
See `public/media/README.md` for required filenames. Replace placeholders only with approved Harris Entertainment assets. The uploaded source media from the chat is not automatically committed to GitHub; upload the selected files into `public/media`.

## Deployment
Import this repository into Vercel and deploy. Add a custom domain after the site has been reviewed and the assets, event facts, payment provider, and contact links are confirmed.
