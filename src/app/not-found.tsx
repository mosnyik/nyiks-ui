"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, FileQuestion, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[12rem] md:text-[16rem] font-bold text-purple-100 dark:text-purple-900/30 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-full p-6 shadow-lg border border-purple-200 dark:border-purple-700">
              <FileQuestion className="h-16 w-16 text-purple-600 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Oops! The page you&rsquo;re looking for seems to have vanished into the
            blockchain void.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Go Home
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Return to the main page
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Explore
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse our templates
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 w-fit mx-auto mb-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Get Started
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create your first contract
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            asChild
            className="gap-2 hover:scale-105 transition-transform"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="gap-2 hover:scale-105 transition-transform"
          >
            <Link href="/template">
              <FileQuestion className="h-4 w-4" />
              Browse Templates
            </Link>
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-bounce"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-5 w-12 h-12 bg-green-200 dark:bg-green-800 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
}
