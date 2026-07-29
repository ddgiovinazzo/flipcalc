# FlipCalc 🛒

> An offline-first, client-side React application designed as a running shopping companion for retail resellers. 

## 📖 Overview

Recognizing that many large thrift stores and retail warehouses have notoriously poor cellular reception, FlipCalc abandons traditional API dependencies in favor of a 100% local architecture. It utilizes React, Service Workers, and robust `localStorage` management to provide instantaneous gross profit calculations, manual tax entry, and real-time budget tracking without ever dropping a connection. 

This project was built to demonstrate modern front-end engineering principles, focusing on complex state management, atomic component design, utility-first styling, responsive layouts, and automated CI/CD deployment.

## ✨ Key Features

* **Progressive Web App (PWA):** Fully installable to iOS and Android home screens. A background Service Worker permanently caches the UI, allowing the app to launch instantly and function flawlessly in complete network dead zones.
* **Target-Based Margin Math:** Instead of guessing sale prices, users input a buy cost and the app instantly calculates the minimum required sale price to hit their custom profit goals.
* **Profit Protection:** Incorporates a flat-dollar minimum profit threshold to ensure low-cost items are actually worth the user's time and effort.
* **Responsive Workspace:** Features a tabbed, mobile-first UI for active sourcing, which seamlessly expands into a side-by-side desktop dashboard for pre-trip research.
* **Running Inventory Roster:** Items can be named and added to a persistent list, keeping a running tally of the cart's subtotal, tax, and total out-the-door cost.
* **Dynamic Budget Alerts:** The UI provides real-time visual alerts and exact remaining dollar amounts as the user approaches or exceeds their custom budget limit.
* **Persistent Local Settings:** Users can save default configurations directly to the browser, such as their target profit margin, default shopping budget, flat-dollar threshold, and local sales tax rate.

## 🏆 Performance & Accessibility

FlipCalc is engineered to meet strict modern web standards, achieving a **perfect 100/100 score across all Lighthouse metrics**:
* **Performance (100):** Lightweight bundle size, zero heavy external dependencies, and highly optimized Vite builds.
* **Accessibility (100):** Fully scalable viewport, strict semantic HTML, dynamic unique ID generation for screen readers, and WCAG-compliant high-contrast UI tailored for mobile screens.
* **Best Practices (100):** Secure, modern architecture completely free of legacy console errors or deprecated APIs.
* **SEO (100):** Fully valid `robots.txt`, rich metadata, and mobile-friendly configuration.

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18 + Vite
* **Styling:** Tailwind CSS v4 (Integrated via Vite Plugin for a zero-config, lightning-fast compiler)
* **State Management:** React Context API & Custom Hooks
* **Storage & Security:** Browser `localStorage`, Service Workers, & native Web Crypto API
* **CI/CD:** GitHub Actions automated deployment to GitHub Pages, Dependabot for security vulnerability scanning

### Architecture Philosophy (Atomic Design)
The codebase strictly adheres to an atomic component structure to maximize maintainability and scalability. 
* **`/ui`**: Logic-less, purely presentational primitive components (Buttons, Inputs, Alerts) styled with Tailwind.
* **`/features`**: Domain-specific components (ItemForm, BudgetProgress) that compose UI primitives and connect to local/global state.
* **Business Logic Isolation:** Financial mathematics and storage interactions are fully decoupled from the rendering layer via custom hooks (e.g., `useMarginMath`).

## 🚀 Local Development Setup

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ddgiovinazzo/flipcalc.git](https://github.com/ddgiovinazzo/flipcalc.git)
   cd flipcalc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📂 Folder Structure

```text
src/
├── components/
│   ├── ui/                 # Reusable Tailwind primitives
│   ├── features/           # App-specific domain components (Entry, List, Settings)
│   └── layout/             # Page wrappers and headers
├── hooks/                  # Custom logic (useLocalStorage, useMarginMath)
├── context/                # Global state (Settings & Inventory arrays)
└── utils/                  # Helper functions and constants
```

## 📝 Future Roadmap

* **Export Functionality:** Allow users to download their session inventory as a CSV file for bookkeeping purposes.
* **Camera Integration:** Leverage native device APIs to allow users to snap reference photos of items before adding them to the cart.