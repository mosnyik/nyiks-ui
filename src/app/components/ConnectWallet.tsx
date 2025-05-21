"use client";

import React from "react";
import { useEffect, useState } from "react";
import { showConnect } from "@stacks/connect";
import { userSession } from "../lib/stacksSession";

const ConnectWallet = () => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setAddress(userData.profile.stxAddress.testnet); // or .mainnet
    }
  }, []);

  const handleLogin = () => {
    showConnect({
      appDetails: {
        name: "Nyiks UI",
        icon: window.location.origin + "/favicon.ico",
      },
      redirectTo: "/",
      onFinish: () => {
        const userData = userSession.loadUserData();
        setAddress(userData.profile.stxAddress.testnet);
      },
      userSession,
    });
  };

  const handleLogout = () => {
    userSession.signUserOut("/");
    setAddress(null);
  };

  return (
    <main style={{ padding: "2rem" }}>
      {address ? (
        <>
          <p>Connected as: {address}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Connect Wallet</button>
      )}
    </main>
  );
};

export default ConnectWallet;
