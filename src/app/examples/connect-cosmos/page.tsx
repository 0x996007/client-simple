'use client'
import { useAccount, useBalance, useSignTypedData, useSignMessage } from 'wagmi'
import { useState, useEffect, useCallback } from 'react'
import { useNotifications } from '@/context/Notifications'
import Ethereum from '@/assets/icons/ethereum.png'
import { getSignTypedData, authMessage, PrivateInformation } from '@/app/constants/index'
import { getAuthToken, getWalletFromSignature } from '@/app/clients/wallet'
import { RocketUtil } from 'client-sdk'

export default function ConnectCosmos() {
  const { signTypedDataAsync } = useSignTypedData()
  const { signMessageAsync } = useSignMessage()
  const [cosmos, setCosmos] = useState<string>('')
  const [hdKey, setHdKey] = useState<PrivateInformation>()
  const [authToken, setAuthToken] = useState<string>('')

  const { Add } = useNotifications()

  const { address, chainId } = useAccount()
  const signTypedData = getSignTypedData()
  const signEvmMessage = useCallback(
    () =>
      signTypedDataAsync({
        ...signTypedData,
        domain: {
          ...signTypedData.domain,
          chainId,
        },
      }),
    [signTypedData, signTypedDataAsync, chainId]
  )

  const signAuthMessage = useCallback(() => {
    signMessageAsync(
      { message: authMessage, account: address },
      {
        onSuccess: (data, res, ctx) => {
          // getAuthToken(data, address as string).then((x) => {
          //   setAuthToken(x)
          //   console.log(x)
          // })
          console.log(data, res, ctx)
        },
      }
    )
  }, [authMessage, address, chainId])

  const handleConnectCosmos = () => {
    console.log('connect cosmos')
    signEvmMessage()
      .then((signature) => {
        console.log('signature', signature)
        getWalletFromSignature(signature).then((x) => {
          console.log(x)
          setCosmos(x.wallet.address || '')
          const data = RocketUtil.getBech32Address(x.wallet.address || '')
          const bech32Address = `0x${Buffer.from(Uint8Array.from(data.split(','))).toString('hex')}`
          console.log(bech32Address)
          setHdKey({ mnemonic: x.mnemonic, privateKey: x.privateKey, publicKey: x.publicKey, bech32Address })
          // signAuthMessage()
        })
      })
      .catch((error) => {
        console.log('error', error)
        Add(`Transaction failed: ${error.cause}`, {
          type: 'error',
        })
      })
  }

  return (
    <div className='flex-column align-center '>
      <h1 className='text-xl'>Cosmos</h1>
      <div className='flex align-end grid md:grid-cols-1 lg:grid-cols-2 gap-4 '>
        <div className='flex-col justify-end m-2'>
          <div className='stats shadow join-item mb-2 bg-[#282c33]'>
            <div className='stat '>
              <div className='stat-figure text-secondary'>
                <img width={50} className='opacity-50 ml-10' src={Ethereum.src} alt='ethereum' />
              </div>
              <div className='stat-title '>Your cosmos</div>
              {cosmos}
            </div>
          </div>
          <button className='btn btn-wide w-[100%] ' onClick={handleConnectCosmos} disabled={!address}>
            Connect Cosmos
          </button>
        </div>
      </div>
    </div>
  )
}
