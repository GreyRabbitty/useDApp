import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum } from '@usedapp/core'
import { App } from './App'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Ropsten.chainId]: 'https://ropsten.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Kovan.chainId]: 'https://kovan.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  multicallVersion: 2 as const,
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
