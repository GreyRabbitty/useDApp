import { Chain } from '../../constants'

export const Palm: Chain = {
  chainId: 11297108109,
  chainName: 'Palm',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
  getExplorerAddressLink: (address: string) => `https://explorer.palm.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://explorer.palm.io/tx/${transactionHash}`,
}

export const PalmTestnet: Chain = {
  chainId: 11297108099,
  chainName: 'Palm Testnet',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
  getExplorerAddressLink: (address: string) => `https://explorer.palm-uat.xyz/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://explorer.palm-uat.xyz/tx/${transactionHash}`,
}

export default { Palm, PalmTestnet }
