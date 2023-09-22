import {
  mnemonicToSeed,
  mnemonicToEntropy,
  hdFromSeed,
  hdFromXprv,
  privateKeyToWIF,
  createCoreByMnemonic,
  createMnemonic,
  generateMnemonicByEntropyLength,
  checkMnemonic,
  derive,
} from '../src'
import {defaultMnemonicLength} from '../src/config'

const testWallet = {
  mnemonic:
    'art pupil danger scrap marriage garden diary three lunar oxygen horn surge section dish harvest',
  seed: 'fe3e0a4c78e1bf92e4e9aefbd1cd57b1a372207481b9e67adb44ab61c5170bd580475f793eefb6acc38f36820244ca713e4077ea75dfbda3699852e6c59bad93',
  privateExtendedKey:
    'xprv9s21ZrQH143K28At4gNWpvFJg7FUDFV3iByMgC4wTheu6mG1iXpsmZ3t2rybzWS1YBNoy9APya1uKMYRZUWhPgGBBXbpQbE2jHisNXVCWgw',
  entropy: '0cd5bcdde0b884bf4f57088513c9b66d2c2a7e5a',
  wif: 'L1gPGTCiUi9ytQNuuopVrewtDygjifPSZrmLGA26WU1QZmBEpwPG',
  childNode: {
    path: `m/44'/0'/0'/0`,
    privateExtendedKey:
      'xprvA2DiKHeNBS8szBGPVe1BE4mWz6L2UY1Ym1iyoStj56fgaecckJnv1e9AujU3DkRMD93WrkqFRLXzAY9W83T2uhwtpdRdgNj2K4xHCmXsgLG',
    publicExtendedKey:
      'xpub6FD4ioBG1ohBCfLrbfYBbCiFY8AWszjQ8EeabqJLdSCfTSwmHr7AZSTekzFYxDat57ftSjKM14LLNAvzDB3sqbkv2TGThDQzVvCujeSeuKA',
  },
}

const invalidMnemonic =
  'art pupil danger scrap marriage garden diary three lunar magic horn surge section dish harvest'
const invalidMnemonicWithTypo =
  'art pupil danger scrap marriag garden diary three lunar magic horn surge section dish harvest'

