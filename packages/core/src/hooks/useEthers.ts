import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { getAddNetworkParams } from '../helpers/getAddNetworkParams'
import { validateArguments } from '../helpers/validateArgument'
import { useNetwork } from '../providers'
import { useConfig } from '../hooks'
import { useReadonlyNetwork } from './useReadonlyProvider'
import { useEffect, useState } from 'react'

type JsonRpcProvider = providers.JsonRpcProvider
type ExternalProvider = providers.ExternalProvider

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
  account?: string
  error?: Error
  library?: JsonRpcProvider
  active: boolean
  activateBrowserWallet: () => void
  isLoading: boolean
  /**
   * Switch to a different network.
   */
  switchNetwork: (chainId: number) => Promise<void>
}

/**
 * Returns connection state and functions that allow to manipulate the state.
 * **Requires**: `<ConfigProvider>`
 * 
 * @public
 * @returns {} Object with the following:
    - `account: string` - current user account (or *undefined* if not connected)
    - `chainId: ChainId` - current chainId (or *undefined* if not connected)
    - `library: Web3Provider` - an instance of ethers [Web3Provider](https://github.com/EthWorks/useDapp/tree/master/packages/example) (or `undefined` if not connected)
    - `active: boolean` - returns if provider is connected (read or write mode)
    - `activateBrowserWallet()` - function that will initiate connection to browser web3 extension (e.g. Metamask)
    - `async activate(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean)` - function that allows to connect to a wallet
    - `async deactivate()` - function that disconnects wallet
    - `error?: Error` - an error that occurred during connecting (e.g. connection is broken, unsupported network)
 */
export function useEthers(): Web3Ethers {
  const {
    network: { provider: networkProvider, chainId, accounts, errors },
    deactivate,
    activate,
    activateBrowserWallet,
    isLoading,
  } = useNetwork()

  const { networks, readOnlyUrls } = useConfig()
  const [error, setError] = useState<Error | undefined>(undefined)

  const configuredChainIds = Object.keys(readOnlyUrls || {}).map((chainId) => parseInt(chainId, 10))
  const supportedChainIds = networks?.map((network) => network.chainId)

  useEffect(() => {
    const isNotConfiguredChainId = chainId && configuredChainIds && configuredChainIds.indexOf(chainId) < 0
    const isUnsupportedChainId = chainId && supportedChainIds && supportedChainIds.indexOf(chainId) < 0

    if (isUnsupportedChainId || isNotConfiguredChainId) {
      const chainIdError = new Error(`${isUnsupportedChainId ? 'Unsupported' : 'Not configured'} chain id: ${chainId}.`)
      chainIdError.name = 'ChainIdError'
      setError(chainIdError)
      return
    }
    setError(errors[errors.length - 1])
  }, [chainId, errors])

  const readonlyNetwork = useReadonlyNetwork()
  const provider = networkProvider ?? (readonlyNetwork?.provider as JsonRpcProvider)

  const switchNetwork = async (chainId: number) => {
    validateArguments({ chainId }, { chainId: 'number' })

    if (!provider) {
      throw new Error('Provider not connected.')
    }

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId: `0x${chainId.toString(16)}` }])
    } catch (error: any) {
      const errChainNotAddedYet = 4902 // Metamask error code
      if (error.code === errChainNotAddedYet) {
        const chain = networks?.find((chain) => chain.chainId === chainId)
        if (chain?.rpcUrl) {
          await provider.send('wallet_addEthereumChain', [getAddNetworkParams(chain)])
        }
      } else {
        throw error
      }
    }
  }

  const account = accounts[0] ? getAddress(accounts[0]) : undefined

  return {
    connector: undefined,
    library: provider,
    chainId:
      error?.name === 'ChainIdError' ? undefined : networkProvider !== undefined ? chainId : readonlyNetwork?.chainId,
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
