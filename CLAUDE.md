# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TAWF is a Web3 platform built with Next.js 16 that bridges the Ummah to Web3 with Sharia-first zk dapps. The project features a sophisticated 3D particle system using React Three Fiber and Tailwind CSS for styling.

## Development Commands

- `npm run dev` - Start development server (Next.js)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (configured to ignore build errors)

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4.1.9 with custom animations
- **UI Components**: Radix UI primitives with custom implementations
- **3D Graphics**: React Three Fiber, Three.js with custom particle system
- **Fonts**: Inter, Space Grotesk, JetBrains Mono
- **Theme**: Dark mode by default

### Project Structure

```
app/                    # Next.js app router pages
├── layout.tsx         # Root layout with font configuration
├── page.tsx          # Main homepage with sections
├── globals.css       # Global styles and Tailwind imports
└── [pages]/          # Route pages (team, portal, dashboard)

components/
├── gl/               # 3D graphics components
│   ├── index.tsx     # Main GL component with Leva controls
│   ├── particles.tsx # Particle system implementation
│   └── shaders/      # Custom GLSL shaders
├── ui/               # Reusable UI components (buttons, cards, etc.)
├── sections/         # Page sections (about, ecosystem, etc.)
└── [components].tsx  # Header, hero, logo, etc.

lib/
└── utils.ts          # Utility functions (cn for class merging)
```

### Key Features

1. **3D Particle System**: Custom WebGL particle system with:
   - Noise-based movement patterns
   - Interactive controls via Leva
   - Custom shaders for rendering effects
   - Performance monitoring with r3f-perf

2. **Component Architecture**:
   - Uses Radix UI for accessible primitives
   - Custom UI components with variant support
   - Consistent dark theme throughout
   - Responsive design patterns

3. **Development Configuration**:
   - TypeScript with strict mode
   - ESLint configured to ignore build errors for rapid development
   - Path aliases configured (`@/*` maps to root)
   - Image optimization disabled for unoptimized builds

## Development Notes

- The project uses Next.js 15 with App Router
- 3D components are client-side only ("use client")
- GL components include Leva controls for real-time parameter adjustment
- The build process ignores TypeScript and ESLint errors for faster development
- All pages use a dark theme with consistent styling patterns