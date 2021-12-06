import { Chain } from '../../constants'

export const Localhost: Chain = {
  chainId: 1337,
  chainName: 'Localhost',
  isTestChain: true,
  isLocalChain: true,
  multicallAddress: '',
  getExplorerAddressLink: () => '',
  getExplorerTransactionLink: () => '',
}

export const Hardhat: Chain = {
  chainId: 31337,
  chainName: 'Hardhat',
  isTestChain: true,
  isLocalChain: true,
  multicallAddress: '',
  getExplorerAddressLink: () => '',
  getExplorerTransactionLink: () => '',
}

export default {
  Localhost,
  Hardhat,
}
