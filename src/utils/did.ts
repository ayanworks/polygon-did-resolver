import { networkConfig } from '../config'
import { polygonMainnetDidRegex, polygonTestnetDidRegex } from './helpers'

export function getNetworkFromDid(did: string) {
  const network = did.split(':')[2]
  if (network === 'testnet') {
    return 'testnet'
  }

  return 'mainnet'
}

export function parseDid(did: string) {
  const network = getNetworkFromDid(did)
  const didAddress =
    network === 'testnet' ? did.split(':')[3] : did.split(':')[2]
  const contractAddress = networkConfig[network].CONTRACT_ADDRESS
  const networkUrl = networkConfig[network].URL

  return {
    network,
    contractAddress,
    networkUrl,
    didAddress,
  }
}

export function validateDid(did: string) {
  const network = getNetworkFromDid(did)
  if (network === 'testnet') {
    return polygonTestnetDidRegex.test(did)
  }

  return polygonMainnetDidRegex.test(did)
}
