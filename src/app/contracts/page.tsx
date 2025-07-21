// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   FileCode,
//   Plus,
//   Search,
//   Filter,
//   MoreVertical,
//   Eye,
//   Edit,
//   Download,
//   Trash2,
//   Copy,
//   ExternalLink,
//   Calendar,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Coins,
//   Users,
//   Layers,
// } from "lucide-react";
// import { toast } from "sonner";
// import Link from "next/link";

// // Mock contract data
// interface Contract {
//   id: string;
//   name: string;
//   type: "nft" | "ft" | "dao" | "custom";
//   status: "draft" | "deployed" | "failed" | "pending";
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   deployedAt?: string;
//   network: "testnet" | "mainnet";
//   contractAddress?: string;
//   codeSize: number;
//   functions: number;
//   lastModified: string;
// }

// const mockContracts: Contract[] = [
//   {
//     id: "1",
//     name: "my-nft-collection",
//     type: "nft",
//     status: "deployed",
//     description: "A collection of unique digital art pieces",
//     createdAt: "2024-01-15T10:30:00Z",
//     updatedAt: "2024-01-16T14:20:00Z",
//     deployedAt: "2024-01-16T14:25:00Z",
//     network: "testnet",
//     contractAddress:
//       "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-nft-collection",
//     codeSize: 2456,
//     functions: 8,
//     lastModified: "2 days ago",
//   },
//   {
//     id: "2",
//     name: "governance-token",
//     type: "ft",
//     status: "deployed",
//     description: "Governance token for DAO voting",
//     createdAt: "2024-01-10T09:15:00Z",
//     updatedAt: "2024-01-12T16:45:00Z",
//     deployedAt: "2024-01-12T16:50:00Z",
//     network: "mainnet",
//     contractAddress:
//       "SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.governance-token",
//     codeSize: 1834,
//     functions: 12,
//     lastModified: "1 week ago",
//   },
//   {
//     id: "3",
//     name: "community-dao",
//     type: "dao",
//     status: "pending",
//     description: "Community governance and treasury management",
//     createdAt: "2024-01-20T11:00:00Z",
//     updatedAt: "2024-01-21T13:30:00Z",
//     network: "testnet",
//     codeSize: 3421,
//     functions: 15,
//     lastModified: "1 day ago",
//   },
//   {
//     id: "4",
//     name: "staking-rewards",
//     type: "custom",
//     status: "draft",
//     description: "Staking contract with reward distribution",
//     createdAt: "2024-01-22T08:45:00Z",
//     updatedAt: "2024-01-22T08:45:00Z",
//     network: "testnet",
//     codeSize: 2890,
//     functions: 10,
//     lastModified: "3 hours ago",
//   },
//   {
//     id: "5",
//     name: "marketplace-nft",
//     type: "nft",
//     status: "failed",
//     description: "NFT marketplace with trading functionality",
//     createdAt: "2024-01-18T15:20:00Z",
//     updatedAt: "2024-01-19T10:15:00Z",
//     network: "testnet",
//     codeSize: 4123,
//     functions: 18,
//     lastModified: "4 days ago",
//   },
// ];

// const Contracts = () => {
//   const [contracts, setContracts] = useState<Contract[]>(mockContracts);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedType, setSelectedType] = useState<string>("all");
//   const [selectedStatus, setSelectedStatus] = useState<string>("all");
//   const [selectedContract, setSelectedContract] = useState<Contract | null>(
//     null
//   );

