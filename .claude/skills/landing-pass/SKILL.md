# Landing Pass — xolto-landing

Use this skill to review and polish the landing page for visual consistency, conversion clarity, and brand alignment.

## Review checklist

### Brand consistency
- Colors match the theme: primary green (#0f8f67), bright accent (#17c88e), dark canvas (#080f0c)
- Fonts use next/font: Sora for body, Outfit for headings — no @import or <link> font loading
- LogoMark component used for all logo instances
- Dark theme throughout — no accidental light backgrounds

### CTA clarity
- Hero CTAs are prominent and above the fold
- "Start a buy mission" links to register, "Sign in" links to login
- Pricing tier CTAs clearly differentiate Free vs Pro vs Power
- All CTA links use `NEXT_PUBLIC_APP_URL` — never hardcoded

### Copy quality
- Concise and wedge-focused: "buy used electronics without overpaying"
- Mission-first language (missions, not "searches" or "alerts")
- Marketplace names accurate: Marktplaats, Vinted, OLX
- Pricing: Free (€0), Pro (€9/mo), Power (€29/mo)
- No jargon or technical language in user-facing copy

### Layout & responsiveness
- No horizontal overflow on mobile (375px width)
- Hero deal card preview renders cleanly on small screens
- Feature cards stack vertically on mobile
- Pricing cards are readable and tappable on mobile
- Navigation collapses appropriately

### Performance & SEO
- Images optimized (next/image where applicable)
- Open Graph and Twitter card images generate correctly
- robots.ts and sitemap.ts are accurate
- No unnecessary client-side JavaScript

## After review

1. List issues found with file and line references
2. Fix each issue
3. Run `npm run build` to verify
4. Confirm no visual regressions at mobile and desktop widths