describe('Core tests', () => {
  test('It should create a seed by mnemonic', () => {
    const seed = mnemonicToSeed(testWallet.mnemonic)
    expect(seed.toString('hex')).toEqual(testWallet.seed)
  })

  test('It should not create a seed and then throws an Error', () => {
    try {
      mnemonicToSeed(invalidMnemonic)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_mnemonic')).toBeTruthy()
      }
    }
  })

  test('It should create an entropy by mnemonic', () => {
    const entropy = mnemonicToEntropy(testWallet.mnemonic)
    expect(entropy).toEqual(testWallet.entropy)
  })

  test('It should not create an entropy and then throws an Error', () => {
    try {
      mnemonicToEntropy(invalidMnemonic)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_mnemonic')).toBeTruthy()
      }
    }
    try {
      mnemonicToEntropy('')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_mnemonic')).toBeTruthy()
      }
    }
  })

  test('It should create HDNode from seed', () => {
    const seed = mnemonicToSeed(testWallet.mnemonic)
    const node = hdFromSeed(seed)
    expect(node.privateExtendedKey).toEqual(testWallet.privateExtendedKey)
  })

  test('It should not create HDNode from seed and then throws an Error', () => {
    try {
      // @ts-ignore
      hdFromSeed('')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_seed')).toBeTruthy()
      }
    }

    try {
      // @ts-ignore
      hdFromSeed('123456')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_seed')).toBeTruthy()
      }
    }
  })

  test('It should create an HDNode from an extended key', () => {
    const node = hdFromXprv(testWallet.privateExtendedKey)
    expect(node).toBeDefined()
    expect(node.privateExtendedKey).toEqual(testWallet.privateExtendedKey)
  })

  test('It should not create an HDNode and then throws an Error', () => {
    try {
      const invalidXprv = 'xprv123'
      hdFromXprv(invalidXprv)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_xprv')).toBeTruthy()
      }
    }
  })

  test('It should convert a private key to WIF format', () => {
    const node = hdFromXprv(testWallet.privateExtendedKey)
    const wif = privateKeyToWIF(node.privateKey)

    expect(wif).toBeDefined()
    expect(wif).toEqual(testWallet.wif)
  })

  test('It should not convert a private key to WIF format and then throws an Error', () => {
    try {
      // @ts-ignore
      privateKeyToWIF('')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_private_key')).toBeTruthy()
      }
    }
    try {
      // @ts-ignore
      privateKeyToWIF(testWallet.privateExtendedKey)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_private_key')).toBeTruthy()
      }
    }
  })

  test('It should create wallet core by mnemonic', () => {
    const walletCore = createCoreByMnemonic(testWallet.mnemonic)

    expect(walletCore).toBeDefined()
    expect(walletCore.xprv).toEqual(testWallet.privateExtendedKey)
  })

  test('It should not create a wallet core by mnemonic and then throws an Error', () => {
    try {
      // @ts-ignore
      createCoreByMnemonic(invalidMnemonic)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_mnemonic')).toBeTruthy()
      }
    }
  })

  test('It should create a new mnemonic for a given number of words', () => {
    const wordCount = 15
    const newMnemonic = createMnemonic(wordCount)
    const mnemonicLength = newMnemonic.split(' ').length

    expect(mnemonicLength).toEqual(wordCount)

    const defaultMnemonic = createMnemonic()
    const secondMnemonicLength = defaultMnemonic.split(' ').length
    expect(secondMnemonicLength).toEqual(defaultMnemonicLength)
  })

  test('It should create a new mnemonic for given entropy length', () => {
    const entropyLength = 160
    const newMnemonic = generateMnemonicByEntropyLength(entropyLength)

    expect(newMnemonic).toBeDefined()

    const defaultMnemonic = generateMnemonicByEntropyLength()
    expect(defaultMnemonic).toBeDefined()
  })

  test('It should throw Error for invalid entropy length', () => {
    try {
      const invalidLength = 124
      generateMnemonicByEntropyLength(invalidLength)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_entropy')).toBeTruthy()
      }
    }
  })

  test('It should throw an Error for mnemonic with typo (checkMnemonic function)', () => {
    try {
      checkMnemonic(invalidMnemonicWithTypo)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_mnemonic')).toBeTruthy()
      }
    }
  })

  test('It should throw an Error for mnemonic with wrong count of words (getEntropyLength function)', () => {
    try {
      // @ts-ignore
      createMnemonic('')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_mnemonic_length')).toBeTruthy()
      }
    }

    try {
      createMnemonic(13)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_mnemonic_length')).toBeTruthy()
      }
    }
  })

  test(`It should create a child nodes by path ${testWallet.childNode.path}`, () => {
    const node = hdFromXprv(testWallet.privateExtendedKey)
    const childNode = derive(node, testWallet.childNode.path)
    expect(childNode).toBeDefined()
    expect(childNode.privateExtendedKey).toEqual(
      testWallet.childNode.privateExtendedKey,
    )
  })

  test(`It should not create a child nodes by path and then throws an Error`, () => {
    const node = hdFromXprv(testWallet.privateExtendedKey)
    try {
      const invalidPath = 'm/1'
      derive(node, invalidPath)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_derivation_path')).toBeTruthy()
      }
    }
    try {
      // @ts-ignore
      derive('', testWallet.childNode.path)
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_derivation_hdkey')).toBeTruthy()
      }
    }

    try {
      // @ts-ignore
      derive(node, '')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message.includes('err_core_derivation_path')).toBeTruthy()
      }
    }
  })
})
