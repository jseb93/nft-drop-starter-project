import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = 'gutter_crypto';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);


  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        console.log("solana object exists");
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log("Connected with Public Key:", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      }
      else {
        console.log("No solana object");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        console.log("solana object exists");
        const response = await solana.connect();
        console.log("Connected with Public Key:", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      }
      else {
        console.log("No solana object");
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const renderNotConnectedContainer = () => {
    return (
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect to Wallet
      </button>
    );
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && <CandyMachine walletAddress={window.solana}/>}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
