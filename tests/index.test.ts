import { DIDS, testDid } from './fixtures/test.data'
import { getResolver } from '../src'
import { describe, it, before } from 'node:test'
import assert from 'node:assert'
import { DIDResolutionResult, Resolver } from 'did-resolver'
import { createDidValidationTest } from './utils/createDidValidationTest'

describe('polygon-did-resolver', () => {
  let resolveDidRes: DIDResolutionResult

  describe('Validate did', () => {
    DIDS.forEach(createDidValidationTest)
  })

  // describe('Validate did document', () => {
  //   before(async () => {
  //     const polygonDidResolver = getResolver()
  //     const resolver = new Resolver(polygonDidResolver)
  //     resolveDidRes = await resolver.resolve(testDid)
  //   })
  //   it('should get DID document', async () => {
  //     assert.ok(resolveDidRes.didDocument)
  //   })
  // }) //commented for git actions
})
