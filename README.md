# Expense Tracker - README
# Made By Himanshu 

## Overview
Expense Tracker is a web application built to help users manage their personal finances by tracking income and expenses. The project uses modern web technologies and tools for development.

## Technologies Used

### Frontend
- **Vite** - Next generation frontend tooling
- **TypeScript** (55.8%) - Primary programming language
- **Tailwind CSS** - Utility-first CSS framework
- **React** (inferred from project structure)

### Backend
- **Supabase** - Open source Firebase alternative with PostgreSQL database
- **PostgreSQL** (1.1%) - Primary database system

### Development Tools
- **ESLint** - JavaScript/TypeScript linter
- **PostCSS** - CSS processor
- **Bun** (inferred from bun.lockb) - Fast JavaScript runtime

## Project Structure

```
expense-tracker/
├── public/              # Static files
├── src/                 # Application source code
├── supabase/            # Supabase configuration
├── .gitignore           # Git ignore rules
├── bun.lockb            # Bun lock file
├── components.json      # Component configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML entry point
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig*.json       # TypeScript configurations
└── vite.config.js       # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Bun (optional)
- Supabase account

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```
3. Set up environment variables
   - Create a `.env` file based on `.env.example`
   - Add your Supabase credentials

### Development
```bash
npm run dev
# or
bun run dev
```

### Building for Production
```bash
npm run build
# or
bun run build
```

## Features
- Add/Edit/Delete expenses
- Categorize transactions
- View spending trends
- User authentication (via Supabase)
- Responsive design
