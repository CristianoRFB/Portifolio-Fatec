import { Experience } from './types';

export const experiences: Experience[] = [
  {
    title: 'Estagiário de Suporte de TI',
    company: 'CooperJales',
    period: '2025 - Atual',
    description: 'Atuação em suporte técnico de computadores, configuração e manutenção de redes, instalação e manutenção de hardware. Desenvolvimento fullstack de sistemas internos para automação de processos e melhorias operacionais.',
    type: 'work',
  },
  {
    title: 'Educador de Cursos Profissionalizantes',
    company: 'Escola de Cursos Profissionalizantes',
    period: '2024 - 2025',
    description: 'Instrutor de cursos na área de tecnologia, com foco em programação e desenvolvimento de software. Desenvolvimento de material didático e aprimoramento significativo de habilidades de comunicação e didática.',
    type: 'work',
  },
  {
    title: 'Desenvolvedor Freelancer',
    company: 'Autônomo',
    period: '2025 - Atual',
    description: 'Desenvolvimento de sistemas web e desktop sob demanda, atuando em diversos projetos com diferentes funcionalidades e tecnologias. Experiência com análise de requisitos, desenvolvimento, testes e deploy de aplicações.',
    type: 'freelance',
  },
  {
        title: 'Técnico em Análise e Desenvolvimento de Sistemas - AMS',
    company: 'Etec Jales | Finalizado',
    period: '2022 - 2024',
    description: 'Formação técnica completa em desenvolvimento de sistemas, com base em programação, algoritmos, estrutura de dados e desenvolvimento web.',
    type: 'education',
  },
  {
    title: 'Análise e Desenvolvimento de Sistemas',
    company: 'Fatec Jales | Cursando',
    period: '2025 - 2026',
    description: 'Curso superior em Análise e Desenvolvimento de Sistemas, com foco em engenharia de software, arquitetura de sistemas, banco de dados e metodologias ágeis.',
    type: 'education',
  },
];

export const workExperiences = experiences.filter(e => e.type === 'work' || e.type === 'freelance');
export const educationExperiences = experiences.filter(e => e.type === 'education');
