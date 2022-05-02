import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { Arbitrum, ArbitrumRinkeby } from '../..'

describe('Arbitrum Chain', () => {
  it('getChainId', () => {
    expect(Arbitrum.chainId).to.equal(42161)
    expect(ArbitrumRinkeby.chainId).to.equal(421611)
  })

  it('getChainName', () => {
    expect(Arbitrum.chainName).to.eq('Arbitrum')
    expect(ArbitrumRinkeby.chainName).to.eq('ArbitrumRinkeby')
  })

  it('isTestChain', () => {
    expect(Arbitrum.isTestChain).to.be.false
    expect(ArbitrumRinkeby.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Arbitrum.isLocalChain).to.be.false
    expect(ArbitrumRinkeby.isLocalChain).to.be.false
  })

  it('rpcUrl', () => {
    expect(Arbitrum.rpcUrl).to.eq('https://arb1.arbitrum.io/rpc')
    expect(ArbitrumRinkeby.rpcUrl).to.eq('https://rinkeby.arbitrum.io/rpc')
  })

  it('getExplorerAddressLink', () => {
    expect(Arbitrum.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://arbiscan.io/address/${TEST_ADDRESS}`)
    expect(ArbitrumRinkeby.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://testnet.arbiscan.io/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Arbitrum.getExplorerTransactionLink(TEST_TX)).to.eq(`https://arbiscan.io/tx/${TEST_TX}`)
    expect(ArbitrumRinkeby.getExplorerTransactionLink(TEST_TX)).to.eq(`https://testnet.arbiscan.io/tx/${TEST_TX}`)
  })
})
