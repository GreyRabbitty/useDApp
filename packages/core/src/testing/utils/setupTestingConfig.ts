import { Config } from '../../constants'
import { Mainnet } from '../../model'
import { createMockProvider } from './createMockProvider'
import { SECOND_TEST_CHAIN_ID } from './deployMockToken'

/**
 * Creates two networks of mock providers with multicalls,
 * and constructs a useDapp Config.
 * @internal
 */
export const setupTestingConfig = async () => {
  const network1 = await createMockProvider({ chainId: Mainnet.chainId })
  const network2 = await createMockProvider({ chainId: SECOND_TEST_CHAIN_ID })

  const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: network1.provider,
      [SECOND_TEST_CHAIN_ID]: network2.provider,
    },
    multicallAddresses: {
      ...network1.multicallAddresses,
      ...network2.multicallAddresses,
    },
  }

  return {
    config,
    network1,
    network2,
  }
}
