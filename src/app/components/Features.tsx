import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Layers, Wallet, Zap } from "lucide-react";

export function Features() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl py-12">
      <Card>
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

      <Card>
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

      <Card>
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

      <Card>
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
    </div>
  );
}
