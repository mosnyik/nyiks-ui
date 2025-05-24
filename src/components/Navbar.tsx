"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { GithubIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { WalletConnect } from "@/app/components/ConnectWallet";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/contracts",
      label: "Contracts",
      active: pathname === "/contracts",
    },
    {
      href: "/templates",
      label: "Templates",
      active: pathname === "/templates",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">Nyiks UI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  route.active ? "text-foreground" : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <span className="font-bold">Stacks Scaffold</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/zorex-tech/nyiks-ui"
                target="_blank"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ThemeToggle />
            <div className="hidden md:block">
              <WalletConnect />
            </div>
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 h-full w-3/4 bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl">Nyiks UI</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="mt-6 flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-foreground/80",
                    route.active ? "text-foreground" : "text-foreground/60"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <div className="pt-4">
                <WalletConnect />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
