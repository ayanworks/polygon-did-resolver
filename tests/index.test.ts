import { testDid, privateKey, url, contractAddress } from "./test.data";
import { resolveDID } from '../src/polygon-did-resolver';

jest.setTimeout(30000);

describe("test resolver function", () => {

    test("should resolve polygon DID without url and contract address", async res => {
        try {

            // input testDid
            await expect(testDid).not.toBeNull();
            await expect(testDid).not.toBe('');
            await expect(testDid.slice(0, 12)).toMatch('did:polygon:');
            await expect(testDid.slice(12, 14)).toMatch('0x');
            await expect(testDid.split(":")[2].length).toBe(42);

            // input privateKey
            await expect(privateKey).not.toBeNull();
            await expect(privateKey).not.toBe('');
            await expect(privateKey.length).toBe(66);
            await expect(privateKey.slice(0, 2)).toMatch('0x');

            const resolveDidRes = await resolveDID(testDid, privateKey)
                .then((response) => {
                    return response;
                })

            // output DID Doc
            await expect(resolveDidRes.data).not.toBeNull();
            await expect(resolveDidRes.data).not.toBe('');
            await expect(Object.keys(JSON.parse(resolveDidRes.data)))
                .toEqual(expect.arrayContaining(['@context', 'id', 'verificationMethod']));

            res();
        } catch (error) {
            res(error);
        }
    });

    test("should resolve polygon DID with url and contract address", async res => {
        try {

            // input testDid
            await expect(testDid).not.toBeNull();
            await expect(testDid).not.toBe('');
            await expect(testDid.slice(0, 12)).toMatch('did:polygon:');
            await expect(testDid.slice(12, 14)).toMatch('0x');
            await expect(testDid.split(":")[2].length).toBe(42);

            // input privateKey
            await expect(privateKey).not.toBeNull();
            await expect(privateKey).not.toBe('');
            await expect(privateKey.length).toBe(66);
            await expect(privateKey.slice(0, 2)).toMatch('0x');

            // input url
            await expect(url).not.toBeNull();
            await expect(url).not.toBe('');
            await expect(url.slice(0, 8)).toMatch('https://');

            // input contractAddress
            await expect(contractAddress).not.toBeNull();
            await expect(contractAddress).not.toBe('');
            await expect(contractAddress.length).toBe(42);
            await expect(contractAddress.slice(0, 2)).toMatch('0x');

            const resolveDidRes = await resolveDID(testDid, privateKey, url, contractAddress)
                .then((response) => {
                    return response;
                })

            // output DID Doc
            await expect(resolveDidRes.data).not.toBeNull();
            await expect(resolveDidRes.data).not.toBe('');
            await expect(Object.keys(JSON.parse(resolveDidRes.data)))
                .toEqual(expect.arrayContaining(['@context', 'id', 'verificationMethod']));

            res();
        } catch (error) {
            res(error);
        }
    });
});