# Relay Configuration

[Relay Compiler](https://github.com/facebook/relay/blob/main/packages/relay-compiler/README.md)

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
