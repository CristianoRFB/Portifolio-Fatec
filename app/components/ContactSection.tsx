'use client';

import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { siteConfig } from '@/lib/site.config';
import { Box, Container, Card, CardContent, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export function ContactSection() {
  const contactMethods = [
    {
      icon: EmailIcon,
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: siteConfig.phone,
      href: `https://wa.me/${siteConfig.whatsapp}`,
    },
    {
      icon: GitHubIcon,
      label: 'GitHub',
      value: '@CristianoRFB',
      href: siteConfig.github,
    },
    {
      icon: LinkedInIcon,
      label: 'LinkedIn',
      value: 'Cristiano Ronaldo Ferreira Bueno',
      href: siteConfig.linkedin,
    },
    {
      icon: PictureAsPdfIcon,
      label: 'Currículo (PT)',
      value: 'Baixar CV (PT-BR)',
      href: '/cv/cristianorfb-cv-pt.pdf',
    },
    {
      icon: PictureAsPdfIcon,
      label: 'Currículo (EN)',
      value: 'Download CV (EN)',
      href: '/cv/cristianorfb-cv-en.pdf',
    },
  ];

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.02) 0%, rgba(239, 68, 68, 0.08) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          title="Entre em Contato"
          subtitle="Fale comigo por qualquer uma das opções abaixo"
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 4,
            maxWidth: '1400px',
            mx: 'auto',
          }}
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  component="a"
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  elevation={2}
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    height: '100%',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: 8,
                    },
                  }}
                >
                  {/* Content */}
                  <CardContent
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 3,
                      p: 4,
                    }}
                  >
                    <Box
                      className="icon-box"
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        backgroundColor: 'action.hover',
                        boxShadow: 3,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: '3rem',
                          color: 'primary.main',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        {method.label}
                      </Typography>
                      <Typography
                        className="value-text"
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 500,
                          wordBreak: 'break-all',
                        }}
                      >
                        {method.value}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card
            elevation={2}
            sx={{
              maxWidth: '900px',
              mx: 'auto',
              mt: 8,
              borderRadius: 4,
              textAlign: 'center',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: 700, color: 'primary.main' }}
                >
                  Estou disponível
                </Box>{' '}
                para conversar sobre projetos, colaborar em ideias ou avaliar oportunidades.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Sinta-se à vontade para me contatar por qualquer um dos canais acima.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}
