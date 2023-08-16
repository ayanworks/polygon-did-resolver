import { testDid } from './fixtures/test.data'
import { getResolver } from '../src'
import { describe, it, before } from 'node:test'
import assert from 'node:assert'
import { DIDResolutionResult, Resolver } from 'did-resolver'

describe('polygon-did-resolver', () => {
  let resolveDidRes: DIDResolutionResult
  before(async () => {
    const polygonDidResolver = getResolver()
    let resolver = new Resolver(polygonDidResolver)
    resolveDidRes = await resolver.resolve(testDid)
  })

  it('should be polygon DID', async () => {
    if (testDid && testDid.split(':')[2] === 'testnet') {
      assert.strictEqual(testDid.slice(0, 19), 'did:polygon:testnet')
      assert.strictEqual(testDid.slice(20, 22), '0x')
      assert.strictEqual(testDid.split(':')[3].length, 42)
    } else {
      assert.strictEqual(testDid.slice(0, 12), 'did:polygon')
      assert.strictEqual(testDid.slice(12, 14), '0x')
      assert.equal(testDid.split(':')[2].length, 42)
    }
  })

  it('should get DID document', async () => {
    assert.ok(resolveDidRes.didDocument)
  })
})
