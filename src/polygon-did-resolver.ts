import * as dot from "dotenv";
import * as log4js from "log4js";
import * as networkConfiguration from './configuration.json';
import { ethers } from "ethers";
import { BaseResponse } from "./base-response";
const DidRegistryContract = require('@ayanworks/polygon-did-registry-contract');

dot.config();
const logger = log4js.getLogger();
logger.level = `debug`;

/**
 * Resolves DID Document
 * @param did
 * @returns Return DID Document on chain
 */
export async function resolveDID(
    did: string,
): Promise<BaseResponse> {
    try {

        let errorMessage: string;
        let url: string;
        let contractAddress: string;

        if (did && did.split(':')[2] === 'testnet' && did.match(/^did:polygon:testnet:0x[0-9a-fA-F]{40}$/) ||
            did && did.match(/^did:polygon:0x[0-9a-fA-F]{40}$/)
        ) {
            if (did.split(':')[2] === 'testnet' && did.match(/^did:polygon:testnet:\w{0,42}$/) ||
                did.match(/^did:polygon:\w{0,42}$/)
            ) {

                if (did && did.split(':')[2] === 'testnet') {

                    url = `${networkConfiguration[0].testnet?.URL}`;
                    contractAddress = `${networkConfiguration[0].testnet?.CONTRACT_ADDRESS}`;
                } else {

                    url = `${networkConfiguration[1].mainnet?.URL}`;
                    contractAddress = `${networkConfiguration[1].mainnet?.CONTRACT_ADDRESS}`;
                }

                const provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(
                    url
                );
                const registry: ethers.Contract = new ethers.Contract(
                    contractAddress,
                    DidRegistryContract.abi,
                    provider
                );

                const didAddress = did.split(":")[2] === 'testnet' ? did.split(":")[3] : did.split(":")[2];

                // Calling smart contract with getting DID Document
                let returnDidDoc: any = await registry.functions
                    .getDID(didAddress)
                    .then((resValue: any) => {
                        return resValue;
                    });

                logger.debug(
                    `[resolveDID] readDIDDoc - ${JSON.stringify(returnDidDoc)} \n\n\n`
                );

                if (returnDidDoc && !returnDidDoc.includes("")) {
                    return BaseResponse.from(returnDidDoc, 'Resolve DID document successfully');
                } else {
                    errorMessage = `The DID document for the given DID was not found!`;
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