CoinGecko API
################

Hooks
*****

useCoingeckoPrice
====================

Given base token name and the supported currencies to get token price from CoinGecko.

**Parameters**

- ``base: string`` - the token name that you can get at URL while search in CoinGecko. Or find the token from https://api.coingecko.com/api/v3/coins/list
- ``quote: string`` - (optional) the supported currencies in CoinGecko. Default quote is `usd`. See https://api.coingecko.com/api/v3/simple/supported_vs_currencies

**Returns**

- ``string | undefined`` - token price

**Example**

.. code-block:: javascript

  import { useCoingeckoPrice } from '@usedapp/coingecko'

  const etherPrice = useCoingeckoPrice('ethereum', 'usd')

  return etherPrice && (<p>$ {etherPrice}</p>)



useCoingeckoTokenPrice
===============================

Given token contract and the supported currencies to get token price from CoinGecko.

**Parameters**

- ``contract: string`` - the token contract
- ``quote: string`` - (optional) the supported currencies in CoinGecko. Default quote is `usd`. See https://api.coingecko.com/api/v3/simple/supported_vs_currencies
- ``platform: string`` - (optional) the platform issuing tokens. Default platform id is `ethereum`. See https://api.coingecko.com/api/v3/asset_platforms

**Returns**

- ``string | undefined`` - token price

**Example**

.. code-block:: javascript

  import { useCoingeckoTokenPrice } from '@usedapp/coingecko'

  const WETH_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  const wethPrice = useCoingeckoTokenPrice(WETH_CONTRACT, 'usd')

  return wethPrice && (<p>$ {wethPrice}</p>)
