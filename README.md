# Polygon DID Resolver

The polygon resolver library is used for resolving DID’s in Polygon Method Space

## Install

```
npm install
```

## Usage

In combination with the DID-Resolver:

```
import { resolveDID } from "polygon-did-resolver";
const didDocument = await resolveDID(did);
```

## Testing

```
npm run test
```