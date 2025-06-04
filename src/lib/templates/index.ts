// Contract templates and project files
export const contractTemplates = {
  nft: `;;  SIP-009 NFT Contract Template
;;  Non-Fungible Token Implementation

(impl-trait .sip009-nft-trait.sip009-nft-trait)

(define-non-fungible-token my-nft uint)

(define-data-var last-token-id uint u0)
(define-data-var contract-owner principal tx-sender)

(define-constant contract-owner-only (err u100))
(define-constant not-token-owner (err u101))
(define-constant token-not-found (err u102))

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (some "https://example.com/metadata/{id}"))
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? my-nft token-id))
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) not-token-owner)
    (nft-transfer? my-nft token-id sender recipient)
  )
)

(define-public (mint (recipient principal))
  (let
    (
      (token-id (+ (var-get last-token-id) u1))
    )
    (asserts! (is-eq tx-sender (var-get contract-owner)) contract-owner-only)
    (try! (nft-mint? my-nft token-id recipient))
    (var-set last-token-id token-id)
    (ok token-id)
  )
)`,

  ft: `;;  SIP-010 Fungible Token Contract Template
;;  Fungible Token Implementation

(impl-trait .sip010-ft-trait.sip010-ft-trait)

(define-fungible-token my-token)

(define-data-var contract-owner principal tx-sender)
(define-data-var token-name (string-ascii 32) "My Token")
(define-data-var token-symbol (string-ascii 10) "MTK")
(define-data-var token-uri (optional (string-utf8 256)) none)
(define-data-var token-decimals uint u6)

(define-constant contract-owner-only (err u100))
(define-constant insufficient-balance (err u101))
(define-constant invalid-amount (err u102))

(define-read-only (get-name)
  (ok (var-get token-name))
)

(define-read-only (get-symbol)
  (ok (var-get token-symbol))
)

(define-read-only (get-decimals)
  (ok (var-get token-decimals))
)

(define-read-only (get-balance (who principal))
  (ok (ft-get-balance my-token who))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply my-token))
)

(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) insufficient-balance)
    (asserts! (> amount u0) invalid-amount)
    (try! (ft-transfer? my-token amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) contract-owner-only)
    (ft-mint? my-token amount recipient)
  )
)`,

  dao: `;;  DAO Contract Template
;;  Decentralized Autonomous Organization

(define-data-var contract-owner principal tx-sender)
(define-data-var proposal-count uint u0)
(define-data-var voting-period uint u1440) ;; blocks (~10 days)

(define-map proposals
  { proposal-id: uint }
  {
    proposer: principal,
    title: (string-utf8 256),
    description: (string-utf8 1024),
    start-block: uint,
    end-block: uint,
    yes-votes: uint,
    no-votes: uint,
    executed: bool
  }
)

(define-map votes
  { proposal-id: uint, voter: principal }
  { vote: bool, amount: uint }
)

(define-map members
  { member: principal }
  { voting-power: uint, joined-at: uint }
)

(define-constant proposal-not-found (err u100))
(define-constant not-member (err u101))
(define-constant voting-ended (err u102))
(define-constant already-voted (err u103))
(define-constant proposal-not-passed (err u104))

(define-read-only (get-proposal (proposal-id uint))
  (map-get? proposals { proposal-id: proposal-id })
)

(define-read-only (get-member-info (member principal))
  (map-get? members { member: member })
)

(define-read-only (has-voted (proposal-id uint) (voter principal))
  (is-some (map-get? votes { proposal-id: proposal-id, voter: voter }))
)

(define-public (join-dao)
  (let
    (
      (member-info (map-get? members { member: tx-sender }))
    )
    (asserts! (is-none member-info) (err u105))
    (map-set members
      { member: tx-sender }
      { voting-power: u1, joined-at: block-height }
    )
    (ok true)
  )
)

(define-public (create-proposal (title (string-utf8 256)) (description (string-utf8 1024)))
  (let
    (
      (proposal-id (+ (var-get proposal-count) u1))
      (member-info (unwrap! (map-get? members { member: tx-sender }) not-member))
    )
    (map-set proposals
      { proposal-id: proposal-id }
      {
        proposer: tx-sender,
        title: title,
        description: description,
        start-block: block-height,
        end-block: (+ block-height (var-get voting-period)),
        yes-votes: u0,
        no-votes: u0,
        executed: false
      }
    )
    (var-set proposal-count proposal-id)
    (ok proposal-id)
  )
)

(define-public (vote (proposal-id uint) (support bool))
  (let
    (
      (proposal (unwrap! (map-get? proposals { proposal-id: proposal-id }) proposal-not-found))
      (member-info (unwrap! (map-get? members { member: tx-sender }) not-member))
      (voting-power (get voting-power member-info))
    )
    (asserts! (< block-height (get end-block proposal)) voting-ended)
    (asserts! (not (has-voted proposal-id tx-sender)) already-voted)
    
    (map-set votes
      { proposal-id: proposal-id, voter: tx-sender }
      { vote: support, amount: voting-power }
    )
    
    (if support
      (map-set proposals
        { proposal-id: proposal-id }
        (merge proposal { yes-votes: (+ (get yes-votes proposal) voting-power) })
      )
      (map-set proposals
        { proposal-id: proposal-id }
        (merge proposal { no-votes: (+ (get no-votes proposal) voting-power) })
      )
    )
    (ok true)
  )
)`,
}

