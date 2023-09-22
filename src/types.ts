// Type definitions for hdkey 2.0
// Project: https://github.com/cryptocoinjs/hdkey

import * as Buffer from "buffer";

declare class HDNode {
  static fromMasterSeed(
    seed: Buffer,
    versions?: {private: number; public: number},
  ): HDNode
  publicKey: Buffer
  privateKey: Buffer
  chainCode: Buffer
  constructor()
  derive(path: string): HDNode
  deriveChild(index: number): HDNode
  toJSON(): {xpriv: string; xpub: string}
  static fromJSON(obj: {xpriv: string; xpub: string}): HDNode
  static fromExtendedKey(xpriv: string): HDNode
  sign(hash: Buffer): Buffer
  verify(hash: Buffer, signature: Buffer): boolean
  wipePrivateData(): HDNode
  privateExtendedKey: string
  publicExtendedKey: string
  pubKeyHash: Buffer
}

export {HDNode}
