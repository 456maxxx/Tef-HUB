# TFHub — execução e teste dos 8 fluxos

Este projeto já contém a implementação dos oito fluxos descritos abaixo. O frontend utiliza Next.js e o gerenciamento de dados/autenticação utiliza Payload CMS com SQLite.

## Requisitos

- Windows 10/11
- Node.js 24.22.1 ou superior na linha 24 (verifique com `node -v`)
- npm
- VS Code

> O projeto usa Payload CMS 4 beta e declara Node.js `>=24.22.1`. Node 22 não atende ao requisito.

## Instalação e inicialização

1. Extraia o ZIP para uma pasta, por exemplo `C:\TFHub`.
2. Abra essa pasta no VS Code.
3. Abra o terminal integrado (Terminal → Novo Terminal).
4. Execute:

```powershell
npm install
```

5. Gere os tipos do Payload:

```powershell
npm run generate:types
```

6. Inicie o sistema:

```powershell
npm run dev
```

7. Abra `http://localhost:3000`.
8. Para administrar conteúdo, abra `http://localhost:3000/admin`. No primeiro acesso, crie a conta de administrador.

O banco SQLite local será criado no arquivo `tfhub.db`. Não apague esse arquivo se quiser preservar os cadastros feitos durante os testes.

## Os 8 fluxos implementados e como testar

### 1. Cadastro de usuário
- Acesse `http://localhost:3000/cadastro`.
- Informe nome, e-mail, senha e confirmação.
- Teste também senha divergente e e-mail já cadastrado.
- A conta é criada na coleção `users`; após o cadastro, o sistema tenta iniciar a sessão.

Código: `src/app/(frontend)/cadastro/page.tsx`, `src/app/(frontend)/actions/auth.ts`, `src/lib/app-auth.ts`, `src/collections/Users.ts`.

### 2. Login e logout
- Acesse `http://localhost:3000/login` e entre com a conta criada.
- Acesse `/perfil` para confirmar a autenticação.
- Use “Sair da conta” para encerrar a sessão.

Código: `src/app/(frontend)/login/page.tsx`, `src/app/(frontend)/actions/auth.ts`, `src/lib/app-auth.ts`.

### 3. Explorar e filtrar pontos turísticos
- Acesse `http://localhost:3000/pontos-turisticos`.
- Use os filtros de categoria e ritmo/dificuldade disponíveis na página.
- Remova os filtros para voltar à listagem completa.

Código: `src/app/(frontend)/pontos-turisticos/page.tsx`, `src/components/AttractionsExplorer.tsx`, `src/lib/attractions.ts`.

### 4. Consultar detalhes de um ponto turístico
- Na listagem, selecione um cartão.
- Confira as informações do destino na página individual.
- Um slug que não exista deve resultar em página não encontrada.

Código: `src/app/(frontend)/pontos-turisticos/[slug]/page.tsx`, `src/lib/attractions.ts`.

### 5. Enviar avaliação
- Entre com uma conta de usuário.
- Abra um ponto turístico publicado.
- Informe nota de 1 a 5 e comentário entre 12 e 800 caracteres.
- Tente avaliar o mesmo destino novamente: o sistema deve impedir avaliação duplicada pela mesma conta.

Código: `src/components/ReviewForm.tsx`, `src/app/(frontend)/actions/reviews.ts`, `src/collections/Reviews.ts`, `src/lib/recompute-rating.ts`.

### 6. Gerenciar perfil e avaliações próprias
- Entre e acesse `http://localhost:3000/perfil`.
- Altere o nome.
- Exclua uma avaliação feita pela própria conta.
- Confirme que a média/quantidade do destino é atualizada após exclusão.

Código: `src/app/(frontend)/perfil/page.tsx`, `src/components/ProfileForms.tsx`, `src/app/(frontend)/actions/profile.ts`.

### 7. CRUD de pontos turísticos (administrador)
- Acesse `http://localhost:3000/admin` com a conta administradora.
- Abra a coleção `Attractions`.
- Teste Create (criar), Read (consultar/listar), Update (editar) e Delete (excluir) usando um registro de teste.
- Preencha os campos obrigatórios. Para publicação, use o controle de status do Payload.
- As permissões de escrita são restritas à coleção de administradores.

Código: `src/collections/Attractions.ts`, `src/payload.config.ts`.

### 8. Administrar avaliações (administrador)
- No painel `/admin`, abra a coleção `Reviews`.
- Consulte avaliações e altere o status (approved, pending ou rejected).
- Teste a exclusão como administrador.
- A média pública considera as avaliações aprovadas.

Código: `src/collections/Reviews.ts`, `src/lib/recompute-rating.ts`.

## Configuração opcional

O arquivo `.env.example` contém as variáveis de ambiente. Para personalizar, copie-o para `.env.local` e altere os valores. Em desenvolvimento local, o projeto possui valores padrão.

```env
PAYLOAD_SECRET=coloque-uma-chave-longa-e-aleatoria
DATABASE_URL=file:./tfhub.db
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SEED_DEMO_DATA=true
```

`SEED_DEMO_DATA=true` habilita a carga dos onze locais de demonstração de Tefé que ainda não existirem no banco. A rotina é aditiva: não apaga nem sobrescreve registros existentes. Para desligar a carga, defina `SEED_DEMO_DATA=false`. Consulte `DEMO-TEFE-8-FLUXOS.md` para o roteiro de apresentação com exemplos locais.

## Demonstração com exemplos de Tefé

O projeto inclui o roteiro `DEMO-TEFE-8-FLUXOS.md`, com os oito locais, exemplos de comentários para avaliação, passos para testar cada fluxo e fontes locais para conferência. As imagens geradas são ilustrativas e não devem ser apresentadas como fotografias reais dos pontos turísticos.

## Observações

- As avaliações válidas são publicadas imediatamente como `approved` pela implementação atual.
- A administração de destinos e avaliações ocorre no painel Payload em `/admin`, não em uma página administrativa separada do frontend.
- Para uso em produção, configure um `PAYLOAD_SECRET` forte e exclusivo, HTTPS e uma estratégia de backup do arquivo SQLite.
- Este pacote mantém a estrutura e as funcionalidades do projeto fornecido. O ambiente de geração não possui Node 24 nem pnpm instalados; por isso, a compilação final deve ser verificada localmente após instalar a versão de Node exigida.
