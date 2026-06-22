# UX Concept

## Overview

The website is built around an interactive service selector that feels like a beauty compass.

The purpose is not just to display services. The purpose is to guide visitors toward the right service and make booking feel natural.

## Approved UX References

The UX must follow the approved references:

- **Desktop Reference — `image.png`**: the desktop/browser experience.
- **Mobile Reference — `image_2.png`**: the mobile/phone experience.

The person shown in the references is temporary and will be replaced later. The user experience, layout structure, service arc behavior, and visual hierarchy should stay aligned to the references.

## Desktop Layout

Desktop uses a two-column landing page and must match **Desktop Reference — `image.png`**.

### Header

The header should include:

- Salon logo/name on the left
- Centered category navigation
- Book Now button on the right

Example category navigation:

- Hair
- Nails
- Massage
- Brows
- Lashes
- Bridal

The active category controls the services shown in the semi-circle.

### Left Column

The left column contains the main funnel copy.

Recommended structure:

1. Small eyebrow label
2. Large emotional headline
3. Short supporting paragraph
4. Primary booking button
5. Secondary services button
6. Trust snippet or testimonial
7. Featured service highlights

Example headline:

> Hair that feels like you.

The left side should stay simple and spacious. It should not become a cluttered dashboard.

### Right Column

The right column contains the interactive service semi-circle.

The stylist or salon owner appears in the center of the semi-circle. Services are placed around the arc.

When a user hovers over a service:

- The service node becomes active
- The service detail card updates
- The stylist image can change to a pose pointing at that service
- The booking CTA updates to match the selected service

Example selected service card:

**Balayage**

Soft, dimensional color for a bright, natural finish.

**Book Balayage →**

## Mobile Layout

Mobile cannot use the same two-column desktop layout.

Mobile must match **Mobile Reference — `image_2.png`**.

The mobile version should use a vertical funnel:

1. Mobile header
2. Category tabs
3. Main salon message
4. Main CTA buttons
5. Featured service card
6. Semi-circle service menu
7. Half-body stylist portrait at the bottom

The stylist should be positioned at the bottom as an upper-torso image, pointing upward toward the selected service.

The semi-circle should sit above the stylist, not beside them.

### Mobile Interaction

Mobile must use tap instead of hover.

When the visitor taps a service:

- The selected service updates
- The detail card updates
- The selected node on the arc changes
- The booking button updates
- The active node gives visible tap feedback through a subtle ring, glow, scale, or color shift

Recommended helper text:

> Tap a service to update details.

## Responsive Pointing Rule

The pointing visual must stay accurate across screen sizes and resolutions.

Required:

- Use a flexible layout system such as CSS Grid, Flexbox, SVG, or a relative positioning container.
- Position service nodes with percentages or calculated coordinates instead of one fixed pixel layout.
- If absolute positioning is used, it must be inside a scalable relative container.
- The selected service node should have a stable target coordinate.
- The stylist/guide image and the service arc must scale together.
- The pointing hand should visually land near the selected icon on both desktop and mobile.

## Interaction States

Each service should support these states:

### Default

- Neutral icon
- Neutral label
- Normal arc node

### Active

- Larger or emphasized node
- Accent ring or glow
- Active label color
- Detail card content shown

### Hover / Focus

- Slight scale or elevation
- Accessible focus ring
- Cursor pointer on desktop

### Tap

- Clear active state
- Subtle animation or color shift
- Detail card updates immediately
- Booking CTA updates immediately

### Disabled / Unavailable

- Lower opacity
- Optional label such as "Coming soon"

## Accessibility Rules

The visual interaction must not depend only on hover.

Required rules:

- Every service must be keyboard selectable
- Active state must be clear without relying only on color
- Buttons need readable labels
- Images need useful alt text
- Motion should be subtle
- Respect reduced motion preferences
- Mobile service nodes need large enough tap targets
- Icon spacing must prevent fat-finger errors
- Text contrast must remain readable against the warm background

## Motion Direction

Animations should feel refined, not flashy.

Use motion for:

- Soft fade between service details
- Slight movement of the active service node
- Gentle image transition when stylist pose changes
- Smooth category change
- Subtle tap confirmation on mobile

Avoid:

- Spinning wheels
- Heavy bounce effects
- Fast carousel movement
- Anything that feels like a carnival game

## Design Principles

1. The stylist is the guide.
2. The service menu is the funnel.
3. The selected service is always obvious.
4. Booking should never be more than one clear action away.
5. Desktop and mobile should feel like the same brand, not two unrelated designs.
6. Desktop must match `image.png`.
7. Mobile must match `image_2.png`.
