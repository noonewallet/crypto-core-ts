import bs58check from 'bs58check'

const prefixes = new Map([
  ['xpub', '0488b21e'], // BTC, BCH
  ['Ltub', '019da462'], // LTC
  ['dgub', '02facafd'], // DOGE
  ['ypub', '049d7cb2'],
  ['Ypub', '0295b43f'],
  ['zpub', '04b24746'],
  ['Zpub', '02aa7ed3'],
  ['tpub', '043587cf'],
  ['upub', '044a5262'],
  ['Upub', '024289ef'],
  ['vpub', '045f1cf6'],
  ['Vpub', '02575483'],
])

export const xpubConverter = (xpub: string, targetFormat: string): string => {
  if (!prefixes.has(targetFormat)) {
    return 'Invalid target version'
  }

  // trim whitespace
  xpub = xpub.trim()

  try {
    const hex = prefixes.get(targetFormat)
    if (!hex) {
      return 'Invalid target version'
    }
    let data = bs58check.decode(xpub)
    data = data.slice(4)
    data = Buffer.concat([Buffer.from(hex, 'hex'), data])
    return bs58check.encode(data)
  } catch (err) {
    return 'Invalid extended public key'
  }
}
