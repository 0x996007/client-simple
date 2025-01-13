import { ExecutorClient, FullClient, ReaderClient, RocketUtil } from 'client-sdk'

export const authMessage = 'sign'

export const getSignTypedData = () =>
  ({
    primaryType: 'dYdX',
    domain: {
      name: 'dYdX Chain',
    },
    types: {
      dYdX: [{ name: 'action', type: 'string' }],
    },
    message: {
      action: 'dYdX Chain Onboarding',
    },
  }) as const

export type PrivateInformation = ReturnType<typeof RocketUtil.deriveHDKeyFromEthereumSignature> & {
  bech32Address: string
}

export const MyReaderClient = new ReaderClient('testnet')
export const MyFullClient = FullClient.connect('testnet')
