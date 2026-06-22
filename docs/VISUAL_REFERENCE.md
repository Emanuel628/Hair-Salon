# Visual Reference Lock

## Purpose

This document locks the intended visual direction for the build.

The desktop and mobile layouts must follow the two approved reference mockups as closely as possible.

These references are the source of truth for layout, spacing, tone, visual hierarchy, and interaction direction.

## Approved References

### Desktop Reference

Use the desktop mockup as the approved desktop design.

Reference name:

**Desktop Reference — `image.png`**

This is the wide browser layout with:

- Studio Sol logo on the upper left
- Centered category navigation
- Book Now button on the upper right
- Left-side hero copy and CTAs
- Right-side interactive service semi-circle
- Full-body or three-quarter stylist image
- Service detail card floating near the stylist
- Balayage highlighted on the arc

Desktop must look like this reference.

### Mobile Reference

Use the mobile mockup as the approved mobile design.

Reference name:

**Mobile Reference — `image_2.png`**

This is the phone layout with:

- Studio Sol logo and mobile header at the top
- Category tabs under the header
- Main hero message at the top/middle
- Featured service card in the middle
- Semi-circle service selector above the stylist
- Half-body / upper-torso stylist image at the bottom
- Tap-based service interaction
- Balayage highlighted on the arc

Mobile must look like this reference.

## Important Model / Photo Note

The model/stylist photography in the references is a placeholder.

The model will be changed later.

The layout, pose direction, crop, spacing, interaction pattern, and overall style should remain the same unless intentionally redesigned.

When real salon owner or employee photos are added later, they should match the same visual requirements:

- Warm salon lighting
- Similar framing
- Similar pointing pose system
- Similar background softness
- Same desktop and mobile crop logic
- Same premium editorial feel

## Visual Matching Requirement

The build should not reinterpret the design into a different style.

Match the references closely for:

- Layout
- Spacing
- Typography hierarchy
- Warm cream/beige/blush/terracotta color palette
- Rounded card style
- Soft shadows
- Editorial salon photography style
- Service arc placement
- Icon size and spacing
- Desktop two-column structure
- Mobile stacked structure
- Active Balayage node style
- CTA placement and styling

The goal is not just to implement the idea. The goal is to make the actual site look like the approved references.

## Desktop-Specific Visual Rules

Desktop should keep the approved split layout:

- Left side is calm, spacious, and text-led.
- Right side is visual and interactive.
- The stylist is part of the service selector experience.
- The service arc curves around the right side of the stylist.
- The service detail card floats near the selected service area.
- Hover helper copy is allowed on desktop.

Desktop interaction language:

> Hover a service to see details update.

## Mobile-Specific Visual Rules

Mobile should not squeeze the desktop layout.

Mobile should keep the approved vertical funnel:

1. Header
2. Category tabs
3. Hero message
4. CTAs
5. Featured service card
6. Service semi-circle
7. Upper-torso stylist image at the bottom

The service arc must sit above the stylist.

The stylist should point upward toward the selected service.

Mobile interaction language:

> Tap a service to update details.

## Layout Accuracy Requirement

Use a flexible layout so the pointing visual remains accurate across screen sizes.

Required:

- Use CSS Grid, Flexbox, SVG, or a relative positioning container.
- If absolute positioning is used, it must be inside a scalable relative container.
- Service nodes should be positioned with percentages or calculated angle coordinates.
- The stylist image, pointing hand, arc, and selected service icon must scale together.
- Do not hard-code positions that only work at one exact screen size.

The pointing hand should visually land near the intended icon on desktop and mobile.

## Hover vs Tap Requirement

Desktop:

- Hover/focus can update the selected service.
- Click can lock or select the service.

Mobile:

- Tap must update the selected service.
- The active state must visibly change after tap.
- Use subtle animation, scale, ring, glow, or color shift so users understand the service is interactive.

## Mobile Tap Target Requirement

The service arc is a primary navigation element.

Required:

- Circular icons must be easy to tap.
- Use at least 44px by 44px tap targets.
- Keep enough spacing between icons to prevent fat-finger errors.
- Do not make tiny decorative dots the only tap targets.
- Labels should remain readable and should not overlap.

## Accessibility Requirement

Required:

- Service nodes must be keyboard accessible.
- The active state must be clear without relying only on color.
- Text contrast must remain readable.
- Buttons must have clear labels.
- Images need useful alt text.
- Motion should respect reduced-motion preferences.

## Performance Requirement

The references use high-quality photography, but the build must still load quickly.

Required:

- Optimize all photography.
- Use WebP or AVIF when possible.
- Use responsive image sizes.
- Lazy-load non-critical images.
- Do not load every full-resolution pose at once.
- Compress images without visibly damaging the premium look.

Beautiful visuals cannot come at the cost of slow load times, SEO loss, or poor retention.

## Source of Truth Rule

If another document conflicts with this visual reference document, this document wins.

The approved direction is:

- **Desktop:** match `image.png`
- **Mobile:** match `image_2.png`

The model may change later, but the approved design structure should stay locked.
