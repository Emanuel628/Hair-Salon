# Design System

## Purpose

This document defines the visual rules for the salon website concept.

The design should feel premium, airy, warm, human, and easy to understand. The goal is not to create a trendy template. The goal is to create a guided booking experience that makes sense for a salon or personal-service business.

## Approved Visual References

The approved mockups are the style source of truth.

- **Desktop Reference — `image.png`**: wide browser layout.
- **Mobile Reference — `image_2.png`**: phone layout.

The build should match these references as closely as possible.

The stylist/model in the references is a placeholder and will be replaced later. The replacement images should follow the same crop, pose direction, lighting, and premium editorial tone.

If this document conflicts with `docs/VISUAL_REFERENCE.md`, the visual reference document wins.

## Brand Direction

Working brand used in mockups:

**Studio Sol**

Created as a showcase concept by:

**Mejor Tech**

**Slogan:** Building Better Technology That Makes Sense

## Visual Personality

The interface should feel exactly like the approved mockups:

- Elegant
- Calm
- Spacious
- Editorial
- Warm
- Personal
- Conversion-focused
- Premium but still friendly

Avoid:

- Heavy gradients
- Neon colors
- Overly playful animations
- Crowded sections
- Generic template styling
- Dashboard-like blocks
- A different color palette from the references
- A different layout interpretation from the references

## Color Direction

Use the warm palette from the approved references.

### Backgrounds

- Warm cream
- Soft beige
- Light champagne
- Very pale blush

### Text

- Deep espresso
- Dark charcoal brown
- Muted warm gray

### Accents

- Terracotta
- Dusty rose
- Warm copper
- Soft clay

### UI Surfaces

- White
- Warm off-white
- Light beige cards

The colors should not drift into purple, bright pink, stark white, or cold gray.

## Contrast Rules

Text must remain readable on all backgrounds.

Required:

- Body text should use dark neutral colors on light backgrounds.
- Accent text must not be too pale.
- Buttons must have strong enough contrast between label and background.
- Service labels around the arc must remain readable at desktop and mobile sizes.
- Active service state must use more than color alone, such as size, ring, icon fill, shadow, or underline.

## Typography

Use two complementary type styles, matching the references.

### Display / Headline

Elegant serif or editorial-style type.

Use for:

- Hero headline
- Service title
- Large section headings
- Studio Sol logo text if no final logo exists yet

The hero headline should feel large, elegant, and editorial like the mockups.

### Body / UI

Clean sans-serif.

Use for:

- Navigation
- Buttons
- Body copy
- Service labels
- Microcopy

## Spacing

The interface should breathe.

Recommended rules:

- Use generous padding on desktop sections.
- Keep the left content column uncluttered.
- Avoid stacking too many cards near the hero headline.
- On mobile, keep vertical rhythm consistent so the page feels intentional rather than squeezed.
- Match the spacing rhythm in the desktop and mobile references.

## Layout System

Use a flexible layout system so the design adapts across screen sizes.

Required:

- Use CSS Grid or Flexbox for the main desktop layout.
- Use a responsive container for the service arc.
- The arc, service nodes, and stylist image must scale together.
- Do not hard-code icon positions only for one screen size.
- Avoid fragile absolute positioning tied to one fixed pixel layout.

## Desktop Layout Style

The desktop layout must match the approved desktop reference.

Required:

- Browser-style desktop presentation can be used for mockups, but the actual site should be a normal responsive web page.
- Studio Sol logo/name on the upper left.
- Centered top category nav.
- Book Now button on the upper right.
- Left side contains the main editorial hero message and CTAs.
- Right side contains the interactive visual service semi-circle.
- Full-body or three-quarter stylist photo appears inside the right visual area.
- Service detail card floats near the selected service.
- Balayage is the default highlighted service.

## Mobile Layout Style

The mobile layout must match the approved mobile reference.

Required:

- Mobile header with Studio Sol logo, hamburger icon, and Book Now button.
- Category tabs below the mobile header.
- Hero message centered near the top/middle.
- CTA buttons stacked.
- Featured service card in the middle.
- Service arc below the service card.
- Upper-torso stylist photo anchored at the bottom.
- Stylist points upward toward the selected service.
- Balayage is the default highlighted service.

