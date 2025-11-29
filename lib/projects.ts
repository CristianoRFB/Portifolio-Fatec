import { Project } from './types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'portifolio-fatec',
    title: 'Portifolio Fatec',
    description: 'Portifólio da Fatec',
    longDescription: 'Portifólio da Fatec',
    technologies: ["TypeScript","Next.js","React 19","Tailwind CSS","MUI"],
    github: 'https://github.com/CristianoRFB/Portifolio-Fatec',
    featured: true,
  },
  {
    id: '2',
    slug: 'fatec-banco-dados',
    title: 'Fatec Banco De Dados',
    description: 'Projeto Fatec Banco De Dados',
    longDescription: 'Projeto Fatec Banco De Dados',
    technologies: ["JavaScript","Web Development"],
    github: 'https://github.com/CristianoRFB/Fatec-Banco-de-dados',
    featured: true,
  },
  {
    id: '3',
    slug: 'estrutura-dados',
    title: 'Estrutura De Dados',
    description: 'Projeto Estrutura De Dados',
    longDescription: 'Projeto Estrutura De Dados',
    technologies: ["JavaScript","Web Development"],
    github: 'https://github.com/CristianoRFB/Estrutura-de-Dados',
    featured: true,
  },
  {
    id: '4',
    slug: 'produto-fornecedor-dotnet',
    title: 'ProdutoFornecedorDOTNET',
    description: 'Um CRUD em visão do funcionário funcionando em servidor SQL',
    longDescription: 'Um CRUD em visão do funcionário funcionando em servidor SQL',
    technologies: ["C#",".NET","ASP.NET Core","SQL Server"],
    github: 'https://github.com/CristianoRFB/ProdutoFornecedorDOTNET',
    featured: true,
  },
  {
    id: '5',
    slug: 'sistema-gerenciamento-cursos',
    title: 'Sistema De Gerenciamento De Cursos',
    description: 'Projeto Sistema De Gerenciamento De Cursos',
    longDescription: 'Projeto Sistema De Gerenciamento De Cursos',
    technologies: ["JavaScript","Web Development"],
    github: 'https://github.com/CristianoRFB/Sistema-de-gerenciamento-de-cursos',
    featured: true,
  },
  {
    id: '7',
    slug: 's7-animes',
    title: 'S7 Animes',
    description: 'S7 Animes é uma aplicação mobile (futuro website) unificada que integra animes e mangás em um único ambiente. Disponível como app e site, oferece organização precisa, navegação intuitiva e conteúdo sempre atualizado, permitindo ao usuário acompanhar obras, episódios e capítulos de forma completa, centralizada.',
    longDescription: 'S7 Animes é uma aplicação mobile (futuro website) unificada que integra animes e mangás em um único ambiente. Disponível como app e site, oferece organização precisa, navegação intuitiva e conteúdo sempre atualizado, permitindo ao usuário acompanhar obras, episódios e capítulos de forma completa, centralizada.',
    technologies: ["JavaScript","Web Development"],
    github: 'https://github.com/CristianoRFB/S7-Animes',
    featured: false,
    personal: true,
  },
  {
    id: '8',
    slug: 'me-app',
    title: 'Me App',
    description: 'MeApp é um app que reúne tudo sobre você em um só lugar. Organize sua vida pessoal e profissional, acompanhe metas, registre momentos, crie um portfólio completo e visualize sua evolução. Simples, intuitivo e seguro, o MeApp oferece uma visão 360° da sua identidade em um ambiente moderno e personalizável.',
    longDescription: 'MeApp é um app que reúne tudo sobre você em um só lugar. Organize sua vida pessoal e profissional, acompanhe metas, registre momentos, crie um portfólio completo e visualize sua evolução. Simples, intuitivo e seguro, o MeApp oferece uma visão 360° da sua identidade em um ambiente moderno e personalizável.',
    technologies: ["JavaScript","Web Development"],
    github: 'https://github.com/CristianoRFB/Me-App',
    featured: false,
    personal: true,
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getPersonalProjects = () => projects.filter(p => (p as any).personal);
