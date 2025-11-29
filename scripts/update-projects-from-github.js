/**
 * Script para atualizar lib/projects.ts com descrições do GitHub
 */

const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../.cache/github-descriptions.json');
const PROJECTS_FILE = path.join(__dirname, '../lib/projects.ts');

// Mapeamento de repositórios para IDs de projetos
const repoToProjectId = {
  'Portifolio-Fatec': '1',
  'Fatec-Banco-de-dados': '2',
  'Estrutura-de-Dados': '3',
  'ProdutoFornecedorDOTNET': '4',
  'Sistema-de-gerenciamento-de-cursos': '5',
  'Portifolio-Integrado': '6',
  'S7-Animes': '7',
  'Me-App': '8',
};

// Mapeamento de repositórios para slugs
const repoToSlug = {
  'Portifolio-Fatec': 'portifolio-fatec',
  'Fatec-Banco-de-dados': 'fatec-banco-dados',
  'Estrutura-de-Dados': 'estrutura-dados',
  'ProdutoFornecedorDOTNET': 'produto-fornecedor-dotnet',
  'Sistema-de-gerenciamento-de-cursos': 'sistema-gerenciamento-cursos',
  'Portifolio-Integrado': 'portifolio-integrado',
  'S7-Animes': 's7-animes',
  'Me-App': 'me-app',
};

function loadCachedDescriptions() {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error('❌ Arquivo de cache não encontrado. Execute fetch-github-descriptions.js primeiro.');
    process.exit(1);
  }
  
  return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
}

function generateProjectsFile(descriptions) {
  const projects = [];
  
  Object.entries(descriptions).forEach(([repoName, data]) => {
    const id = repoToProjectId[repoName];
    const slug = repoToSlug[repoName];
    
    if (!id || !slug) {
      console.warn(`⚠️  Skipping unknown repository: ${repoName}`);
      return;
    }
    
    // Determinar título baseado no nome do repositório
    const title = repoName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Usar descrição do GitHub ou um fallback
    const description = data.description || `Projeto ${title}`;
    
    // Determinar se é projeto featured ou personal
    const isFeatured = parseInt(id) <= 5;
    const isPersonal = !isFeatured;
    
    // Determinar tecnologias baseado na linguagem
    let technologies = [];
    if (data.language) {
      switch(data.language.toLowerCase()) {
        case 'typescript':
          technologies = ['TypeScript', 'Next.js', 'React 19', 'Tailwind CSS', 'MUI'];
          break;
        case 'c#':
          technologies = ['C#', '.NET', 'ASP.NET Core', 'SQL Server'];
          break;
        case 'java':
          technologies = ['Java', 'Spring Boot', 'Data Structures'];
          break;
        case 'python':
          technologies = ['Python', 'Django', 'PostgreSQL'];
          break;
        default:
          technologies = [data.language];
      }
    } else {
      technologies = ['JavaScript', 'Web Development'];
    }
    
    const project = {
      id: `'${id}'`,
      slug: `'${slug}'`,
      title: `'${title}'`,
      description: `'${description}'`,
      longDescription: `'${description}'`,
      technologies: JSON.stringify(technologies),
      github: `'${data.url}'`,
      featured: isFeatured,
      personal: isPersonal ? true : undefined,
    };
    
    projects.push(project);
  });
  
  return projects;
}

function createProjectsTypescript(projects) {
  let ts = `import { Project } from './types';\n\nexport const projects: Project[] = [\n`;
  
  projects.forEach((p, index) => {
    ts += `  {\n`;
    ts += `    id: ${p.id},\n`;
    ts += `    slug: ${p.slug},\n`;
    ts += `    title: ${p.title},\n`;
    ts += `    description: ${p.description},\n`;
    ts += `    longDescription: ${p.longDescription},\n`;
    ts += `    technologies: ${p.technologies},\n`;
    ts += `    github: ${p.github},\n`;
    ts += `    featured: ${p.featured},\n`;
    if (p.personal) {
      ts += `    personal: ${p.personal},\n`;
    }
    ts += `  },\n`;
  });
  
  ts += `];\n\n`;
  ts += `export const getFeaturedProjects = () => projects.filter(p => p.featured);\n\n`;
  ts += `export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);\n`;
  ts += `export const getPersonalProjects = () => projects.filter(p => (p as any).personal);\n`;
  
  return ts;
}

async function main() {
  console.log('📚 Carregando descrições em cache...\n');
  
  const descriptions = loadCachedDescriptions();
  console.log(`✅ ${Object.keys(descriptions).length} repositórios carregados\n`);
  
  console.log('🔧 Gerando arquivo projects.ts...\n');
  const projects = generateProjectsFile(descriptions);
  
  const content = createProjectsTypescript(projects);
  
  fs.writeFileSync(PROJECTS_FILE, content);
  console.log(`✅ Arquivo atualizado: ${PROJECTS_FILE}\n`);
  
  console.log('📋 Projetos atualizados:\n');
  projects.forEach(p => {
    console.log(`  [${p.id}] ${p.title} (${p.featured ? 'Featured' : 'Personal'})`);
    console.log(`      ${p.description}`);
  });
}

main().catch(console.error);