//   // Filter contracts based on search and filters
//   const filteredContracts = contracts.filter((contract) => {
//     const matchesSearch =
//       contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       contract.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType =
//       selectedType === "all" || contract.type === selectedType;
//     const matchesStatus =
//       selectedStatus === "all" || contract.status === selectedStatus;
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   const getStatusIcon = (status: Contract["status"]) => {
//     switch (status) {
//       case "deployed":
//         return <CheckCircle className="h-4 w-4 text-green-600" />;
//       case "failed":
//         return <XCircle className="h-4 w-4 text-red-600" />;
//       case "pending":
//         return <Clock className="h-4 w-4 text-yellow-600" />;
//       case "draft":
//         return <AlertCircle className="h-4 w-4 text-gray-600" />;
//       default:
//         return <AlertCircle className="h-4 w-4 text-gray-600" />;
//     }
//   };

//   const getStatusColor = (status: Contract["status"]) => {
//     switch (status) {
//       case "deployed":
//         return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
//       case "failed":
//         return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
//       case "draft":
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
//     }
//   };

//   const getTypeIcon = (type: Contract["type"]) => {
//     switch (type) {
//       case "nft":
//         return <FileCode className="h-4 w-4 text-purple-600" />;
//       case "ft":
//         return <Coins className="h-4 w-4 text-blue-600" />;
//       case "dao":
//         return <Users className="h-4 w-4 text-green-600" />;
//       case "custom":
//         return <Layers className="h-4 w-4 text-orange-600" />;
//       default:
//         return <FileCode className="h-4 w-4 text-gray-600" />;
//     }
//   };

//   const handleDeleteContract = (contractId: string) => {
//     setContracts(contracts.filter((c) => c.id !== contractId));
//     toast.success("Contract deleted successfully");
//   };

//   const handleDuplicateContract = (contract: Contract) => {
//     const newContract: Contract = {
//       ...contract,
//       id: Date.now().toString(),
//       name: `${contract.name}-copy`,
//       status: "draft",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       deployedAt: undefined,
//       contractAddress: undefined,
//       lastModified: "Just now",
//     };
//     setContracts([newContract, ...contracts]);
//     toast.success("Contract duplicated successfully");
//   };

//   const handleDownloadContract = (contract: Contract) => {
//     // Mock contract code for download
//     const contractCode = `;;  ${contract.name} Contract
// ;;  ${contract.description}

// (define-data-var contract-owner principal tx-sender)

// ;; Contract implementation here...
// `;
//     const element = document.createElement("a");
//     const file = new Blob([contractCode], { type: "text/plain" });
//     element.href = URL.createObjectURL(file);
//     element.download = `${contract.name}.clar`;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     toast.success("Contract downloaded successfully");
//   };

//   const copyContractAddress = (address: string) => {
//     navigator.clipboard.writeText(address);
//     toast.success("Contract address copied to clipboard");
//   };

//   const stats = {
//     total: contracts.length,
//     deployed: contracts.filter((c) => c.status === "deployed").length,
//     draft: contracts.filter((c) => c.status === "draft").length,
//     pending: contracts.filter((c) => c.status === "pending").length,
//   };

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">My Contracts</h1>
//             <p className="text-muted-foreground">
//               Manage and deploy your Clarity smart contracts
//             </p>
//           </div>
//           <div className="flex gap-2 mt-4 sm:mt-0">
//             <Button asChild>
//               <Link href="/template">
//                 <Plus className="h-4 w-4 mr-2" />
//                 New Contract
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total</p>
//                   <p className="text-2xl font-bold">{stats.total}</p>
//                 </div>
//                 <FileCode className="h-8 w-8 text-muted-foreground" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Deployed</p>
//                   <p className="text-2xl font-bold text-green-600">
//                     {stats.deployed}
//                   </p>
//                 </div>
//                 <CheckCircle className="h-8 w-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Draft</p>
//                   <p className="text-2xl font-bold text-gray-600">
//                     {stats.draft}
//                   </p>
//                 </div>
//                 <AlertCircle className="h-8 w-8 text-gray-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Pending</p>
//                   <p className="text-2xl font-bold text-yellow-600">
//                     {stats.pending}
//                   </p>
//                 </div>
//                 <Clock className="h-8 w-8 text-yellow-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Filters */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search contracts..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <div className="flex gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2 bg-transparent">
//                   <Filter className="h-4 w-4" />
//                   Type:{" "}
//                   {selectedType === "all" ? "All" : selectedType.toUpperCase()}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setSelectedType("all")}>
//                   All Types
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedType("nft")}>
//                   NFT
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedType("ft")}>
//                   Fungible Token
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedType("dao")}>
//                   DAO
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedType("custom")}>
//                   Custom
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2 bg-transparent">
//                   <Filter className="h-4 w-4" />
//                   Status: {selectedStatus === "all" ? "All" : selectedStatus}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
//                   All Status
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedStatus("deployed")}>
//                   Deployed
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedStatus("draft")}>
//                   Draft
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedStatus("pending")}>
//                   Pending
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSelectedStatus("failed")}>
//                   Failed
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>

