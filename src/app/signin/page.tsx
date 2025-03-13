'use client';

import React, { useState } from 'react';

const SigninPage = () => {
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState('');

  const connectMetamask = async () => {
    if (typeof window?.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const userAccount = accounts[0];
        setAccount(userAccount);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  const signMessage = async () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }

    const message = 'Hello, this is a test message!';
    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account],
      });
      setSignature(signature);
    } catch (error) {
      console.error('Error signing message', error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center h-screen w-full">
      <button
        onClick={connectMetamask}
        className="bg-blue-600 rounded-2xl h-12 w-[200px] font-medium uppercase cursor-pointer hover:opacity-90">
        Wallet Connect
      </button>

      <button
        onClick={signMessage}
        className="bg-yellow-600 rounded-2xl h-12 w-[200px] font-medium uppercase cursor-pointer hover:opacity-90">
        Sign Message
      </button>

      <div className="flex flex-col gap-2 justify-center items-center">
        {account && <p>Address: {account}</p>}
        {signature && <p>Signature : {signature}</p>}
      </div>
    </div>
  );
};

export default SigninPage;
