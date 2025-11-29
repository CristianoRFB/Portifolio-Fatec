# Portfolio - Cristiano Ronaldo Ferreira Bueno

Este repositório é um portfólio pessoal construído com Next.js (App Router), TypeScript, Tailwind CSS e MUI.

**Project Structure**
- **`app/`**: Páginas e layout do Next.js (App Router).
	- **`app/page.tsx`**: Página inicial (Home).
	- **`app/layout.tsx`**: Layout raiz que envolve todas as páginas (providers, cabeçalho, rodapé).
	- **`app/globals.css`**: Estilos globais e variáveis CSS.
	- **`app/about/page.tsx`**: Página "Sobre"/About.
	- **`app/projects/[slug]/page.tsx`**: Página dinâmica de detalhes de projeto (rota baseada em `slug`).
	- **`app/components/`**: Componentes React reutilizáveis.
		- `Navigation.tsx`, `Footer.tsx`, `HeroSection.tsx`, `ProjectsSection.tsx`, `ProjectCard.tsx`, `SkillsSection.tsx`, `ContactSection.tsx`, `ThemeProvider.tsx`, `MuiThemeProvider.tsx`, etc.

**Data Layer (conteúdo)**
- **`lib/`**: Arquivos de dados e tipos usados pelas páginas.
	- **`lib/projects.ts`**: Lista de projetos e funções auxiliares (ex.: `getFeaturedProjects()`, `getProjectBySlug()`).
	- **`lib/skills.ts`**: Lista de skills e utilitários de filtragem.
	- **`lib/experiences.ts`**: Experiências profissionais/educacionais.
	- **`lib/site.config.ts`**: Metadados do site (nome, links sociais, contato).
	- **`lib/theme.ts`**: Temas MUI (`lightTheme` / `darkTheme`).
	- **`lib/types.ts`**: Tipos TypeScript usados no projeto.

**Assets públicos**
- **`public/`**: Arquivos estáticos servidos diretamente.
	- **`public/cv/`**: CVs e documentos públicos (ex.: PDF do currículo).

**Principais componentes e onde encontrá-los**
- **Navegação**: `app/components/Navigation.tsx`
- **Rodapé**: `app/components/Footer.tsx`
- **Seções da página inicial**: `app/components/HeroSection.tsx`, `PersonalProjectsSection.tsx`, `SkillsSection.tsx`, `ContactSection.tsx`
- **Theming**: `app/components/ThemeProvider.tsx` e `app/components/MuiThemeProvider.tsx`

**Como adicionar/editar conteúdo**
- **Adicionar projeto**: editar `lib/projects.ts` e criar imagens/ativos em `public/` se necessário. Use um `slug` único para cada projeto.
- **Adicionar skill ou experiência**: editar `lib/skills.ts` ou `lib/experiences.ts`.
- **Componentes**: criar/alterar arquivos em `app/components/` e importar onde necessário.

**Comandos de desenvolvimento**
- **Instalar dependências**: `npm install`
- **Rodar em desenvolvimento**: `npm run dev` (servidor em `http://localhost:3000`)
- **Build de produção**: `npm run build`
- **Checar lint**: `npm run lint`

Se quiser que eu atualize o README com mais detalhes (ex.: fluxo de deploy, estrutura de temas, ou exemplos de como adicionar um projeto), diga o que deseja incluir e eu atualizo.