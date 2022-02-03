import { ChainId, Chain } from '../../constants'

export type NodeUrls = {
  [chainId: number]: string
}

export type MulticallAddresses = {
  [chainId: number]: string
}

export type FullConfig = {
  readOnlyChainId?: ChainId
  readOnlyUrls?: NodeUrls
  multicallAddresses?: MulticallAddresses
  multicallVersion: 1 | 2
  supportedChains?: number[]
  networks?: Chain[]
  pollingInterval: number
  notifications: {
    checkInterval: number
    expirationPeriod: number
  }
  localStorage: {
    transactionPath: string
  }
  autoConnect: boolean
}

export type Config = Partial<FullConfig>
