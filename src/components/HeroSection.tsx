import { Button } from "./ui/button";
import { Code, Package } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl py-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Stacks <span className="text-purple-600">dApp</span> Scaffold
      </h1>
      <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
        A developer-friendly, responsive UI scaffold with wallet connectivity
        for building decentralized applications on the Stacks blockchain.
      </p>
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <Button asChild size="lg">
          <Link href="https://github.com/zorex-tech/nyiks-ui" target="_blank">
            <Package className="mr-2 h-5 w-5" />
            Get Started
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="https://docs.stacks.co" target="_blank">
            <Code className="mr-2 h-5 w-5" />
            Documentation
          </Link>
        </Button>
      </div>
    </div>
  );
}
