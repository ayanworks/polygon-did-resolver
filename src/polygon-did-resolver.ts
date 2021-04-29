import * as dot from "dotenv";
import * as log4js from "log4js";
import { ethers } from "ethers";
import { BaseResponse } from "./base-response";
import { default as CommonConstants } from "./configuration";
const DidRegistryContract = require('polygon-did-registry-contract');

dot.config();
const logger = log4js.getLogger();
logger.level = `${CommonConstants.LOGGER_LEVEL}`;

/**
 * Resolves DID Document
 * @param did
 * @param privateKey
 * @param url
 * @param contractAddress
 * @returns Return DID Document on chain
 */
export async function resolveDID(
    did: string,
    privateKey: string,
    url?: string,
    contractAddress?: string
): Promise<BaseResponse> {
    try {

        const URL: string = url || `${CommonConstants.URL}`;
        const CONTRACT_ADDRESS: string = contractAddress || `${CommonConstants.CONTRACT_ADDRESS}`;

        const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(
            URL
        );
        const wallet: ethers.Wallet = new ethers.Wallet(privateKey, provider);
        const registry: ethers.Contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            DidRegistryContract.abi,
            wallet
        );

        let errorMessage: string;

        if (did && did.match(/^did:polygon:0x[0-9a-fA-F]{40}$/)) {
            if (did.match(/^did:polygon:\w{0,42}$/)) {
                // Calling smart contract with getting DID Document
                let returnDidDoc: any = await registry.functions
                    .getDID(did.split(":")[2])
                    .then((resValue: any) => {
                        return resValue;
                    });

                logger.debug(
                    `[resolveDID] readDIDDoc - ${JSON.stringify(returnDidDoc)} \n\n\n`
                );

                if (returnDidDoc && !returnDidDoc.includes("")) {
                    return BaseResponse.from(returnDidDoc, 'Resolve DID document successfully');
                } else {
                    errorMessage = `The DID document has been deleted!`;
                    logger.error(errorMessage);
                    throw new Error(errorMessage);
                }
            } else {
                errorMessage = `Invalid address has been entered!`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
        } else {
            errorMessage = `Invalid DID has been entered!`;
            logger.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        logger.error(`Error occurred in resolveDID function ${error}`);
        throw error;
    }
}