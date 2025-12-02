"use client";

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '@/lib/theme';

export function MuiProvider({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Determine the current theme (client-side only after hydration)
  const currentTheme = mounted ? (resolvedTheme || 'light') : 'light';
  const muiTheme = currentTheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering light theme during SSR
  if (!mounted) {
    return (
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
