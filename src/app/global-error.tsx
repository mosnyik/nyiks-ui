"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 flex items-center justify-center p-4">
          <div className="max-w-lg mx-auto">
            <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-6 animate-pulse">
                    <AlertTriangle className="h-20 w-20 text-red-600 mx-auto" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                  Critical Error
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  The application encountered a critical error and needs to
                  restart.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-200 font-mono">
                    {error.message || "A critical system error occurred"}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={reset} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Restart Application
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    variant="outline"
                    className="gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Go to Homepage
                  </Button>
                </div>

                <div className="text-center pt-4 border-t">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    If this problem persists, please contact support
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </body>
    </html>
  );
}
