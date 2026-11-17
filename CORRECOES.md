# TFHub — o que foi verificado e corrigido

> Observação honesta: eu não consegui rodar `npm install`/`npm run dev` no ambiente em que corrigi (sem internet),
> então **os arquivos foram revisados e a sintaxe dos `.ts` foi checada, mas o app não foi executado**.
> Rode os passos da seção "Como rodar" e, se aparecer qualquer erro, me mande a mensagem.

## 1. Já existe banco de dados?
**Sim.** O projeto usa Payload CMS com **SQLite** (arquivo `tfhub.db`, criado sozinho na primeira execução do `npm run dev`).
Tabelas: administradores, usuários (cadastro), pontos turísticos, avaliações, mídia (imagens).
Problema: o banco nascia **vazio**. O *seed* agora cria os onze registros demonstrativos de Tefé que ainda não existirem: Lago de Tefé, Praia da Ponta Branca, Catedral de Santa Teresa, Casa do Artesão, Praça Santa Teresa, Feira Municipal, Reserva Mamirauá, Floresta Nacional de Tefé, Seminário São José, Trilha Interpretativa da FLONA e Café Regional da Feira Municipal. A carga não apaga nem sobrescreve dados existentes (desligue com `SEED_DEMO_DATA=false`). Edite/apague os registros em `/admin`. As imagens geradas são ilustrativas.

## 2. Os 8 fluxos
| # | Fluxo | Onde testar |
|---|-------|-------------|
| 1 | Cadastro de usuário | `/cadastro` |
| 2 | Login e logout | `/login` e `/perfil` |
| 3 | Explorar e filtrar pontos turísticos | `/pontos-turisticos` |
| 4 | Consultar detalhes de um ponto | cartão de destino e página `/pontos-turisticos/[slug]` |
| 5 | Enviar avaliação | formulário no detalhe do destino |
| 6 | Gerenciar perfil e avaliações próprias | `/perfil` |
| 7 | CRUD de pontos turísticos | coleção `Attractions` no `/admin` |
| 8 | Administrar avaliações | coleção `Reviews` no `/admin` |

Consulte `DEMO-TEFE-8-FLUXOS.md` para o roteiro completo de demonstração com os exemplos locais.

## 3. Erros encontrados e corrigidos
1. **Admin não conseguia aprovar avaliações** (`Reviews.update` era `() => false`) → avaliações nunca eram publicadas.
2. **Nota média e nº de avaliações nunca mudavam** (campos fixos em 0) → agora recalculados automaticamente ao aprovar/excluir.
3. **Vazamento de e-mail (LGPD):** o título da avaliação contém o e-mail do autor e podia ser lido pela API pública → agora só admin lê.
4. **E-mail repetido:** o banco já impedia, mas a mensagem era genérica. Agora há checagem explícita + tratamento de cadastros simultâneos.
5. **Formulário apagava tudo** quando dava erro → campos mantidos.
6. **Botões sem ação:** filtros de categoria (eram `<span>`), 4 cartões de recomendação, cartão do ponto (só a setinha clicava), seção "Planeje" sem botão.
7. **Menu sumia no celular** → menu hambúrguer.
8. **Cabeçalho sempre mostrava "Entrar"**, mesmo logado.
9. **Página 404 em inglês** → português.
10. **Admin só em inglês** → português. Admin agora pode criar outros admins (antes ninguém podia).
11. `.gitignore` não ignorava `*.db` (o banco iria para o Git) e ignorava `.env.example`.
12. `payload-types.ts` está desatualizado (veio do Figma Make) → rode `npm run generate:types`.

## 4. Como rodar (Windows)
1. Node.js **24.22.1 ou superior**.
2. PowerShell na pasta do projeto: `npm install`
3. `npm run generate:types`
4. `npm run dev` → abra http://localhost:3000
5. Primeiro acesso a http://localhost:3000/admin cria o **administrador**. Lá você aprova avaliações e edita os lugares.

## 5. O que NÃO está pronto
- **Esqueci minha senha:** precisa de um serviço de e-mail (SMTP/Resend) — não existe no projeto.
- **Publicar na internet:** `next start` não cria tabelas sozinho. Antes, rode `npm run payload migrate:create` e `npm run payload migrate`, e defina `PAYLOAD_SECRET` forte. SQLite em hospedagem sem disco persistente perde dados (use Postgres nesse caso).
- "Botões editáveis": entendi como *clicáveis e funcionando*. Se quis dizer *textos editáveis pelo painel admin*, é outra etapa (posso fazer).
