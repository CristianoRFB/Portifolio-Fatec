/**
 * Script para buscar descrições dos repositórios do GitHub
 * e atualizar automaticamente o arquivo lib/projects.ts
 */

const fs = require('fs');
const path = require('path');

// Lista de repositórios a buscar
const repos = [
  'Portifolio-Fatec',
  'Fatec-Banco-de-dados',
  'Estrutura-de-Dados',
  'ProdutoFornecedorDOTNET',
  'Sistema-de-gerenciamento-de-cursos',
  'Portifolio-Integrado',
  'S7-Animes',
  'Me-App',
];

const GITHUB_USER = 'CristianoRFB';

async function fetchGitHubDescription(repoName) {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USER}/${repoName}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`⚠️  Repositório não encontrado: ${repoName}`);
      return null;
    }
    
    const data = await response.json();
    return {
      name: repoName,
      description: data.description || '',
      url: data.html_url,
      language: data.language,
      topics: data.topics || [],
    };
  } catch (error) {
    console.error(`❌ Erro ao buscar ${repoName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🔄 Buscando descrições dos repositórios do GitHub...\n');
  
  const repoDescriptions = {};
  
  for (const repo of repos) {
    process.stdout.write(`📦 Buscando ${repo}... `);
    const data = await fetchGitHubDescription(repo);
    
    if (data) {
      repoDescriptions[repo] = data;
      console.log('✅');
    } else {
      console.log('⏭️  Pulado');
    }
  }
  
  console.log('\n✨ Descrições obtidas:\n');
  
  // Mapear os dados para cada projeto
  const projectMappings = {
    'Portifolio-Fatec': '1',
    'Fatec-Banco-de-dados': '2',
    'Estrutura-de-Dados': '3',
    'ProdutoFornecedorDOTNET': '4',
    'Sistema-de-gerenciamento-de-cursos': '5',
    'Portifolio-Integrado': '6',
    'S7-Animes': '7',
    'Me-App': '8',
  };
  
  Object.entries(repoDescriptions).forEach(([repoName, data]) => {
    const projectId = projectMappings[repoName];
    console.log(`[${projectId}] ${repoName}`);
    console.log(`    Descrição: ${data.description || '(sem descrição)'}`);
    console.log(`    Linguagem: ${data.language || '(não especificada)'}`);
    console.log(`    Topics: ${data.topics.length > 0 ? data.topics.join(', ') : '(nenhum)'}`);
    console.log();
  });
  
  // Salvar o arquivo JSON com as descrições para referência
  const outputPath = path.join(__dirname, '../.cache/github-descriptions.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(repoDescriptions, null, 2));
  console.log(`\n✅ Descrições salvas em: ${outputPath}`);
  console.log('\n💡 Dica: Use essas descrições para atualizar o arquivo lib/projects.ts');
}

main().catch(console.error);
