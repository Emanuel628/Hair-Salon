# Build Plan

## Phase 1 — Foundation

Goal: create the initial working frontend prototype.

Tasks:

- Set up React + Vite + TypeScript
- Add routing if needed
- Create global layout styles
- Add design tokens for colors, spacing, typography, shadows, and breakpoints
- Create a clean homepage structure
- Build static desktop and mobile layouts first

Recommended first pages:

- Home / Landing Page
- Optional Services Page
- Optional About Page
- Optional Booking Redirect Page

The first prototype should focus on one page before expanding.

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

The goal is to make the experience clean and reusable.

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
};
```

Example categories:

- Hair
- Nails
- Massage
- Brows
- Lashes
- Bridal

## Phase 4 — Interactivity

Add desktop interaction:

- Hover service to preview
- Click service to lock selection
- Keyboard focus support
- Active service state
- Detail card updates
- Stylist pose/image updates

Add mobile interaction:

- Tap service to select
- Detail card updates
- Active arc node updates
- Keep the stylist anchored at the bottom

## Phase 5 — Responsive Rules

Desktop:

- Two-column layout
- Text and CTA on left
- Semi-circle and stylist guide on right

Tablet:

- Slightly compressed two-column layout or stacked layout depending on width

Mobile:

- Fully stacked layout
- Category tabs scroll horizontally if needed
- Main information top and middle
- Service card before visual selector
- Semi-circle above upper-torso stylist image

## Phase 6 — Booking Integration

Start simple.

Possible options:

- External booking link
- Calendly
- Square Appointments
- Fresha
- GlossGenius
- Vagaro
- Custom booking flow later

V1 should allow each service to have its own booking URL.

## Phase 7 — Polish

Add premium finishing touches:

- Soft transitions
- Gentle shadows
- Better hover/focus states
- Real salon photography placeholders
- Accessibility pass
- Mobile spacing pass
- Performance pass

## Phase 8 — Mejor Tech Showcase

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
