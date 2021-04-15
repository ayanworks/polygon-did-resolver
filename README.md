# Polygon DID Resolver

The polygon resolver library is used for resolving DID’s in Polygon Method Space

## Install

```
npm install
```

## Usage

The example script shows how we can integrate the polygon-did-resolver:

```
const provider = new ethers.providers.JsonRpcProvider(url);
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
let registry = new ethers.Contract(DID_ADDRESS, polygonDIDResolveABI, wallet);
import { polygonDIDResolveABI } from './PolygonDIDResolveABI';

let returnDidDoc = await registry.functions.getDID(address)
    .then((resDidDocument) => {
        return resDidDocument;
    })
return returnDidDoc;
```

