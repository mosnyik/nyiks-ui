// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { GithubIcon, Menu, X } from "lucide-react";
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { ThemeToggle } from "./ThemeToggle";
// import { WalletConnect } from "./ConnectWallet";

// export function Navbar() {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const routes = [
//     {
//       href: "/",
//       label: "Home",
//       active: pathname === "/",
//     },
//     {
//       href: "/contracts",
//       label: "Contracts",
//       active: pathname === "/contracts",
//     },
//     {
//       href: "/template",
//       label: "Templates",
//       active: pathname === "/template",
//     },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center mx-6">
//         <div className="mr-4 hidden md:flex">
//           <Link href="/" className="mr-6 flex items-center space-x-2">
//             <span className="font-bold text-xl">Nyiks UI</span>
//           </Link>
//           <nav className="flex items-center space-x-6 text-sm font-medium">
//             {routes.map((route) => (
//               <Link
//                 key={route.href}
//                 href={route.href}
//                 className={cn(
//                   "transition-colors hover:text-foreground/80",
//                   route.active ? "text-foreground" : "text-foreground/60"
//                 )}
//               >
//                 {route.label}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <Button
//           variant="ghost"
//           className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           <Menu className="h-6 w-6" />
//           <span className="sr-only">Toggle Menu</span>
//         </Button>

//         <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
//           <span className="font-bold">Stacks Scaffold</span>
//         </Link>

//         <div className="flex flex-1 items-center justify-end space-x-4">
//           <nav className="flex items-center space-x-2">
//             <Button variant="ghost" size="icon" asChild>
//               <Link
//                 href="https://github.com/zorex-tech/nyiks-ui"
//                 target="_blank"
//               >
//                 <GithubIcon className="h-5 w-5" />
//                 <span className="sr-only">GitHub</span>
//               </Link>
//             </Button>
//             <ThemeToggle />
//             <div className="hidden md:block">
//               <WalletConnect />
//             </div>
//           </nav>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div className="md:hidden">
//           <div
//             className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
//             onClick={() => setMobileMenuOpen(false)}
//           />
//           <div className="fixed top-0 right-0 z-50 h-full w-3/4 bg-background p-6 shadow-lg">
//             <div className="flex items-center justify-between">
//               <Link href="/" className="flex items-center space-x-2">
//                 <span className="font-bold text-xl">Nyiks UI</span>
//               </Link>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <X className="h-6 w-6" />
//                 <span className="sr-only">Close</span>
//               </Button>
//             </div>
//             <nav className="mt-6 flex flex-col space-y-4">
//               {routes.map((route) => (
//                 <Link
//                   key={route.href}
//                   href={route.href}
//                   className={cn(
//                     "text-lg font-medium transition-colors hover:text-foreground/80",
//                     route.active ? "text-foreground" : "text-foreground/60"
//                   )}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {route.label}
//                 </Link>
//               ))}
//               <div className="pt-4">
//                 <WalletConnect />
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GithubIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { WalletConnect } from "./ConnectWallet";

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
      href: "/template",
      label: "Templates",
      active: pathname === "/template",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden lg:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">Nyiks UI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 px-2 py-1 rounded-md hover:bg-accent/50",
                  route.active
                    ? "text-foreground font-semibold"
                    : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <Link href="/" className="mr-6 flex items-center space-x-2 lg:hidden">
          <span className="font-bold text-lg sm:text-xl">Nyiks UI</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-1 sm:space-x-2">
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
            <div className="hidden sm:block">
              <WalletConnect />
            </div>
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm bg-background/95 backdrop-blur-md border-l shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
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
            <nav className="flex flex-col space-y-1 p-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-lg font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                    route.active
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/80"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <div className="pt-6 border-t">
                <WalletConnect />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
