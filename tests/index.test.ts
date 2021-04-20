import { testDid } from "./test.data";
import { resolveDID } from '../src/polygon-did-resolver';

describe("test resolver function", () => {

    it("should resolve polygon DID", async () => {
        await expect(resolveDID(testDid));
    });

    it("should fail if DID string is wrong", async () => {
        await expect(resolveDID("did:polygon:notHex")).rejects.toThrow();
    });
});