interface ErrorCodes {
  [key: string]: string
}

const ErrorCodes: ErrorCodes = {
  err_core_mnemonic:
    'Wrong mnemonic phrase. Please, check the spelling and try again',
  err_core_mnemonic_length: 'Bad word count for mnemonic',
  err_core_mnemonic_empty: 'Invalid mnemonic',
  err_core_seed: 'Invalid seed',
  err_core_entropy: 'Bad entropy',
  err_core_xprv: 'Invalid xprv',
  err_core_hdkey: 'Invalid hdkey',
  // err_core_btc_node: 'Error generating address. Check BTC node',
  // err_core_btc_type: 'Invalid bitcoin address type. Supported types are p2pkh and p2wpkh',
  // err_core_eth_node: 'Error generating ETH private key. Check ETH node',
  // err_core_eth_private_key: 'Error generating ETH public key. Check ETH private key',
  // err_core_eth_public_key: 'Error generating ETH address. Check ETH public key',
  // err_core_eth_account: 'Invalid account. It must be an integer',
  // err_core_derivation: 'Problem with derivation. Check node and derivation path',
  err_core_derivation_hdkey: 'HDkey is required',
  err_core_derivation_path: 'Invalid derivation path',
  err_core_derivation_range: 'Bad range. Check from/to params',
  err_core_private_key: 'Invalid private key. Expect buffer',
}

export default ErrorCodes
