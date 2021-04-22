import { polygonDIDResolveABI } from "./polygon-did-resolve-abi";
import * as log4js from "log4js";
var ethers = require("ethers");
import * as dot from "dotenv";

dot.config();
const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

let registry;

/**
 * Match DID and address and then sending to the internal function
 * @param did
 * @returns
 */
export async function resolveDID(did: string, privateKey: string, url?: string, contractAddress?: string): Promise<any> {
    try {

        const URL = url || process.env.URL;
        const CONTRACT_ADDRESS = contractAddress || process.env.CONTRACT_ADDRESS;
        const PRIVATE_KEY = privateKey;
        const provider = new ethers.providers.JsonRpcProvider(URL);

        let wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        registry = new ethers.Contract(CONTRACT_ADDRESS, polygonDIDResolveABI, wallet);

        if (did && did.match(/^did:polygon:0x[0-9a-fA-F]{40}$/)) {

            if (did.match(/^did:polygon:\w{0,42}$/)) {

                // Send the address for resolveDID function
                const readDIDDoc = await getDID(did.split(":")[2]);
                logger.debug(`readDIDDoc - ${JSON.stringify(readDIDDoc)} \n\n\n`);
                return readDIDDoc;

            } else {
                throw new Error("Invalid address has been entered!");
            }
        } else {
            throw new Error("Invalid DID has been entered!");
        }
    } catch (error) {
        logger.error(`Error occurred in resolveDID function ${error}`);
        throw error;
    }
}

/**
 * Fetch DID Document from the matic chain
 * @param address
 * @returns
 */
async function getDID(address: string): Promise<string> {
    try {
        // Calling smart contract with getting DID Document
        let returnDidDoc = await registry.functions
            .getDID(address)
            .then((resDidDocument) => {
                return resDidDocument;
            });
        return returnDidDoc;
    } catch (error) {
        logger.error(`Error occurred in getDID function ${error}`);
        throw error;
    }
}
