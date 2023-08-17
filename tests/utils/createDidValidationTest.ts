import { it } from 'node:test'
import assert from 'node:assert'
import { POLYGON_DID_REGEX } from '../../src/utils/helpers'

export const createDidValidationTest = ({
  did,
  isValid,
}: {
  did: string
  isValid: boolean
}) => {
  it(`should validate ${did}`, (_) => {
    assert.strictEqual(POLYGON_DID_REGEX.test(did), isValid)
  })
}
