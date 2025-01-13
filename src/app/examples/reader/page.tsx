'use client'

import { MyReaderClient } from '@/app/constants'
import { useAccount } from 'wagmi'

export default function Reader() {
  const { address, chainId } = useAccount()
  const queryMarkets = async () => {
    const data = await MyReaderClient.marketsReader.getPerpetualMarkets()
    console.log(data)
  }
  const queryAccount = async () => {
    const data = await MyReaderClient.accountReader.getSubaccount('dydx137l6g2terxmh94suwr6qqkq6xvjave8ez520eh', 0)
    console.log(data)
  }
  const queryChain = async () => {
    const data = await MyReaderClient.chainReader.getHeight()
    console.log(data)
  }
  const queryVault = async () => {
    const data = await MyReaderClient.vaultReader.getMegavaultPositions()
    console.log(data)
  }
  return (
    <div className='flex-column align-center '>
      <h1 className='text-xl'>Reader</h1>
      <div className='flex align-end grid md:grid-cols-1 lg:grid-cols-2 gap-4 '>
        <div className='flex-col justify-end m-2'>
          <button className='btn btn-wide w-[100%] ' onClick={queryMarkets} disabled={!address}>
            Markets
          </button>
          <button className='btn btn-wide w-[100%] ' onClick={queryAccount} disabled={!address}>
            Account
          </button>
          <button className='btn btn-wide w-[100%] ' onClick={queryChain} disabled={!address}>
            Chain
          </button>
          <button className='btn btn-wide w-[100%] ' onClick={queryVault} disabled={!address}>
            Vault
          </button>
        </div>
      </div>
    </div>
  )
}
