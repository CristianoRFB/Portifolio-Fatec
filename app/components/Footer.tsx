'use client';

import { Box, Container, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteConfig } from '@/lib/site.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteConfig.github,
      icon: GitHubIcon,
      label: 'GitHub Profile',
    },
    {
      name: 'LinkedIn',
      href: siteConfig.linkedin,
      icon: LinkedInIcon,
      label: 'LinkedIn Profile',
    },
    {
      name: 'Email',
      href: `mailto:${siteConfig.email}`,
      icon: EmailIcon,
      label: 'Send Email',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/${siteConfig.whatsapp}`,
      icon: WhatsAppIcon,
      label: 'WhatsApp Contact',
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 6,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <IconButton
                  key={link.name}
                  component="a"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  sx={{
                    backgroundColor: 'action.hover',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              );
            })}
          </Box>

          {/* Copyright */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              © {currentYear} {siteConfig.author}. Todos os direitos reservados.
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Construído com Next.js, TypeScript e Material UI
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
