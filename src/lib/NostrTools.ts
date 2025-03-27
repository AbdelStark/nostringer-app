import { generateSecretKey as nostrGenerateSecretKey } from "nostr-tools/pure";
import { bytesToHex } from "@noble/hashes/utils";
import * as secp256k1 from "@noble/secp256k1";

export interface KeyPair {
  privateKeyHex: string;
  publicKeyHex: string;
}

export const NostrTools = {
  generateKeyPair(): KeyPair {
    const privKey = nostrGenerateSecretKey();
    const privateKeyHex = bytesToHex(privKey);

    const pubKey = secp256k1.ProjectivePoint.fromPrivateKey(privKey);
    const publicKeyHex = pubKey.x.toString(16).padStart(64, "0");

    return { privateKeyHex, publicKeyHex };
  },

  generateKeyPairs(count: number = 3): KeyPair[] {
    return Array.from({ length: count }, () => this.generateKeyPair());
  },

  getPublicKeys(keyPairs: KeyPair[]): string[] {
    return keyPairs.map((kp) => kp.publicKeyHex);
  },
};
