🌍 ClimateSnap – Climate Data Visualization Dashboard


## 🔍 Code Quality & Consistency (Sprint‑1)

Strict TypeScript prevents runtime bugs by enforcing strong typing and removing unused code.

ESLint enforces best practices and avoids common mistakes.

Prettier ensures consistent formatting across the team.

Pre‑commit hooks stop bad code from entering the repository.

This setup ensures a clean, maintainable, and professional codebase for future sprints.

### 📸 / 🧾 Hook run proof

The captured terminal output from a Husky + lint-staged run is saved at:

- `screenshots/lint-hook-output.txt`
ClimateSnap is a simple full‑stack web application built with Next.js (TypeScript) that visualizes basic climate data such as temperature, air quality, and rainfall for different cities.
The goal of this project is to build a clean, scalable foundation that will be extended in future sprints.

🚀 Tech Stack
Frontend: Next.js (App Router)

Language: TypeScript

Backend: Next.js API Routes

Styling: Default (can be extended later)

Package Manager: npm

📁 Folder Structure
src/
 ├── app/          # Application routes and pages (App Router)
 ├── components/   # Reusable UI components
 ├── lib/          # Utility functions, helpers, configurations
public/
 ├── screenshot.png # Screenshot of the app running locally
📌 Folder Purpose
app/ → Handles routing and page-level components

components/ → Shared and reusable UI components

lib/ → Common utilities and helper logic

public/ → Static assets like images and screenshots

This structure keeps the code modular, readable, and scalable.

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone <repository-url>
cd <repository-name>
2️⃣ Install dependencies
npm install
3️⃣ Run the development server
npm run dev
Open 👉 http://localhost:3000 in your browser.

📸 Screenshot
Below is the application running locally:


## 🔁 GitHub Workflow & Code Review Process

### 🌿 Branching Strategy
We follow a structured branching strategy:
- `feature/*` → new features
- `fix/*` → bug fixes
- `chore/*` → maintenance tasks
- `docs/*` → documentation updates

The `main` branch is protected and always contains stable code.

---

### 🔍 Code Review Checklist
Every Pull Request is reviewed against the following:
- Code follows agreed naming conventions
- Functionality works as expected locally
- No console errors or warnings
- ESLint and Prettier checks pass
- Code is readable and well-documented
- No secrets or sensitive data are exposed

---

### 🧠 Why This Workflow?
This workflow ensures:
- High code quality
- Safe and review-based merges
- Better collaboration and accountability
- Clean commit history
- Faster and safer development at scale
