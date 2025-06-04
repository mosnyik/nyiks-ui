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

//             <Card className="h-[600px] overflow-hidden">
//               <CardContent className="p-0 h-full">
//                 <div className="h-full flex flex-col">
//                   {/* Editor Header */}
//                   <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b">
//                     <span className="text-sm font-mono text-gray-600 dark:text-gray-300">
//                       {selectedTemplate === "nft"
//                         ? "my-nft"
//                         : selectedTemplate === "ft"
//                         ? "my-token"
//                         : "dao"}
//                       .clar
//                     </span>
//                   </div>

//                   {/* Editor Content - Editable */}
//                   <div className="flex-1 overflow-auto">
//                     <textarea
//                       value={contractCode}
//                       onChange={(e) => setContractCode(e.target.value)}
//                       className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none resize-none"
//                       spellCheck="false"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Coins,
  FileCode,
  Users,
  ArrowRight,
  Check,
  Copy,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import {
  contractTemplates,
  templateMetadata,
  downloadProject,
} from "@/lib/templates";

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("nft"); // Default to NFT
  const [contractCode, setContractCode] = useState<string>(
    contractTemplates.nft
  );

  // Update contract code when template changes
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    setContractCode(
      contractTemplates[templateId as keyof typeof contractTemplates]
    );
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
                  {selectedTemplate === "nft"
                    ? "my-nft"
                    : selectedTemplate === "ft"
                    ? "my-token"
                    : "dao"}
                  .clar
                </span>
              </div>

              {/* Tab Bar */}
              <div className="bg-[#252526] border-b border-gray-600">
                <div className="flex">
                  <div className="bg-[#1e1e1e] px-4 py-2 text-sm text-gray-300 border-r border-gray-600 flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    {selectedTemplate === "nft"
                      ? "my-nft"
                      : selectedTemplate === "ft"
                      ? "my-token"
                      : "dao"}
                    .clar
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

        <div className="mt-8 flex justify-end">
          <Button disabled={!selectedTemplate} className="gap-2">
            Continue with template
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
