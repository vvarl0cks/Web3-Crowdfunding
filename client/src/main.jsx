import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import { StateContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const SEPOLIA_CHAIN_ID = 11155111;

root.render(
  <ThirdwebProvider activeChain={{
    chainId:11155111,
    rpc:["https://rpc.sepolia.org/"],

    nativeCurrency: {
        decimals: 18,
        name: "Sepolia ETH",
        symbol: "sepETH",
    },
    shortName: "sepolia",
    slug: "sepoliaeth",
    testnet: true,
    chain: "Sepolia",
    name: "Sepolia Ethereum Testnet"
  }}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);