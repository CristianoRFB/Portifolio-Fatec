import { Chip, Box } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import TerminalIcon from '@mui/icons-material/Terminal';

interface SkillBadgeProps {
  name: string;
  years?: string;
  variant?: 'primary' | 'secondary';
  category?: string;
}

const getIconForSkill = (name: string, category?: string) => {
  const iconProps = { sx: { fontSize: '1.125rem' } };

  // Backend & DevOps
  if (['Docker', 'AWS', 'Azure DevOps', 'Git', 'GitHub'].includes(name)) {
    return <CloudIcon {...iconProps} />;
  }

  // Databases
  if (name.includes('SQL') || name.includes('Database')) {
    return <StorageIcon {...iconProps} />;
  }

  // Architecture
  if (category === 'architecture' || ['DDD', 'MVC', 'Clean Architecture', 'Microserviços'].includes(name)) {
    return <DataObjectIcon {...iconProps} />;
  }

  // Terminal/CLI tools
  if (['Go', 'Ruby', 'PHP'].includes(name)) {
    return <TerminalIcon {...iconProps} />;
  }

  // Default code icon
  return <CodeIcon {...iconProps} />;
};

export function SkillBadge({ name, years, variant = 'primary', category }: SkillBadgeProps) {
  return (
    <Chip
      icon={getIconForSkill(name, category)}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="span" sx={{ fontWeight: 600 }}>
            {name}
          </Box>
          {years && (
            <Box
              component="span"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'text.secondary',
                backgroundColor: 'background.default',
                px: 1.25,
                py: 0.5,
                borderRadius: 999,
                opacity: 0.8,
              }}
            >
              {years}
            </Box>
          )}
        </Box>
      }
      sx={{
        px: 2,
        py: 3,
        fontSize: { xs: '0.875rem', md: '1rem' },
        fontWeight: 500,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        ...(variant === 'primary'
          ? {
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
              color: 'primary.main',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)',
                transform: 'scale(1.1) translateY(-4px)',
                boxShadow: 4,
              },
            }
          : {
              backgroundColor: 'background.paper',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'scale(1.1) translateY(-4px)',
                boxShadow: 4,
              },
            }),
        '& .MuiChip-icon': {
          color: 'inherit',
          transition: 'transform 0.3s ease',
        },
        '&:hover .MuiChip-icon': {
          transform: 'scale(1.25)',
        },
      }}
    />
  );
}
