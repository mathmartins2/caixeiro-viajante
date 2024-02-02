## Pré-requisitos

Antes de iniciar, certifique-se de que você tem instalado em sua máquina:

- Node.js (recomenda-se a versão LTS)
- PNPM

Você pode instalar o PNPM globalmente, caso ainda não tenha, utilizando:

```bash
npm install -g pnpm
```

### Configurando o Backend (NestJS)

1. Navegue até a pasta do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências do projeto:

   ```bash
   pnpm install
   ```

3. Crie um arquivo `.env` na raiz do backend e configure as variáveis de ambiente necessárias, seguindo o exemplo do arquivo `.env.example`.

4. Para iniciar o servidor de desenvolvimento, execute:

   ```bash
   pnpm run start:dev
   ```

O servidor backend estará rodando em [http://localhost:3000](http://localhost:3000) (ou na porta configurada nas variáveis de ambiente).

### Configurando o Frontend (React)

1. Abra um novo terminal e navegue até a pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências do projeto:

   ```bash
   pnpm install
   ```

3. Crie um arquivo `.env` na raiz do backend e configure as variáveis de ambiente necessárias, seguindo o exemplo do arquivo `.env.example`.

4. Para iniciar o servidor de desenvolvimento do React, execute:

   ```bash
   pnpm run dev
   ```

O aplicativo React estará disponível em [http://localhost:5173](http://localhost:5173).

## Testes

Para executar os testes, use os seguintes comandos:

### Backend

```bash
cd backend
pnpm test
```
