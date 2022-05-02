import { Chain } from '../../constants'
import { getAddressLink, getTransactionLink } from '../../helpers/chainExplorerLink'

const etherscanUrl = 'https://etherscan.io'
const ropstenEtherscanUrl = 'https://ropsten.etherscan.io'
const rinkebyEtherscanUrl = 'https://rinkeby.etherscan.io'
const goerliEtherscanUrl = 'https://goerli.etherscan.io'
const kovanEtherscanUrl = 'https://kovan.etherscan.io'

export const Mainnet: Chain = {
  chainId: 1,
  chainName: 'Mainnet',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  blockExplorerUrl: etherscanUrl,
  getExplorerAddressLink: getAddressLink(etherscanUrl),
  getExplorerTransactionLink: getTransactionLink(etherscanUrl),
}

export const Ropsten: Chain = {
  chainId: 3,
  chainName: 'Ropsten',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  blockExplorerUrl: ropstenEtherscanUrl,
  getExplorerAddressLink: getAddressLink(ropstenEtherscanUrl),
  getExplorerTransactionLink: getTransactionLink(ropstenEtherscanUrl),
}

export const Rinkeby: Chain = {
  chainId: 4,
  chainName: 'Rinkeby',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  blockExplorerUrl: rinkebyEtherscanUrl,
  getExplorerAddressLink: getAddressLink(rinkebyEtherscanUrl),
  getExplorerTransactionLink: getTransactionLink(rinkebyEtherscanUrl),
}

export const Goerli: Chain = {
  chainId: 5,
  chainName: 'Goerli',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  blockExplorerUrl: goerliEtherscanUrl,
  getExplorerAddressLink: getAddressLink(goerliEtherscanUrl),
  getExplorerTransactionLink: getTransactionLink(goerliEtherscanUrl),
}

export const Kovan: Chain = {
  chainId: 42,
  chainName: 'Kovan',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  multicall2Address: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  blockExplorerUrl: kovanEtherscanUrl,
  getExplorerAddressLink: getAddressLink(kovanEtherscanUrl),
  getExplorerTransactionLink: getTransactionLink(kovanEtherscanUrl),
}

export default {
  Mainnet,
  Ropsten,
  Rinkeby,
  Goerli,
  Kovan,
}
