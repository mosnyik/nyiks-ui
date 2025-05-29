"use client";

import { useState, useEffect } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { WalletIcon, LogOutIcon, CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

export function WalletConnect() {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  

  useEffect(() => {
    setMounted(true);
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: "Nyiks UI",
        icon: window.location.origin + "/favicon.ico",
      },
      redirectTo: "/",
      onFinish: () => {
        setUserData(userSession.loadUserData());
      },
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut("/");
    setUserData(null);
  };

  const copyAddress = () => {
    if (userData?.profile?.stxAddress?.mainnet) {
      navigator.clipboard.writeText(userData.profile.stxAddress.mainnet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      {userData ? (
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
            <span className="text-xs font-mono">
              {userData.profile.stxAddress.mainnet.slice(0, 6)}...
              {userData.profile.stxAddress.mainnet.slice(-4)}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={copyAddress}
                  >
                    {copied ? (
                      <CheckIcon className="h-3 w-3" />
                    ) : (
                      <CopyIcon className="h-3 w-3" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy address"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="gap-2"
          >
            <LogOutIcon className="h-4 w-4" />
            <span className="hidden md:inline">Disconnect</span>
          </Button>
        </div>
      ) : (
        <Button onClick={connectWallet} className="gap-2">
          <WalletIcon className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
