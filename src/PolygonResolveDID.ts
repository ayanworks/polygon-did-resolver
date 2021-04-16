import { polygonDIDResolveABI } from './PolygonDIDResolveABI';
import * as log4js from "log4js";
var ethers = require('ethers');
import * as dot from 'dotenv';

dot.config();

const url = process.env.URL;
const DID_ADDRESS = process.env.DID_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(url);
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
let registry = new ethers.Contract(DID_ADDRESS, polygonDIDResolveABI, wallet);

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const did = process.argv[2];

export class PolyGonDIDRResolve {

    constructor() { }

    /**
     * Match DID and address and then sending to the internal function 
     * @param did 
     * @returns 
     */
    async resolveDID(did: string): Promise<string> {
        try {

            if (did && (did.match(/^did:polygon:0x[0-9a-fA-F]{40}$/))) {

                if (did.match(/^did:polygon:\w{0,42}$/)) {

                    // Send the address for resolveDID function
                    const readDIDDoc = await this.getDID(did.split(':')[2])
                    logger.debug(`****** [resolveDID] ****** readDIDDoc - ${JSON.stringify(readDIDDoc)} \n\n\n`);
                    return readDIDDoc;

                } else {

                    throw new Error("Invalid address has been entered!");
                }
            } else {

                throw new Error("Invalid DID has been entered!");
            }
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Fetch DID Document from the matic chain 
     * @param address 
     * @returns 
     */
    async getDID(address: string): Promise<string> {
        try {
            // Calling smart contract with getting DID Document
            let returnDidDoc = await registry.functions.getDID(address)
                .then((resDidDocument) => {
                    return resDidDocument;
                })
            return returnDidDoc;
        }
        catch (error) {
            throw error;
        }
    }
}

const polyGonDIDRResolve = new PolyGonDIDRResolve();
polyGonDIDRResolve.resolveDID(did);