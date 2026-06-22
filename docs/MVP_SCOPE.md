# MVP Scope

## Purpose

This document defines the first version of the project so the build does not become overcomplicated too early.

The goal of V1 is to prove the interactive salon landing page concept while matching the approved desktop and mobile references.

## Visual Source of Truth

The MVP must follow the approved mockups:

- **Desktop Reference — `image.png`**: desktop/browser layout.
- **Mobile Reference — `image_2.png`**: mobile/phone layout.

The person shown in the mockups is temporary and will be changed later. The MVP should still preserve the approved layout, spacing, service arc, typography hierarchy, cards, color palette, and interaction patterns.

## V1 Goal

Create a polished, responsive, single-page salon website prototype with:

- Premium visual design matching the approved references
- Desktop interactive semi-circle
- Mobile tap-based service selector
- Guide-photo concept
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
- Guide photo
- Service detail card
- Mobile version of the same concept

### 2. Desktop Experience

Desktop must match **Desktop Reference — `image.png`**.

Desktop must include:

- Two-column layout
- Text content on the left
- Interactive service semi-circle on the right
- Full-body or three-quarter guide photo inside the right visual area
- Selected service detail card
- Hover/focus/click behavior
- Balayage highlighted by default

### 3. Mobile Experience

Mobile must match **Mobile Reference — `image_2.png`**.

Mobile must include:

- Header at top
- Category tabs
- Main information at top/middle
- Featured service card
- Semi-circle above the guide photo
- Half-body/upper-torso guide photo at the bottom
- Tap-based service selection
- Balayage highlighted by default

Mobile must be a purpose-built layout, not a squeezed desktop view.

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

Required:

- Use CSS Grid/Flexbox for page layout.
- Use SVG, percentage-based positioning, or calculated coordinates for service nodes.
- If absolute positioning is used, it must be inside a responsive relative container.
- The pointing hand, selected icon, and service arc must stay visually aligned across screen sizes.

### 7. Accessibility Basics

V1 must include:

- Keyboard-selectable service nodes
- Focus states
- Readable contrast
- Buttons with clear labels
- Alt text for guide images
- No hover-only functionality
- Touch targets large enough for mobile
- Active state that does not rely only on color

### 8. Mobile Tap Target Basics

V1 must include:

- Circular icons at least 44px by 44px
- Enough spacing between mobile service icons to prevent fat-finger errors
- Tap feedback through ring, glow, scale, or subtle color shift
- Labels that remain readable and do not overlap

### 9. Performance Basics

V1 must include:

- Optimized image strategy
- WebP or AVIF where possible
- Responsive image sizes
- Avoid unnecessary heavy assets
- No large uncompressed photography
- Lazy-loaded non-critical images

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
- Desktop visually matches `image.png`.
- Mobile visually matches `image_2.png`.
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
3. Desktop reference match
4. Mobile reference match
5. Service data file
6. Desktop service arc
7. Service detail state updates
8. Mobile tap behavior
9. Accessibility pass
10. Image optimization pass
11. Final visual polish against both approved references

## Final Rule

Do not build beyond the purpose of the first version.

The MVP should prove the idea:

**A salon website can guide visitors through services in a personal, visual, and conversion-focused way.**

Before new features are added, the site must first match the approved desktop and mobile references.
