# Full Cycle Clean Architecture

Projeto TypeScript implementando Clean Architecture com casos de uso para as entidades Customer e Product.

## Requisitos

- Node.js >= 18
- npm

## Instalação

```bash
npm install
```

## Executando os Testes

### Todos os testes

```bash
npm test
```

> `npm test` executa a verificação de tipos do TypeScript (`tsc --noEmit`) seguida da suíte completa do Jest.

### Apenas testes de unidade

```bash
./node_modules/.bin/jest --testPathPattern="unit.spec"
```

### Apenas testes de integração

```bash
./node_modules/.bin/jest --testPathPattern="integration.spec"
```

### Apenas casos de uso de Product

```bash
./node_modules/.bin/jest --testPathPattern="src/usecase/product"
```

### Apenas casos de uso de Customer

```bash
./node_modules/.bin/jest --testPathPattern="src/usecase/customer"
```

## API

### Executando a API

```bash
npm run dev
```

A API sobe por padrão na porta `3000` (configurável via variável de ambiente `PORT` no arquivo `.env`).

### Endpoints disponíveis

#### Customer

| Método | Rota        | Descrição              |
|--------|-------------|------------------------|
| POST   | `/customer` | Cria um novo customer  |
| GET    | `/customer` | Lista todos os customers |

#### Product

| Método | Rota       | Descrição             |
|--------|------------|-----------------------|
| GET    | `/product` | Lista todos os products |

A rota `GET /product` suporta negociação de conteúdo:
- `Accept: application/json` (padrão) — retorna JSON
- `Accept: application/xml` — retorna XML

**Exemplo de resposta JSON:**
```json
{
  "products": [
    { "id": "uuid", "name": "Product 1", "price": 10.0 }
  ]
}
```

**Exemplo de resposta XML:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product>
    <id>uuid</id>
    <name>Product 1</name>
    <price>10</price>
  </product>
</products>
```

### Testes E2E

```bash
./node_modules/.bin/jest --testPathPattern="e2e.spec"
```

Os testes E2E simulam requisições HTTP reais contra a API usando **supertest** com banco SQLite em memória.

| Arquivo de Teste                          | Cobertura                                         |
|-------------------------------------------|---------------------------------------------------|
| `customer.e2e.spec.ts`                    | POST `/customer`, GET `/customer` (JSON e XML)    |
| `product.e2e.spec.ts`                     | GET `/product` (JSON, XML, lista vazia)           |

## Cobertura de Testes

Cada caso de uso possui testes de **unidade** e de **integração**:

| Caso de Uso | Teste de Unidade | Teste de Integração |
|---|---|---|
| CreateProduct | `create.product.unit.spec.ts` | `create.product.integration.spec.ts` |
| FindProduct | `find.product.unit.spec.ts` | `find.product.integration.spec.ts` |
| ListProduct | `list.product.unit.spec.ts` | `list.product.integration.spec.ts` |
| UpdateProduct | `update.product.unit.spec.ts` | `update.product.integration.spec.ts` |
| CreateCustomer | `create.customer.unit.spec.ts` | — |
| FindCustomer | `find.customer.unit.spec.ts` | `find.customer.integration.spec.ts` |
| ListCustomer | `list.customer.unit.spec.ts` | — |
| UpdateCustomer | `update.customer.unit.spec.ts` | — |

**Testes de unidade** utilizam repositórios mockados e validam a lógica de negócio de forma isolada.

**Testes de integração** utilizam um banco de dados SQLite em memória via Sequelize e validam o fluxo completo de ponta a ponta.
