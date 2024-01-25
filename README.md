[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/noonewallet/crypto-core-ts/blob/main/LICENSE)
[![Platform](https://img.shields.io/badge/platform-web-blue.svg?style=flat)]()
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fnoonewallet%2Fcrypto-core-ts%2Fmain%2Fpackage.json&query=%24.version&label=version)

![crypto-core-ts](https://github.com/noonewallet/noone-android-core-crypto/assets/111989613/1f062349-24d4-4824-9c00-b8f2724eca51)

# crypto-core-ts
A set of utilities for generating and verifying mnemonic phrases, seed phrases, and deterministic key generation.

**Note**: Node version >= 16.15.0

## Usage
> **Warning!** Do not use the mnemonic, keys, and addresses provided in this readme for real transactions!

```js
// typical import
import {
  mnemonicToSeed,
  mnemonicToEntropy,
  hdFromSeed,
  hdFromXprv,
  derive,
  privateKeyToWIF,
  createCoreByMnemonic,
  createMnemonic,
  checkMnemonic,
  generateMnemonicByEntropyLength,
} from '@noonewallet/crypto-core-ts'
```

### mnemonicToSeed
This function converts a mnemonic into a seed phrase.
```js
const mnemonic = 'art pupil danger scrap marriage garden diary three lunar oxygen horn surge section dish harvest'
const seed = mnemonicToSeed(mnemonic)
console.log(seed.toString('hex')) // => 'fe3e0a4c78e1bf92e4e9aefbd1cd57b1a372207481b9e67adb44ab61c5170bd580475f793eefb6acc38f36820244ca713e4077ea75dfbda3699852e6c59bad93'
```

### mnemonicToEntropy
Converting a mnemonic to entropy
```js
const mnemonic = 'art pupil danger scrap marriage garden diary three lunar oxygen horn surge section dish harvest'
const entropy = mnemonicToEntropy(mnemonic)
console.log(entropy) // =>  '0cd5bcdde0b884bf4f57088513c9b66d2c2a7e5a'
```

### hdFromSeed
Converting a seed to hdkey (Hierarchical Deterministic Key)
```js
const mnemonic = 'art pupil danger scrap marriage garden diary three lunar oxygen horn surge section dish harvest'
const seed = mnemonicToSeed(mnemonic)
const node = hdFromSeed(seed)
console.log(node) // =>
// HDKey {
//   versions: { private: 76066276, public: 76067358 },
//   depth: 0,
//   index: 0,
//   _privateKey: <Buffer 85 12 55 a5 ae 8e 86 2a 0f 68 8f d4 e4 4b 70 eb 2f 34 03 96 7a ed 5d 18 6a ee 31 3e 2b 7c 15 bf>,
//   _publicKey: <Buffer 03 35 e8 5d c6 ce 89 bb 75 8b 06 78 a4 15 71 62 63 1c 84 1a 3f 49 ca fb 6d e2 af 04 ec 75 8f 66 7a>,
//   chainCode: <Buffer 06 9a d8 d9 2b 48 de 7e d5 c3 e3 a6 6a 2a 4c e6 8d 20 fc d2 ec 3a f8 0b a3 31 5d 34 e3 ee 1e 05>,
//   _fingerprint: 3192123545,
//   parentFingerprint: 0,
//   _identifier: <Buffer be 43 f0 99 59 71 b6 78 a9 ad 1f 15 e6 5e 0d 5f 0e 39 9b 12>
// }
```

### hdFromXprv
Converting a Extended Private Key to hdkey (Hierarchical Deterministic Key)
```js
const privateExtendedKey = 'xprv9s21ZrQH143K28At4gNWpvFJg7FUDFV3iByMgC4wTheu6mG1iXpsmZ3t2rybzWS1YBNoy9APya1uKMYRZUWhPgGBBXbpQbE2jHisNXVCWgw'
const node = hdFromXprv(privateExtendedKey)
console.log(node) //=>
// HDKey {
//   versions: { private: 76066276, public: 76067358 },
//   depth: 0,
//   index: 0,
//   _privateKey: <Buffer 85 12 55 a5 ae 8e 86 2a 0f 68 8f d4 e4 4b 70 eb 2f 34 03 96 7a ed 5d 18 6a ee 31 3e 2b 7c 15 bf>,
//   _publicKey: <Buffer 03 35 e8 5d c6 ce 89 bb 75 8b 06 78 a4 15 71 62 63 1c 84 1a 3f 49 ca fb 6d e2 af 04 ec 75 8f 66 7a>,
//   chainCode: <Buffer 06 9a d8 d9 2b 48 de 7e d5 c3 e3 a6 6a 2a 4c e6 8d 20 fc d2 ec 3a f8 0b a3 31 5d 34 e3 ee 1e 05>,
//   _fingerprint: 3192123545,
//   parentFingerprint: 0,
//   _identifier: <Buffer be 43 f0 99 59 71 b6 78 a9 ad 1f 15 e6 5e 0d 5f 0e 39 9b 12>
// }
```

### derive
Getting a child node by a derivation path
```js
const node = hdFromXprv(privateExtendedKey)
const path = `m/44'/0'/0'/0`
const childNode = derive(node, path)
console.log(childNode) // =>
// HDKey {
//   versions: { private: 76066276, public: 76067358 },
//   depth: 4,
//   index: 0,
//   _privateKey: <Buffer 6e 07 6d 8f ed a2 af 82 13 e2 ff fe 35 fe 4b ba 7d 88 3d 98 3b af c7 da 0e 57 2a 8c eb c6 e8 e3>,
//   _publicKey: <Buffer 02 4d aa 18 40 c7 cf a7 1f 4e fa ae 8f 20 78 ef 05 2f 92 0f ed 9d 7b 57 a3 74 1f f3 b9 82 c8 44 f1>,
//   chainCode: <Buffer fc e2 b0 3f 0d 1d 23 5e db 8e bc f4 3d d7 b3 eb 8d ff 22 ee 44 bd 88 3f a5 4e 76 db 15 96 5b b2>,
//   _fingerprint: 692568304,
//   parentFingerprint: 3823702552,
//   _identifier: <Buffer 29 47 c0 f0 52 91 95 11 3c 03 33 7a 50 74 e3 c2 7f 11 5e a4>
// }
```

### privateKeyToWIF
Converts a private key to the WIF (Wallet Import Format)
```js
const privateExtendedKey = 'xprv9s21ZrQH143K28At4gNWpvFJg7FUDFV3iByMgC4wTheu6mG1iXpsmZ3t2rybzWS1YBNoy9APya1uKMYRZUWhPgGBBXbpQbE2jHisNXVCWgw'
const node = hdFromXprv(privateExtendedKey)
const wif = privateKeyToWIF(node.privateKey)
console.log(wif) // => 'L1gPGTCiUi9ytQNuuopVrewtDygjifPSZrmLGA26WU1QZmBEpwPG'
```

### createCoreByMnemonic
Creates a wallet core using a mnemonic. The core includes normalized mnemonic and an Extended private key.
```js
const mnemonic = 'Art  PUpil danger  scrap  marriage garden DIARY three lunar oxygen horn surge section dish harvest'
const walletCore = createCoreByMnemonic(mnemonic)
console.log(walletCore) // => 
// walletCore {
//    mnemonic: 'art pupil danger scrap marriage garden diary three lunar oxygen horn surge section dish harvest',
//    xprv: 'xprv9s21ZrQH143K28At4gNWpvFJg7FUDFV3iByMgC4wTheu6mG1iXpsmZ3t2rybzWS1YBNoy9APya1uKMYRZUWhPgGBBXbpQbE2jHisNXVCWgw'
// }
```

### createMnemonic
Generates a mnemonic phrase with a specified word count. Allowed values: 12, 15, 18, 21, and 24. The default value is 12.
```js
const wordCount = 15
const newMnemonic = createMnemonic(wordCount)
```

### checkMnemonic
Validates the mnemonic for correctness (seed verification) and checks for spelling errors.
```js
console.log(checkMnemonic('danger danger danger danger danger danger danger danger danger danger danger danger')) // => false
console.log(checkMnemonic('arts pupil danger scrap marriage garden diary three lunar oxygen horn surge section dish harvest')) // Throws a Custom error for a spelling mistake in the mnemonic
```

### generateMnemonicByEntropyLength
Creates a mnemonic phrase based on entropy length.
```js
const entropyLength = 160
const newMnemonic = generateMnemonicByEntropyLength(entropyLength)
```

## Created using
* [bip39](https://github.com/bitcoinjs/bip39)
* [bip39-checker](https://github.com/jcalfee/bip39-checker)
* [hdkey](https://github.com/cryptocoinjs/hdkey)
* [wif](https://github.com/bitcoinjs/wif)
* [js-big-decimal](https://github.com/royNiladri/js-big-decimal)
* [bs58check](https://github.com/bitcoinjs/bs58check)

## NIST testing
[Documentation](./nist/README.md) for NIST testing.

## License
crypto-core-ts is available under the MIT license. See the [LICENSE](https://github.com/noonewallet/core-ts/blob/main/LICENSE) file for more info.