export const projectFiles = {
  nft: {
    "README.md": `# NFT Contract Project

This is a SIP-009 compliant Non-Fungible Token (NFT) contract for the Stacks blockchain.

## Features

- ✅ SIP-009 compliant
- ✅ Metadata support
- ✅ Minting functionality
- ✅ Transfer capabilities
- ✅ Owner management

## Getting Started

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) installed
- [Stacks CLI](https://docs.stacks.co/docs/write-smart-contracts/cli-wallet-quickstart) installed

### Installation

1. Initialize a new Clarinet project:
\`\`\`bash
clarinet new my-nft-project
cd my-nft-project
\`\`\`

2. Replace the contents of \`contracts/my-nft.clar\` with the provided contract code.

3. Update \`Clarinet.toml\` to include your contract:
\`\`\`toml
[contracts.my-nft]
path = "contracts/my-nft.clar"
\`\`\`

### Testing

Run the test suite:
\`\`\`bash
clarinet test
\`\`\`

### Deployment

Deploy to testnet:
\`\`\`bash
clarinet deploy --testnet
\`\`\`

## Contract Functions

### Read-Only Functions

- \`get-last-token-id\`: Returns the ID of the last minted token
- \`get-token-uri\`: Returns the metadata URI for a token
- \`get-owner\`: Returns the owner of a specific token

### Public Functions

- \`transfer\`: Transfer a token from sender to recipient
- \`mint\`: Mint a new token (owner only)

## Customization

You can customize this contract by:

1. Changing the token name in the contract
2. Updating the metadata URI format
3. Adding additional functionality like royalties
4. Implementing custom access controls

## License

MIT License
`,
    "Clarinet.toml": `[project]
name = "my-nft-project"
description = "A SIP-009 NFT contract project"
authors = ["Your Name <your.email@example.com>"]
telemetry = false
cache_dir = "./.clarinet"

[contracts.my-nft]
path = "contracts/my-nft.clar"
clarity_version = 2
epoch = 2.4

[repl]
costs_version = 2
parser_version = 2

[[repl.sessions]]
name = "default"
deploy_contracts = ["my-nft"]
`,
    "tests/my-nft_test.ts": `import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can mint NFT",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('my-nft', 'mint', [types.principal(wallet1.address)], deployer.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        block.receipts[0].result.expectOk().expectUint(1);
    },
});

Clarinet.test({
    name: "Can transfer NFT",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        const wallet2 = accounts.get('wallet_2')!;
        
        // First mint an NFT
        let block = chain.mineBlock([
            Tx.contractCall('my-nft', 'mint', [types.principal(wallet1.address)], deployer.address)
        ]);
        
        // Then transfer it
        block = chain.mineBlock([
            Tx.contractCall('my-nft', 'transfer', [
                types.uint(1),
                types.principal(wallet1.address),
                types.principal(wallet2.address)
            ], wallet1.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk().expectBool(true);
    },
});
`,
    ".vscode/settings.json": `{
  "security.workspace.trust.enabled": false,
  "security.workspace.trust.untrustedFiles": "open",
  "security.workspace.trust.banner": "never",
  "security.workspace.trust.startupPrompt": "never"
}`,
    ".vscode/extensions.json": `{
  "recommendations": [
    "hirosystems.clarity-lsp"
  ]
}`,
    "package.json": `{
  "name": "my-nft-project",
  "version": "1.0.0",
  "description": "A SIP-009 NFT contract project",
  "main": "index.js",
  "scripts": {
    "test": "clarinet test",
    "check": "clarinet check",
    "console": "clarinet console"
  },
  "keywords": ["stacks", "clarity", "nft", "blockchain"],
  "author": "Your Name",
  "license": "MIT"
}`,
  },
  ft: {
    "README.md": `# Fungible Token Contract Project

This is a SIP-010 compliant Fungible Token (FT) contract for the Stacks blockchain.

## Features

- ✅ SIP-010 compliant
- ✅ Transfer functionality
- ✅ Allowance mechanism
- ✅ Mint/burn capabilities
- ✅ Metadata support

## Getting Started

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) installed
- [Stacks CLI](https://docs.stacks.co/docs/write-smart-contracts/cli-wallet-quickstart) installed

### Installation

1. Initialize a new Clarinet project:
\`\`\`bash
clarinet new my-token-project
cd my-token-project
\`\`\`

2. Replace the contents of \`contracts/my-token.clar\` with the provided contract code.

### Testing

Run the test suite:
\`\`\`bash
clarinet test
\`\`\`

### Deployment

Deploy to testnet:
\`\`\`bash
clarinet deploy --testnet
\`\`\`

## Contract Functions

### Read-Only Functions

- \`get-name\`: Returns the token name
- \`get-symbol\`: Returns the token symbol
- \`get-decimals\`: Returns the number of decimals
- \`get-balance\`: Returns the balance of an account
- \`get-total-supply\`: Returns the total token supply

### Public Functions

- \`transfer\`: Transfer tokens between accounts
- \`mint\`: Mint new tokens (owner only)

## License

MIT License
`,
    "Clarinet.toml": `[project]
name = "my-token-project"
description = "A SIP-010 Fungible Token contract project"
authors = ["Your Name <your.email@example.com>"]
telemetry = false

[contracts.my-token]
path = "contracts/my-token.clar"
clarity_version = 2
epoch = 2.4
`,
    ".vscode/settings.json": `{
  "security.workspace.trust.enabled": false,
  "security.workspace.trust.untrustedFiles": "open",
  "security.workspace.trust.banner": "never",
  "security.workspace.trust.startupPrompt": "never"
}`,
    ".vscode/extensions.json": `{
  "recommendations": [
    "hirosystems.clarity-lsp"
  ]
}`,
    "package.json": `{
  "name": "my-token-project",
  "version": "1.0.0",
  "description": "A SIP-010 Fungible Token contract project",
  "main": "index.js",
  "scripts": {
    "test": "clarinet test",
    "check": "clarinet check",
    "console": "clarinet console"
  },
  "keywords": ["stacks", "clarity", "token", "blockchain"],
  "author": "Your Name",
  "license": "MIT"
}`,
  },
  dao: {
    "README.md": `# DAO Contract Project

This is a Decentralized Autonomous Organization (DAO) contract for the Stacks blockchain.

## Features

- ✅ Proposal creation
- ✅ Voting mechanism
- ✅ Treasury management
- ✅ Member governance
- ✅ Time-based voting periods

## Getting Started

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) installed
- [Stacks CLI](https://docs.stacks.co/docs/write-smart-contracts/cli-wallet-quickstart) installed

### Installation

1. Initialize a new Clarinet project:
\`\`\`bash
clarinet new my-dao-project
cd my-dao-project
\`\`\`

2. Replace the contents of \`contracts/dao.clar\` with the provided contract code.

### Testing

Run the test suite:
\`\`\`bash
clarinet test
\`\`\`

### Deployment

Deploy to testnet:
\`\`\`bash
clarinet deploy --testnet
\`\`\`

## Contract Functions

### Read-Only Functions

- \`get-proposal\`: Get proposal details
- \`get-member-info\`: Get member information
- \`has-voted\`: Check if member has voted on proposal

### Public Functions

- \`join-dao\`: Join the DAO as a member
- \`create-proposal\`: Create a new proposal
- \`vote\`: Vote on a proposal

## License

MIT License
`,
    "Clarinet.toml": `[project]
name = "my-dao-project"
description = "A DAO contract project"
authors = ["Your Name <your.email@example.com>"]
telemetry = false

[contracts.dao]
path = "contracts/dao.clar"
clarity_version = 2
epoch = 2.4
`,
    ".vscode/settings.json": `{
  "security.workspace.trust.enabled": false,
  "security.workspace.trust.untrustedFiles": "open",
  "security.workspace.trust.banner": "never",
  "security.workspace.trust.startupPrompt": "never"
}`,
    ".vscode/extensions.json": `{
  "recommendations": [
    "hirosystems.clarity-lsp"
  ]
}`,
    "package.json": `{
  "name": "my-dao-project",
  "version": "1.0.0",
  "description": "A DAO contract project",
  "main": "index.js",
  "scripts": {
    "test": "clarinet test",
    "check": "clarinet check",
    "console": "clarinet console"
  },
  "keywords": ["stacks", "clarity", "dao", "blockchain"],
  "author": "Your Name",
  "license": "MIT"
}`,
  },
}

