# GitHub Copilot Instructions - Portfolio

## Project Overview
Next.js 16 personal portfolio with App Router, React 19, TypeScript, Tailwind CSS v4, and Material UI (MUI). Supports dark/light themes.

## Architecture

### Directory Structure
- **`app/`** - Next.js App Router pages and components
- **`app/components/`** - All React components (Navigation, Footer, sections)
- **`app/projects/[slug]/`** - Dynamic project detail pages
- **`lib/`** - Data layer (types, configs, content)

### Theming System (Dual Provider Pattern)
The app uses two theme providers wrapped in `layout.tsx`:
1. **`ThemeProvider`** (`next-themes`) - Controls dark/light class on `<html>`
2. **`MuiProvider`** - Syncs MUI components with the current theme using `lightTheme`/`darkTheme` from `lib/theme.ts`

CSS custom properties are defined in `globals.css` with `.dark` class overrides.

### Data Layer Pattern
Content is managed through typed TypeScript files in `lib/`:
```typescript
// lib/types.ts - Type definitions for all data models
// lib/site.config.ts - Site metadata, contact info, social links
// lib/projects.ts - Project data with getFeaturedProjects(), getProjectBySlug()
// lib/skills.ts - Skills with category filtering (skillsByCategory)
// lib/experiences.ts - Work/education with type filtering
```

## Conventions

### Component Patterns
- Use `'use client'` directive for all components with interactivity, hooks, or MUI
- Import components from `@/app/components/`
- Import data/types from `@/lib/`
- Use MUI components (`Box`, `Container`, `Card`, `Typography`, `Button`, `Grid`) for layout and styling
- Use `framer-motion` for animations

### Styling
- Primary approach: **MUI `sx` prop** for all styling
- Theme colors: Use MUI palette (`text.primary`, `primary.main`, `background.paper`)
- Use MUI elevation for shadows (`elevation={2}`)
- Responsive styles: `{ xs: value, md: value, lg: value }`

### Adding New Content
- **Projects**: Add to `projects` array in `lib/projects.ts`, use unique `slug`
- **Skills**: Add to `skills` array in `lib/skills.ts` with proper `category`
- **Experiences**: Add to `experiences` array in `lib/experiences.ts` with `type`

## Development Commands
```bash
npm run dev     # Start dev server at localhost:3000
npm run build   # Production build
npm run lint    # ESLint check
```

## Key Dependencies
- `next-themes` - Theme switching (attribute="class")
- `framer-motion` - Animations
- `@mui/material` + `@emotion/*` - Material UI components
- `@mui/icons-material` - Material icons
