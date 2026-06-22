# Build Plan

## Visual Source of Truth

The build must follow the approved mockups as closely as possible.

- **Desktop Reference — `image.png`**: use for the desktop/browser layout.
- **Mobile Reference — `image_2.png`**: use for the mobile/phone layout.

The person shown in the mockups is temporary and will be replaced later. The layout, spacing, typography hierarchy, color palette, service arc, card styling, CTAs, and interaction behavior should remain aligned to the references.

If a build decision is unclear, follow `docs/VISUAL_REFERENCE.md` first.

## Phase 1 — Foundation

Goal: create the initial working frontend prototype that visually matches the approved desktop and mobile references.

Tasks:

- Set up React + Vite + TypeScript.
- Add routing only if needed.
- Create global layout styles.
- Add design tokens for colors, spacing, typography, shadows, radius, and breakpoints.
- Build static desktop and mobile layouts first.
- Match the approved desktop and mobile references before adding extra features.

The first prototype should focus on one excellent landing page before expanding.

## Phase 2 — Static UI Components

Build reusable components:

- Header
- CategoryNav
- HeroIntro
- ServiceWheel
- ServiceDetailCard
- StylistGuideImage
- CTAButton
- TestimonialSnippet
- FeaturedServices
- MobileServiceSelector

The goal is to make the experience clean and reusable without drifting away from the approved mockups.

## Phase 3 — Data Model

Create local service data before adding any backend.

Example structure:

```ts
export type ServiceCategory = {
  id: string;
  label: string;
  services: SalonService[];
};

export type SalonService = {
  id: string;
  label: string;
  shortDescription: string;
  longDescription?: string;
  bookingLabel: string;
  bookingUrl?: string;
  icon: string;
  poseKey?: string;
  arcPosition?: {
    angle: number;
  };
};
```

Default V1 state:

- Category: Hair
- Service: Balayage
- CTA: Book Balayage

## Phase 4 — Desktop Layout Build

Build the desktop layout to match **Desktop Reference — `image.png`**.

Desktop requirements:

- Logo on upper left.
- Category nav centered at the top.
- Book Now button upper right.
- Two-column layout.
- Left column contains hero copy, CTAs, testimonial, and featured services.
- Right column contains the guide photo, service semi-circle, active service card, and hover instruction.
- Balayage is highlighted by default.
- The composition should match the approved reference, not a generic salon template.

## Phase 5 — Mobile Layout Build

Build the mobile layout to match **Mobile Reference — `image_2.png`**.

Mobile requirements:

- Mobile header with Studio Sol logo, menu icon, and Book Now button.
- Category tabs directly under the header.
- Main hero message at the top/middle.
- Primary and secondary CTAs stacked.
- Featured service card in the middle.
- Semi-circle service arc above the guide photo.
- Half-body / upper-torso guide photo at the bottom.
- Tap-based service interaction.
- Balayage highlighted by default.

Mobile should not be a squeezed version of desktop. It must match the approved mobile reference.

## Phase 6 — Responsive Arc and Pointing Accuracy

The service arc and pointing visual must work across screen sizes and resolutions.

Required:

- Use CSS Grid/Flexbox for page structure.
- Use a relative container for the service arc and visual guide.
- Use SVG, percentage-based positioning, or calculated polar coordinates for service nodes.
- If absolute positioning is used, it must be inside a scalable relative container.
- The selected service icon should have a stable target coordinate.
- The guide photo and selected service node must scale together.
- The pointing hand should visually land near the selected service icon on desktop and mobile.

Avoid hard-coded pixel-only icon positions.

## Phase 7 — Interactivity

Desktop:

- Hover service to preview/select.
- Click service to lock/select if needed.
- Keyboard focus support.
- Active service state.
- Detail card updates.
- Guide photo/pose updates where available.
- Subtle visual feedback on hover/focus.

Mobile:

- Tap service to select.
- Detail card updates.
- Active arc node updates.
- Guide photo stays anchored at the bottom.
- Add subtle feedback on tap, such as a ring, glow, color shift, or slight scale.

The mobile experience must not rely on hover.

## Phase 8 — Accessibility and Tap Targets

The service path is the main navigation element, so it must be easy to use.

Required:

- Service nodes must be keyboard accessible.
- Focus state must be visible.
- Active state must not rely only on color.
- Text contrast must remain readable.
- Circular icons must be at least 44px by 44px on mobile.
- Icons must be spaced enough to avoid fat-finger errors.
- Decorative dots should not be the only tap targets.
- Buttons need clear accessible labels.
- Images need useful alt text.

## Phase 9 — Booking Integration

Start simple.

Possible options:

- External booking link
- Calendly
- Square Appointments
- Fresa
- GlossGenius
- Vagaro
- Custom booking flow later

V1 should allow each service to have its own booking URL.

## Phase 10 — Performance and Image Optimization

The design uses high-quality photography, but load speed matters.

Required:

- Optimize all photography.
- Use WebP or AVIF when possible.
- Use responsive image sizes.
- Lazy-load non-critical images.
- Preload only the critical hero/guide image if needed.
- Avoid loading every high-resolution pose image immediately.
- Compress images without ruining the premium look.

Slow loading can hurt SEO, retention, and conversion.

## Phase 11 — Polish

Add premium finishing touches:

- Soft transitions.
- Gentle shadows.
- Better hover/focus states.
- Real salon photography placeholders.
- Accessibility pass.
- Mobile spacing pass.
- Performance pass.
- Visual comparison against `image.png` and `image_2.png`.

## Phase 12 — Mejor Tech Showcase

Once the prototype feels strong, add a small Mejor Tech attribution or case study version.

Possible positioning:

> Designed by Mejor Tech — Building Better Technology That Makes Sense

This project can become a portfolio showcase for interactive service-business websites.

## Do Not Overbuild V1

Avoid adding too much too early:

- No login
- No dashboard
- No custom admin panel yet
- No database required for the first prototype
- No payment processing unless booking requires it

The goal is to prove the concept visually and functionally first.

## Final Build Rule

Before adding anything new, first make the site match the approved references:

- Desktop must match `image.png`.
- Mobile must match `image_2.png`.

The person/photo can change later. The approved layout and style should not drift.
