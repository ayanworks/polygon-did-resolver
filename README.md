# Polygon DID Resolver

The polygon resolver library is used for resolving DID’s in Polygon Method Space

## Install

```
npm install
```

## Usage

The example script shows how we can integrate the polygon-did-resolver:

```
const url = https://rpc-mumbai.matic.today; // For polygon testnet
const provider = new ethers.providers.JsonRpcProvider(url);
let wallet = new ethers.Wallet(<Signer key/Private Key>, provider);
let registry = new ethers.Contract(<Contract Address>, <Contract ABI>, wallet);

let returnDidDoc = await registry.functions.getDID(<DID Address>)
```

