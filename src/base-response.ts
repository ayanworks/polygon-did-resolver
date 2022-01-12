import * as didResolvers from "did-resolver";
import * as didPolygon from './polygon-did-resolver';


export class DidResolverService {
  public resolver: didResolvers.Resolver

  public constructor() {

    this.resolver = new didResolvers.Resolver(
      {
        ...didPolygon.getResolver(),
      },
      
      { cache: true }
    )
  }

  public resolve(didUrl: string ="did:polygon:testnet:0x78E9433504B717FD043c4C593965f32E0aB23bA5", options?: didResolvers.DIDResolutionOptions) {
      console.log(this.resolver);
      const resolved = this.resolver.resolve(didUrl, options);
      console.log(resolved);
      return (resolved);
  }
}