'use client'
import { useAccount, useBalance, useSignTypedData, useSignMessage, useSwitchChain, useWriteContract } from 'wagmi'
import { useState, useEffect, useCallback } from 'react'
import { useNotifications } from '@/context/Notifications'
import Ethereum from '@/assets/icons/ethereum.png'
import { DepositABI } from '@/app/abis/deposit.abi'
import { BigNumber } from 'bignumber.js'
import { hexlify } from 'ethers'
import { erc20Abi } from 'viem'

export default function Deposit() {
  const amount = new BigNumber('100').times(BigNumber(10).pow(6)).toString()
  const contractAddress = '0xf71a6213d359D4939D201c5d33fC2eFaaae3F599'
  const contractChainId = 421614
  const { Add } = useNotifications()
  const { chains, switchChain } = useSwitchChain()
  const { address, chainId } = useAccount()
  const { writeContract } = useWriteContract()
  // from const [hdKey, setHdKey] = useState<PrivateInformation>()
  const pubKey = '0x8fbfa4297919b772d61c70f400581a3325d664f9'

  const handleAction = () => {
    console.log('deposit')
    if (!address) {
      Add('Please connect your wallet', {
        type: 'error',
      })
      return
    }
    console.log('chainId', chainId)
    if (chainId !== contractChainId) {
      switchChain({ chainId: contractChainId })
    } else {
      console.log('depositing', pubKey, amount)
      writeContract(
        {
          abi: erc20Abi,
          address: '0x850E1C191e29459944072d73D8B47Bc51e0046DB',
          functionName: 'approve',
          args: [contractAddress, BigInt(amount)],
        },
        {
          onSuccess: () => {
            console.log([0, pubKey, BigInt(amount)])
            writeContract(
              {
                abi: DepositABI,
                address: contractAddress,
                functionName: 'deposit',
                args: [[0, pubKey, BigInt(amount)]],
              },
              { onSuccess: () => console.log('deposited') }
            )
          },
        }
      )
    }
  }

  return (
    <div className='flex-column align-center '>
      <h1 className='text-xl'>Deposit</h1>
      <div className='flex align-end grid md:grid-cols-1 lg:grid-cols-2 gap-4 '>
        <div className='flex-col justify-end m-2'>
          <button className='btn btn-wide w-[100%] ' onClick={handleAction} disabled={!address}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  )
}
