# Component Architecture

## Purpose

This document defines the recommended frontend component structure for the salon website concept.

The goal is to keep the build clean, reusable, and easy to extend into other service-business websites later.

## Recommended Stack

- React
- Vite
- TypeScript
- CSS Modules or standard CSS with clear naming
- Framer Motion for refined transitions later, if needed

The first version does not require a backend.

## Component Tree

Suggested homepage structure:

```txt
App
└── HomePage
    ├── SiteHeader
    ├── CategoryTabs
    ├── HeroSection
    │   ├── HeroIntro
    │   ├── HeroActions
    │   ├── TestimonialSnippet
    │   └── FeaturedServices
    ├── InteractiveServiceExperience
    │   ├── ServiceWheel
    │   │   ├── ServiceArc
    │   │   └── ServiceNode[]
    │   ├── StylistGuide
    │   └── ServiceDetailCard
    └── Footer / Attribution
```

On mobile, the visual order changes, but the same state should power the experience.

## Core Components

## `SiteHeader`

Responsible for:

- Brand logo/name
- Category navigation placement on desktop if needed
- Mobile menu button
- Book Now button

Should not contain service-selection logic.

## `CategoryTabs`

Responsible for:

- Showing service categories
- Updating the active category
- Supporting horizontal scroll on mobile
- Maintaining accessible tab behavior

Example categories:

- Hair
- Nails
- Massage
- Brows
- Lashes
- Bridal

Required behavior:

- Active category is visually clear.
- Category changes update the service list.
- Keyboard navigation should be supported.

## `HeroIntro`

Responsible for:

- Eyebrow label
- Main headline
- Supporting paragraph
- Primary CTA
- Secondary CTA

This should stay clean and not become overloaded.

## `ServiceWheel`

The main visual/navigation component.

Responsible for:

- Rendering the semi-circle arc
- Rendering all `ServiceNode` items
- Managing layout coordinates for each node
- Communicating selection changes back to the parent

This component must be responsive.

Required:

- Use flexible layout rules.
- Nodes must stay aligned around the arc at different viewport sizes.
- Active state must be visually clear.
- On desktop, hover can preview/select depending on implementation choice.
- On mobile, tap must select.

## `ServiceNode`

Responsible for:

- Rendering one service icon and label
- Handling hover, focus, click, and tap
- Showing active state
- Providing accessible labels

Required:

- Mobile tap target should be large enough to avoid fat-finger errors.
- Use at least a 44px minimum target size.
- Add enough spacing between circular icons on mobile.
- Do not make tiny dots the only clickable target.

## `ServiceArc`

Responsible for:

- Drawing the semi-circle path or visual guide
- Showing dots/connection points
- Supporting responsive scaling

Implementation options:

- CSS border/arc approximation
- SVG path
- Canvas is not recommended for V1 unless necessary

Preferred option:

- Use SVG for precise and scalable arc rendering.
- Overlay interactive React nodes using percentage coordinates or calculated positions.

## `StylistGuide`

Responsible for:

- Showing the stylist/owner image
- Switching pose/image based on selected service
- Maintaining correct crop for desktop and mobile

Required:

- Desktop can use full-body or three-quarter images.
- Mobile should use upper-torso/half-body crops anchored at the bottom.
- Images should be optimized and responsive.
- Use descriptive alt text.

## `ServiceDetailCard`

Responsible for:

- Showing selected service title
- Showing selected service description
- Showing booking CTA
- Optional image thumbnail
- Optional price/duration later

Required:

- Updates when active service changes.
- Should be readable on mobile.
- Booking CTA should be clear and specific.

Example:

```txt
FEATURED SERVICE
Balayage
Soft, dimensional color for a bright, natural finish.
Book Balayage →
```

## Shared State

The parent should control:

- Active category
- Active service
- Interaction mode if needed

Example:

```ts
const [activeCategoryId, setActiveCategoryId] = useState('hair');
const [activeServiceId, setActiveServiceId] = useState('balayage');
```

When the active category changes, choose a default service in that category.

## Event Behavior

Desktop:

- Hover or focus updates service preview.
- Click can lock selection if needed.
- Active service updates detail card and stylist pose.

Mobile:

- Tap updates selected service.
- Tapped node gets clear active feedback.
- Detail card updates immediately.

## Accessibility Responsibilities

Each interactive service node must behave like a button or tab.

Required:

- `button` element preferred for service nodes
- `aria-pressed` or tab semantics depending on final pattern
- Keyboard focus styles
- Clear accessible label such as `View Balayage details`
- Do not rely on hover only

## File Organization

Suggested structure:

```txt
src/
  components/
    SiteHeader/
    CategoryTabs/
    HeroIntro/
    ServiceWheel/
    ServiceNode/
    ServiceDetailCard/
    StylistGuide/
    CTAButton/
  data/
    salonServices.ts
  styles/
    tokens.css
    globals.css
  pages/
    HomePage.tsx
```

## Rule

The components should support the concept without hard-coding one single mockup size. The experience must remain accurate and usable across desktop, tablet, and mobile.
