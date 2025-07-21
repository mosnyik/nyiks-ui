"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Code, Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          {/* Animated Logo */}
          <div className="relative mb-6">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-6 mx-auto w-fit">
              <Code className="h-12 w-12 text-purple-600 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-2 animate-spin">
              <Zap className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Loading Nyiks UI
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Preparing your Stacks development environment...
          </p>

          {/* Loading Spinner */}
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Please wait
            </span>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
