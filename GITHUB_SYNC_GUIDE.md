# 🔄 Sistema de Sincronização com GitHub

## Visão Geral

Este portfolio inclui um sistema automático que **puxa as descrições dos repositórios do GitHub** sem necessidade de adicionar manualmente via código.

## 🎯 O Problema Resolvido

Antes: Era necessário manter manualmente as descrições dos projetos sincronizadas com GitHub  
Agora: As descrições são puxadas automaticamente da API do GitHub!

## 📊 Como Funciona

```
┌─────────────────────┐
│  GitHub Repos       │
│  (seu perfil)       │
└──────────┬──────────┘
           │
           ├─ Busca nome, descrição, linguagem
           │
▼─────────────────────────────────────────▼
  npm run github:sync (comando único)
▼─────────────────────────────────────────▼
           │
           ├─ scripts/fetch-github-descriptions.js
           │  └→ Busca dados da API do GitHub
           │  └→ Salva em .cache/github-descriptions.json
           │
           ├─ scripts/update-projects-from-github.js
           │  └→ Lê o cache
           │  └→ Detecta tecnologias
           │  └→ Gera lib/projects.ts
           │
┌──────────────────────────────┐
│  lib/projects.ts (atualizado)│
│  com descrições do GitHub    │
└──────────────────────────────┘
```

## 🚀 Usando os Scripts

### Comando Rápido (tudo em um):
```bash
npm run github:sync
```

### Ou separadamente:
```bash
# 1. Buscar descrições do GitHub
npm run github:fetch

# 2. Atualizar projects.ts
npm run github:update
```

## 📁 Estrutura de Arquivos

```
portfolio/
├── scripts/
│   ├── fetch-github-descriptions.js    # Busca dados do GitHub
│   ├── update-projects-from-github.js  # Gera projects.ts
│   └── GITHUB_SYNC_README.md          # Documentação detalhada
├── .cache/
│   └── github-descriptions.json        # Cache das descrições
└── lib/
    └── projects.ts                    # Arquivo gerado automaticamente
```

## ✨ Funcionalidades Automáticas

✅ **Puxar descrições** - Extrai descrição do repositório  
✅ **Detectar tecnologias** - Baseado na linguagem principal  
✅ **Detectar categoria** - Featured (primeiros 5) ou Personal  
✅ **Gerar slugs** - URLs amigáveis automáticas  
✅ **Criar GitHub URLs** - Links diretos para cada repositório  

## 🛠️ Exemplos

### Adicionar novo repositório

1. Edite `scripts/fetch-github-descriptions.js`
2. Adicione o nome do repo ao array `repos`
3. Execute `npm run github:sync`
4. Pronto! Novo projeto adicionado automaticamente

### Atualizar descrições existentes

Simplesmente execute:
```bash
npm run github:sync
```

O script irá:
- Buscar as descrições mais recentes do GitHub
- Detectar qualquer mudança
- Atualizar o arquivo `lib/projects.ts`

## 📝 O que é Sincronizado

Para cada repositório, o script extrai:
- 📦 **Nome** → Convertido em título
- 📄 **Descrição** → Usada em `description` e `longDescription`
- 🔤 **Linguagem** → Detecta tecnologias automaticamente
- 🔗 **URL** → Preenchida em `github`
- 🏷️ **Topics** → Preparado para futuras funcionalidades

## 🔍 Mapeamento de Tecnologias

O script detecta automaticamente:

| Linguagem | Tecnologias Adicionadas |
|-----------|-------------------------|
| TypeScript | TypeScript, Next.js, React 19, Tailwind CSS, MUI |
| C# | C#, .NET, ASP.NET Core, SQL Server |
| Java | Java, Spring Boot, Data Structures |
| Python | Python, Django, PostgreSQL |
| Outros | JavaScript, Web Development |

## 🔐 Privacidade & Segurança

✅ Usa apenas API pública do GitHub  
✅ Sem autenticação necessária  
✅ Cache local em `.cache/`  
✅ Não envia dados para servidores externos  

## 📊 Limite de Requisições

- **Sem autenticação**: 60 requisições/hora por IP
- **Com token**: 5000 requisições/hora

Se receber erro de rate limit, aguarde 1 hora ou configure um token de autenticação.

## 🎨 Personalizações

O sistema é flexível e pode ser customizado em:
- `scripts/fetch-github-descriptions.js` - Repositórios a sincronizar
- `scripts/update-projects-from-github.js` - Lógica de geração
- `lib/projects.ts` - Arquivo final (regenerado a cada sync)

## 🚀 Próximas Melhorias

- [ ] Integração com CI/CD (GitHub Actions)
- [ ] Suporte a autenticação com token
- [ ] Sincronização automática no push
- [ ] Categorização por topics
- [ ] Geração de badges

## 📚 Mais Informações

Veja `scripts/GITHUB_SYNC_README.md` para documentação técnica detalhada.
