# useDapp

Framework for Ethereum Dapps on React.
Easy to learn for developer. Robust experience for user. 
Secure. Testable. Extendable.

## Problem
A Dapp is a bit different animal than a typical web application.

A Dapp designed with **user experience** in mind will:
- 🔄 refresh after a new block arrives
- 📺 work in view mode before connecting a wallet
- ✅ show the status of the current transactions 
- 🛅 and more :)

A Dapp designed with **developer experience** in mind will:
- 🧪 work on both mainnet and testnets
- 🛡️ be error proof and easy to test 
- 🍼 be easy to develop and extend
- 🧰 and much more...

These requirements used to make writing quality DApps somewhat challenging, but no more with useDapp.

## Solution

**useDapp** combines the best practices of **React**, **Ethereum** and programming in general:
- 🧱 uses react hooks as your primary building ingredient
- 🚅 refreshes components automatically on each block if needed
- 🛒 combines multiple blockchain calls into a single multicall
- 📚 extends easily with custom hooks
- 🎚️ tests integration of UI and blockchain easily

## Example

```tsx
ReactDOM.render(
  <EthersProvider>
    <App />
  <EthersProvider/>,
  document.getElementById('app')
)

function App() {
  const balance = useEtherBalance();
  return (
    <div>
    Your balance is: <span> {balance} </span>
    </div>
  )
}
```


## Documentation
For detailed feature walkthrough checkout [documentation](https://usedapp.readthedocs.io/en/latest/).

## Contributing

Contributions are always welcome, no matter how large or small. Before contributing, please read the [code of conduct](https://github.com/EthWorks/useDapp/blob/master/CODE_OF_CONDUCT.md) and [contribution policy](https://github.com/EthWorks/useDapp/blob/master/CONTRIBUTION.md).

### Before you issue pull request:

* Make sure all tests pass.
* Make sure linter passes.
* Make sure you have test coverage for any new features.

To run tests type:
```sh
yarn test
```

To run linter type:
```sh
yarn lint
```

### Building documentation

[Install Sphinx](https://www.sphinx-doc.org/en/master/usage/installation.html) to build documentation:

```sh
cd docs
make html
```

Before building documentation for the first time you may have to install required python packages:
```sh
pip3 install -r docs/requirements.txt
```

## License

useDapp is released under the [MIT License](https://opensource.org/licenses/MIT).
