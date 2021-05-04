import { testDid, privateKey, url, contractAddress } from "./test.data";
import { resolveDID } from '../src/polygon-did-resolver';
import { BaseResponse } from '../src/base-response'

jest.setTimeout(30000);

describe("test resolver function", () => {

    let resolveDidRes: BaseResponse;

    it('should be polygon DID for resolve DID', async () => {
        if (testDid && testDid.split(':')[2] === 'testnet') {

            await expect(testDid).toBeDefined();
            await expect(testDid).not.toBeNull();
            await expect(testDid).not.toBe('');
            await expect(testDid.slice(0, 19)).toMatch('did:polygon:testnet');
            await expect(testDid.slice(20, 22)).toMatch('0x');
            await expect(testDid.split(":")[3].length).toBe(42);
        } else {

            await expect(testDid).toBeDefined();
            await expect(testDid).not.toBeNull();
            await expect(testDid).not.toBe('');
            await expect(testDid.slice(0, 12)).toMatch('did:polygon');
            await expect(testDid.slice(12, 14)).toMatch('0x');
            await expect(testDid.split(":")[2].length).toBe(42);
        }
    })

    it('should be private key for resolve DID', async () => {
        await expect(privateKey).not.toBeNull();
        await expect(privateKey).not.toBe('');
        await expect(privateKey.length).toBe(66);
        await expect(privateKey.slice(0, 2)).toMatch('0x');

    })

    beforeAll(async () => {
        resolveDidRes = await resolveDID(testDid);
    })

    it('should get DID document', async () => {
        await expect(resolveDidRes.data).not.toBeNull();
        await expect(resolveDidRes.data).toBeDefined();
        await expect(resolveDidRes.data).not.toBe('');
        await expect(Object.keys(JSON.parse(resolveDidRes.data)))
            .toEqual(expect.arrayContaining(['@context', 'id', 'verificationMethod']));
    })
});