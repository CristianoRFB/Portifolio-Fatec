 'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { SectionTitle } from '../components/SectionTitle';
import { workExperiences, educationExperiences } from '@/lib/experiences';

export default function AboutPage() {
  const techTimeline = [
    { tech: 'C# .NET', years: '3 anos', description: 'Desktop e Web com ASP.NET' },
    { tech: 'HTML, CSS, JavaScript', years: '4 anos', description: 'Desenvolvimento web completo' },
    { tech: 'Estrutura de Dados & Algoritmos', years: '4 anos', description: 'Base sólida em CS' },
    { tech: 'React', years: '2 anos', description: 'Aplicações web modernas' },
    { tech: 'Angular', years: '1 ano', description: 'Framework enterprise' },
    { tech: 'Java', years: '1 ano', description: 'Backend com Spring Boot' },
    { tech: 'PHP', years: '2 anos', description: 'Desenvolvimento web tradicional' },
    { tech: 'Azure DevOps', years: 'Desde 2024', description: 'DevOps' },
    { tech: 'Git & GitHub', years: 'Desde 2024', description: 'O essencial versionamento de código' },
  ];

  const stats = [
    { value: '10+', label: 'Tecnologias Dominadas' },
    { value: '4', label: 'Anos de bagagem' },
    { value: '2026', label: 'Conclusão Fatec' },
  ];

  // Conta os dias restantes até 17 de dezembro de 2026
  const calculateDaysLeft = () => {
    const target = new Date(2026, 11, 17, 0, 0, 0, 0); // mês 11 = dezembro
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    return days;
  };

  const [daysLeft, setDaysLeft] = useState<number>(calculateDaysLeft());

  useEffect(() => {
    const id = setInterval(() => {
      setDaysLeft(calculateDaysLeft());
    }, 1000 * 60 * 60); // atualiza a cada hora
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, md: 12 },
        pb: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 10 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 800,
                color: 'text.primary',
                mb: 4,
                letterSpacing: '-0.02em',
              }}
            >
              Quem eu sou?
            </Typography>
            
            <Box sx={{ maxWidth: '800px' }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                }}
              >
                Meu nome é{' '}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
                  Cristiano Ronaldo Ferreira Bueno
                </Box>
                , sou um futuro desenvolvedor Full-Stack, ando dedicado a projetar e implementar soluções digitais que resolvem problemas que enfrento de forma cotidiana e outros problemas que considero importantes.
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  mb: 2,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                Atualmente estou cursando{' '}
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Análise e Desenvolvimento de Sistemas na Fatec Jales
                </Box>
                , com término previsto para 2026, e acumulo cerca de 4 anos de experiência teórica e diversas experiências em empresas, mentorias, e palestras, a maioria voltada para o desenvolvimento técnológico.
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                Tudo começou pelo curso técnico em Análise e Desenvolvimento de Sistemas - AMS na ETEC de Jales,
                onde consolidei os principais fundamentos em programação e estruturas de dados. Desde então, tenho
                expandido minhas capacidades em várias tecnologias.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box sx={{ mb: 10 }}>
            <SectionTitle title="Minha Experiência Profissional" align="left" />
            
            <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
              {/* Timeline line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 11, md: 15 },
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: 'primary.main',
                  opacity: 0.3,
                }}
              />
              
              {workExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ position: 'relative', mb: 4 }}>
                    {/* Timeline dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: { xs: -3, md: -4 },
                        top: 0,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        border: '4px solid',
                        borderColor: 'background.paper',
                        zIndex: 1,
                      }}
                    />
                    
                    <Card
                      elevation={2}
                      sx={{
                        ml: { xs: 4, md: 5 },
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 8,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              backgroundColor: 'primary.main',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {exp.type === 'freelance' ? (
                              <CodeIcon sx={{ fontSize: '1.5rem' }} />
                            ) : (
                              <WorkIcon sx={{ fontSize: '1.5rem' }} />
                            )}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
                            >
                              {exp.title}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}
                            >
                              {exp.company}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                              <CalendarTodayIcon sx={{ fontSize: '1rem' }} />
                              <Typography variant="body2">{exp.period}</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                        >
                          {exp.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ mb: 10 }}>
            <SectionTitle title="Formação Acadêmica" align="left" />
            
            <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
              {/* Timeline line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 11, md: 15 },
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: 'primary.main',
                  opacity: 0.3,
                }}
              />
              
              {educationExperiences.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box sx={{ position: 'relative', mb: 4 }}>
                    {/* Timeline dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: { xs: -3, md: -4 },
                        top: 0,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        border: '4px solid',
                        borderColor: 'background.paper',
                        zIndex: 1,
                      }}
                    />
                    
                    <Card
                      elevation={2}
                      sx={{
                        ml: { xs: 4, md: 5 },
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 8,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              backgroundColor: 'primary.main',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <SchoolIcon sx={{ fontSize: '1.5rem' }} />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
                            >
                              {edu.title}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}
                            >
                              {edu.company}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                              <CalendarTodayIcon sx={{ fontSize: '1rem' }} />
                              <Typography variant="body2">{edu.period}</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                        >
                          {edu.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Tech Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box sx={{ mb: 10 }}>
            <SectionTitle
              title="Experiência com Tecnologias"
              subtitle="Timeline detalhada do meu desenvolvimento técnico"
              align="left"
            />
            
            <Grid container spacing={3}>
              {techTimeline.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      elevation={1}
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 6,
                          transform: 'translateY(-4px)',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1rem' }}
                          >
                            {item.tech}
                          </Typography>
                          <Box
                            sx={{
                              px: 2,
                              py: 0.5,
                              borderRadius: 99,
                              backgroundColor: 'primary.main',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}
                          >
                            {item.years}
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary' }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderOpacity: 0.2,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: 'primary.main',
                      mb: 1,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontWeight: 500 }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
            {/* Counter below the stats, centered with same indentation */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {daysLeft} Dias até a conclusão da Fatec.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
