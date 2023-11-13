# Project Postgres

This is a project starter for react relay and postgraphile.

## Installation

```shell
npm install -g postgraphile
postgraphile -c 'postgres://myuser:mypassword@localhost/localdb' --watch --enhance-graphiql --dynamic-json --export-schema-graphql 'schema.graphql' --classic-ids
```

## Resources

- [postgraphile](https://www.graphile.org/postgraphile/usage-cli/)