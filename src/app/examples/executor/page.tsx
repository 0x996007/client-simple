'use client'

import { MyFullClient } from '@/app/constants'
import { useAccount } from 'wagmi'

export default function Executor() {
  const { address, chainId } = useAccount()
  const queryAccounts = async () => {
    const data = await (await MyFullClient).executorClient.query.getAllValidators()
    console.log(data)
  }
  return (
    <div className='flex-column align-center '>
      <h1 className='text-xl'>Executor</h1>
      <div className='flex align-end grid md:grid-cols-1 lg:grid-cols-2 gap-4 '>
        <div className='flex-col justify-end m-2'>
          <button className='btn btn-wide w-[100%] ' onClick={queryAccounts} disabled={!address}>
            Query Accounts
          </button>
        </div>
      </div>
    </div>
  )
}
