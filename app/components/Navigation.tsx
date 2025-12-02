'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Box,
  Container,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering a minimal placeholder on first render
  // Client-only interactive parts will mount after hydration when `mounted` becomes true.
  if (!mounted) {
    // Use a plain HTML element to reserve header space on the server
    // (avoids emotion/MUI style differences between server and client)
    return <div style={{ minHeight: '64px' }} aria-hidden />;
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#projects', label: 'Projetos pela Fatec' },
    { href: '/#personal-projects', label: 'Projetos Pessoais' },
    { href: '/about', label: 'Sobre' },
    { href: '/#contact', label: 'Contato' },
  ];

  const isActive = (href: string) => {
    // Não destacar nenhum link como ativo na navegação
    return false;
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsMobileMenuOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 56, sm: 64 },
              display: 'flex',
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                  }}
                >
                  7
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.25 }}>
                  <Box
                    component="span"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'text.primary',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Cristiano.dev
                  </Box>
                </Box>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    px: 2,
                    py: 1,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isActive(link.href) ? 'primary.main' : 'text.primary',
                    textTransform: 'none',
                    borderRadius: 2,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {/* Theme Toggle */}
              {mounted && (
                <IconButton
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  size="small"
                  sx={{
                    ml: 1,
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                    },
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <LightModeIcon sx={{ fontSize: '1.25rem' }} />
                  ) : (
                    <DarkModeIcon sx={{ fontSize: '1.25rem' }} />
                  )}
                </IconButton>
              )}
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              {mounted && (
                <IconButton
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                    },
                  }}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <LightModeIcon sx={{ fontSize: '1.25rem' }} />
                  ) : (
                    <DarkModeIcon sx={{ fontSize: '1.25rem' }} />
                  )}
                </IconButton>
              )}
              <IconButton
                onClick={toggleDrawer(true)}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
                aria-label="Toggle menu"
              >
                <MenuIcon sx={{ fontSize: '1.5rem' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton
              onClick={toggleDrawer(false)}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    color: isActive(link.href) ? 'primary.main' : 'text.primary',
                    backgroundColor: isActive(link.href) ? 'action.selected' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(link.href) ? 600 : 500,
                      fontSize: '0.875rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Spacer to prevent content from going under AppBar */}
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} />
    </>
  );
}
