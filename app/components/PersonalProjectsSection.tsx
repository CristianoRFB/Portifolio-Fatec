'use client';

import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';
import { SectionTitle } from './SectionTitle';
import { ProjectCard } from './ProjectCard';
import { getPersonalProjects } from '@/lib/projects';

export function PersonalProjectsSection() {
  const projects = getPersonalProjects();

  return (
    <Box
      component="section"
      id="personal-projects"
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.02) 0%, rgba(239, 68, 68, 0.05) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          title="Projetos Pessoais"
          subtitle="Alguns projetos pessoais hospedados no meu GitHub"
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
          {projects.map((project: any, index: number) => (
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
