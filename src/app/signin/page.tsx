'use client';

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useSignMessage } from 'wagmi';

const SigninPage = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [siginature, setSiginature] = useState('');

  const { signMessage } = useSignMessage({});

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="">
          {connectors.map((connector) => (
            <button
              className="bg-red-400 h-10 w-[200px] rounded-3xl"
              key={connector.uid}
              onClick={() => connect({ connector })}>
              Wallet Connect
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <p>Connected: {address}</p>
      <button
        className="bg-blue-500 h-10 w-[200px] rounded-3xl"
        onClick={() =>
          signMessage(
            {
              account: address,
              message: 'This is a test',
            },
            {
              onSuccess: (data) => {
                setSiginature(data);
              },
            }
          )
        }>
        Sign Message
      </button>
      <button onClick={() => disconnect()}>Disconnect</button>

      {siginature && <p>Signature: {siginature}</p>}
    </div>
  );
};

export default SigninPage;
