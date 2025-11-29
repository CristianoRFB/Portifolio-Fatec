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
  { name: 'Next.js', category: 'frontend', years: '1 ano' },

  // Backend & Tools
  { name: 'Git', category: 'backend', years: '5 anos' },
  { name: 'GitHub', category: 'backend', years: '5 anos' },
  { name: 'Azure DevOps', category: 'backend', years: '1 ano' },
];

export const skillsByCategory = {
  primary: skills.filter(s => s.category === 'primary'),
  frontend: skills.filter(s => s.category === 'frontend'),
  backend: skills.filter(s => s.category === 'backend'),
};
