# EditFlow AI - Pro Video Shortcuts 🎬⚡

**EditFlow AI** is a professional-grade, multilingual shortcut engine built for editors who want to stay in the zone. Stop digging through menus—just ask naturally how to perform a task, and get the exact keyboard shortcuts instantly.

## ✨ Features

- **Natural Language Discovery**: Ask "how do I color grade?" or "ripple trim shortcut" and get precise results.
- **Brand Intelligence**: Deep knowledge of Premiere Pro, After Effects, Final Cut, DaVinci Resolve, Blender, CapCut, and Nuke.
- **OS Fluidity**: Automatically toggles between `Cmd` (macOS) and `Ctrl` (Windows/Linux) logic.
- **Multilingual Support**: Interactive in English, Spanish, and Brazilian Portuguese.
- **Premium UI**: Dark-mode optimized, fast-loading, and responsive design.

## 🛠️ Tech Stack

- **React 19 + TypeScript**: Modern, type-safe frontend architecture.
- **Tailwind CSS**: High-performance, utility-first styling.
- **Google Gemini 3 Flash**: Leveraging state-of-the-art LLM reasoning for accurate technical knowledge.

## 🔒 Security & Public Deployment

This application is designed to be hosted publicly. We have implemented several layers of protection:

- **Prompt Injection Defense**: All user inputs pass through a multi-stage sanitizer that filters out "jailbreak" attempts and system command overrides.
- **Environment Isolation**: API keys are managed exclusively via secure environment variables (`process.env.API_KEY`).
- **Error Obfuscation**: Real-time production errors are masked to prevent infrastructure leaking.
- **CORS & Rate Limiting (Recommended)**: For production use, it is recommended to host this behind a proxy (like Vercel or Netlify) to manage usage quotas.

## 📦 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/your-username/editflow-ai.git
   cd editflow-ai
   npm install
   ```
2. **Configure API**:
   Create a `.env` file in the root:
   ```env
   API_KEY=your_gemini_api_key
   ```
3. **Run Dev**:
   ```bash
   npm run dev
   ```

## 🔗 Author

Developed by **Gabriel Netto**. 
Portfolio: [gabrielnetto.com](https://gabrielnetto.com)

---
*Powered by Google Gemini AI. Version 2.0.1*