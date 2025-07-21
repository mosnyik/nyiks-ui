"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { AppConfig, UserSession } from "@stacks/connect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/ConnectWallet";
import { Lock, Wallet, Shield, Zap } from "lucide-react";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

interface WalletGuardProps {
  children: React.ReactNode;
  feature: string;
  description?: string;
}

export function WalletGuard({
  children,
  feature,
  description,
}: WalletGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = userSession.isUserSignedIn();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for authentication changes
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Checking wallet connection...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Lock Icon Animation */}
          <div className="relative mb-8">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-8 mx-auto w-fit animate-pulse">
              <Lock className="h-16 w-16 text-purple-600" />
            </div>
            <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-3 animate-bounce">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Wallet Required
              </CardTitle>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Connect your Stacks wallet to access {feature}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {description && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-purple-800 dark:text-purple-200 text-sm">
                    {description}
                  </p>
                </div>
              )}

              {/* Features List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-left">
                  What you can do after connecting:
                </h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Create and customize smart contracts
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                      <Wallet className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Deploy contracts to Stacks blockchain
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Secure contract management and storage
                    </span>
                  </div>
                </div>
              </div>

              {/* Connect Wallet Button */}
              <div className="pt-4">
                <WalletConnect />
              </div>

              {/* Help Text */}
              <div className="text-center pt-4 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Don't have a Stacks wallet?
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs bg-transparent"
                  >
                    <a
                      href="https://wallet.hiro.so/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Hiro Wallet
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs bg-transparent"
                  >
                    <a
                      href="https://www.xverse.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Xverse Wallet
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Floating Animation Elements */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-5 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-bounce"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
