import { contractTemplates, projectFiles, templateMetadata } from ".";

export interface TemplateDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  contractCode: string;
  projectFiles: Record<string, string>;
}

/**
 * Add a new template to the system
 * @param template The template definition
 */
export function addTemplate(template: TemplateDefinition): void {
  // Add to contractTemplates
  (contractTemplates as any)[template.id] = template.contractCode;

  // Add to projectFiles
  (projectFiles as any)[template.id] = template.projectFiles;

  // Add to templateMetadata
  templateMetadata.push({
    id: template.id,
    title: template.title,
    description: template.description,
    icon: template.icon,
    features: template.features,
  });
}

/**
 * Example usage:
 *
 * addTemplate({
 *   id: "staking",
 *   title: "Staking Contract",
 *   description: "A staking contract for rewards distribution",
 *   icon: "CoinsStacked",
 *   features: ["Stake tokens", "Claim rewards", "Time-locked staking"],
 *   contractCode: `...Clarity code here...`,
 *   projectFiles: {
 *     "README.md": `...`,
 *     "Clarinet.toml": `...`,
 *     ".vscode/settings.json": `...`
 *   }
 * });
 */
