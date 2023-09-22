import * as bip39 from 'bip39'
import wif from 'wif'
import {
  bitsOfEntropy,
  defaultEntropyLength,
  defaultMnemonicLength,
  WalletCore,
} from './config'
import CustomError from './helpers/custom-error'
// @ts-ignore
import {checkWords, normalize} from 'bip39-checker'
// @ts-ignore
import HDKey from 'hdkey'
import {HDNode} from './types'

export {HDNode}
/**
 * Converting a mnemonic to seed
 * @param {string} mnemonic - Mnemonic phrase
 * @returns {Buffer} - Seed in Uint8Array format
 */
export const mnemonicToSeed = (mnemonic: string): Buffer => {
  if (!checkMnemonic(mnemonic)) {
    throw new CustomError('err_core_mnemonic')
  }

  return bip39.mnemonicToSeedSync(mnemonic)
}

/**
 * Converting a mnemonic to entropy
 * @param {string} mnemonic - Mnemonic phrase
 * @returns {string} HEX strings entropy
 */
export const mnemonicToEntropy = (mnemonic: string): string => {
  if (!checkMnemonic(mnemonic)) {
    throw new CustomError('err_core_mnemonic')
  }

  return bip39.mnemonicToEntropy(mnemonic)
}

/**
 * Converting a seed to hdkey (Hierarchical Deterministic Key)
 * @param {Buffer} seed - Mnemonic seed in Buffer
 * @returns {Object} hdkey object with private and public key
 */
export const hdFromSeed = (seed: Buffer): HDNode => {
  if (!seed || !Buffer.isBuffer(seed)) {
    throw new CustomError('err_core_seed')
  }
  return HDKey.fromMasterSeed(seed)
}

/**
 * Converting a xprv to hdkey (Hierarchical Deterministic Key)
 * @param {string} xprv - Extended private key
 * @returns {Object} hdkey object with private and public key
 */
export const hdFromXprv = (xprv: string): HDNode => {
  try {
    return HDKey.fromExtendedKey(xprv)
  } catch (e) {
    throw new CustomError('err_core_xprv')
  }
}

/**
 * Derivation of node. Getting child node by path
 * @param {Object} hd - HDNode node
 * @param {string} path - Derivation path
 * @returns {Object} - Child node
 */

export const derive = (hd: HDNode, path: string): HDNode => {
  if (!hd) {
    throw new CustomError('err_core_derivation_hdkey')
  }

  if (!path) {
    throw new CustomError('err_core_derivation_path')
  }
  const regex = new RegExp(/(^m\/\d+\')([\/{1}\d+\'{1}]+)/gm)

  if (!regex.test(path)) {
    throw new CustomError('err_core_derivation_path')
  }

  return hd.derive(path)
}

/**
 * Converts a private key to the WIF (Wallet Import Format)
 * @param {Buffer} privateKey - Private key in Uint8Array format
 * @returns {string} Private key in WIF
 */
export const privateKeyToWIF = (privateKey: Buffer): string => {
  if (!privateKey || !Buffer.isBuffer(privateKey)) {
    throw new CustomError('err_core_private_key')
  }
  return wif.encode(128, privateKey, true)
}

export const createCoreByMnemonic = (mnemonic: string): WalletCore => {
  if (!checkMnemonic(mnemonic)) {
    throw new CustomError('err_core_mnemonic')
  }

  const normalize_mnemonic: string = normalize(mnemonic)
  let seed: any = mnemonicToSeed(normalize_mnemonic)
  let hdkey: any = hdFromSeed(seed)
  const xprv = hdkey.privateExtendedKey
  seed = null
  hdkey = null

  return {
    mnemonic: normalize_mnemonic,
    xprv,
  }
}

export const createMnemonic = (
  wordCount: number = defaultMnemonicLength,
): string => {
  if (!wordCount) {
    throw new CustomError('err_core_mnemonic_length')
  }
  const entropy = getEntropyLength(wordCount)

  return generateMnemonicByEntropyLength(entropy)
}

export const checkMnemonic = (mnemonic: string): boolean => {
  if (!mnemonic) {
    throw new CustomError('err_core_mnemonic')
  }

  const normalize_mnemonic: string = normalize(mnemonic)
  const words: string[] = normalize_mnemonic.split(' ')
  const withTypo: number[] = []

  words.forEach((word: string, index: number) => {
    if (!checkWords(word, 'english')) {
      withTypo.push(index)
    }
  })
  if (withTypo.length) {
    throw new CustomError('err_core_mnemonic')
  }
  return bip39.validateMnemonic(normalize_mnemonic)
}

/**
 * Mnemonic generation.
 * The number of words in a mnemonic depends on the length of the entropy
 * @param {number} entropyLength - The number of bits in the entropy. It can be equal to 128, 160, 192, 224 or 256 bits
 * @returns {string} - A mnemonic whose words are separated by spaces
 */
export const generateMnemonicByEntropyLength = (
  entropyLength: number = defaultEntropyLength,
): string => {
  try {
    return bip39.generateMnemonic(entropyLength)
  } catch (e) {
    throw new CustomError('err_core_entropy')
  }
}

const getEntropyLength = (words: number): number => {
  if (!bitsOfEntropy.hasOwnProperty(words)) {
    throw new CustomError('err_core_mnemonic_length')
  }

  return bitsOfEntropy[words]
}
