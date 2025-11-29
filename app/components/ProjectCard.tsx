import Link from 'next/link';
import { Project } from '@/lib/types';
import { SkillBadge } from './SkillBadge';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FolderIcon from '@mui/icons-material/Folder';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 4,
        padding: '3px',
        background: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 50%, #a855f7 100%)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-12px)',
          boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)',
        },
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 3.5,
          overflow: 'hidden',
        }}
      >

      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.9,
              }}
            >
              <FolderIcon sx={{ fontSize: '1.75rem' }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                transition: 'color 0.3s ease',
                '.MuiCard-root:hover &': {
                  color: 'primary.main',
                },
              }}
            >
              {project.title}
            </Typography>
              {/* Special notice for the portfolio repository */}
              {project.slug === 'portifolio-fatec' && (
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label="Esse é o repositório desse projeto!"
                    color="secondary"
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>
              )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              component="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                backgroundColor: 'background.default',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
              aria-label="View on GitHub"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            {project.demo && (
              <IconButton
                component="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  backgroundColor: 'background.default',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                }}
                aria-label="View demo"
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            mb: 4,
            minHeight: '3rem',
          }}
        >
          {project.description}
        </Typography>

        {/* Technologies */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
          {project.technologies.slice(0, 4).map((tech) => (
            <SkillBadge key={tech} name={tech} variant="secondary" />
          ))}
          {project.technologies.length > 4 && (
            <Chip
              label={`+${project.technologies.length - 4} mais`}
              size="small"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                backgroundColor: 'action.hover',
                color: 'text.secondary',
              }}
            />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 4, pb: 4, pt: 0 }}>
        <Button
          component={Link}
          href={`/projects/${project.slug}`}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            px: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.15) 100%)',
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              transform: 'scale(1.02)',
            },
            '& .MuiSvgIcon-root': {
              transition: 'transform 0.3s ease',
            },
            '&:hover .MuiSvgIcon-root': {
              transform: 'translateX(4px)',
            },
          }}
        >
          Ver detalhes completos
        </Button>
      </CardActions>
    </Card>
    </Box>
  );
}
