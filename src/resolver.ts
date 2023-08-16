// @ts-nocheck
import { Contract, providers } from 'ethers'
import { DIDResolutionResult, DIDResolver, ParsedDID } from 'did-resolver'
import DidRegistryContract from '@ayanworks/polygon-did-registry-contract'
import { parseDid, validateDid } from './utils/did'
/**
 * Resolves DID Document.
 * @param did
 * @returns Return DID Document on chain.
 */
export function getResolver(): Record<string, DIDResolver> {
  async function resolve(did: string): Promise<DIDResolutionResult> {
    const didDocumentMetadata = {}
    try {
      const isValidDid = validateDid(did)
      if (!isValidDid) {
        throw new Error('invalid did provided')
      }

      const parsedDid = parseDid(did)

      const provider = new providers.JsonRpcProvider(parsedDid.networkUrl)
      const registry = new Contract(
        parsedDid.contractAddress,
        DidRegistryContract.abi,
        provider,
      )

      // Calling smart contract with getting DID Document
      const didDocument: any = await registry.functions
        .getDIDDoc(parsedDid.didAddress)
        .then((resValue: any) => {
          return resValue
        })

      if (!didDocument) {
        throw new Error(`The DID document for the given DID was not found!`)
      }
      return {
        didDocument,
        didDocumentMetadata,
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
      }
    } catch (error) {
      throw error
    }
  }
  return { polygon: resolve }
}