//         {/* Contracts List */}
//         <div className="space-y-4">
//           {filteredContracts.length === 0 ? (
//             <Card>
//               <CardContent className="p-12 text-center">
//                 <FileCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold mb-2">
//                   No contracts found
//                 </h3>
//                 <p className="text-muted-foreground mb-4">
//                   {searchQuery ||
//                   selectedType !== "all" ||
//                   selectedStatus !== "all"
//                     ? "Try adjusting your search or filters"
//                     : "Get started by creating your first contract"}
//                 </p>
//                 <Button asChild>
//                   <Link href="/template">
//                     <Plus className="h-4 w-4 mr-2" />
//                     Create Contract
//                   </Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             filteredContracts.map((contract) => (
//               <Card
//                 key={contract.id}
//                 className="hover:shadow-md transition-shadow"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-4 flex-1">
//                       <div className="p-2 bg-muted rounded-lg">
//                         {getTypeIcon(contract.type)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-1">
//                           <h3 className="text-lg font-semibold truncate">
//                             {contract.name}
//                           </h3>
//                           <Badge
//                             variant="secondary"
//                             className={getStatusColor(contract.status)}
//                           >
//                             {getStatusIcon(contract.status)}
//                             <span className="ml-1 capitalize">
//                               {contract.status}
//                             </span>
//                           </Badge>
//                           <Badge variant="outline">
//                             {contract.type.toUpperCase()}
//                           </Badge>
//                         </div>
//                         <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
//                           {contract.description}
//                         </p>
//                         <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
//                           <span className="flex items-center gap-1">
//                             <Calendar className="h-3 w-3" />
//                             Created{" "}
//                             {new Date(contract.createdAt).toLocaleDateString()}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             Modified {contract.lastModified}
//                           </span>
//                           <span>{contract.functions} functions</span>
//                           <span>{contract.codeSize} bytes</span>
//                           <Badge variant="outline" className="text-xs">
//                             {contract.network}
//                           </Badge>
//                         </div>
//                         {contract.contractAddress && (
//                           <div className="mt-2 flex items-center gap-2">
//                             <span className="text-xs text-muted-foreground">
//                               Address:
//                             </span>
//                             <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
//                               {contract.contractAddress.slice(0, 20)}...
//                             </code>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() =>
//                                 copyContractAddress(contract.contractAddress!)
//                               }
//                               className="h-6 w-6 p-0"
//                             >
//                               <Copy className="h-3 w-3" />
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreVertical className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <DropdownMenuItem
//                               onSelect={(e) => e.preventDefault()}
//                             >
//                               <Eye className="h-4 w-4 mr-2" />
//                               View Details
//                             </DropdownMenuItem>
//                           </DialogTrigger>
//                           <DialogContent className="max-w-2xl">
//                             <DialogHeader>
//                               <DialogTitle className="flex items-center gap-2">
//                                 {getTypeIcon(contract.type)}
//                                 {contract.name}
//                               </DialogTitle>
//                               <DialogDescription>
//                                 {contract.description}
//                               </DialogDescription>
//                             </DialogHeader>
//                             <div className="space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                   <label className="text-sm font-medium">
//                                     Status
//                                   </label>
//                                   <div className="flex items-center gap-2 mt-1">
//                                     {getStatusIcon(contract.status)}
//                                     <span className="capitalize">
//                                       {contract.status}
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <label className="text-sm font-medium">
//                                     Type
//                                   </label>
//                                   <p className="mt-1">
//                                     {contract.type.toUpperCase()}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <label className="text-sm font-medium">
//                                     Network
//                                   </label>
//                                   <p className="mt-1 capitalize">
//                                     {contract.network}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <label className="text-sm font-medium">
//                                     Functions
//                                   </label>
//                                   <p className="mt-1">{contract.functions}</p>
//                                 </div>
//                               </div>
//                               {contract.contractAddress && (
//                                 <div>
//                                   <label className="text-sm font-medium">
//                                     Contract Address
//                                   </label>
//                                   <div className="flex items-center gap-2 mt-1">
//                                     <code className="text-sm bg-muted px-2 py-1 rounded font-mono flex-1">
//                                       {contract.contractAddress}
//                                     </code>
//                                     <Button
//                                       variant="outline"
//                                       size="sm"
//                                       onClick={() =>
//                                         copyContractAddress(
//                                           contract.contractAddress!
//                                         )
//                                       }
//                                     >
//                                       <Copy className="h-4 w-4" />
//                                     </Button>
//                                   </div>
//                                 </div>
//                               )}
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                   <label className="text-sm font-medium">
//                                     Created
//                                   </label>
//                                   <p className="mt-1 text-sm">
//                                     {new Date(
//                                       contract.createdAt
//                                     ).toLocaleString()}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <label className="text-sm font-medium">
//                                     Last Updated
//                                   </label>
//                                   <p className="mt-1 text-sm">
//                                     {new Date(
//                                       contract.updatedAt
//                                     ).toLocaleString()}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </DialogContent>
//                         </Dialog>
//                         <DropdownMenuItem asChild>
//                           <Link href="/clarity-preview">
//                             <Edit className="h-4 w-4 mr-2" />
//                             Edit Contract
//                           </Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => handleDuplicateContract(contract)}
//                         >
//                           <Copy className="h-4 w-4 mr-2" />
//                           Duplicate
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => handleDownloadContract(contract)}
//                         >
//                           <Download className="h-4 w-4 mr-2" />
//                           Download
//                         </DropdownMenuItem>
//                         {contract.contractAddress && (
//                           <DropdownMenuItem asChild>
//                             <a
//                               href={`https://explorer.stacks.co/txid/${contract.contractAddress}?chain=${contract.network}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <ExternalLink className="h-4 w-4 mr-2" />
//                               View on Explorer
//                             </a>
//                           </DropdownMenuItem>
//                         )}
//                         <DropdownMenuSeparator />
//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <DropdownMenuItem
//                               onSelect={(e) => e.preventDefault()}
//                               className="text-red-600 focus:text-red-600"
//                             >
//                               <Trash2 className="h-4 w-4 mr-2" />
//                               Delete
//                             </DropdownMenuItem>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>
//                                 Delete Contract
//                               </AlertDialogTitle>
//                               <AlertDialogDescription>
//                                 Are you sure you want to delete "{contract.name}
//                                 "? This action cannot be undone.
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel>Cancel</AlertDialogCancel>
//                               <AlertDialogAction
//                                 onClick={() =>
//                                   handleDeleteContract(contract.id)
//                                 }
//                                 className="bg-red-600 hover:bg-red-700"
//                               >
//                                 Delete
//                               </AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contracts;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  FileCode,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Download,
  Trash2,
  Copy,
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Coins,
  Users,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { WalletGuard } from "@/components/WalletGuard";

