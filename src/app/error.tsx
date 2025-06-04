"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Bug,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like sentry
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            {/* Animated Error Icon */}
            <div className="mx-auto mb-4 relative">
              <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-6 animate-pulse">
                <AlertTriangle className="h-16 w-16 text-red-600 mx-auto" />
              </div>
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 animate-bounce">
                <Bug className="h-4 w-4 text-white" />
              </div>
            </div>

            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              We encountered an unexpected error. Don't worry, our team has been
              notified.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Details */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Bug className="h-4 w-4" />
                Error Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-mono bg-white dark:bg-gray-800 p-2 rounded border">
                {error.message || "An unexpected error occurred"}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                onClick={reset}
                className="gap-2 hover:scale-105 transition-transform"
                variant="default"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button
                asChild
                variant="outline"
                className="gap-2 hover:scale-105 transition-transform"
              >
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">
                Need Help?
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link
                    href="https://github.com/zorex-tech/nyiks-ui/issues"
                    target="_blank"
                  >
                    <Bug className="h-4 w-4" />
                    Report Bug
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link href="https://docs.stacks.co" target="_blank">
                    <MessageCircle className="h-4 w-4" />
                    Get Support
                  </Link>
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                💡 Quick Tips
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Try refreshing the page</li>
                <li>• Check your internet connection</li>
                <li>• Clear your browser cache</li>
                <li>• Try again in a few minutes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Floating Animation Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-red-200 dark:bg-red-800 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-5 w-12 h-12 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 animate-bounce"></div>
      </div>
    </div>
  );
}
