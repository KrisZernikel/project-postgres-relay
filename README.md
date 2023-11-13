# Project Postgres

## Installation

```shell
npm install -g postgraphile
postgraphile -c 'postgres://root:rootpassword@localhost/Operational' --watch --enhance-graphiql --dynamic-json --export-schema-graphql 'schema.graphql' --classic-ids
```

## Relay Configuration

```json
{
  "src": "./src",
  "language": "javascript",
  "schema": "./src/schema.graphql",
  "exclude": [
    "**/node_modules/**",
    "**/__mocks__/**",
    "**/__generated__/**"
  ],
  "schemaConfig": {
    "nodeInterfaceIdField": "nodeId"
  }
}
```

## Resources

- [postgraphile](https://www.graphile.org/postgraphile/usage-cli/)