// Mock contract data
interface Contract {
  id: string;
  name: string;
  type: "nft" | "ft" | "dao" | "custom";
  status: "draft" | "deployed" | "failed" | "pending";
  description: string;
  createdAt: string;
  updatedAt: string;
  deployedAt?: string;
  network: "testnet" | "mainnet";
  contractAddress?: string;
  codeSize: number;
  functions: number;
  lastModified: string;
}

const mockContracts: Contract[] = [
  {
    id: "1",
    name: "my-nft-collection",
    type: "nft",
    status: "deployed",
    description: "A collection of unique digital art pieces",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    deployedAt: "2024-01-16T14:25:00Z",
    network: "testnet",
    contractAddress:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.my-nft-collection",
    codeSize: 2456,
    functions: 8,
    lastModified: "2 days ago",
  },
  {
    id: "2",
    name: "governance-token",
    type: "ft",
    status: "deployed",
    description: "Governance token for DAO voting",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
    deployedAt: "2024-01-12T16:50:00Z",
    network: "mainnet",
    contractAddress:
      "SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.governance-token",
    codeSize: 1834,
    functions: 12,
    lastModified: "1 week ago",
  },
  {
    id: "3",
    name: "community-dao",
    type: "dao",
    status: "pending",
    description: "Community governance and treasury management",
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-21T13:30:00Z",
    network: "testnet",
    codeSize: 3421,
    functions: 15,
    lastModified: "1 day ago",
  },
  {
    id: "4",
    name: "staking-rewards",
    type: "custom",
    status: "draft",
    description: "Staking contract with reward distribution",
    createdAt: "2024-01-22T08:45:00Z",
    updatedAt: "2024-01-22T08:45:00Z",
    network: "testnet",
    codeSize: 2890,
    functions: 10,
    lastModified: "3 hours ago",
  },
  {
    id: "5",
    name: "marketplace-nft",
    type: "nft",
    status: "failed",
    description: "NFT marketplace with trading functionality",
    createdAt: "2024-01-18T15:20:00Z",
    updatedAt: "2024-01-19T10:15:00Z",
    network: "testnet",
    codeSize: 4123,
    functions: 18,
    lastModified: "4 days ago",
  },
];

