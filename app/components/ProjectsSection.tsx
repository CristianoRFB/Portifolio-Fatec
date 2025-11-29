'use client';

import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';
import { SectionTitle } from './SectionTitle';
import { ProjectCard } from './ProjectCard';
import { getFeaturedProjects } from '@/lib/projects';

export function ProjectsSection() {
  const projects = getFeaturedProjects();

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.02) 0%, rgba(37, 99, 235, 0.05) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          title="Projetos em Destaque"
          subtitle="Seleção dos meus melhores trabalhos e projetos desenvolvidos"
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'repeat(2, 1fr)',
            },
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
