# MVP Scope

## Purpose

This document defines the first version of the project so the build does not become overcomplicated too early.

The goal of V1 is to prove the interactive salon landing page concept.

## V1 Goal

Create a polished, responsive, single-page salon website prototype with:

- Premium visual design
- Desktop interactive semi-circle
- Mobile tap-based service selector
- Stylist-as-guide visual concept
- Service detail card
- Clear booking CTA
- Static local service data

## V1 Must Have

### 1. Homepage / Landing Page

The first version should focus on one excellent page.

The homepage should include:

- Header
- Category tabs
- Hero copy
- CTA buttons
- Service semi-circle
- Stylist image
- Service detail card
- Mobile version of the same concept

### 2. Desktop Experience

Desktop must include:

- Two-column layout
- Text content on the left
- Interactive service semi-circle on the right
- Stylist/owner image in or near the center of the semi-circle
- Selected service detail card
- Hover/focus/click behavior

### 3. Mobile Experience

Mobile must include:

- Header at top
- Category tabs
- Main information at top/middle
- Featured service card
- Semi-circle above the stylist
- Half-body/upper-torso stylist portrait at the bottom
- Tap-based service selection

### 4. Static Service Data

Use local TypeScript data for V1.

No backend required.

### 5. Booking Links

Use external or placeholder booking links.

Each service should support its own booking URL.

### 6. Responsive Behavior

Must work across:

- Mobile
- Tablet
- Desktop
- Large desktop

The service arc should scale responsively.

### 7. Accessibility Basics

V1 must include:

- Keyboard-selectable service nodes
- Focus states
- Readable contrast
- Buttons with clear labels
- Alt text for stylist images
- No hover-only functionality
- Touch targets large enough for mobile

### 8. Performance Basics

V1 must include:

- Optimized image strategy
- WebP or AVIF where possible
- Responsive image sizes
- Avoid unnecessary heavy assets
- No large uncompressed photography

## V1 Should Not Include

Do not add these yet:

- User login
- Admin dashboard
- Database
- Custom booking calendar
- Payment processing
- Multi-salon account system
- CMS
- Blog
- Complex animations
- Chatbot
- Newsletter system
- Review management

These can be considered later if the concept proves strong.

## V1 User Flow

1. Visitor lands on homepage.
2. Visitor reads the salon message.
3. Visitor sees available service categories.
4. Visitor interacts with the service semi-circle.
5. Visitor sees the selected service explanation.
6. Visitor clicks the service-specific booking CTA.

## V1 Default Content

Default brand:

**Studio Sol**

Default active category:

**Hair**

Default active service:

**Balayage**

Default CTA:

**Book Balayage**

## V1 Success Criteria

The V1 prototype succeeds if:

- The concept is immediately understandable.
- Desktop feels premium and interactive.
- Mobile feels intentionally redesigned, not squeezed.
- The service arc is usable and visually accurate.
- Tapping/hovering services clearly updates the page.
- The booking action is obvious.
- The site feels like something Mejor Tech can show as a premium concept.

## Build Priority

Recommended order:

1. Static homepage layout
2. Design tokens and global styling
3. Service data file
4. Desktop service arc
5. Service detail state updates
6. Mobile stacked layout
7. Tap/hover behavior polish
8. Accessibility pass
9. Image optimization pass
10. Final visual polish

## Final Rule

Do not build beyond the purpose of the first version.

The MVP should prove the idea:

**A salon website can guide visitors through services in a personal, visual, and conversion-focused way.**
