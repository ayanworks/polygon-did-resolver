# ⚠️ ARCHIVED REPOSITORY

This repository is being archived. For the latest features, security updates, and active development, please see the up-to-date version here:

👉 **[https://github.com/ayanworks/polygon-did-modules](https://github.com/ayanworks/polygon-did-modules)**

---
# Polygon DID Resolver

The polygon resolver library is used for resolving DID’s in Polygon Method Space. The module is supposed to be used as an integration to polygon library.

## Install

```
pnpm install
```

## Usage

In combination with the DID-Resolver:

```js
import { resolveDID } from 'polygon-did-resolver'
const didDocument = await resolveDID(did)
```

The function returns a DID Document.

## Testing

For testing use the command

```
pnpm run test
```
