Here you go — the full README turned into a Markdown file ✅

````markdown
# 📝 Custom Editor  

A **Google Docs–like collaborative editor** built with **Next.js, TipTap, Radix UI, and Convex**, designed for **real-time collaboration and document sharing**.  
Future plans include an **AI-powered summary editor** to help users instantly generate document summaries.  

---

## 🚀 Features  

- ✍️ **Rich Text Editing** with [TipTap](https://tiptap.dev) (bold, italic, underline, highlight, links, tables, images, tasks, headings, etc.)  
- 🎨 **UI Components** powered by [Radix UI](https://www.radix-ui.com/) and styled with **TailwindCSS**  
- 🔄 **Real-time Collaboration** powered by [Convex](https://convex.dev/) backend & database  
- 📑 **Document Sharing** for easy collaboration with friends, classmates, or teams  
- 🔜 **AI Summary Editor** (planned feature) for quick document insights  
- 🌙 **Light/Dark Mode** with [next-themes](https://github.com/pacocoursey/next-themes)  

---

## 🛠️ Tech Stack  

- **Frontend:** [Next.js 15](https://nextjs.org/) + [React 19 (RC)](https://react.dev/)  
- **Editor:** [TipTap](https://tiptap.dev) + custom extensions (image resize, text alignment, tables, tasks)  
- **UI Library:** [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)  
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)  
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)  
- **Backend & Database:** [Convex](https://convex.dev/) (serverless, real-time)  
- **Styling:** [TailwindCSS](https://tailwindcss.com/) + [tailwind-merge](https://tailwind-merge.vercel.app/)  

---

## 📦 Installation  

Clone the repository and install dependencies:  

```bash
git clone https://github.com/your-username/custom-editor.git
cd custom-editor
npm install
````

Set up **Convex**:

```bash
npx convex dev
```

---

## 🧑‍💻 Development

Run the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start development server         |
| `npm run build`  | Build production assets          |
| `npm start`      | Start production server          |
| `npm run lint`   | Run ESLint to check code quality |
| `npx convex dev` | Start Convex backend (local dev) |

---

## 📌 Roadmap

* ✅ Core rich text editor
* ⬜ Real-time collaboration with Convex
* ⬜ AI-powered summary editor
* ⬜ Document version history
* ✅Export to PDF / Markdown

---

## 📄 License

This project is licensed under the **MIT License**.
