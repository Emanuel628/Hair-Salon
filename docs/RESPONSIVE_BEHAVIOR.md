# Responsive Behavior

## Purpose

This document defines how the salon website should behave across desktop, tablet, and mobile.

The desktop and mobile versions use the same core idea, but they cannot use the exact same layout.

## Core Rule

The site must feel like one brand across all devices, but the layout should adapt to how people actually use each screen size.

Desktop can rely on hover.

Mobile must rely on tap.

## Desktop Layout

Recommended breakpoint:

- 1024px and up

Desktop uses a two-column layout.

### Left Column

Contains:

- Eyebrow label
- Hero headline
- Supporting paragraph
- Primary CTA
- Secondary CTA
- Trust snippet
- Featured service highlights

### Right Column

Contains:

- Semi-circle service menu
- Stylist/owner image
- Service detail card
- Active service highlight

The right column is the interactive visual experience.

## Desktop Interaction

Desktop may use hover as a preview interaction.

Required:

- Hover over a service updates the active detail card.
- Hover over a service updates the visual highlight.
- Hover can update the stylist pose.
- Keyboard focus must provide the same behavior as hover.
- Click can also select/lock the service.

The experience must not depend only on hover, because keyboard users still need access.

## Tablet Layout

Recommended breakpoint:

- 768px to 1023px

Tablet can use either:

1. A compressed two-column layout, or
2. A stacked layout similar to mobile

Decision should depend on readability.

Rule:

If the service arc or text feels cramped, switch to stacked.

## Mobile Layout

Recommended breakpoint:

- Up to 767px

Mobile uses a vertical funnel.

Required order:

1. Mobile header
2. Category tabs
3. Main salon message
4. Primary and secondary CTA
5. Featured service card
6. Semi-circle service arc
7. Half-body stylist portrait at the bottom

The stylist should be anchored at the bottom of the visual section and point upward toward the selected service.

The semi-circle should sit above the stylist, not beside the stylist.

## Mobile Interaction

Mobile must use tap, not hover.

Required:

- Tapping a service changes the active service.
- The selected service gets a clear active state.
- Use a slight animation, color shift, size change, ring, or glow so the user knows the tap worked.
- The service detail card updates after tap.
- The booking CTA updates after tap.
- The stylist pose can update after tap if multiple pose images exist.

Suggested microcopy:

> Tap a service to update details.

## Mobile Tap Area

The service icons are part of the main navigation, so they must be easy to tap.

Required:

- Minimum tap target: 44px by 44px.
- Use enough spacing between circular icons to prevent fat-finger errors.
- The icon button should be the tap target, not just the tiny dot on the path.
- The label can also be included in the tap target if it improves usability.
- Avoid placing nodes so close together that the wrong service is easy to tap.

## Service Path Accessibility

The service arc is the main navigational element.

Required:

- Dots/connection points must be visible enough to understand the path.
- Interactive service nodes must be larger than decorative dots.
- Text contrast must remain readable on all backgrounds.
- Active service must be clear without relying only on color.
- Mobile service labels must not become too small.

## Flexible Layout Requirement

The pointing visual must remain accurate across screen sizes.

Required:

- Use CSS Grid or Flexbox for main layout.
- Use a relative container for the arc and stylist image.
- Use scalable positioning for service nodes.
- Node positions should be calculated using percentages or angle-based coordinates.
- Do not hard-code positions that only work for one mockup size.
- The selected service should have a known target coordinate.
- The stylist image and pointing pose should align with the selected service as the container scales.

Acceptable implementation approaches:

1. SVG arc with React nodes positioned on top.
2. CSS relative container with percentage-based node positions.
3. Polar-coordinate helper function that converts angles into x/y positions.

Avoid:

- Fixed pixel-only service positions
- Different layouts that break the pointing illusion
- A mobile crop that hides the stylist's pointing hand

## Image Cropping Rules

Desktop:

- Use full-body or three-quarter stylist image.
- The pointing direction should clearly aim toward the selected service.

Mobile:

- Use upper-torso / half-body stylist crop.
- Stylist should sit at the bottom of the visual section.
- Pointing hand must remain visible.
- Do not let the image push important content off screen.

## Content Density Rules

Desktop can show more supporting content.

Mobile should prioritize:

1. Main message
2. Booking CTA
3. Selected service
4. Service selector

Do not overload mobile with too many cards above the service arc.

## Motion Rules

Use motion to clarify state changes.

Recommended:

- Fade service detail card content
- Slight scale on active service node
- Soft glow/ring on selected service
- Smooth category change

Avoid:

- Large spinning wheel animations
- Fast motion
- Bouncy effects
- Motion that makes selection feel unstable

Respect reduced motion preferences.

## Testing Checklist

Test at:

- 375px mobile width
- 390px mobile width
- 430px mobile width
- 768px tablet width
- 1024px desktop width
- 1280px desktop width
- 1440px desktop width

Confirm:

- Icons do not overlap.
- Labels remain readable.
- Tap areas are usable.
- Active state is clear.
- Stylist pointing still visually lands near the selected icon.
- Booking button remains easy to find.
