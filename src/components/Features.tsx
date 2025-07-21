"use client";
import Link from "next/link";
import { Code, Layers, Wallet, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import { WalletConnect } from "./ConnectWallet";

export function Features() {
  const [showConnect, setShowConnect] = useState(false);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl py-12">
        {/* <Link href="/connect-wallet" className="block">
        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5 text-purple-600" />
              Wallet Connect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Seamlessly connect to Stacks wallets like Hiro Wallet or Xverse.
            </CardDescription>
          </CardContent>
        </Card>
      </Link> */}

        <Card
          onClick={() => setShowConnect(!showConnect)}
          className="hover:shadow-md transition-shadow cursor-pointer"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5 text-purple-600" />
              Wallet Connect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {showConnect ? (
                <WalletConnect />
              ) : (
                "Seamlessly connect to Stacks wallets like Hiro Wallet or Xverse."
              )}
            </CardDescription>
          </CardContent>
        </Card>
        <Link href="/clarity-preview" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-600" />
                Clarity Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Preview and edit Clarity (.clar) smart contract code.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/template" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-600" />
                Contract Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access and customize pre-built contract templates.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/deploy-interact" className="block">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Deploy & Interact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Deploy contracts and interact with the Stacks blockchain.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
}
