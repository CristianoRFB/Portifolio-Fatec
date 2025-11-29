'use client';

import { motion } from 'framer-motion';
import { Typography, Button, Chip, Box, Container } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        pt: 8,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem', lg: '4rem' },
                fontWeight: 800,
                color: 'text.primary',
                mb: 4,
                lineHeight: 1.1,
              }}
            >
              Olá, me chamo <br />
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #f87171 50%, #b91c1c 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Cristiano Ronaldo Ferreira Bueno
                </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 600,
                color: 'text.primary',
                mb: 3,
              }}
            >
              Futuro Desenvolvedor Full-Stack
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                fontWeight: 400,
                color: 'text.secondary',
                mb: 4,
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Atual estudante futuro profissional
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: 'text.secondary',
                mb: 8,
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              Cursando Análise e Desenvolvimento de Sistemas - AMS na Fatec Jales
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={scrollToProjects}
                variant="contained"
                size="large"
                startIcon={<RocketLaunchIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)',
                    transform: 'scale(1.05)',
                  },
                  '& .MuiSvgIcon-root': {
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover .MuiSvgIcon-root': {
                    transform: 'rotate(12deg)',
                  },
                }}
              >
                Explorar Projetos
              </Button>

              <Button
                component="a"
                href="#contact"
                variant="outlined"
                size="large"
                startIcon={<EmailIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                  '& .MuiSvgIcon-root': {
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover .MuiSvgIcon-root': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                Entrar em Contato
              </Button>
            </Box>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button
              onClick={scrollToProjects}
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                Saiba mais
              </Typography>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <KeyboardArrowDownIcon sx={{ fontSize: '2rem' }} />
              </motion.div>
            </Button>
          </motion.div>
        </Box>
      </Container>

      {/* Enhanced Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: 500,
            height: 500,
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(168, 85, 247, 0.08) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '25%',
            right: '25%',
            width: 600,
            height: 600,
            background: 'linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(239, 68, 68, 0.12) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'pulse 3s ease-in-out infinite 1s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 800,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(168, 85, 247, 0.03) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
      </Box>
    </Box>
  );
}
