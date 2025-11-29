# 📚 Sincronização Automática com GitHub

Este projeto inclui scripts para sincronizar automaticamente as descrições dos repositórios do GitHub com o arquivo `lib/projects.ts`.

## 🚀 Como Usar

### Sincronizar tudo de uma vez (recomendado):
```bash
npm run github:sync
```

Este comando:
1. Busca as descrições de todos os repositórios no GitHub
2. Atualiza o arquivo `lib/projects.ts` com as informações mais recentes

### Ou execute os passos separadamente:

**1. Buscar descrições do GitHub:**
```bash
npm run github:fetch
```
Isso cria/atualiza um arquivo `.cache/github-descriptions.json` com as descrições de todos os seus repositórios.

**2. Atualizar o arquivo de projetos:**
```bash
npm run github:update
```
Usa o arquivo de cache para atualizar `lib/projects.ts`.

## 📂 Scripts

### `scripts/fetch-github-descriptions.js`
- Busca as descrições de todos os repositórios na API do GitHub
- Salva as informações em `.cache/github-descriptions.json`
- Extrai: descrição, linguagem principal, topics, URL do repositório

### `scripts/update-projects-from-github.js`
- Lê o arquivo de cache
- Gera automaticamente o conteúdo de `lib/projects.ts`
- Detecta tecnologias baseado na linguagem principal
- Marca projetos como "featured" (primeiros 5) ou "personal"

## 🔄 Fluxo de Atualização

```
GitHub Repos
    ↓
npm run github:fetch (fetch-github-descriptions.js)
    ↓
.cache/github-descriptions.json
    ↓
npm run github:update (update-projects-from-github.js)
    ↓
lib/projects.ts (arquivo final do portfolio)
```

## 🛠️ Adicionando Novos Projetos

Para adicionar um novo repositório:

1. Edite os arrays em `scripts/fetch-github-descriptions.js`:
   - `repos` - adicione o nome do repositório
   - `GITHUB_USER` - seu usuário do GitHub

2. Execute `npm run github:sync`

3. O novo projeto será automaticamente adicionado ao `lib/projects.ts`

## 📝 Exemplo de Repositório

Para que o script funcione corretamente, seus repositórios no GitHub devem ter:
- ✅ Nome do repositório
- ✅ Descrição (opcional, mas recomendada)
- ✅ Linguagem principal configurada

## ⚙️ Mapeamento Automático

O script detecta automaticamente:
- **Tecnologias**: baseado na linguagem principal do repositório
- **Categoria**: Featured (primeiros 5) ou Personal (restantes)
- **Slug**: nome do repositório convertido para URL-friendly

## 🔑 Requisitos

- Node.js instalado
- Acesso à internet (para chamar a API do GitHub)
- Nenhuma autenticação necessária (usa API pública)

## ⚠️ Observações

- O cache é armazenado em `.cache/github-descriptions.json`
- A API do GitHub tem limite de requisições (60 por IP/hora sem autenticação)
- Se receber erro de rate limit, aguarde 1 hora ou use um token de autenticação

## 🚀 Próximas Melhorias

- [ ] Adicionar autenticação com GitHub token para aumentar rate limit
- [ ] Integrar com CI/CD para sincronizar automaticamente no push
- [ ] Suportar topics do GitHub para categorização automática
- [ ] Gerar badges de tecnologia automaticamente
