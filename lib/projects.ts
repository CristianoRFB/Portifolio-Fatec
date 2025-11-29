import { Project } from './types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'granja-tech',
    title: 'GranjaTech',
    description: 'Gestão Inteligente para Avicultura',
    longDescription: 'Sistema completo para monitoramento e gestão de granjas. Permite o controle de lotes, consumo de insumos, mortalidade e integração com sensores (IoT), oferecendo dashboards visuais para tomada de decisão financeira e operacional. A aplicação foi desenvolvida com foco em escalabilidade e performance, utilizando arquitetura moderna e boas práticas de desenvolvimento.',
    technologies: ['.NET Core', 'C#', 'React', 'PostgreSQL', 'Docker', 'IoT'],
    github: 'https://github.com/felipebianchini2006/GranjaTech',
    featured: true,
  },
  {
    id: '5',
    slug: 'portifolio-integrado',
    title: 'Portifolio Integrado',
    description: 'Portifólio Integrado',
    longDescription: 'Portifólio integrado publicado no GitHub.',
    technologies: ['Next.js', 'TypeScript', 'React'],
    github: 'https://github.com/CristianoRFB/Portifolio-Integrado',
    featured: false,
    personal: true,
  },
  {
    id: '6',
    slug: 's7-animes',
    title: 'S7 Animes',
    description: 'S7 Animes',
    longDescription: 'Projeto S7 Animes disponível no GitHub.',
    technologies: ['React', 'API'],
    github: 'https://github.com/CristianoRFB/S7-Animes',
    featured: false,
    personal: true,
  },
  {
    id: '7',
    slug: 'me-app',
    title: 'Me App',
    description: 'Me-App',
    longDescription: 'Aplicativo Me-App hospedado no GitHub.',
    technologies: ['React Native', 'Node.js'],
    github: 'https://github.com/CristianoRFB/Me-App',
    featured: false,
    personal: true,
  },
  {
    id: '2',
    slug: 'pedidos-online',
    title: 'Pedidos Online',
    description: 'Arquitetura Escalável com Microserviços',
    longDescription: 'Plataforma moderna construída com arquitetura de Microserviços para alta performance. O sistema divide responsabilidades entre gestão de usuários, processamento de pedidos e notificações, garantindo velocidade e escalabilidade. Implementa mensageria assíncrona com RabbitMQ e API Gateway para orquestração de serviços, demonstrando conhecimento em arquiteturas distribuídas e sistemas de alta disponibilidade.',
    technologies: ['Go', 'Golang', 'React', 'RabbitMQ', 'API Gateway', 'Microserviços'],
    github: 'https://github.com/felipebianchini2006/Pedidos-Online',
    featured: true,
  },
  {
    id: '3',
    slug: 'sistema-delivery',
    title: 'Sistema Delivery',
    description: 'E-commerce de Alimentos',
    longDescription: 'Solução completa para vendas online de alimentos. Conta com painel administrativo para gestão de produtos, categorias e pedidos, além de painel do cliente para realização de pedidos, carrinho de compras e checkout integrado. Implementa integração com a API do Mercado Pago para processamento de pagamentos, garantindo transações seguras e confiáveis. Sistema desenvolvido como TCC em 2024.',
    technologies: ['PHP', 'HTML5', 'CSS3', 'JavaScript', 'MySQL', 'Mercado Pago API'],
    github: 'https://github.com/felipebianchini2006/Sistema-Delivery-TCC-2024',
    featured: true,
  },
  {
    id: '4',
    slug: 'bibliotech',
    title: 'Bibliotech',
    description: 'Gestão de Bibliotecas',
    longDescription: 'Sistema web para organização e controle de acervos bibliotecários. Automatiza o fluxo completo de empréstimos e devoluções, cadastro de obras, autores e usuários. Desenvolvido com Java Spring Boot, o sistema foca na integridade dos dados, segurança de acesso e usabilidade, oferecendo uma interface intuitiva para bibliotecários e usuários. Implementa validações robustas e relatórios gerenciais.',
    technologies: ['Java', 'Spring Boot', 'JSP', 'Maven', 'MySQL', 'Bootstrap'],
    github: 'https://github.com/felipebianchini2006/bibliotech',
    featured: true,
  },
];

export const getFeaturedProjects = () => projects.filter(p => p.featured);

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getPersonalProjects = () => projects.filter(p => (p as any).personal);
