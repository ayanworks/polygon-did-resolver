import { testDid, privateKey } from "./test.data";
import { resolveDID } from '../src/polygon-did-resolver';

jest.setTimeout(30000);

describe("test resolver function", () => {

    test("should create polygon DID", async res => {
        try {
            const createDidRes = await resolveDID(testDid, privateKey)
                .then((response) => {
                    return response;
                })
            await expect(createDidRes)
            res();
        } catch (error) {
            res(error);
        }
    });
});