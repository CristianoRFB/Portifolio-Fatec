#!/bin/bash
# Script de inicialização rápida para sincronizar com GitHub

cat << "EOF"

╔════════════════════════════════════════════════════════════════╗
║   Sistema de Sincronização Automática com GitHub              ║
║   Portfolio Fatec - Cristiano Ronaldo Ferreira Bueno          ║
╚════════════════════════════════════════════════════════════════╝

📋 Disponível em: npm run github:*

┌────────────────────────────────────────────────────────────────┐
│                    COMANDOS DISPONÍVEIS                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  npm run github:sync                                          │
│  └─ Sincroniza TUDO (busca + atualiza)                        │
│     ⏱️  Tempo: ~5-10 segundos                                 │
│                                                                │
│  npm run github:fetch                                         │
│  └─ Busca descrições do GitHub                               │
│     📦 Salva em: .cache/github-descriptions.json              │
│                                                                │
│  npm run github:update                                        │
│  └─ Atualiza lib/projects.ts com cache                        │
│     📄 Gera: lib/projects.ts (auto-preenchido)                │
│                                                                │
└────────────────────────────────────────────────────────────────┘

🚀 Para começar:

   npm run github:sync

   Ou se preferir por partes:

   npm run github:fetch   # Busca dados do GitHub
   npm run github:update  # Gera projects.ts

📚 Documentação:
   - GITHUB_SYNC_GUIDE.md (visão geral)
   - scripts/GITHUB_SYNC_README.md (técnico)

✨ Benefícios:

   ✅ Descrições sempre atualizadas com GitHub
   ✅ Não precisa adicionar manualmente
   ✅ Tecnologias detectadas automaticamente
   ✅ Slugs e URLs gerados automaticamente
   ✅ Fácil adicionar novos projetos

🔄 Fluxo:

   GitHub Repos
        │
        ├─ fetch (busca descrições)
        │
   .cache/github-descriptions.json
        │
        ├─ update (gera código)
        │
   lib/projects.ts ← Portfolio atualizado!

💡 Exemplos de uso:

   # Uma vez por semana (manutenção):
   npm run github:sync

   # Adicionar novo projeto:
   1. Edite scripts/fetch-github-descriptions.js (array 'repos')
   2. Execute: npm run github:sync
   3. Pronto!

❓ Dúvidas? Veja a documentação detalhada em:
   scripts/GITHUB_SYNC_README.md

EOF
