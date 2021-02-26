import { MultiCallABI } from '../constants'
import { useChainCall } from './useChainCalls'
import { useMulticallAddress } from './useMulticallAddress'
import { BigNumber } from '@ethersproject/bignumber'
import { Falsy } from '../model/types'

export function useEtherBalance(address: string | Falsy) {
  const multicallAddress = useMulticallAddress()
  const getEthBalanceCall = address && MultiCallABI.encodeFunctionData('getEthBalance', [address])

  const etherBalance = useChainCall(
    getEthBalanceCall && multicallAddress && { address: multicallAddress, data: getEthBalanceCall }
  )
  return { etherBalance: etherBalance !== undefined ? BigNumber.from(etherBalance) : undefined }
}
