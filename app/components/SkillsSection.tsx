'use client';

import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { SkillBadge } from './SkillBadge';
import { skillsByCategory } from '@/lib/skills';
import { Box, Container, Card, CardContent, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import CloudIcon from '@mui/icons-material/Cloud';

export function SkillsSection() {
  const categories = [
    {
      title: 'Tecnologias Principais',
      skills: skillsByCategory.primary,
      icon: <CodeIcon sx={{ fontSize: '1.75rem' }} />,
      color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      category: 'primary',
    },
    {
      title: 'Frontend',
      skills: skillsByCategory.frontend,
      icon: <WebIcon sx={{ fontSize: '1.75rem' }} />,
      color: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      category: 'frontend',
    },
    {
      title: 'Backend & Ferramentas',
      skills: skillsByCategory.backend,
      icon: <CloudIcon sx={{ fontSize: '1.75rem' }} />,
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      category: 'backend',
    },
  ];

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.02) 0%, rgba(37, 99, 235, 0.05) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          title="Habilidades & Tecnologias"
          subtitle="Experiência em diversas linguagens, frameworks e arquiteturas modernas"
        />

        <Box sx={{ display: 'grid', gap: 4, maxWidth: '1200px', mx: 'auto' }}>
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                elevation={2}
                sx={{
                  borderRadius: 4,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: category.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease',
                        boxShadow: 3,
                        '.MuiCard-root:hover &': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {category.skills.map((skill) => (
                      <SkillBadge
                        key={skill.name}
                        name={skill.name}
                        years={skill.years}
                        variant="primary"
                        category={category.category}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