Mobile should look like an intentionally designed mobile version, not a compressed desktop layout.

## Service Arc Positioning

The service arc is the signature interaction, so it needs to be responsive and accurate.

Required implementation direction:

- Place service nodes using calculated positions inside a relative container.
- Use percentage-based positioning or polar-coordinate logic for the arc.
- The stylist pose should align to the selected service regardless of screen size.
- If absolute positioning is used, it must be inside a scalable relative container.
- The selected service should expose a stable target coordinate so the pointing pose and highlight feel intentional.

This is important because the user may view the site on different desktop resolutions, tablets, and mobile devices. The pointing visual should not drift away from the service icon.

Acceptable approaches:

- SVG arc with React service nodes layered on top.
- CSS relative container with calculated service node coordinates.
- Polar-coordinate helper function that places nodes by angle.

Avoid fixed pixel-only node placement.

## Border Radius

Use soft, modern radius values matching the references.

Recommended:

- Small controls: 10px to 14px
- Cards: 20px to 28px
- Large visual containers: 32px+
- Pills/buttons: 999px or fully rounded

## Shadows

Use soft shadows only.

Recommended:

- Light card shadows
- Subtle image depth
- Soft active service glow

Avoid harsh box shadows or heavy depth effects.

## Buttons

### Primary Button

Use for main booking actions.

Examples:

- Book Appointment
- Book Balayage
- Book Your Look

Visual direction:

- Warm terracotta or dusty rose background
- Rounded pill shape
- Clear label
- Optional arrow
- Match the mockup button weight and color

### Secondary Button

Use for lower-priority actions.

Examples:

- View Services
- Meet the Stylist
- Explore the Menu

Visual direction:

- Light background
- Subtle border
- Dark text

## Cards

Cards should match the approved references.

Use cards for:

- Featured service detail
- Testimonial snippet
- Service highlight
- Booking preview

Card style:

- Rounded corners
- Warm off-white or white surface
- Soft shadow
- Plenty of padding
- Minimal borders

Avoid using too many cards above the fold.

## Icon Style

Icons should feel refined and light.

Recommended:

- Line icons
- Rounded strokes
- Minimal details
- Consistent sizing

The icons must be recognizable at mobile size.

## Mobile Tap Area

The circular service icons are interactive.

Required:

- Minimum tap target: 44px by 44px.
- Keep icons spaced far enough apart to avoid fat-finger errors.
- Do not make decorative dots the only interactive elements.
- Labels must not overlap with icons.

## Photography Direction

Photography is central to the concept.

Use:

- High-quality stylist portraits
- Warm salon lighting
- Clean background
- Editorial but approachable posing
- Consistent color grading

Avoid:

- Random stock-photo lighting
- Overly busy backgrounds
- Low-resolution images
- Inconsistent crops

The model in the approved references is a placeholder. Future real owner/employee photos must preserve the same visual role:

- Desktop: full-body or three-quarter guide figure.
- Mobile: upper-torso guide figure at the bottom.
- Pose: pointing toward selected service.
- Mood: friendly, confident, polished.

## Image Performance Rules

The design depends on beautiful photography, but performance cannot suffer.

Required:

- Use optimized image assets.
- Prefer modern formats such as WebP or AVIF when possible.
- Provide fallback formats if needed.
- Use responsive image sizes.
- Lazy-load below-the-fold images.
- Preload only the critical hero image when appropriate.
- Compress stylist pose images without visible quality loss.
- Avoid loading every high-resolution pose image up front if not necessary.

Slow visuals hurt SEO, user retention, and conversion.

## Responsive Breakpoints

Suggested breakpoints:

- Mobile: up to 767px
- Tablet: 768px to 1023px
- Desktop: 1024px and up
- Large desktop: 1280px and up

Breakpoints may be adjusted during implementation if the design needs it, but the final layout must still visually match the approved references.

## Design Rule

Every visual choice must support the funnel:

**Service → Explanation → Trust → Booking**

The final visual result should look like the approved desktop and mobile mockups, with only the model/stylist image expected to change later.
