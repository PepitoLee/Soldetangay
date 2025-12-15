# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sol de Tangay is a luxury real estate web application for a development project in Nuevo Chimbote, Peru. It showcases properties through an interactive 3D master plan and features an AI-powered "Dream House Generator" using Google's Gemini and Veo models.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build
npm run preview   # Preview production build
```

## Environment Setup

Create `.env.local` with:
```
GEMINI_API_KEY=your_api_key_here
```

## Architecture

### Directory Structure
- **Root level**: Entry points (`App.tsx`, `index.tsx`, `types.ts`) and config files
- **`components/`**: Reusable UI components
- **`components/MasterPlan3D/`**: React Three Fiber 3D visualization system
- **`pages/`**: Route views (Home, About, Location, Benefits, Legal, Architecture, Contact)
- **`services/`**: External API integrations
- **`public/`**: Static assets

### Key Architectural Patterns

**Routing**: Uses `HashRouter` from react-router-dom with Spanish URL paths defined in `types.ts` `PageRoute` enum.

**AI Services** (`services/geminiService.ts`):
- `askAboutLocation()`: Gemini 2.5 Flash with Google Maps grounding for location queries
- `generateVeoVideo()`: Veo 3.1 for architectural visualization videos with branded prompts

**3D Visualization** (`components/MasterPlan3D/`):
- Built with React Three Fiber and @react-three/drei
- `InteractiveMap.tsx`: Main 3D scene with lot selection, amenities, animated elements
- `constants.ts`: Lot data and amenity configurations
- `types.ts`: TypeScript interfaces for `LotData`, `AmenityData`

**Layout**: Single `Layout.tsx` component with:
- Full-screen animated navigation overlay (Framer Motion)
- WhatsApp integration for lead generation
- Responsive header with scroll-aware behavior

### Tech Stack
- React 19 + TypeScript 5.8
- Vite 6 (dev server port 3000)
- Framer Motion (animations)
- Three.js via @react-three/fiber and @react-three/drei
- Tailwind CSS (utility classes)
- Lucide React (icons)
- Google GenAI SDK (@google/genai)

### Path Alias
`@/` resolves to project root (configured in vite.config.ts)
