import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'
import { getAddress } from 'ethers/lib/utils'
import { validateArguments } from '../helpers/validateArgument'
import { useConfig, useNetwork } from '../providers'
import { useReadonlyNetwork } from './useReadonlyProvider'

type MaybePromise<T> = Promise<T> | any

type SupportedProviders =
  | JsonRpcProvider
  | ExternalProvider
  | { getProvider: () => MaybePromise<JsonRpcProvider | ExternalProvider>; activate: () => Promise<any> }

/**
 * @public
 */
export type Web3Ethers = {
  activate: (provider: SupportedProviders) => Promise<void>
  /**
   * @deprecated
   */
  setError: (error: Error) => void
  deactivate: () => void
  connector: undefined
  chainId?: number
  account?: null | string
  error?: Error
  library?: JsonRpcProvider
  active: boolean
  activateBrowserWallet: () => void
  isLoading: boolean
  /**
   * Switch to a different network.
   */
  switchNetwork: (chainId: number) => void
}

/**
 * @public
 */
export function useEthers(): Web3Ethers {
  const {
    network: { provider: networkProvider, chainId, accounts, errors },
    deactivate,
    activate,
    activateBrowserWallet,
    isLoading,
  } = useNetwork()

  const { networks } = useConfig()
  const supportedChainIds = networks?.map((network) => network.chainId)
  const isUnsupportedChainId = chainId && supportedChainIds && supportedChainIds.indexOf(chainId) < 0
  const unsupportedChainIdError = new Error(
    `Unsupported chain id: ${chainId}. Supported chain ids are: ${supportedChainIds}.`
  )
  unsupportedChainIdError.name = 'UnsupportedChainIdError'
  const error = isUnsupportedChainId ? unsupportedChainIdError : errors[errors.length - 1]

  const readonlyNetwork = useReadonlyNetwork()
  const provider = networkProvider ?? (readonlyNetwork?.provider as JsonRpcProvider)

  const switchNetwork = async (chainId: number) => {
    validateArguments({ chainId }, { chainId: 'number' })

    if (!provider) {
      throw new Error('Provider not connected.')
    }

    await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${chainId.toString(16)}` }])
  }

  const account = accounts[0] ? getAddress(accounts[0]) : undefined

  return {
    connector: undefined,
    library: provider,
    chainId: isUnsupportedChainId ? undefined : networkProvider !== undefined ? chainId : readonlyNetwork?.chainId,
    account,
    active: !!provider,
    activate: async (providerOrConnector: SupportedProviders) => {
      if ('getProvider' in providerOrConnector) {
        console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.')
        await providerOrConnector.activate()
        return activate(await providerOrConnector.getProvider())
      }
      return activate(providerOrConnector)
    },
    activateBrowserWallet,
    deactivate,

    setError: () => {
      throw new Error('setError is deprecated')
    },

    error,
    isLoading,

    switchNetwork,
  }
}
