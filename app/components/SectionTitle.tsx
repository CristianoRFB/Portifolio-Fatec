'use client';

import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <Box
      sx={{
        mb: 8,
        textAlign: align,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
          fontWeight: 800,
          color: 'text.primary',
          mb: 2,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontWeight: 400,
            color: 'text.secondary',
            maxWidth: align === 'center' ? '600px' : 'none',
            mx: align === 'center' ? 'auto' : 0,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
