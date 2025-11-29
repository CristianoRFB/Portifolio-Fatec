import { Skill } from './types';

export const skills: Skill[] = [
  // Primary Technologies
  { name: 'C# .NET', category: 'primary', years: '3 anos' },
  { name: 'Java', category: 'primary', years: '1 ano' },
  { name: 'JavaScript', category: 'primary', years: '4 anos' },
  { name: 'TypeScript', category: 'primary', years: '2 anos' },
  { name: 'HTML5', category: 'primary', years: '4 anos' },
  { name: 'CSS3', category: 'primary', years: '4 anos' },

  // Frontend
  { name: 'React.js', category: 'frontend', years: '2 anos' },
  { name: 'Angular', category: 'frontend', years: '1 ano' },
  { name: 'Next.js', category: 'frontend', years: '1 ano' },

  // Backend & Tools
  { name: 'Docker', category: 'backend', years: '1 ano' },
  { name: 'Git', category: 'backend', years: '5 anos' },
  { name: 'GitHub', category: 'backend', years: '5 anos' },
  { name: 'AWS', category: 'backend', years: '1 ano' },
  { name: 'Azure DevOps', category: 'backend', years: '1 ano' },

  // Secondary Technologies
  { name: 'Ruby', category: 'secondary', years: '3 meses' },
  { name: 'PHP', category: 'secondary', years: '2 anos' },
  { name: 'Go', category: 'secondary', years: '3 meses' },

  // Architecture
  { name: 'DDD', category: 'architecture' },
  { name: 'MVC', category: 'architecture' },
  { name: 'Clean Architecture', category: 'architecture' },
  { name: 'Microserviços', category: 'architecture' },
];

export const skillsByCategory = {
  primary: skills.filter(s => s.category === 'primary'),
  frontend: skills.filter(s => s.category === 'frontend'),
  backend: skills.filter(s => s.category === 'backend'),
  architecture: skills.filter(s => s.category === 'architecture'),
  secondary: skills.filter(s => s.category === 'secondary'),
};
