
## Repository: Nyiks-ui

### 🎨 Overview
**Nyiks UI** is a web-based frontend that enables developers and non-developers to generate Clarity smart contracts visually. It mirrors the capabilities of the CLI tool but through a simple and intuitive interface.

### 🔗 Built with Stacks
- Uses the Clarity language
- Outputs contracts that are deployable to the Stacks chain
- Optionally integrates with nyiks-cli

### 🌟 Key Features
- Select contract type (DAO, NFT, Token, etc.)
- Fill in inputs via form fields
- Real-time preview of the generated `.clar` contract
- Export contract to local file or copy to clipboard

### 🧪 Tech Stack
- Next.js + Tailwind CSS
- Zustand for local state
- Optional backend: nyiks-cli as a service

### 🛠 Setup
```bash
git clone https://github.com/zorex-tech/nyiks-ui.git
cd nyiks-ui
npm install
npm run dev
```

---

## 📁 Folder Structure

nyiks-ui/
├── app/                            
│   ├── layout.tsx                  
│   ├── page.tsx                   
│   ├── create/                    
│   │   └── page.tsx                
│   ├── templates/                 
│   │   └── page.tsx
│   ├── feedback/                   
│   │   └── page.tsx
│   └── share/                      
│       └── page.tsx
│
├── components/                     
│   ├── ConnectWallet.tsx
│   ├── Features.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── ContractPicker.tsx
│   ├── ParameterForm.tsx
│   ├── ContractPreview.tsx
│   ├── ExportButtons.tsx
│   ├── Tabs.tsx
│   ├── TemplateCard.tsx
│   └── FeedbackForm.tsx
│
├── lib/                            
│   ├── templates/                  
│   │   ├── dao.ts
│   │   ├── ft.ts
│   │   └── nft.ts
│   ├── generator.ts                
│   ├── stacksSession.ts                
│   └── utils.ts                
│
├── store/                          
│   └── useContractStore.ts
│
├── public/                         
│   └── logo.svg
│
├── styles/                         
│   ├── globals.css
│   └── theme.css
│
├── .github/
│   └── workflows/
│       └── ci.yml                  
│
├── .eslintrc.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── CONTRIBUTING.md

## 📅 Project Roadmap

### Milestone 1: UI Scaffolding
- Project setup and theme config
- Page layout and routing
- Initial form for contract selection and input fields

### Milestone 2: Code Generation
- Map UI inputs to template variables
- Preview generated Clarity code in real time
- Export `.clar` files

### Milestone 3: UX Polishing
- Add validations, error states, and tooltips
- Mobile responsiveness
- UI testing suite

### Milestone 4: Template Variety
- Add support for new contract types (e.g., launchpad, vault)
- Advanced options for contract modifiers

### Milestone 5: Integration (Optional)
- Add support to invoke `nyiks-cli` via backend API
- Push contracts directly to GitHub or deploy sandbox

### Milestone 6: Production Launch
- Polish and deploy to Vercel
- Write public documentation and usage guides
- Create demo videos or onboarding walkthroughs

---

## 🤝 Related Projects
- [nyiks-cli](https://github.com/zorex-tech/nyiks-cli) – Command-line contract generator used behind the scenes
