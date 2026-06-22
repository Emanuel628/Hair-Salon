# Service Data Model

## Purpose

This document defines how salon categories and services should be represented in the frontend.

The interactive semi-circle depends on clean, predictable service data.

V1 can use local static data. A backend is not required yet.

## Core Types

Recommended TypeScript types:

```ts
export type ServiceCategory = {
  id: string;
  label: string;
  description?: string;
  defaultServiceId: string;
  services: SalonService[];
};

export type SalonService = {
  id: string;
  categoryId: string;
  label: string;
  shortDescription: string;
  longDescription?: string;
  bookingLabel: string;
  bookingUrl?: string;
  iconKey: ServiceIconKey;
  poseKey: StylistPoseKey;
  arcPosition: ArcPosition;
  image?: ServiceImage;
  priceLabel?: string;
  durationLabel?: string;
  isAvailable: boolean;
};

export type ArcPosition = {
  angle: number;
  xPercent?: number;
  yPercent?: number;
};

export type ServiceImage = {
  src: string;
  alt: string;
};
```

## Why Arc Position Matters

Each service needs a stable visual position so the icon, arc dot, label, and stylist pointing direction can stay aligned.

Do not rely on random CSS placement.

The data model should support predictable positioning through either:

- angle-based placement, or
- percentage-based x/y coordinates inside a relative container

Recommended:

- Use `angle` as the source of truth.
- Calculate x/y position from the angle in the component.
- Keep the arc container responsive so node positions scale correctly.

This makes the pointing interaction more accurate across screen sizes and resolutions.

## Category Example

```ts
export const salonCategories: ServiceCategory[] = [
  {
    id: 'hair',
    label: 'Hair',
    defaultServiceId: 'balayage',
    services: [
      {
        id: 'cut',
        categoryId: 'hair',
        label: 'Cut',
        shortDescription: 'A tailored cut shaped around your face, texture, and everyday routine.',
        bookingLabel: 'Book a Haircut',
        bookingUrl: '#book-cut',
        iconKey: 'scissors',
        poseKey: 'point-up-left',
        arcPosition: { angle: 150 },
        isAvailable: true
      },
      {
        id: 'balayage',
        categoryId: 'hair',
        label: 'Balayage',
        shortDescription: 'Soft, dimensional color for a bright, natural finish that grows out beautifully.',
        bookingLabel: 'Book Balayage',
        bookingUrl: '#book-balayage',
        iconKey: 'sparkle',
        poseKey: 'point-up',
        arcPosition: { angle: 90 },
        isAvailable: true
      }
    ]
  }
];
```

## Recommended Hair Services

Initial Hair category:

- Cut
- Color
- Balayage
- Blowout
- Extensions
- Bridal Hair
- Treatments

## Possible Future Categories

### Nails

- Manicure
- Pedicure
- Gel Polish
- Acrylics
- Nail Art
- Nail Repair

### Brows

- Brow Shaping
- Brow Tinting
- Brow Lamination
- Waxing
- Henna Brows

### Lashes

- Lash Lift
- Lash Tint
- Classic Extensions
- Volume Extensions
- Lash Removal

### Massage

- Swedish Massage
- Deep Tissue
- Hot Stone
- Prenatal
- Sports Massage

### Bridal

- Bridal Hair
- Bridal Makeup
- Bridal Trial
- Bridal Party Styling
- Touch-Up Package

## Icon Keys

Recommended icon keys:

```ts
export type ServiceIconKey =
  | 'scissors'
  | 'brush'
  | 'sparkle'
  | 'dryer'
  | 'waves'
  | 'ring'
  | 'droplet'
  | 'hand'
  | 'eye'
  | 'flower';
```

## Pose Keys

Recommended pose keys:

```ts
export type StylistPoseKey =
  | 'neutral'
  | 'point-up-left'
  | 'point-up'
  | 'point-up-right'
  | 'point-left'
  | 'point-right'
  | 'point-down-left'
  | 'point-down-right';
```

V1 does not need a unique photo for every service. A smaller set of poses can be reused based on service position.

## Booking Data

Each service should support a service-specific booking URL.

Examples:

- `#book-balayage`
- External Square Appointments URL
- External GlossGenius URL
- External Fresha URL
- External Vagaro URL

V1 should treat booking as a link, not a custom scheduler.

## Optional Price and Duration

Do not require prices in V1, but support placeholders.

Examples:

```ts
priceLabel: 'Starting at $180'
durationLabel: '2.5 hours'
```

## Active Service Rules

When a category changes:

- Use that category's `defaultServiceId`.
- Update the arc nodes.
- Update the service detail card.
- Update the booking CTA.
- Update the stylist pose.

When a service changes:

- Keep the same category.
- Update active styling.
- Update detail card.
- Update pose.
- Update booking CTA.

## Data Rule

Service data must power the interface. Do not hard-code service names and descriptions directly inside UI components.
