'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Geist } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

// Base theme options shared between light and dark modes
const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: geistSans.style.fontFamily,
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8, // Material Design 8px grid
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
              boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.25)',
              '&:hover': {
                boxShadow: '0 6px 20px 0 rgba(239, 68, 68, 0.35)',
              },
            },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0',
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#ef4444', // Red 500
      light: '#f87171', // Red 400
      dark: '#b91c1c', // Red 700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b', // Slate 500
      light: '#94a3b8', // Slate 400
      dark: '#475569', // Slate 600
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa', // Neutral 50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#475569', // Slate 600
    },
    divider: '#e2e8f0', // Slate 200
    success: {
      main: '#10b981', // Green 500
    },
    warning: {
      main: '#f59e0b', // Amber 500
    },
    error: {
      main: '#ef4444', // Red 500
    },
    info: {
      main: '#06b6d4', // Cyan 500
    },
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    '0 4px 8px 0 rgba(0, 0, 0, 0.08)',
    '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
    '0 12px 24px 0 rgba(0, 0, 0, 0.12)',
    '0 16px 32px 0 rgba(0, 0, 0, 0.14)',
    '0 20px 40px 0 rgba(0, 0, 0, 0.16)',
    '0 24px 48px 0 rgba(0, 0, 0, 0.18)',
    '0 28px 56px 0 rgba(0, 0, 0, 0.2)',
    '0 32px 64px 0 rgba(0, 0, 0, 0.22)',
    '0 36px 72px 0 rgba(0, 0, 0, 0.24)',
    '0 40px 80px 0 rgba(0, 0, 0, 0.26)',
    '0 44px 88px 0 rgba(0, 0, 0, 0.28)',
    '0 48px 96px 0 rgba(0, 0, 0, 0.3)',
    '0 52px 104px 0 rgba(0, 0, 0, 0.32)',
    '0 56px 112px 0 rgba(0, 0, 0, 0.34)',
    '0 60px 120px 0 rgba(0, 0, 0, 0.36)',
    '0 64px 128px 0 rgba(0, 0, 0, 0.38)',
    '0 68px 136px 0 rgba(0, 0, 0, 0.4)',
  ],
});

// Dark theme
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#f87171', // Red 400 (dark theme primary)
      light: '#fecaca',
      dark: '#ef4444',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#94a3b8', // Slate 400
      light: '#cbd5e1', // Slate 300
      dark: '#64748b', // Slate 500
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a', // Near black
      paper: '#1a1a1a', // Dark gray
    },
    text: {
      primary: '#f8fafc', // Slate 50
      secondary: '#cbd5e1', // Slate 300
    },
    divider: '#334155', // Slate 700
    success: {
      main: '#34d399', // Green 400
    },
    warning: {
      main: '#fbbf24', // Amber 400
    },
    error: {
      main: '#f87171', // Red 400
    },
    info: {
      main: '#22d3ee', // Cyan 400
    },
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    '0 25px 50px -12px rgb(0 0 0 / 0.5)',
    '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    '0 4px 8px 0 rgba(0, 0, 0, 0.35)',
    '0 8px 16px 0 rgba(0, 0, 0, 0.4)',
    '0 12px 24px 0 rgba(0, 0, 0, 0.45)',
    '0 16px 32px 0 rgba(0, 0, 0, 0.5)',
    '0 20px 40px 0 rgba(0, 0, 0, 0.55)',
    '0 24px 48px 0 rgba(0, 0, 0, 0.6)',
    '0 28px 56px 0 rgba(0, 0, 0, 0.65)',
    '0 32px 64px 0 rgba(0, 0, 0, 0.7)',
    '0 36px 72px 0 rgba(0, 0, 0, 0.75)',
    '0 40px 80px 0 rgba(0, 0, 0, 0.8)',
    '0 44px 88px 0 rgba(0, 0, 0, 0.85)',
    '0 48px 96px 0 rgba(0, 0, 0, 0.9)',
    '0 52px 104px 0 rgba(0, 0, 0, 0.95)',
    '0 56px 112px 0 rgba(0, 0, 0, 1)',
    '0 60px 120px 0 rgba(0, 0, 0, 1)',
    '0 64px 128px 0 rgba(0, 0, 0, 1)',
    '0 68px 136px 0 rgba(0, 0, 0, 1)',
  ],
});
