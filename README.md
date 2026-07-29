# FlipCalc 🛒

> An offline-first, client-side React application designed as a running shopping companion for retail resellers. 

## 📖 Overview

Recognizing that many large thrift stores and retail warehouses have notoriously poor cellular reception, FlipCalc abandons traditional API dependencies in favor of a 100% local architecture. It utilizes React and robust `localStorage` management to provide instantaneous gross profit calculations, manual tax entry, and real-time budget tracking without ever dropping a connection. 

This project was built to demonstrate modern front-end engineering principles, focusing on complex state management, atomic component design, and utility-first styling.

## ✨ Key Features

* **Zero-Latency Margin Math:** Users input a buy cost and expected sale price to receive an instant, color-coded gross profit margin analysis (Good Buy vs. Pass).
* **Running Inventory Roster:** Items can be named and added to a persistent list, keeping a running tally of the cart's total cost before hitting the register.
* **Dynamic Budget Alerts:** The UI provides real-time visual alerts (Green/Yellow/Red) as the user approaches or exceeds their custom budget limit.
* **Persistent Local Settings:** Users can save default configurations directly to the browser, such as their target profit margin, default shopping budget, and local sales tax rate (e.g., setting a baseline of 8.375% for local sourcing trips).
* **Fully Offline Capable:** Driven entirely by client-side state and `localStorage`, ensuring the app never fails in dead zones.

## 🛠️ Tech Stack & Architecture

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Context API & Custom Hooks
* **Storage:** Browser `localStorage`

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

* **PWA Implementation:** Add a web manifest and service workers to allow users to install the application natively to their mobile home screens.
* **Export Functionality:** Allow users to download their session inventory as a CSV file for bookkeeping purposes.
