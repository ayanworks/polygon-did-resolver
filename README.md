# Polygon DID Resolver

The polygon resolver library is used for resolving DID’s in Polygon Method Space. The module is supposed to be used as an integration to polygon library.

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
The function returns a DID Document.

## Testing

For testing use the command

```
npm run test
```
