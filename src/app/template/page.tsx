// import React from "react";

// const Templates = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600 text-xl font-medium">
//       This page is under development.
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
import { Coins, FileCode, Users, ArrowRight, Check } from "lucide-react";

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "nft",
      title: "NFT Contract",
      description:
        "Non-Fungible Token implementation with metadata support and marketplace integration.",
      icon: FileCode,
      features: [
        "SIP-009 compliant",
        "Metadata support",
        "Minting functionality",
        "Transfer capabilities",
      ],
    },
    {
      id: "ft",
      title: "Fungible Token",
      description:
        "Standard Fungible Token implementation with transfer and allowance functionality.",
      icon: Coins,
      features: [
        "SIP-010 compliant",
        "Transfer functionality",
        "Allowance mechanism",
        "Mint/burn capabilities",
      ],
    },
    {
      id: "dao",
      title: "DAO Contract",
      description:
        "Decentralized Autonomous Organization with governance and voting mechanisms.",
      icon: Users,
      features: [
        "Proposal creation",
        "Voting mechanism",
        "Treasury management",
        "Member governance",
      ],
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Contract Templates</h1>
        <p className="text-muted-foreground mb-8">
          Select a template to get started with your Stacks smart contract
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id ? "ring-2 ring-purple-600" : ""
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <template.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="bg-purple-600 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="mt-4">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-purple-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
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

