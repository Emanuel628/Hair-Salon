# Admin Content Management

## Purpose

This document defines the planned owner/admin flow for editing the salon website content.

The public salon website should remain polished, premium, and tightly controlled. The admin area exists so the owner can update site content without touching code.

## Footer Admin Link

Add a small admin link in the public site footer.

Recommended label:

**Admin**

Recommended route:

```txt
/admin/sign-in
```

Footer behavior:

- The link should be subtle, not part of the main customer booking funnel.
- It should not distract normal visitors.
- It should be accessible and keyboard focusable.
- It should lead to the admin sign-in page.

## Admin Auth Flow

The admin flow should include:

```txt
Footer Admin Link → Sign In Page → Admin Home Screen
```

The sign-in page should also include a register link:

```txt
Sign In Page → Register Page
```

Recommended routes:

```txt
/admin/sign-in
/admin/register
/admin/home
```

## Sign In Page

The sign-in page should include:

- Email field
- Password field
- Sign In button
- Register link
- Optional forgot password link later

The page should match the premium Studio Sol visual style, but it should be simpler and more functional than the public landing page.

## Register Page

The register page should include:

- Owner name
- Email
- Password
- Confirm password
- Salon/business name
- Register button
- Link back to sign in

Registration should be protected before real production use.

For V1 planning, the register page can exist as a route, but real account creation should not be treated casually.

## Admin Home Screen

After sign-in, the owner should land on an admin Home Screen.

The Home Screen should let the owner manage the entire public website content.

The owner should be able to edit:

- Salon name
- Logo/brand text
- Hero eyebrow text
- Hero headline
- Hero paragraph
- Primary CTA text
- Secondary CTA text
- Service categories
- Service names
- Service descriptions
- Booking button labels
- Booking URLs
- Featured service content
- Testimonials
- Footer content
- Business hours
- Location/contact details
- Social links
- Policy text

The owner should also be able to upload and manage images:

- Stylist/owner photos
- Service photos
- Gallery photos
- Before/after photos if added later
- Image captions
- Alt text for accessibility

## Image Upload Requirements

Image uploads should support:

- Caption field
- Alt text field
- Image category/type
- Preview before saving
- Replace image
- Delete image
- Optimized output formats where possible

Images should be optimized before display.

Required:

- Use WebP or AVIF where possible.
- Keep responsive image sizes.
- Avoid loading large uncompressed images on the public site.
- Preserve the premium look of the approved mockups.

## Content Editing Principles

The admin should make content editing clear and structured.

Do not build a messy free-form editor where the owner can accidentally break the design.

Recommended approach:

- Use structured forms.
- Each public website section gets its own edit panel.
- Save changes intentionally.
- Show preview where useful.
- Keep design/layout locked.
- Only content, images, captions, and links should be editable.

## No Vibe-Code Style Rule

Do not build this admin area in a loose, random, vibe-code style.

Required:

- Clear data model
- Clear routes
- Clear component structure
- Predictable form state
- Reusable input components
- Validation for required fields
- Accessible labels and controls
- Consistent styling with the public site
- No random one-off UI patterns
- No hard-coded content buried inside components once admin editing exists

The owner should be editing structured website content, not fighting the interface.

## Suggested Admin Sections

Recommended admin Home Screen sections:

1. **Site Identity**
   - Salon name
   - Logo text or logo upload
   - Brand tagline

2. **Homepage Hero**
   - Eyebrow text
   - Headline
   - Supporting paragraph
   - CTA text and links

3. **Service Categories**
   - Hair
   - Nails
   - Massage
   - Brows
   - Lashes
   - Bridal

4. **Services**
   - Service name
   - Description
   - Booking label
   - Booking URL
   - Icon key
   - Arc position
   - Active/default service

5. **Photos**
   - Stylist photos
   - Service images
   - Captions
   - Alt text

6. **Testimonials**
   - Client name
   - Quote
   - Rating if used

7. **Business Info**
   - Hours
   - Address
   - Phone
   - Email
   - Social links

8. **Footer**
   - Footer copy
   - Policy links
   - Admin link visibility

## Public Site Relationship

The public site should read from structured content.

The admin should update that structured content.

The public design should remain locked to the approved desktop and mobile references:

- **Desktop:** `image.png`
- **Mobile:** `image_2.png`

Admin editing should not allow layout changes that break the approved public design.

## MVP Placement

The public landing page is the first priority.

The admin flow is a planned next layer.

Acceptable MVP approach:

- Include the footer Admin link route placeholder.
- Document the sign-in/register/admin home flow.
- Keep actual full admin functionality for the next phase unless specifically prioritized.

## Future Security Notes

Before real production use, admin must include:

- Secure authentication
- Password hashing
- Protected admin routes
- Session handling
- Role checks if multiple users are allowed later
- Upload validation
- File type restrictions
- File size limits
- Basic audit trail for content edits

## Final Rule

The admin area should help the owner safely edit the site content without damaging the design.

The public website should remain premium and consistent. The admin should be structured, practical, and clean.
