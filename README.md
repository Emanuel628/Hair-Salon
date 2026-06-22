# Hair Salon Website Concept

A premium, interactive salon website concept by **Mejor Tech**.

> **Building Better Technology That Makes Sense**

This project explores a more memorable and conversion-focused website experience for hairstylists, salons, and beauty-service professionals.

Most salon websites are simple booking pages with a gallery, a list of services, and a button. This concept is different: it turns the stylist into the guide, makes services easy to understand, and funnels visitors toward booking without overwhelming them.

## Visual Reference Lock

The approved mockups are the source of truth for the build.

- **Desktop Reference — `image.png`**: use for the desktop/browser layout.
- **Mobile Reference — `image_2.png`**: use for the mobile/phone layout.

The finished site should look as close as possible to the approved reference images.

The model/stylist shown in the mockups is temporary and will be replaced later. The layout, spacing, color palette, typography hierarchy, service arc behavior, and desktop/mobile structure should remain locked unless intentionally changed.

## Core Idea

The landing page uses an interactive service semi-circle.

On desktop, the page is split into two main columns:

- **Left side:** salon introduction, brand message, trust snippet, and booking call-to-action.
- **Right side:** a large semi-circle service menu with the owner/stylist in the center.

The stylist points toward the selected service. When a visitor hovers over a service, the stylist image and service detail card update.

Example services for the Hair category:

- Cut
- Color
- Balayage
- Blowout
- Extensions
- Bridal Hair
- Treatments

At the top of the page, category navigation lets the visitor switch between service groups such as:

- Hair
- Nails
- Massage
- Brows
- Lashes
- Bridal

When the visitor selects a category, the semi-circle updates with the services for that category.

## Mobile Concept

The desktop layout does not directly translate to mobile, so the mobile version uses a stacked funnel:

1. Header and category tabs
2. Main salon message
3. Featured service card
4. Semi-circle service menu
5. Half-body stylist portrait at the bottom pointing upward toward the selected service

Mobile interactions are tap-based instead of hover-based.

## Technical Layout Requirement

The service arc and pointing visual must be responsive.

Use a flexible layout system such as CSS Grid, Flexbox, SVG, or absolute positioning inside a scalable relative container. The service icons, dots, stylist image, and pointing direction must stay aligned across screen sizes and resolutions.

Do not hard-code positions that only work on one desktop or phone size.

## Why This Works

This concept is built around a simple conversion path:

**Service → Explanation → Trust → Booking**

It helps the stylist or salon owner sell their skill, personality, and services without relying on a generic service list.

The design should feel:

- Premium
- Airy
- Human
- Personal
- Warm
- Easy to navigate
- Focused on booking

## Target Users

This concept can be adapted for:

- Hairstylists
- Barbers
- Salon owners
- Nail techs
- Brow artists
- Lash artists
- Massage therapists
- Estheticians
- Makeup artists
- Bridal beauty teams

## Project Status

Current phase: **Documentation and concept foundation**

Next phase: create the initial frontend prototype.

## Planned Tech Direction

Recommended starting stack:

- React
- Vite
- TypeScript
- CSS modules or standard CSS
- Framer Motion for polished service transitions
- Later integration with a booking provider or custom appointment flow

## Documentation

See the `/docs` folder for deeper planning:

- `VISUAL_REFERENCE.md` — approved desktop/mobile mockup rules and visual source of truth
- `PROJECT_BRIEF.md` — product vision and business purpose
- `UX_CONCEPT.md` — desktop and mobile interaction rules
- `BUILD_PLAN.md` — phased implementation plan
- `DESIGN_SYSTEM.md` — style, layout, photography, and performance rules
- `RESPONSIVE_BEHAVIOR.md` — desktop/tablet/mobile behavior
- `SERVICE_DATA_MODEL.md` — service/category data structure
- `COMPONENT_ARCHITECTURE.md` — recommended React component structure
- `MVP_SCOPE.md` — what V1 should and should not include
- `COPY_DIRECTION.md` — brand voice and sample copy

## Mejor Tech Positioning

This project should showcase what Mejor Tech does differently.

A website should not just exist. It should guide people, sell the service, and make the next step obvious.

**Mejor Tech — Building Better Technology That Makes Sense**
