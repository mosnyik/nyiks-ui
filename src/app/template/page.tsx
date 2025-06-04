// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Coins,
//   FileCode,
//   Users,
//   ArrowRight,
//   Check,
//   Copy,
//   Download,
// } from "lucide-react";
// import { toast } from "sonner";
// import {
//   contractTemplates,
//   templateMetadata,
//   downloadProject,
// } from "@/lib/templates";

// const Templates = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState<string>("nft"); // Default to NFT
//   const [contractCode, setContractCode] = useState<string>(
//     contractTemplates.nft
//   );

//   // Update contract code when template changes
//   const handleTemplateChange = (templateId: string) => {
//     setSelectedTemplate(templateId);
//     setContractCode(
//       contractTemplates[templateId as keyof typeof contractTemplates]
//     );
//   };

//   const copyToClipboard = () => {
//     if (contractCode) {
//       navigator.clipboard.writeText(contractCode);
//       toast.success("Contract code copied to clipboard!");
//     }
//   };

//   const handleDownload = async () => {
//     if (selectedTemplate) {
//       // Use the edited contract code instead of the template
//       const success = await downloadProject(selectedTemplate, contractCode);
//       if (success) {
//         toast.success("Project downloaded successfully!");
//       } else {
//         toast.error("Failed to download project. Please try again.");
//       }
//     }
//   };

//   // Map icon strings to actual components
//   const getIconComponent = (iconName: string) => {
//     switch (iconName) {
//       case "FileCode":
//         return FileCode;
//       case "Coins":
//         return Coins;
//       case "Users":
//         return Users;
//       default:
//         return FileCode;
//     }
//   };

//   return (
//     <div className="container mx-auto py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-2">Contract Templates</h1>
//         <p className="text-muted-foreground mb-8">
//           Select a template to get started with your Stacks smart contract
//         </p>

//         <div className="grid gap-8 lg:grid-cols-2">
//           {/* Template Selection */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
//             <div className="grid gap-4">
//               {templateMetadata.map((template) => {
//                 const IconComponent = getIconComponent(template.icon);

//                 return (
//                   <Card
//                     key={template.id}
//                     className={`cursor-pointer transition-all hover:shadow-md ${
//                       selectedTemplate === template.id
//                         ? "ring-2 ring-purple-600"
//                         : ""
//                     }`}
//                     onClick={() => handleTemplateChange(template.id)}
//                   >
//                     <CardHeader className="pb-3">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
//                             <IconComponent className="h-5 w-5 text-purple-600" />
//                           </div>
//                           <div>
//                             <CardTitle className="text-lg">
//                               {template.title}
//                             </CardTitle>
//                             <CardDescription className="text-sm">
//                               {template.description}
//                             </CardDescription>
//                           </div>
//                         </div>
//                         {selectedTemplate === template.id && (
//                           <div className="bg-purple-600 rounded-full p-1">
//                             <Check className="h-4 w-4 text-white" />
//                           </div>
//                         )}
//                       </div>
//                     </CardHeader>
//                     <CardContent className="pt-0">
//                       <div className="flex flex-wrap gap-2">
//                         {template.features.map((feature, index) => (
//                           <span
//                             key={index}
//                             className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
//                           >
//                             <Check className="h-3 w-3 text-purple-600" />
//                             {feature}
//                           </span>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Code Editor Preview */}
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold">Contract Preview</h2>
//               {selectedTemplate && (
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={copyToClipboard}
//                     className="gap-2"
//                   >
//                     <Copy className="h-4 w-4" />
//                     Copy
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleDownload}
//                     className="gap-2"
//                   >
//                     <Download className="h-4 w-4" />
//                     Download Project
//                   </Button>
//                 </div>
//               )}
//             </div>

//             {/* VS Code-like Editor */}
//             <div className="h-[600px] bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
//               {/* Editor Header */}
//               <div className="bg-[#2d2d30] px-4 py-2 border-b border-gray-600 flex items-center gap-2">
//                 <div className="flex gap-1.5">
//                   <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
//                   <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
//                   <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
//                 </div>
//                 <span className="text-sm font-mono text-gray-300 ml-2">
//                   {selectedTemplate === "nft"
//                     ? "my-nft"
//                     : selectedTemplate === "ft"
//                     ? "my-token"
//                     : "dao"}
//                   .clar
//                 </span>
//               </div>

