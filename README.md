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
