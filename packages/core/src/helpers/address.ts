import { utils } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'

export function shortenAddress(address: string): string {
  try {
    const formattedAddress = utils.getAddress(address)
    return formattedAddress.substring(0, 6) + '...' + formattedAddress.substring(formattedAddress.length - 4)
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}

export function compareAddress(firstAddress: string, secondAddress: string): number {
  try {
    const parsedFirstAddress = BigNumber.from(firstAddress)
    const parsedSecondAddress = BigNumber.from(secondAddress)

    if (parsedFirstAddress.gt(parsedSecondAddress)) {
      return 1
    }

    if (parsedFirstAddress.lt(parsedSecondAddress)) {
      return -1
    }

    return 0
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}

export function addressEqual(firstAddress: string, secondAddress: string): boolean {
  try {
    return utils.getAddress(firstAddress) === utils.getAddress(secondAddress)
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}
