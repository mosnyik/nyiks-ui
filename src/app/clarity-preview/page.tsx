// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   FileCode,
//   Play,
//   Copy,
//   Download,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Code,
// } from "lucide-react";
// import { toast } from "sonner";
// import { contractTemplates } from "@/lib/temps";

// const ClarityPreview = () => {
//   const [contractCode, setContractCode] = useState("");
//   const [fileName, setFileName] = useState("my-contract.clar");
//   const [isValidating, setIsValidating] = useState(false);
//   const [validationResult, setValidationResult] = useState<{
//     isValid: boolean;
//     errors: string[];
//     warnings: string[];
//   } | null>(null);
//   const [activeTab, setActiveTab] = useState("editor");

//   // Sample contract for demonstration
//   const sampleContract = `;;  Sample Clarity Contract
// ;;  A simple counter contract

// (define-data-var counter uint u0)
// (define-data-var owner principal tx-sender)

// (define-constant err-owner-only (err u100))
// (define-constant err-invalid-value (err u101))

// (define-read-only (get-counter)
//   (var-get counter)
// )

// (define-read-only (get-owner)
//   (var-get owner)
// )

// (define-public (increment)
//   (begin
//     (var-set counter (+ (var-get counter) u1))
//     (ok (var-get counter))
//   )
// )

// (define-public (decrement)
//   (begin
//     (asserts! (> (var-get counter) u0) err-invalid-value)
//     (var-set counter (- (var-get counter) u1))
//     (ok (var-get counter))
//   )
// )

// (define-public (set-counter (value uint))
//   (begin
//     (asserts! (is-eq tx-sender (var-get owner)) err-owner-only)
//     (var-set counter value)
//     (ok value)
//   )
// )`;

//   useEffect(() => {
//     if (!contractCode) {
//       setContractCode(sampleContract);
//     }
//   }, []);

//   // Mock validation function (in a real app, this would call a Clarity validator)
//   const validateContract = async () => {
//     setIsValidating(true);

//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     // Mock validation logic
//     const errors: string[] = [];
//     const warnings: string[] = [];

//     // Check for common issues
//     if (!contractCode.includes("define-")) {
//       errors.push("No function definitions found");
//     }

//     if (contractCode.includes("TODO") || contractCode.includes("FIXME")) {
//       warnings.push("Contract contains TODO or FIXME comments");
//     }

//     if (
//       !contractCode.includes("define-read-only") &&
//       !contractCode.includes("define-public")
//     ) {
//       warnings.push("No public or read-only functions defined");
//     }

//     // Check for syntax patterns
//     const openParens = (contractCode.match(/\(/g) || []).length;
//     const closeParens = (contractCode.match(/\)/g) || []).length;

//     if (openParens !== closeParens) {
//       errors.push("Mismatched parentheses detected");
//     }

//     setValidationResult({
//       isValid: errors.length === 0,
//       errors,
//       warnings,
//     });

//     setIsValidating(false);

//     if (errors.length === 0) {
//       toast.success("Contract validation passed!");
//     } else {
//       toast.error("Contract validation failed!");
//     }
//   };

//   const loadTemplate = (templateId: string) => {
//     if (contractTemplates[templateId as keyof typeof contractTemplates]) {
//       setContractCode(
//         contractTemplates[templateId as keyof typeof contractTemplates]
//       );
//       setFileName(`${templateId}-contract.clar`);
//       setValidationResult(null);
//       toast.success(`Loaded ${templateId} template`);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(contractCode);
//     toast.success("Contract code copied to clipboard!");
//   };

//   const downloadContract = () => {
//     const element = document.createElement("a");
//     const file = new Blob([contractCode], { type: "text/plain" });
//     element.href = URL.createObjectURL(file);
//     element.download = fileName;
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     toast.success("Contract downloaded!");
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target?.result as string;
//         setContractCode(content);
//         setFileName(file.name);
//         setValidationResult(null);
//         toast.success("File uploaded successfully!");
//       };
//       reader.readAsText(file);
//     }
//   };

//   const formatContract = () => {
//     // Simple formatting - add proper indentation
//     const lines = contractCode.split("\n");
//     let indentLevel = 0;
//     const formatted = lines
//       .map((line) => {
//         const trimmed = line.trim();
//         if (!trimmed) return "";

//         // Decrease indent for closing parentheses
//         if (trimmed.startsWith(")")) {
//           indentLevel = Math.max(0, indentLevel - 1);
//         }

//         const indented = "  ".repeat(indentLevel) + trimmed;

//         // Increase indent for opening parentheses
//         if (trimmed.includes("(") && !trimmed.includes(")")) {
//           indentLevel++;
//         }

//         return indented;
//       })
//       .join("\n");

