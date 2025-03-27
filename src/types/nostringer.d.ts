declare module "nostringer" {
  export interface RingSignature {
    c0: string;
    s: string[];
  }

  export function sign(
    message: string | Uint8Array,
    privateKeyHex: string,
    publicKeysHex: string[],
  ): Promise<RingSignature>;

  export function verify(
    signature: RingSignature,
    message: string | Uint8Array,
    publicKeysHex: string[],
  ): Promise<boolean>;
}
