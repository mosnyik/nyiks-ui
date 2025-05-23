# 🤝 Contributing to Nyiks UI

Thank you for your interest in contributing to **Nyiks UI**! Whether you're fixing a bug, adding a feature, or improving the documentation, your help is appreciated.

---

## 🛠 Local Setup

1. **Fork the Repository**  
   Click the "Fork" button at the top of this repo to create your own copy.

2. **Clone Your Fork**
```bash
   git clone https://github.com/<your-username>/nyiks-ui.git
   cd nyiks-ui
```

> *NOTE:* Replace <your-username> with your actual GitHub username.

3. **Clone Your Fork**
```bash
   git clone https://github.com/<your-username>/nyiks-ui.git
   cd nyiks-ui
```
4. **Start Development Server**
```bash
     npm run dev
```

## 🌿 Branching Strategy
- Use the main branch as the base for all your work.

- Create feature branches like:
    - `frontend/add-deploy-button`
    - `fix/missing-template-export`
- Keep changes focused and small where possible.

## 📝 Committing Guidelines
Follow Conventional Commits to keep commit history clean and parseable:

### Common types:
- feat: New feature
- fix: Bug fix
- docs: Documentation change
- style: Formatting only (no code change)
- refactor: Refactor (no new feature/bug)
- test: Adding or updating tests
- chore: Maintenance tasks
### Examples:

```bash
git commit -m "feat: add DAO contract picker"
git commit -m "fix: prevent crash on empty input"
git commit -m "docs: update contributing guide"
```
>*Optional*: We recommend setting up a commit hook with husky to auto-lint before commits (can be added later).

## ✅ Submitting a Pull Request

1. Push your branch to your fork:
```bash
     git push origin <your-branch-name>

```
1. Open a Pull Request from your fork to the `main` branch of `zorex-tech/nyiks-ui`.
2. In your PR:
- Describe what you changed and why
- Link related issues (if any)
- Attach screenshots or video if it’s a UI change

## 💡 Good First Issues
Look for the label good first issue on the Issues tab if you’re just getting started.

## 🧼 Code Standards
- Run npm run lint before committing
- Use semantic HTML and accessible components
- Maintain clean, readable code   

## 🙌 Thank You
Every contribution matters. Thanks for helping us build tools that empower Stacks developers!