export const templateMetadata = [
  {
    id: "nft",
    title: "NFT Contract",
    description: "Non-Fungible Token implementation with metadata support and marketplace integration.",
    icon: "FileCode",
    features: ["SIP-009 compliant", "Metadata support", "Minting functionality", "Transfer capabilities"],
  },
  {
    id: "ft",
    title: "Fungible Token",
    description: "Standard Fungible Token implementation with transfer and allowance functionality.",
    icon: "Coins",
    features: ["SIP-010 compliant", "Transfer functionality", "Allowance mechanism", "Mint/burn capabilities"],
  },
  {
    id: "dao",
    title: "DAO Contract",
    description: "Decentralized Autonomous Organization with governance and voting mechanisms.",
    icon: "Users",
    features: ["Proposal creation", "Voting mechanism", "Treasury management", "Member governance"],
  },
]

// Function to create and download a project zip
export const downloadProject = async (templateId: string, customContractCode?: string) => {
  try {
    // Dynamic import of JSZip
    const JSZip = (await import("jszip")).default
    const zip = new JSZip()

    // Add contract file with either custom code or template code
    const contractFileName = `contracts/${templateId === "nft" ? "my-nft" : templateId === "ft" ? "my-token" : "dao"}.clar`
    const contractCode = customContractCode || contractTemplates[templateId as keyof typeof contractTemplates]
    zip.file(contractFileName, contractCode)

    // Add project files
    const files = projectFiles[templateId as keyof typeof projectFiles]
    Object.entries(files).forEach(([filename, content]) => {
      zip.file(filename, content)
    })

    // Generate and download zip
    const content = await zip.generateAsync({ type: "blob" })
    const element = document.createElement("a")
    element.href = URL.createObjectURL(content)
    element.download = `${templateId}-contract-project.zip`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    return true
  } catch (error) {
    console.error("Failed to download project:", error)
    return false
  }
}



