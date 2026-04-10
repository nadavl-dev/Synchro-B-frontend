# SynchroB Frontend

Modern, minimal React frontend for the SynchroB product recommendation engine.

## Project Overview

**SynchroB** helps users find the perfect open-source tools by:
1. Collecting filter preferences (category, SDK languages, integration difficulty, etc.)
2. Taking a natural language description of their needs
3. Returning AI-ranked recommendations with integration roadmaps

## Quick Start

### Option 1: Cloud IDE (Recommended - Zero Setup)

**Stackblitz (instant, no installation):**
1. Click the Stackblitz link below
2. Terminal will auto-run `npm install` and `npm run dev`
3. Preview opens automatically on port 5173

**CodeSandbox (instant, collaborative):**
1. Import this repo into CodeSandbox
2. Auto-installs dependencies
3. Dev server starts immediately

### Option 2: Local Development

**Prerequisites:**
- Node.js 18+ and npm

**Setup:**
```bash
npm install
npm run dev
```

Server runs on `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── client.ts              # Axios instance + error handling
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useFilters.ts          # Fetch /filters
│   └── useRecommend.ts        # POST /recommend
├── pages/
│   ├── LandingPage.tsx        # Hero + CTA
│   ├── SearchPage.tsx         # Filters + prompt input
│   └── ResultsPage.tsx        # Recommendations + roadmaps
├── types/
│   └── index.ts               # TypeScript interfaces
├── App.tsx                    # Router setup
├── main.tsx                   # React entry
└── index.css                  # Tailwind + base styles
```

## Pages

### Landing Page (`/`)
- Hero section: "Find the perfect open-source tool"
- Value prop cards (3 use cases)
- CTA button → `/search`

### Search/Filter Page (`/search`)
- **Left sidebar:** Filter form
  - Category dropdown
  - SDK Languages multi-select
  - Logic Archetype
  - Integration Difficulty
  - Containerized toggle
  - Advanced filters (collapsible)
  - Reset button
- **Main area:**
  - Prompt textarea
  - Buyer Context (collapsible)
  - Find Products button (calls API)

### Results Page (`/results`)
- Analysis summary
- Recommendation cards:
  - Rank badge
  - Product name + category
  - Match score % (visual bar)
  - Match reasoning
  - Recommended capabilities (green badges)
  - Integration Roadmap (collapsible):
    - Numbered steps with estimated hours
    - Required technologies
    - Quick wins
    - Risks

## API Integration

**Base URL:** `https://synchrob-api.onrender.com`

**Endpoints used:**
- `GET /filters` — populate form dropdowns
- `POST /recommend` — submit filters + prompt → ranked recommendations
- `GET /products/{id}` — (bonus) product detail page

**Error handling:**
- Network errors → retry banner
- 502 errors (LLM unavailable) → fallback message
- No products match → empty state

## Design System

**Chromatic Clarity** palette (12 colors in 3 sections):

**Primary:**
- `#ECECEC` Light Base (backgrounds)
- `#2D2D2D` Dark Base (text)
- `#C4A747` Gold Accent (CTAs)
- `#FFFFFF` Pure White (cards)

**Extended:**
- `#4A9FF5` Sky Blue (links, info)
- `#6BA87C` Sage Green (success)
- `#E67E5E` Coral Red (errors)
- `#F5E6D3` Warm Beige (subtle BG)

**Neutral Grays:**
- `#3E3E3E` Dark Gray
- `#888888` Medium Gray
- `#D9D9D9` Light Gray
- `#F5F5F5` Very Light Gray

Configured in `tailwind.config.js` as `synchro-*` utilities.

## Development

### Technologies
- **React 18** + TypeScript
- **Vite** (instant HMR)
- **Tailwind CSS** (color palette)
- **React Router** (navigation)
- **React Query** (API caching)
- **Axios** (HTTP client)

### Build
```bash
npm run build
```

Outputs to `dist/` (ready for Vercel/Netlify)

### Environment Variables
Create `.env.local`:
```
VITE_API_BASE_URL=https://synchrob-api.onrender.com
```

## Deployment

**Vercel (recommended):**
1. Push to GitHub
2. Import project in Vercel
3. Auto-deploys on push

**Netlify:**
1. Link GitHub repo
2. Build: `npm run build`
3. Publish: `dist/`

**GitHub Pages:**
```bash
npm run build
# Deploy dist/ folder
```

## Testing Checklist

- [ ] Landing page loads, CTA navigates to search
- [ ] Search page loads, filters populate from API
- [ ] Can select/deselect filters
- [ ] Submit button shows loading state
- [ ] Results page displays 5 recommendations
- [ ] Each card shows: rank, name, match score, reasoning, capabilities
- [ ] Roadmap section is collapsible + shows steps, hours, tech, risks
- [ ] Back button returns to search
- [ ] Error states display gracefully

## Notes

- **MVP scope:** Landing + Search + Results pages only
- **Bonus features:** Product detail page, Browse catalog (not required)
- **No auth:** API is public, no login required
- **Responsive:** Desktop + tablet (mobile-friendly)
- **Performance:** Filters cached, debounced form input, React Query caching

## Color Palette Reference

See `/Users/nadavlevy/.claude/skills/canvas-design/synchro-color-palette.png` for visual design reference.

See `/Users/nadavlevy/.claude/skills/canvas-design/synchro-philosophy.md` for Chromatic Clarity design philosophy.