//     setContractCode(formatted);
//     toast.success("Contract formatted!");
//   };

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Clarity Contract Preview</h1>
//           <p className="text-muted-foreground">
//             Write, validate, and preview your Clarity smart contracts
//           </p>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-4">
//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2">
//                   <FileCode className="h-5 w-5" />
//                   Contract Tools
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* File Name */}
//                 <div>
//                   <Label htmlFor="fileName">File Name</Label>
//                   <Input
//                     id="fileName"
//                     value={fileName}
//                     onChange={(e) => setFileName(e.target.value)}
//                     placeholder="my-contract.clar"
//                   />
//                 </div>

//                 {/* Load Template */}
//                 <div>
//                   <Label>Load Template</Label>
//                   <Select onValueChange={loadTemplate}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Choose template" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="nft">NFT Contract</SelectItem>
//                       <SelectItem value="ft">Fungible Token</SelectItem>
//                       <SelectItem value="dao">DAO Contract</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* File Upload */}
//                 <div>
//                   <Label htmlFor="fileUpload">Upload Contract</Label>
//                   <Input
//                     id="fileUpload"
//                     type="file"
//                     accept=".clar,.txt"
//                     onChange={handleFileUpload}
//                     className="cursor-pointer"
//                   />
//                 </div>

//                 {/* Actions */}
//                 <div className="space-y-2">
//                   <Button
//                     onClick={validateContract}
//                     disabled={isValidating}
//                     className="w-full gap-2"
//                   >
//                     {isValidating ? (
//                       <RefreshCw className="h-4 w-4 animate-spin" />
//                     ) : (
//                       <Play className="h-4 w-4" />
//                     )}
//                     {isValidating ? "Validating..." : "Validate Contract"}
//                   </Button>

//                   <Button
//                     onClick={formatContract}
//                     variant="outline"
//                     className="w-full gap-2 bg-transparent"
//                   >
//                     <Code className="h-4 w-4" />
//                     Format Code
//                   </Button>

//                   <Button
//                     onClick={copyToClipboard}
//                     variant="outline"
//                     className="w-full gap-2 bg-transparent"
//                   >
//                     <Copy className="h-4 w-4" />
//                     Copy Code
//                   </Button>

//                   <Button
//                     onClick={downloadContract}
//                     variant="outline"
//                     className="w-full gap-2 bg-transparent"
//                   >
//                     <Download className="h-4 w-4" />
//                     Download
//                   </Button>
//                 </div>

//                 {/* Validation Results */}
//                 {validationResult && (
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       {validationResult.isValid ? (
//                         <CheckCircle className="h-4 w-4 text-green-600" />
//                       ) : (
//                         <XCircle className="h-4 w-4 text-red-600" />
//                       )}
//                       <span className="text-sm font-medium">
//                         {validationResult.isValid ? "Valid" : "Invalid"}
//                       </span>
//                     </div>

//                     {validationResult.errors.length > 0 && (
//                       <div className="space-y-1">
//                         <p className="text-sm font-medium text-red-600">
//                           Errors:
//                         </p>
//                         {validationResult.errors.map((error, index) => (
//                           <p
//                             key={index}
//                             className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded"
//                           >
//                             {error}
//                           </p>
//                         ))}
//                       </div>
//                     )}

//                     {validationResult.warnings.length > 0 && (
//                       <div className="space-y-1">
//                         <p className="text-sm font-medium text-yellow-600">
//                           Warnings:
//                         </p>
//                         {validationResult.warnings.map((warning, index) => (
//                           <p
//                             key={index}
//                             className="text-xs text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded"
//                           >
//                             {warning}
//                           </p>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Editor */}
//           <div className="lg:col-span-3">
//             <Tabs value={activeTab} onValueChange={setActiveTab}>
//               <TabsList className="mb-4">
//                 <TabsTrigger value="editor" className="gap-2">
//                   <FileCode className="h-4 w-4" />
//                   Editor
//                 </TabsTrigger>
//                 <TabsTrigger value="preview" className="gap-2">
//                   <Eye className="h-4 w-4" />
//                   Preview
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="editor">
//                 <Card>
//                   <CardHeader>
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="flex items-center gap-2">
//                         <FileCode className="h-5 w-5" />
//                         {fileName}
//                       </CardTitle>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <span>{contractCode.split("\n").length} lines</span>
//                         <span>•</span>
//                         <span>{contractCode.length} characters</span>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     {/* VS Code-like Editor */}
//                     <div className="h-[600px] bg-[#1e1e1e] rounded-lg overflow-hidden border">
//                       {/* Editor Header */}
//                       <div className="bg-[#2d2d30] px-4 py-2 border-b border-gray-600 flex items-center gap-2">
//                         <div className="flex gap-1.5">
//                           <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
//                           <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
//                           <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
//                         </div>
//                         <span className="text-sm font-mono text-gray-300 ml-2">
//                           {fileName}
//                         </span>
//                         {validationResult && (
//                           <div className="ml-auto flex items-center gap-2">
//                             {validationResult.isValid ? (
//                               <CheckCircle className="h-4 w-4 text-green-400" />
//                             ) : (
//                               <XCircle className="h-4 w-4 text-red-400" />
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       {/* Editor Content */}
//                       <div className="flex h-[calc(100%-48px)]">
//                         {/* Line Numbers */}
//                         <div className="bg-[#1e1e1e] px-3 py-4 border-r border-gray-600 select-none min-w-[50px]">
//                           <div className="text-sm font-mono text-gray-500 leading-6">
//                             {contractCode.split("\n").map((_, index) => (
//                               <div key={index} className="text-right">
//                                 {index + 1}
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Code Content */}
//                         <div className="flex-1 relative">
//                           <textarea
//                             value={contractCode}
//                             onChange={(e) => {
//                               setContractCode(e.target.value);
//                               setValidationResult(null);
//                             }}
//                             className="w-full h-full p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] focus:outline-none resize-none leading-6"
//                             style={{
//                               tabSize: 2,
//                               fontFamily:
//                                 "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
//                             }}
//                             spellCheck="false"
//                             placeholder="Enter your Clarity contract code here..."
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="preview">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Eye className="h-5 w-5" />
//                       Contract Preview
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-auto max-h-[600px]">
//                       <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
//                         {contractCode || "No contract code to preview"}
//                       </pre>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8 flex flex-wrap gap-4 justify-center">
//           <Button variant="outline" onClick={() => loadTemplate("nft")}>
//             Load NFT Template
//           </Button>
//           <Button variant="outline" onClick={() => loadTemplate("ft")}>
//             Load Token Template
//           </Button>
//           <Button variant="outline" onClick={() => loadTemplate("dao")}>
//             Load DAO Template
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClarityPreview;

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileCode,
  Play,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Eye,
  Code,
} from "lucide-react";
import { toast } from "sonner";
import { contractTemplates } from "@/lib/temps";
import { WalletGuard } from "@/components/WalletGuard";

