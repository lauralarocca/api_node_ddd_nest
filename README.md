# App

Fórum App

API RESTfull com NodeJS, aplicando os fundamentos de DDD (Domain-Driven Design) e Clean Architecture, utilizando o NestJs. 
Além disso foram utilizados os conceitos principais do Nest, como injeção de dependência, controllers, services, modules, e presenters, mappers, factories, etc.

Neste projeto foram utilizados:
- `TypeScript`
- `NestJS`
- `Prisma`
- `Docker`
- `Bcryptjs`
- `Zod`
- `Autenticação JWT`
- `ESLint`
- `Faker`
- `Testes Unitários e E2E com Vitest`


## 💻 Pré-requisitos

Para rodar o projeto é necessário ter instalado:

- `NodeJS`
- `Npm`


## 🚩 Instalando Dependências

Para instalar as dependências da aplicação, execute:

```
npm install
```


## 📜 Migrations

Para executar as migrations, execute:

```
npx prisma migrate dev
```

## 🚀 Executando

Para rodar a aplicação, execute:

```
npm run start:dev
```

## 🚦 Testes

Para rodar os testes unitários da aplicação, execute:

```
npm test
```

Para rodar os testes E2E da aplicação, execute:

```
npm test:e2e
```