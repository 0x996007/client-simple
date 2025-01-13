import { BECH32_PREFIX, ClientWallet, RocketUtil } from 'client-sdk'

export const getWalletFromSignature = async (signature: string) => {
  const { mnemonic, privateKey, publicKey } = RocketUtil.deriveHDKeyFromEthereumSignature(signature)
  return {
    wallet: await ClientWallet.fromMnemonic(mnemonic, BECH32_PREFIX),
    mnemonic,
    privateKey,
    publicKey,
  }
}

export const getAuthToken = async (signature: string, address: string): Promise<string> => {
  return 'authToken'
}
