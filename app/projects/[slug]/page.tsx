// Note: we avoid importing `Link` here because passing function components
// down into client components (MotionDiv) can cause serialization errors.
import { notFound } from 'next/navigation';
import { MotionDiv } from '@/app/components/ClientMotion';
import { ReadmeViewer } from '@/app/components/ReadmeViewer';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getProjectBySlug, projects } from '@/lib/projects';

export default async function ProjectPage({ params }: { params?: any }) {
  // Next 16 may provide `params` as a Promise in some render paths — unwrap safely
  const resolvedParams = params ? await params : null;
  const slug = resolvedParams?.slug ? String(resolvedParams.slug) : null;
  if (!slug) {
    // Log minimal info to server console for debugging and return a proper 404
    // (avoids TypeError when params is a Promise or undefined)
    // eslint-disable-next-line no-console
    console.warn('ProjectPage: missing params.slug', { params: !!params, resolvedParams });
    notFound();
  }
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Try to fetch README and repo metadata from GitHub (server-side)
  let readmeRaw: string | null = null;
  let repoLanguage: string | null = null;
  let repoTopics: string[] = [];

  try {
    const githubUrl = new URL(project.github);
    const [, owner, repo] = githubUrl.pathname.split('/');

    if (owner && repo) {
      // fetch README (raw)
      const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: { Accept: 'application/vnd.github.v3.raw' },
        next: { revalidate: 60 * 60 },
      });
      if (readmeRes.ok) {
        readmeRaw = await readmeRes.text();
      }

      // fetch repo metadata
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 60 * 60 },
      });
      if (repoRes.ok) {
        const repoJson = await repoRes.json();
        repoLanguage = repoJson.language || null;
        repoTopics = repoJson.topics || [];
      }
    }
  } catch (e) {
    // ignore network errors and fall back to project data
    console.warn('Failed to fetch GitHub data for', project.github, e);
  }

  const highlights: Record<string, { icon: string; title: string; description: string }[]> = {
    'granja-tech': [
      { icon: '🔌', title: 'Integração com IoT', description: 'Sistema conectado a sensores para monitoramento em tempo real' },
      { icon: '📊', title: 'Dashboards Visuais', description: 'Visualização clara de dados para tomada de decisão rápida' },
      { icon: '🐔', title: 'Gestão Completa', description: 'Controle de lotes, insumos, mortalidade e análise financeira' },
    ],
    'pedidos-online': [
      { icon: '🏗️', title: 'Arquitetura Moderna', description: 'Microserviços independentes para máxima escalabilidade' },
      { icon: '⚡', title: 'Alta Performance', description: 'Sistema assíncrono com mensageria RabbitMQ para processamento rápido' },
      { icon: '🔐', title: 'API Gateway', description: 'Orquestração centralizada de serviços distribuídos' },
    ],
    'sistema-delivery': [
      { icon: '🛒', title: 'E-commerce Completo', description: 'Carrinho de compras, checkout e gestão de pedidos integrados' },
      { icon: '💳', title: 'Pagamentos Integrados', description: 'Integração com Mercado Pago para transações seguras' },
      { icon: '👨‍💼', title: 'Painel Administrativo', description: 'Gestão completa de produtos, categorias e pedidos' },
    ],
    'bibliotech': [
      { icon: '📚', title: 'Gestão de Acervo', description: 'Controle completo de livros, autores e categorias' },
      { icon: '🔄', title: 'Fluxo Automatizado', description: 'Sistema automático de empréstimos e devoluções' },
      { icon: '🔒', title: 'Segurança de Dados', description: 'Integridade e validações robustas em todas as operações' },
    ],
  };

  const projectHighlights = highlights[project.slug] || [];

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
        {/* Back Button */}
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            component="a"
            href="/#projects"
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 4,
              color: 'primary.main',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            Voltar para projetos
          </Button>
        </MotionDiv>

        {/* Project Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 800,
                color: 'text.primary',
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '1.125rem', md: '1.5rem' },
              }}
            >
              {project.description}
            </Typography>

            {/* Repo metadata pulled from GitHub when available */}
            {repoLanguage && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Linguagem principal: <strong>{repoLanguage}</strong>
              </Typography>
            )}
            {repoTopics.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {repoTopics.map((t) => (
                  <Chip key={t} label={t} size="small" />
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                component="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<GitHubIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                  },
                }}
              >
                Ver no GitHub
              </Button>
              {project.demo && (
                <Button
                  component="a"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<OpenInNewIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    fontWeight: 600,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Ver Demo
                </Button>
              )}
            </Box>
          </Box>
        </MotionDiv>

        {/* Technologies */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
              }}
            >
              Tecnologias Utilizadas
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {project.technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  sx={{
                    px: 2,
                    py: 3,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
                    color: 'primary.main',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    transition: 'transform 0.2s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        </MotionDiv>

        {/* Description */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            elevation={2}
            sx={{
              mb: 8,
              borderRadius: 4,
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 5 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 3,
                }}
              >
                Sobre o Projeto
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  whiteSpace: 'pre-line',
                }}
              >
                {project.longDescription}
              </Typography>

              {/* Show README content fetched from GitHub with GitHub-like styling */}
              {readmeRaw && <ReadmeViewer content={readmeRaw} />}
            </CardContent>
          </Card>
        </MotionDiv>

        {/* Highlights */}
        {projectHighlights.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 4,
                }}
              >
                Destaques do Projeto
              </Typography>
              <Grid container spacing={3}>
                {projectHighlights.map((highlight, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
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
                          },
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: 'text.primary',
                              mb: 1.5,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box component="span" sx={{ fontSize: '1.5rem' }}>
                              {highlight.icon}
                            </Box>
                            {highlight.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                          >
                            {highlight.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </MotionDiv>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </MotionDiv>
        )}

        {/* Call to Action */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card
            elevation={2}
            sx={{
              borderRadius: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
              border: '1px solid',
              borderColor: 'primary.main',
              borderOpacity: 0.2,
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                Gostou do projeto?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                Confira o código-fonte no GitHub ou entre em contato para saber mais sobre o desenvolvimento
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                <Button
                  component="a"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    fontWeight: 600,
                  }}
                >
                  Acessar Repositório
                </Button>
                <Button
                  component="a"
                  href="/#contact"
                  variant="outlined"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    fontWeight: 600,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Entrar em Contato
                </Button>
              </Box>
            </CardContent>
          </Card>
        </MotionDiv>
      </Container>
    </Box>
  );
}
