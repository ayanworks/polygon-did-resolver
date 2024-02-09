import { Contract, providers } from 'ethers'
import { DIDResolutionResult, DIDResolver } from 'did-resolver'
import DidRegistryContract from '@ayanworks/polygon-did-registry-contract'
import { parseDid, validateDid } from './utils/did'

/**
 * Resolves DID Document.
 * @param did
 * @returns Return DID Document on chain.
 */
export function getResolver(): Record<string, DIDResolver> {
  async function resolve(did: string): Promise<DIDResolutionResult> {
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
      const didDocument = await registry.functions.getDIDDoc(
        parsedDid.didAddress,
      )

      if (!didDocument[0]) {
        return {
          didDocument: null,
          didDocumentMetadata: {},
          didResolutionMetadata: {
            error: `NotFound!`,
            message: `resolver_error: Unable to resolve did '${did}'`,
          },
        }
      }
      const didDocumentJson = JSON.parse(didDocument[0])

      if (!didDocumentJson?.verificationMethod) {
        return {
          didDocument: didDocumentJson,
          didDocumentMetadata: {
            linkedResourceMetadata: [],
            deactivated: true,
          },
          didResolutionMetadata: { contentType: 'application/did+ld+json' },
        }
      }
      return {
        didDocument: didDocumentJson,
        didDocumentMetadata: {
          linkedResourceMetadata: didDocument[1].map((element: string) => {
            return JSON.parse(element)
          }),
        },
        didResolutionMetadata: { contentType: 'application/did+ld+json' },
      }
    } catch (error) {
      throw error
    }
  }
  return { polygon: resolve }
}