const ContractsContent = () => {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Filter contracts based on search and filters
  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "all" || contract.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || contract.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: Contract["status"]) => {
    switch (status) {
      case "deployed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "draft":
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Contract["status"]) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: Contract["type"]) => {
    switch (type) {
      case "nft":
        return <FileCode className="h-4 w-4 text-purple-600" />;
      case "ft":
        return <Coins className="h-4 w-4 text-blue-600" />;
      case "dao":
        return <Users className="h-4 w-4 text-green-600" />;
      case "custom":
        return <Layers className="h-4 w-4 text-orange-600" />;
      default:
        return <FileCode className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleDeleteContract = (contractId: string) => {
    setContracts(contracts.filter((c) => c.id !== contractId));
    toast.success("Contract deleted successfully");
  };

  const handleDuplicateContract = (contract: Contract) => {
    const newContract: Contract = {
      ...contract,
      id: Date.now().toString(),
      name: `${contract.name}-copy`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deployedAt: undefined,
      contractAddress: undefined,
      lastModified: "Just now",
    };
    setContracts([newContract, ...contracts]);
    toast.success("Contract duplicated successfully");
  };

  const handleDownloadContract = (contract: Contract) => {
    // Mock contract code for download
    const contractCode = `;;  ${contract.name} Contract
;;  ${contract.description}

(define-data-var contract-owner principal tx-sender)

;; Contract implementation here...
`;
    const element = document.createElement("a");
    const file = new Blob([contractCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${contract.name}.clar`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Contract downloaded successfully");
  };

  const copyContractAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Contract address copied to clipboard");
  };

  const stats = {
    total: contracts.length,
    deployed: contracts.filter((c) => c.status === "deployed").length,
    draft: contracts.filter((c) => c.status === "draft").length,
    pending: contracts.filter((c) => c.status === "pending").length,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Contracts</h1>
            <p className="text-muted-foreground">
              Manage and deploy your Clarity smart contracts
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button asChild>
              <Link href="/template">
                <Plus className="h-4 w-4 mr-2" />
                New Contract
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FileCode className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Deployed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.deployed}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Draft</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {stats.draft}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Type:{" "}
                  {selectedType === "all" ? "All" : selectedType.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedType("all")}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("nft")}>
                  NFT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("ft")}>
                  Fungible Token
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("dao")}>
                  DAO
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("custom")}>
                  Custom
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Status: {selectedStatus === "all" ? "All" : selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("deployed")}>
                  Deployed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("draft")}>
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("failed")}>
                  Failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          {filteredContracts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No contracts found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ||
                  selectedType !== "all" ||
                  selectedStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "Get started by creating your first contract"}
                </p>
                <Button asChild>
                  <Link href="/template">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Contract
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredContracts.map((contract) => (
              <Card
                key={contract.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-muted rounded-lg">
                        {getTypeIcon(contract.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold truncate">
                            {contract.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(contract.status)}
                          >
                            {getStatusIcon(contract.status)}
                            <span className="ml-1 capitalize">
                              {contract.status}
                            </span>
                          </Badge>
                          <Badge variant="outline">
                            {contract.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {contract.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Created{" "}
                            {new Date(contract.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Modified {contract.lastModified}
                          </span>
                          <span>{contract.functions} functions</span>
                          <span>{contract.codeSize} bytes</span>
                          <Badge variant="outline" className="text-xs">
                            {contract.network}
                          </Badge>
                        </div>
                        {contract.contractAddress && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Address:
                            </span>
                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                              {contract.contractAddress.slice(0, 20)}...
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyContractAddress(contract.contractAddress!)
                              }
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getTypeIcon(contract.type)}
                                {contract.name}
                              </DialogTitle>
                              <DialogDescription>
                                {contract.description}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">
                                    Status
                                  </label>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getStatusIcon(contract.status)}
                                    <span className="capitalize">
                                      {contract.status}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">
                                    Type
                                  </label>
                                  <p className="mt-1">
                                    {contract.type.toUpperCase()}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">
                                    Network
                                  </label>
                                  <p className="mt-1 capitalize">
                                    {contract.network}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">
                                    Functions
                                  </label>
                                  <p className="mt-1">{contract.functions}</p>
                                </div>
                              </div>
                              {contract.contractAddress && (
                                <div>
                                  <label className="text-sm font-medium">
                                    Contract Address
                                  </label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <code className="text-sm bg-muted px-2 py-1 rounded font-mono flex-1">
                                      {contract.contractAddress}
                                    </code>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        copyContractAddress(
                                          contract.contractAddress!
                                        )
                                      }
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">
                                    Created
                                  </label>
                                  <p className="mt-1 text-sm">
                                    {new Date(
                                      contract.createdAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">
                                    Last Updated
                                  </label>
                                  <p className="mt-1 text-sm">
                                    {new Date(
                                      contract.updatedAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem asChild>
                          <Link href="/clarity-preview">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Contract
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicateContract(contract)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDownloadContract(contract)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        {contract.contractAddress && (
                          <DropdownMenuItem asChild>
                            <a
                              href={`https://explorer.stacks.co/txid/${contract.contractAddress}?chain=${contract.network}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on Explorer
                            </a>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Contract
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{contract.name}
                                "? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteContract(contract.id)
                                }
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const Contracts = () => {
  return (
    <WalletGuard
      feature="Contract Management"
      description="View, manage, and deploy your Clarity smart contracts. Connect your wallet to access your contract dashboard and deployment tools."
    >
      <ContractsContent />
    </WalletGuard>
  );
};

export default Contracts;
