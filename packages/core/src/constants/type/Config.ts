import { Chain } from '../../constants'
import { BaseProvider } from '@ethersproject/providers'

export type BaseProviderFactory = () => BaseProvider

export type NodeUrls = {
  [chainId: number]: string | BaseProvider | BaseProviderFactory
}

export type MulticallAddresses = {
  [chainId: number]: string
}

/**
 * useDapp configuration.
 * @public
 */
export type FullConfig = {
  /**
   * ChainId of a chain you want to connect to by default in a read-only mode
   */
  readOnlyChainId?: number
  /**
   * Mapping of ChainId's to node URLs to use in read-only mode.
   */
  readOnlyUrls?: NodeUrls
  /**
   * Mapping of ChainId's to multicall contract addresses on the chain.
   */
  multicallAddresses?: MulticallAddresses
  /**
   * Version of multicall contract on the chain.
   */
  multicallVersion: 1 | 2
  /**
   * @experimental
   */
  fastMulticallEncoding?: boolean
  /**
   * @experimental
   */
  noMetamaskDeactivate?: boolean
  /**
   * @deprecated
   */
  supportedChains?: number[]
  /**
   * List of intended supported chain configs.
   * If a user tries to connect to an unsupported chain an error value will be returned by useEthers.
   * @default DEFAULT_SUPPORTED_CHAINS
   */
  networks?: Chain[]
  /**
   * Polling interval for a new block.
   */
  pollingInterval: number

  notifications: {
    checkInterval: number
    expirationPeriod: number
  }
  /**
   * Paths to locations in local storage.
   */
  localStorage: {
    transactionPath: string
  }
  /**
   * If set, adds an additional buffer of gas limit to estimated gas limit before sending a transaction.
   * Useful if a gas limit of a transaction can be different depending on the state of the blockchain.
   * Gas estimation can be not accurate because the state of the blockchain can change between the time of estimation and the time of transaction mining.
   */
  bufferGasLimitPercentage?: number
  /**
   * Enables reconnecting to last used provider when user revisits the page.
   */
  autoConnect: boolean
}

/* eslint-disable @typescript-eslint/ban-types  */
type RecursivePartial<Object, Keys extends {}> = {
  [P in keyof Object]?: P extends keyof Keys ? RecursivePartial<Object[P], Keys[P]> : Object[P]
}

/**
 * useDapp configuration.
 * @public
 */
export type Config = RecursivePartial<
  FullConfig,
  {
    notifications: {}
  }
>
