![Mobius Prime - System Prompt Engineering App](*/content/image-mobius-prime-prompt-engineering-app-1270x812.jpg)
<img width="1270" height="812" alt="Mobius Prime Prompt Engineering App Banner" src=/content/image-mobius-prime-prompt-engineering-app-1270x812.jpg/>

# Mobius Prime - System Prompt Engineering App

![Status](https://img.shields.io/badge/Status-Operational-00ff9d)
![Tech](https://img.shields.io/badge/Stack-React_|_Typescript_|_Gemini-050505)

**Mobius Prime** is an advanced, high-fidelity tool designed to architect world-class System Prompts. It utilizes a sophisticated interrogation protocol—the **Mobius Protocol**—to guide users through defining Identity, Objectives, Context, Constraints, and Format. 

Under the hood, it leverages the **Google GenAI SDK** (`gemini-2.5-flash`) with **Search Grounding** to ensure that every generated system prompt is factually accurate and up-to-date with the latest documentation and real-world context.

## 🌌 Visual Identity
The application features a unique **"Matrix meets Apple"** aesthetic:
- **Glassmorphism**: Deep, blurred panels with subtle borders.
- **Neon Accents**: Cyberpunk green (`#00ff9d`) highlights against a void-black background.
- **Micro-interactions**: Smooth transitions and animations powered by Framer Motion and CSS.

---

## ✨ Features

### 1. The Mobius Protocol
A 5-step wizard that acts as a meta-prompt engineer:
1.  **Identity Construct**: Define the AI's persona and tone.
2.  **Prime Directive**: Establish the singular goal.
3.  **Knowledge Base**: Upload context (grounded by Google Search).
4.  **Boundary Parameters**: Set safety rails and constraints.
5.  **Output Architecture**: Define the exact output format (JSON, Markdown, etc.).

### 2. Search Grounding (RAG)
Unlike standard prompt generators, Mobius Prime connects to the internet via Gemini's `googleSearch` tool. 
*   *Example*: If you ask for a prompt involving "React 19 Server Actions", the system verifies the latest syntax before generating the prompt instructions.

### 3. Meta-Prompting Engine
The input data is fed into a highly complex internal meta-prompt that instructs Gemini to use advanced techniques like **Chain-of-Thought**, **Few-Shot Prompting**, and **Delimiter Usage** in the final artifact.

---

## 🛠 Tech Stack

- **Core**: React 19, TypeScript
- **AI**: Google GenAI SDK (`@google/genai`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion (or native CSS animations)

---

## 🚀 Local Setup & Installation

Follow these instructions to run Mobius Prime on your local machine using `pnpm`.

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** (Install via `npm install -g pnpm`)
- **Google AI Studio API Key**: Get one [here](https://aistudio.google.com/).

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mobius-prime.git
cd mobius-prime
```

### 2. Install Dependencies
This project uses `pnpm` for fast, efficient package management.

```bash
pnpm install
```

*Note: Ensure you have the following packages in your `package.json`:*
- `react`, `react-dom`
- `@google/genai`
- `lucide-react`
- `framer-motion`
- `tailwindcss`, `postcss`, `autoprefixer`

### 3. Configure Environment Variables
Create a `.env` file in the root directory to store your API credentials.

```bash
touch .env
```

Add your Google GenAI API key:

```env
# For Vite
VITE_API_KEY=your_actual_api_key_here

# OR for Webpack/CRA (depending on your build tool)
API_KEY=your_actual_api_key_here
```

*Important: The application expects the API key to be available via `process.env.API_KEY` or `import.meta.env.VITE_API_KEY` depending on your bundler configuration. Ensure your bundler is configured to expose this variable.*

### 4. Run Development Server
Start the local development environment.

```bash
pnpm dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## 📖 Usage Guide

1.  **Initialize Protocol**: Click the start button on the landing page.
2.  **Input Data**: Fill out the 5-step form. Be as specific as possible—the quality of the output depends on the specificity of the input.
3.  **Context**: If referring to specific docs (e.g., "Next.js 14 App Router"), mention them by name. The system will research them.
4.  **Generate**: Watch the system synthesize the prompt.
5.  **Review & Copy**: The final artifact includes a "Reasoning" section explaining why the prompt was built that way, and the raw System Prompt ready for copying.

---

## 🛡️ License

This project is open-source and available under the MIT License.