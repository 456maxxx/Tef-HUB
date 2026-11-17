# TFHub — demonstração dos 8 fluxos com exemplos de Tefé/AM

Esta versão inclui cadastros demonstrativos de onze lugares, espaços e experiências de interesse de Tefé e da região do Médio Solimões:

1. Lago de Tefé
2. Praia da Ponta Branca
3. Catedral de Santa Teresa
4. Casa do Artesão de Tefé
5. Praça Santa Teresa
6. Feira Municipal de Tefé
7. Reserva Mamirauá
8. Floresta Nacional de Tefé
9. Seminário São José (Cultura)
10. Trilha Interpretativa da Floresta Nacional de Tefé (Aventura)
11. Café Regional da Feira Municipal (Gastronomia)

Os registros são criados automaticamente pelo `src/seed.ts` quando o Payload inicia. A rotina verifica cada slug e só cria o que ainda não existe; ela não apaga nem sobrescreve conteúdo já cadastrado. Assim, também funciona em um banco que já tenha dados.

> **Importante:** as imagens geradas para os novos registros são ilustrações de demonstração, não fotografias documentais dos locais. A interface exibe esse aviso. Antes de publicar o sistema, substitua-as por fotos próprias ou autorizadas. Descrições, horários, condições de acesso, serviços e programação devem ser confirmados com os responsáveis locais; não use este conteúdo como informação operacional atualizada.

## Iniciar no Windows

Requisito do projeto: Node.js `24.22.1` ou superior na linha 24 e pnpm 9, 10 ou 11.

1. Extraia o ZIP.
2. Abra a pasta extraída no VS Code.
3. Abra o terminal nessa pasta.
4. Execute:

```powershell
pnpm install
pnpm generate:types
pnpm dev
```

5. Acesse `http://localhost:3000`.
6. Abra `http://localhost:3000/pontos-turisticos` para conferir os locais de demonstração.
7. Abra `http://localhost:3000/admin` para criar o primeiro administrador, caso ainda não exista.

Se preferir npm, os comandos equivalentes são `npm install`, `npm run generate:types` e `npm run dev`.

## Preparar os dois tipos de conta

- **Visitante/usuário comum:** acesse `/cadastro` e crie uma conta com um e-mail seu de teste. Não existe senha demonstrativa compartilhada no projeto.
- **Administrador:** acesse `/admin` e conclua a criação do primeiro administrador do Payload. Guarde a senha em local seguro. Não reutilize credenciais pessoais em uma apresentação.

## Roteiro prático para demonstrar os oito fluxos

### 1. Cadastro de usuário

- Abra `/cadastro`.
- Crie uma conta de demonstração.
- Teste uma senha com menos de 8 caracteres ou confirmação diferente para mostrar a validação.

### 2. Login e logout

- Saia da conta, se estiver autenticado.
- Entre em `/login` com a conta criada.
- Abra `/perfil` e use **Sair da conta**.

### 3. Explorar e filtrar destinos

- Abra `/pontos-turisticos`.
- Selecione as categorias **Natureza**, **Cultura**, **Aventura** e **Gastronomia**.
- Compare os resultados e volte para **Todos**.

### 4. Consultar detalhes de um ponto

- Abra exemplos de todas as categorias: **Lago de Tefé** (Natureza), **Seminário São José** (Cultura), **Trilha Interpretativa da FLONA** (Aventura) e **Café Regional da Feira Municipal** (Gastronomia).
- Mostre descrição, localização, categoria, duração estimada e destaques.
- Explique que horários e condições reais precisam ser confirmados localmente.

### 5. Enviar avaliação

- Entre com a conta comum.
- Abra **Lago de Tefé**.
- Envie uma nota e um comentário de demonstração, por exemplo: `Gostei de conhecer a paisagem e a relação do lago com a cidade.`
- Tente avaliar o mesmo destino novamente com a mesma conta para demonstrar o bloqueio de duplicidade.

### 6. Gerenciar perfil

- Abra `/perfil`.
- Altere o nome exibido.
- Confira a avaliação feita no fluxo anterior.
- Exclua a avaliação de teste, se desejar repetir a demonstração.

### 7. CRUD de pontos turísticos

- Entre no `/admin` com a conta administradora.
- Abra a coleção **Attractions**.
- **Create:** cadastre um ponto de teste, por exemplo `Ponto de demonstração — Orla de Tefé`.
- **Read:** localize e abra o registro.
- **Update:** altere a descrição e salve.
- **Delete:** exclua somente o registro de teste criado para a apresentação.
- Não exclua os oito registros demonstrativos originais se quiser reutilizá-los.

### 8. Administrar avaliações

- Ainda no `/admin`, abra **Reviews**.
- Localize a avaliação criada no fluxo 5.
- Altere o status para `pending` ou `rejected` e salve; depois, se desejar, volte para `approved`.
- Teste a exclusão da avaliação de demonstração.
- O sistema tenta recalcular a média e a quantidade de avaliações do destino após alterações.

## Como controlar a carga dos dados demonstrativos

No `.env.local`:

```env
SEED_DEMO_DATA=true
```

- `true`: habilita a criação dos registros ausentes também em ambiente de produção (use somente de forma consciente).
- `false`: desliga a carga automática.
- Em desenvolvimento, se a variável não estiver definida, a carga fica habilitada por padrão.

A carga é aditiva: se já houver registros com os mesmos slugs, eles são mantidos sem alterações. Para remover um registro de demonstração, use o painel `/admin` e exclua apenas o item desejado.

## Fontes para conferir os locais

- Prefeitura de Tefé — Praia da Ponta Branca e regras de uso da orla: https://tefe.am.gov.br/decreto/2022/09/22/decreto-municipal-122-2022-estabelece-normas-e-criterios-para-utilizacao-do-espaco-publico-da-orla-e-praia-da-ponta-branca-no-municipio-de-tefe/
- Secretaria Municipal de Cultura — espaços culturais, incluindo Casa do Artesão e Praça Santa Teresa: https://cultura.tefe.am.gov.br/espacos
- Prefeitura de Tefé — histórico da Catedral de Santa Teresa: https://tefe.am.gov.br/museu/hall-da-fama/monsenhor-miguel-alfredo-barrat
- Instituto Mamirauá — informações sobre Tefé e reservas próximas: https://mamiraua.org.br/tefe/
- Floresta Nacional de Tefé — informações sobre conservação e turismo de base comunitária: https://www.flonadetefe.com/ (inclui informação sobre trilha interpretativa guiada por comunitários)
- Prefeitura de Tefé — Feira Municipal: https://tefe.am.gov.br/prefeitura/2022/05/25/trecho-da-rua-duque-de-caxias-principal-via-de-acesso-a-feira-municipal-recebe-servicos-de-recuperacao-da-prefeitura-de-tefe/

TeféNews também descreve o Seminário São José e as opções de café regional na Feira Municipal: https://tefenews.com.br/cidade/tefe-roteiro-com-dicas-imperdiveis-do-que-fazer-na-cidade-que-fica-no-coracao-do-am

Essas fontes confirmam a existência/relevância dos espaços citados, mas não garantem horários, disponibilidade ou condições atuais de visitação.
