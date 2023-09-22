export interface WalletCore {
  mnemonic: string
  xprv: string
}

export const bitsOfEntropy: {[key: number]: number} = {
  12: 128,
  15: 160,
  18: 192,
  21: 224,
  24: 256,
}

export const defaultEntropyLength = 128
export const defaultMnemonicLength = 12
