export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github: string;
  demo?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'primary' | 'frontend' | 'backend' | 'architecture' | 'secondary';
  years?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education' | 'freelance';
}

export interface SiteConfig {
  author: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
}
