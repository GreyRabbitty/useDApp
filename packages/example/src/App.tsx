import { formatUnits, formatEther } from '@ethersproject/units'
import { getAddress } from '@ethersproject/address'
import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import {
  useBlockMeta,
  useBlockNumber,
  useEthers,
  useChainCalls,
  useEtherBalance,
  ChainId,
  useTokenBalance,
  ERC20Interface,
  useContractCalls,
} from '@usedapp/core'

const DAI_ADDRESSES = {
  [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
  [ChainId.Ropsten]: '0xad6d458402f60fd3bd25163575031acdce07538d',
  [ChainId.Kovan]: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
  [ChainId.Rinkeby]: '0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658',
  [ChainId.Goerli]: '0x73967c6a0904aa032c103b4104747e88c566b1a2',
  [ChainId.xDai]: undefined,
}

export function App() {
  const blockNumber = useBlockNumber()
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  const etherBalance = useEtherBalance(account)
  const daiBalance = useTokenBalance(account, chainId && DAI_ADDRESSES[chainId])

  const [tokenList, setTokenList] = useState<any>()
  useEffect(() => {
    ;(async () => {
      const res = await fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://erc20.cmc.eth.link')
      setTokenList(await res.json())
    })()
  }, [])

  const balances = useContractCalls(
    tokenList && account
      ? tokenList.tokens.map((token: any) => ({
          abi: ERC20Interface,
          address: token.address,
          method: 'balanceOf',
          args: [account],
        }))
      : []
  )

  return (
    <Background>
      <Global />
      <div>
        <p>Chain id: {chainId}</p>
        <p>Current block: {blockNumber}</p>
        {difficulty && <p>Current difficulty: {difficulty.toString()}</p>}
        {timestamp && <p>Current block timestamp: {timestamp.toLocaleString()}</p>}
        {etherBalance && <p>Ether balance: {formatEther(etherBalance)} ETH </p>}
        {daiBalance && <p>Dai balance: {formatUnits(daiBalance, 18)} DAI</p>}
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
          <button onClick={() => deactivate()}>Disconnect</button>
        </div>
        {account && <p>Account: {account}</p>}
      </div>
      <TokenList>
        {tokenList &&
          tokenList.tokens.map((token: any, idx: number) => (
            <TokenItem>
              <TokenIconContainer>
                <TokenIcon
                  src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${getAddress(
                    token.address
                  )}/logo.png`}
                />
              </TokenIconContainer>
              <TokenName>{token.name}</TokenName>
              <TokenTicker>{token.symbol}</TokenTicker>
              <TokenBalance>{balances?.[idx] && formatUnits(balances[idx]![0], token.decimals)}</TokenBalance>
            </TokenItem>
          ))}
      </TokenList>
    </Background>
  )
}

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    overflow: auto;
  }
`

const Background = styled.div`
  background-color: #f3f4f9;
  overflow: auto;
  min-height: 100vh;
`

const TokenList = styled.ul`
  background-color: white;
  border-radius: 16px;
  margin: auto;
  margin-top: 64px;
  padding: 16px 16px 16px 16px;
  max-width: 640px;
`

const TokenItem = styled.li`
  display: grid;
  grid-template-areas:
    'icon name balance'
    'icon ticker balance';
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 16px;
  margin: 8px;
  margin-top: 16px;
  align-items: center;
`

const TokenIconContainer = styled.div`
  grid-area: icon;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #f2f7fb;
`

const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  margin: 16px;
`

const TokenName = styled.span`
  grid-area: name;
`

const TokenTicker = styled.span`
  grid-area: ticker;
  color: gray;
`

const TokenBalance = styled.span`
  grid-area: balance;
  font-size: 1.5em;
`
