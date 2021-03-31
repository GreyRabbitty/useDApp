import { ReactNode } from 'react'
import { MULTICALL_ADDRESSES } from '../constants'
import { Config } from '../model/config/Config'
import { ConfigProvider } from '../providers/config/provider'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { useConfig } from './config/context'
import { EthersProvider } from './EthersProvider'
import { NotificationsProvider } from './notifications/provider'
import { ReadOnlyProviderActivator } from './ReadOnlyProviderActivator'
import { TransactionProvider } from './transactions/provider'

interface DAppProviderProps {
  children: ReactNode
  config: Config
}

export function DAppProvider({ config, children }: DAppProviderProps) {
  return (
    <ConfigProvider config={config}>
      <DAppProviderWithConfig>{children}</DAppProviderWithConfig>
    </ConfigProvider>
  )
}

interface WithConfigProps {
  children: ReactNode
}

function DAppProviderWithConfig({ children }: WithConfigProps) {
  const { multicallAddresses, readOnlyChainId, readOnlyUrls } = useConfig()
  const multicallAddressesMerged = { ...MULTICALL_ADDRESSES, ...multicallAddresses }
  return (
    <EthersProvider>
      <BlockNumberProvider>
        {readOnlyChainId && readOnlyUrls && (
          <ReadOnlyProviderActivator readOnlyChainId={readOnlyChainId} readOnlyUrls={readOnlyUrls} />
        )}
        <ChainStateProvider multicallAddresses={multicallAddressesMerged}>
          <NotificationsProvider>
            <TransactionProvider>{children}</TransactionProvider>
          </NotificationsProvider>
        </ChainStateProvider>
      </BlockNumberProvider>
    </EthersProvider>
  )
}
