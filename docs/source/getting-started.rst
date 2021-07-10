Getting started
===============

Installation 
------------

To start working with useDapp you need to have working React environment.

To get started, add following npm package :code:`@usedapp/core` to your project:

.. tabs::

  .. group-tab:: Yarn

    .. code-block:: text

      yarn add @usedapp/core

  .. group-tab:: NPM

    .. code-block:: text

      npm install @usedapp/core

Example
-------

Below is a simple example:

.. code-block:: javascript

  import { ChainId, DAppProvider } from '@usedapp/core'

  const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
  }

  ReactDOM.render(
    <React.StrictMode>
      <DAppProvider config={config}>
        <App />
      </DAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )

  export function App() {
    const { activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)
    return (
      <div>
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
        {account && <p>Account: {account}</p>}
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
      </div>
    )
  }


Example is available `here <https://usedapp-example.netlify.app/>`_ and full example code is available `here <https://github.com/EthWorks/useDapp/tree/master/packages/example>`_.

Let's go over it step by step.

Setup
-----

The first thing you need to do is set up **DAppProvider** with optional config and wrap your whole App in it. You can read about config :ref:`here<config>`.

.. code-block:: jsx

  <DAppProvider>
    <App /> {/* Wrap your app with the Provider */}
  </DAppProvider>


Connecting to a network
-----------------------

Then you need to activate the provider using **activateBrowserWallet**. It's best to do when the user clicks "Connect" button.

.. code-block:: jsx

  export function App() {
    const { activateBrowserWallet, account } = useEthers()
    return (
      <div>
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
        {account && <p>Account: {account}</p>}
      </div>
    )
  }

After the activation (i.e. user connects to a wallet like MetaMask) the component will show the user's address.

If you need to use another connector than a browser wallet, use the `activate` method from `useEthers`. See the `web3-react <https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#overview>` doc for that one. 

Ether balance
-------------

`useEtherBalance(address: string)`

Provides a way to fetch the account balance. Takes the account address as an argument and returns ``BigNumber`` or ``undefined`` when data is not available (i.e. not connected). 
To obtain currently connected ``account`` employ ``useEthers()``.

.. code-block:: jsx

  import { formatEther } from '@ethersproject/units'

  export function EtherBalance() {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account)

    return (
      <div>
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
      </div>
    )
  }

Token balance
-------------

`useTokenBalance(address: string, tokenAddress: string)`

Provides a way to fetch balance of ERC20 token specified by ``tokenAddress`` for provided ``address``. Returns ``BigNumber`` or ``undefined`` when data is not available.

.. code-block:: jsx

  import { formatUnits } from '@ethersproject/units'

  const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'

  export function TokenBalance() {
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(DAI, account)

    return (
      <div>
        {tokenBalance && <p>Balance: {formatUnits(tokenBalance, 18)}</p>}
      </div>
    )
  }


Troubleshooting
---------------

Type mismatch when building
***************************

If when building an app you see errors about type mismatch in ``@ethersproject``. 

For example:

.. code-block::

  $ yarn build
  yarn run v1.22.10
  $ tsc --noEmit && rimraf build && webpack --mode production --progress
  src/components/Transactions/Forms.tsx:12:52 - error TS2345: Argument of type 'Interface' is not assignable to parameter of type 'ContractInterface'.
    Property 'getError' is missing in type 'import("github.com/ethworks/usedapp/packages/example/node_modules/@ethersproject/abi/lib/interface").Interface' but required in type 'import("github.com/ethworks/usedapp/packages/example/node_modules/@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface").Interface'.

  12 const contract = new Contract(wethContractAddress, wethInterface)
                                                        ~~~~~~~~~~~~~

    node_modules/@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface.d.ts:53:5
      53     getError(nameOrSignatureOrSighash: string): ErrorFragment;
            ~~~~~~~~
      'getError' is declared here.


  Found 1 error.

  error Command failed with exit code 2.
  info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

It may be an error of yarn getting internal versions of ``@ethersproject`` that are higher then specified in useDApp.
To fix this you need to add resolutions to your ``package.json`` with etherspoject packages that cause an error, with correct version.
Resolutions force yarn to install specified versions of packages.

For example:

.. code-block::

  "resolutions": {
    "@ethersproject/abi": "5.2.0",
    "@ethersproject/contracts": "5.2.0"
  }