const ClarityPreviewContent = () => {
  const [contractCode, setContractCode] = useState("");
  const [fileName, setFileName] = useState("my-contract.clar");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Sample contract for demonstration
  const sampleContract = `;;  Sample Clarity Contract
;;  A simple counter contract

(define-data-var counter uint u0)
(define-data-var owner principal tx-sender)

(define-constant err-owner-only (err u100))
(define-constant err-invalid-value (err u101))

(define-read-only (get-counter)
  (var-get counter)
)

(define-read-only (get-owner)
  (var-get owner)
)

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))
  )
)

(define-public (decrement)
  (begin
    (asserts! (> (var-get counter) u0) err-invalid-value)
    (var-set counter (- (var-get counter) u1))
    (ok (var-get counter))
  )
)

(define-public (set-counter (value uint))
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) err-owner-only)
    (var-set counter value)
    (ok value)
  )
)`;

  useEffect(() => {
    if (!contractCode) {
      setContractCode(sampleContract);
    }
  }, []);

  // Mock validation function (in a real app, this would call a Clarity validator)
  const validateContract = async () => {
    setIsValidating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation logic
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for common issues
    if (!contractCode.includes("define-")) {
      errors.push("No function definitions found");
    }

    if (contractCode.includes("TODO") || contractCode.includes("FIXME")) {
      warnings.push("Contract contains TODO or FIXME comments");
    }

    if (
      !contractCode.includes("define-read-only") &&
      !contractCode.includes("define-public")
    ) {
      warnings.push("No public or read-only functions defined");
    }

    // Check for syntax patterns
    const openParens = (contractCode.match(/\(/g) || []).length;
    const closeParens = (contractCode.match(/\)/g) || []).length;

    if (openParens !== closeParens) {
      errors.push("Mismatched parentheses detected");
    }

    setValidationResult({
      isValid: errors.length === 0,
      errors,
      warnings,
    });

    setIsValidating(false);

    if (errors.length === 0) {
      toast.success("Contract validation passed!");
    } else {
      toast.error("Contract validation failed!");
    }
  };

  const loadTemplate = (templateId: string) => {
    if (contractTemplates[templateId as keyof typeof contractTemplates]) {
      setContractCode(
        contractTemplates[templateId as keyof typeof contractTemplates]
      );
      setFileName(`${templateId}-contract.clar`);
      setValidationResult(null);
      setSelectedTemplate(templateId);
      toast.success(`Loaded ${templateId} template`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractCode);
    toast.success("Contract code copied to clipboard!");
  };

  const downloadContract = () => {
    const element = document.createElement("a");
    const file = new Blob([contractCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Contract downloaded!");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setContractCode(content);
        setFileName(file.name);
        setValidationResult(null);
        toast.success("File uploaded successfully!");
      };
      reader.readAsText(file);
    }
  };

  const formatContract = () => {
    // Simple formatting - add proper indentation
    const lines = contractCode.split("\n");
    let indentLevel = 0;
    const formatted = lines
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";

        // Decrease indent for closing parentheses
        if (trimmed.startsWith(")")) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const indented = "  ".repeat(indentLevel) + trimmed;

        // Increase indent for opening parentheses
        if (trimmed.includes("(") && !trimmed.includes(")")) {
          indentLevel++;
        }

        return indented;
      })
      .join("\n");

    setContractCode(formatted);
    toast.success("Contract formatted!");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Clarity Contract Preview</h1>
          <p className="text-muted-foreground">
            Write, validate, and preview your Clarity smart contracts
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  Contract Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* File Name */}
                <div>
                  <Label htmlFor="fileName">File Name</Label>
                  <Input
                    id="fileName"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="my-contract.clar"
                  />
                </div>

                {/* Load Template */}
                <div>
                  <Label>Load Template</Label>
                  <Select value={selectedTemplate} onValueChange={loadTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nft">NFT Contract</SelectItem>
                      <SelectItem value="ft">Fungible Token</SelectItem>
                      <SelectItem value="dao">DAO Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor="fileUpload">Upload Contract</Label>
                  <Input
                    id="fileUpload"
                    type="file"
                    accept=".clar,.txt"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={validateContract}
                    disabled={isValidating}
                    className="w-full gap-2"
                  >
                    {isValidating ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {isValidating ? "Validating..." : "Validate Contract"}
                  </Button>

                  <Button
                    onClick={formatContract}
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                  >
                    <Code className="h-4 w-4" />
                    Format Code
                  </Button>

                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </Button>

                  <Button
                    onClick={downloadContract}
                    variant="outline"
                    className="w-full gap-2 bg-transparent"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>

                {/* Validation Results */}
                {validationResult && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {validationResult.isValid ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">
                        {validationResult.isValid ? "Valid" : "Invalid"}
                      </span>
                    </div>

                    {validationResult.errors.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-red-600">
                          Errors:
                        </p>
                        {validationResult.errors.map((error, index) => (
                          <p
                            key={index}
                            className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded"
                          >
                            {error}
                          </p>
                        ))}
                      </div>
                    )}

                    {validationResult.warnings.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-yellow-600">
                          Warnings:
                        </p>
                        {validationResult.warnings.map((warning, index) => (
                          <p
                            key={index}
                            className="text-xs text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded"
                          >
                            {warning}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="editor" className="gap-2">
                  <FileCode className="h-4 w-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileCode className="h-5 w-5" />
                        {fileName}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{contractCode.split("\n").length} lines</span>
                        <span>•</span>
                        <span>{contractCode.length} characters</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* VS Code-like Editor */}
                    <div className="h-[600px] bg-[#1e1e1e] rounded-lg overflow-hidden border">
                      {/* Editor Header */}
                      <div className="bg-[#2d2d30] px-4 py-2 border-b border-gray-600 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
                        </div>
                        <span className="text-sm font-mono text-gray-300 ml-2">
                          {fileName}
                        </span>
                        {validationResult && (
                          <div className="ml-auto flex items-center gap-2">
                            {validationResult.isValid ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Editor Content */}
                      <div className="flex h-[calc(100%-48px)]">
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
                            onChange={(e) => {
                              setContractCode(e.target.value);
                              setValidationResult(null);
                            }}
                            className="w-full h-full p-4 font-mono text-sm bg-[#1e1e1e] text-[#d4d4d4] focus:outline-none resize-none leading-6"
                            style={{
                              tabSize: 2,
                              fontFamily:
                                "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
                            }}
                            spellCheck="false"
                            placeholder="Enter your Clarity contract code here..."
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Contract Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-auto max-h-[600px]">
                      <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                        {contractCode || "No contract code to preview"}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button variant="outline" onClick={() => loadTemplate("nft")}>
            Load NFT Template
          </Button>
          <Button variant="outline" onClick={() => loadTemplate("ft")}>
            Load Token Template
          </Button>
          <Button variant="outline" onClick={() => loadTemplate("dao")}>
            Load DAO Template
          </Button>
        </div>
      </div>
    </div>
  );
};

const ClarityPreview = () => {
  return (
    <WalletGuard
      feature="Clarity Contract Preview"
      description="Create, edit, and validate your Clarity smart contracts with our professional code editor. Connect your wallet to access advanced contract development tools."
    >
      <ClarityPreviewContent />
    </WalletGuard>
  );
};

export default ClarityPreview;