//               {/* Tab Bar */}
//               <div className="bg-[#252526] border-b border-gray-600">
//                 <div className="flex">
//                   <div className="bg-[#1e1e1e] px-4 py-2 text-sm text-gray-300 border-r border-gray-600 flex items-center gap-2">
//                     <FileCode className="h-4 w-4" />
//                     {selectedTemplate === "nft"
//                       ? "my-nft"
//                       : selectedTemplate === "ft"
//                       ? "my-token"
//                       : "dao"}
//                     .clar
//                   </div>
//                 </div>
//               </div>

//               {/* Editor Content */}
//               <div className="flex h-[calc(100%-80px)]">
//                 {/* Line Numbers */}
//                 <div className="bg-[#1e1e1e] px-3 py-4 border-r border-gray-600 select-none min-w-[50px]">
//                   <div className="text-sm font-mono text-gray-500 leading-6">
//                     {contractCode.split("\n").map((_, index) => (
//                       <div key={index} className="text-right">
//                         {index + 1}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Code Content */}
//                 <div className="flex-1 relative">
//                   <textarea
//                     value={contractCode}
//                     onChange={(e) => setContractCode(e.target.value)}
//                     className="w-full h-full p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] focus:outline-none resize-none leading-6"
//                     style={{
//                       tabSize: 2,
//                       fontFamily:
//                         "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
//                     }}
//                     spellCheck="false"
//                     placeholder="Select a template to start editing..."
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 flex justify-end">
//           <Button disabled={!selectedTemplate} className="gap-2">
//             Continue with template
//             <ArrowRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Templates;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Coins,
  FileCode,
  Users,
  ArrowRight,
  Check,
  Copy,
  Download,
  Settings,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  contractTemplates,
  templateMetadata,
  downloadProject,
} from "@/lib/templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Templates = () => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("nft"); // Default to NFT
  const [contractCode, setContractCode] = useState<string>(
    contractTemplates.nft
  );
  const [showParameters, setShowParameters] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("basic");

  // Contract parameters
  const [parameters, setParameters] = useState({
    // Basic parameters
    contractName: "my-nft",
    tokenName: "My NFT Collection",
    tokenSymbol: "MNC",
    description:
      "A collection of unique digital assets on the Stacks blockchain",

    // NFT specific
    nftBaseUri: "https://example.com/metadata/",
    maxSupply: "10000",

    // FT specific
    initialSupply: "1000000",
    decimals: "6",

    // DAO specific
    votingPeriod: "1440", // blocks
    proposalThreshold: "100",
    quorumVotes: "500",

    // Advanced parameters
    ownerAddress: "",
    transferable: true,
    mintable: true,
    burnable: false,
    pausable: false,

    // Custom error codes
    errorCodes: {
      notOwner: "u100",
      notFound: "u101",
      insufficientBalance: "u102",
    },
  });

  // Update contract code when template changes
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setContractCode(
      contractTemplates[templateId as keyof typeof contractTemplates]
    );

    // Update default parameters based on template
    if (templateId === "nft") {
      setParameters((prev) => ({
        ...prev,
        contractName: "my-nft",
        tokenName: "My NFT Collection",
        tokenSymbol: "MNC",
        description:
          "A collection of unique digital assets on the Stacks blockchain",
      }));
    } else if (templateId === "ft") {
      setParameters((prev) => ({
        ...prev,
        contractName: "my-token",
        tokenName: "My Token",
        tokenSymbol: "MTK",
        description: "A fungible token on the Stacks blockchain",
      }));
    } else if (templateId === "dao") {
      setParameters((prev) => ({
        ...prev,
        contractName: "my-dao",
        tokenName: "DAO Token",
        tokenSymbol: "DAO",
        description:
          "A decentralized autonomous organization on the Stacks blockchain",
      }));
    }
  };

  // Apply parameters to contract code
  const applyParameters = () => {
    let updatedCode =
      contractTemplates[selectedTemplate as keyof typeof contractTemplates];

    // Basic replacements
    if (selectedTemplate === "nft") {
      updatedCode = updatedCode.replace(/my-nft/g, parameters.contractName);
      updatedCode = updatedCode.replace(
        /https:\/\/example\.com\/metadata\/\{id\}/g,
        `${parameters.nftBaseUri}{id}`
      );

      // Add max supply if specified
      if (parameters.maxSupply) {
        const maxSupplyLine = `(define-data-var max-token-id uint u${parameters.maxSupply})`;
        updatedCode = updatedCode.replace(
          /(define-data-var last-token-id uint u0)/,
          `$1\n${maxSupplyLine}`
        );
      }

      // Add mint check for max supply if needed
      if (parameters.maxSupply) {
        const maxSupplyCheck = `    (asserts! (< token-id (var-get max-token-id)) (err ${parameters.errorCodes.insufficientBalance}))`;
        updatedCode = updatedCode.replace(
          /(let\s*$$\s*\(\s*token-id \(.*$$\s*\)\s*\))/,
          `$1\n${maxSupplyCheck}`
        );
      }

      // Add transferable check if not transferable
      if (!parameters.transferable) {
        updatedCode = updatedCode.replace(
          /(define-public $$transfer.*$$\s*\(\s*begin)/,
          `$1\n    (asserts! false (err ${parameters.errorCodes.notOwner})) ;; Transfers disabled`
        );
      }
    } else if (selectedTemplate === "ft") {
      updatedCode = updatedCode.replace(/my-token/g, parameters.contractName);
      updatedCode = updatedCode.replace(
        /"My Token"/g,
        `"${parameters.tokenName}"`
      );
      updatedCode = updatedCode.replace(
        /"MTK"/g,
        `"${parameters.tokenSymbol}"`
      );
      updatedCode = updatedCode.replace(/u6/g, `u${parameters.decimals}`);

      // Add initial supply mint if specified
      if (parameters.initialSupply && parameters.initialSupply !== "0") {
        const initialMintLine = `\n;; Mint initial supply\n(ft-mint? ${parameters.contractName} u${parameters.initialSupply} tx-sender)`;
        updatedCode = updatedCode.replace(
          /(define-fungible-token.*)/,
          `$1${initialMintLine}`
        );
      }

      // Add burnable function if enabled
      if (parameters.burnable) {
        const burnFunction = `\n(define-public (burn (amount uint) (sender principal))
  (begin
    (asserts! (is-eq tx-sender sender) insufficient-balance)
    (asserts! (> amount u0) invalid-amount)
    (ft-burn? ${parameters.contractName} amount sender)
  )
)`;
        updatedCode += burnFunction;
      }
    } else if (selectedTemplate === "dao") {
      updatedCode = updatedCode.replace(
        /voting-period uint u1440/g,
        `voting-period uint u${parameters.votingPeriod}`
      );

      // Add proposal threshold if specified
      if (parameters.proposalThreshold) {
        const thresholdCheck = `    (asserts! (>= (get voting-power member-info) u${parameters.proposalThreshold}) (err u105))`;
        updatedCode = updatedCode.replace(
          /(create-proposal.*\s*$$\s*let\s*\(\s*\(\s*proposal-id.*\s*$$\s*$$\s*member-info.*\s*$$\s*\))/,
          `$1\n${thresholdCheck}`
        );
      }
    }

    // Common replacements
    if (parameters.description) {
      const descriptionComment = `;; ${parameters.description}\n`;
      updatedCode = descriptionComment + updatedCode;
    }

    // Replace owner if specified
    if (parameters.ownerAddress) {
      updatedCode = updatedCode.replace(
        /tx-sender/g,
        `'${parameters.ownerAddress}`
      );
    }

    // Replace error codes
    updatedCode = updatedCode.replace(
      /$$err u100$$/g,
      `(err ${parameters.errorCodes.notOwner})`
    );
    updatedCode = updatedCode.replace(
      /$$err u101$$/g,
      `(err ${parameters.errorCodes.notFound})`
    );
    updatedCode = updatedCode.replace(
      /$$err u102$$/g,
      `(err ${parameters.errorCodes.insufficientBalance})`
    );

    setContractCode(updatedCode);
    setShowParameters(false);
    toast.success("Parameters applied to contract!");
  };

  const copyToClipboard = () => {
    if (contractCode) {
      navigator.clipboard.writeText(contractCode);
      toast.success("Contract code copied to clipboard!");
    }
  };

  const handleDownload = async () => {
    if (selectedTemplate) {
      // Use the edited contract code instead of the template
      const success = await downloadProject(selectedTemplate, contractCode);
      if (success) {
        toast.success("Project downloaded successfully!");
      } else {
        toast.error("Failed to download project. Please try again.");
      }
    }
  };

  // Map icon strings to actual components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "FileCode":
        return FileCode;
      case "Coins":
        return Coins;
      case "Users":
        return Users;
      default:
        return FileCode;
    }
  };

  const handleContinue = () => {
    // Store the contract code in localStorage to pass to deploy page
    localStorage.setItem("contractCode", contractCode);
    localStorage.setItem("contractName", parameters.contractName);
    router.push("/deploy-interact");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Contract Templates</h1>
        <p className="text-muted-foreground mb-8">
          Select a template to get started with your Stacks smart contract
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Template Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
            <div className="grid gap-4">
              {templateMetadata.map((template) => {
                const IconComponent = getIconComponent(template.icon);

                return (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-purple-600"
                        : ""
                    }`}
                    onClick={() => handleTemplateChange(template.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                            <IconComponent className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {template.title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {template.description}
                            </CardDescription>
                          </div>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="bg-purple-600 rounded-full p-1">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md"
                          >
                            <Check className="h-3 w-3 text-purple-600" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Code Editor Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Contract Preview</h2>
              {selectedTemplate && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowParameters(!showParameters)}
                    className="gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Parameters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Project
                  </Button>
                </div>
              )}
            </div>

            {/* VS Code-like Editor */}
            <div className="h-[600px] bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              {/* Editor Header */}
              <div className="bg-[#2d2d30] px-4 py-2 border-b border-gray-600 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
                </div>
                <span className="text-sm font-mono text-gray-300 ml-2">
                  {parameters.contractName}.clar
                </span>
              </div>

              {/* Tab Bar */}
              <div className="bg-[#252526] border-b border-gray-600">
                <div className="flex">
                  <div className="bg-[#1e1e1e] px-4 py-2 text-sm text-gray-300 border-r border-gray-600 flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    {parameters.contractName}.clar
                  </div>
                </div>
              </div>

              {/* Editor Content */}
              <div className="flex h-[calc(100%-80px)]">
                {/* Line Numbers */}
                <div className="bg-[#1e1e1e] px-3 py-4 border-r border-gray-600 select-none min-w-[50px]">
                  <div className="text-sm font-mono text-gray-500 leading-6">
                    {contractCode.split("\n").map((_, index) => (
                      <div key={index} className="text-right">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Content */}
                <div className="flex-1 relative">
                  <textarea
                    value={contractCode}
                    onChange={(e) => setContractCode(e.target.value)}
                    className="w-full h-full p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] focus:outline-none resize-none leading-6"
                    style={{
                      tabSize: 2,
                      fontFamily:
                        "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
                    }}
                    spellCheck="false"
                    placeholder="Select a template to start editing..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parameters Modal */}
        {showParameters && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="sticky top-0 bg-card z-10 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Contract Parameters</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowParameters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Customize your contract settings
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs
                  defaultValue="basic"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="template">
                      Template Specific
                    </TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  {/* Basic Parameters */}
                  <TabsContent value="basic" className="space-y-4">
                    <div>
                      <Label htmlFor="contractName">Contract Name</Label>
                      <Input
                        id="contractName"
                        value={parameters.contractName}
                        onChange={(e) =>
                          setParameters((prev) => ({
                            ...prev,
                            contractName: e.target.value,
                          }))
                        }
                        placeholder="my-contract"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        The name of your contract file (kebab-case, no spaces)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="tokenName">Token Name</Label>
                      <Input
                        id="tokenName"
                        value={parameters.tokenName}
                        onChange={(e) =>
                          setParameters((prev) => ({
                            ...prev,
                            tokenName: e.target.value,
                          }))
                        }
                        placeholder="My Token"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        The human-readable name of your token
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="tokenSymbol">Token Symbol</Label>
                      <Input
                        id="tokenSymbol"
                        value={parameters.tokenSymbol}
                        onChange={(e) =>
                          setParameters((prev) => ({
                            ...prev,
                            tokenSymbol: e.target.value,
                          }))
                        }
                        placeholder="MTK"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Short symbol for your token (e.g., BTC, ETH)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={parameters.description}
                        onChange={(e) =>
                          setParameters((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="A description of your contract"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        A brief description of your contract (added as a
                        comment)
                      </p>
                    </div>
                  </TabsContent>

                  {/* Template Specific Parameters */}
                  <TabsContent value="template" className="space-y-4">
                    {selectedTemplate === "nft" && (
                      <>
                        <div>
                          <Label htmlFor="nftBaseUri">Base URI</Label>
                          <Input
                            id="nftBaseUri"
                            value={parameters.nftBaseUri}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                nftBaseUri: e.target.value,
                              }))
                            }
                            placeholder="https://example.com/metadata/"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Base URI for token metadata (should end with a
                            slash)
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="maxSupply">Maximum Supply</Label>
                          <Input
                            id="maxSupply"
                            value={parameters.maxSupply}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                maxSupply: e.target.value,
                              }))
                            }
                            placeholder="10000"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Maximum number of tokens that can be minted (leave
                            empty for unlimited)
                          </p>
                        </div>
                      </>
                    )}

                    {selectedTemplate === "ft" && (
                      <>
                        <div>
                          <Label htmlFor="initialSupply">Initial Supply</Label>
                          <Input
                            id="initialSupply"
                            value={parameters.initialSupply}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                initialSupply: e.target.value,
                              }))
                            }
                            placeholder="1000000"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Initial token supply to mint to contract owner
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="decimals">Decimals</Label>
                          <Input
                            id="decimals"
                            value={parameters.decimals}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                decimals: e.target.value,
                              }))
                            }
                            placeholder="6"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Number of decimal places for your token (e.g., 6 for
                            USDC, 8 for BTC)
                          </p>
                        </div>
                      </>
                    )}

                    {selectedTemplate === "dao" && (
                      <>
                        <div>
                          <Label htmlFor="votingPeriod">
                            Voting Period (blocks)
                          </Label>
                          <Input
                            id="votingPeriod"
                            value={parameters.votingPeriod}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                votingPeriod: e.target.value,
                              }))
                            }
                            placeholder="1440"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Duration of voting period in blocks (~10 minutes per
                            block)
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="proposalThreshold">
                            Proposal Threshold
                          </Label>
                          <Input
                            id="proposalThreshold"
                            value={parameters.proposalThreshold}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                proposalThreshold: e.target.value,
                              }))
                            }
                            placeholder="100"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Minimum voting power required to submit a proposal
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="quorumVotes">Quorum Votes</Label>
                          <Input
                            id="quorumVotes"
                            value={parameters.quorumVotes}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                quorumVotes: e.target.value,
                              }))
                            }
                            placeholder="500"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Minimum votes required for a proposal to pass
                          </p>
                        </div>
                      </>
                    )}
                  </TabsContent>

                  {/* Advanced Parameters */}
                  <TabsContent value="advanced" className="space-y-4">
                    <div>
                      <Label htmlFor="ownerAddress">Owner Address</Label>
                      <Input
                        id="ownerAddress"
                        value={parameters.ownerAddress}
                        onChange={(e) =>
                          setParameters((prev) => ({
                            ...prev,
                            ownerAddress: e.target.value,
                          }))
                        }
                        placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Contract owner address (leave empty to use tx-sender)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Features</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="transferable"
                              className="cursor-pointer"
                            >
                              Transferable
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Allow tokens to be transferred
                            </p>
                          </div>
                          <Switch
                            id="transferable"
                            checked={parameters.transferable}
                            onCheckedChange={(checked) =>
                              setParameters((prev) => ({
                                ...prev,
                                transferable: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="mintable"
                              className="cursor-pointer"
                            >
                              Mintable
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Allow new tokens to be minted
                            </p>
                          </div>
                          <Switch
                            id="mintable"
                            checked={parameters.mintable}
                            onCheckedChange={(checked) =>
                              setParameters((prev) => ({
                                ...prev,
                                mintable: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="burnable"
                              className="cursor-pointer"
                            >
                              Burnable
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Allow tokens to be burned
                            </p>
                          </div>
                          <Switch
                            id="burnable"
                            checked={parameters.burnable}
                            onCheckedChange={(checked) =>
                              setParameters((prev) => ({
                                ...prev,
                                burnable: checked,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="pausable"
                              className="cursor-pointer"
                            >
                              Pausable
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Allow contract to be paused
                            </p>
                          </div>
                          <Switch
                            id="pausable"
                            checked={parameters.pausable}
                            onCheckedChange={(checked) =>
                              setParameters((prev) => ({
                                ...prev,
                                pausable: checked,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Error Codes</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="notOwner">Not Owner</Label>
                          <Input
                            id="notOwner"
                            value={parameters.errorCodes.notOwner}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                errorCodes: {
                                  ...prev.errorCodes,
                                  notOwner: e.target.value,
                                },
                              }))
                            }
                            placeholder="u100"
                          />
                        </div>
                        <div>
                          <Label htmlFor="notFound">Not Found</Label>
                          <Input
                            id="notFound"
                            value={parameters.errorCodes.notFound}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                errorCodes: {
                                  ...prev.errorCodes,
                                  notFound: e.target.value,
                                },
                              }))
                            }
                            placeholder="u101"
                          />
                        </div>
                        <div>
                          <Label htmlFor="insufficientBalance">
                            Insufficient Balance
                          </Label>
                          <Input
                            id="insufficientBalance"
                            value={parameters.errorCodes.insufficientBalance}
                            onChange={(e) =>
                              setParameters((prev) => ({
                                ...prev,
                                errorCodes: {
                                  ...prev.errorCodes,
                                  insufficientBalance: e.target.value,
                                },
                              }))
                            }
                            placeholder="u102"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowParameters(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={applyParameters}>Apply Parameters</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button
            disabled={!selectedTemplate}
            onClick={handleContinue}
            className="gap-2"
          >
            Continue to Deploy
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
