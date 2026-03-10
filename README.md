# Arunabh Das Portfolio


## Tech Stack
* **Framework:** SvelteKit (Svelte 5)
* **Styling:** Tailwind CSS (Custom stark monochrome palette)
* **Typography:** Inter (Sans-serif) & Newsreader (Serif)
* **Deployment:** Vercel Adapter

---

## 🚀 Running Locally

To run this project locally, ensure you have Node.js installed (v18+ recommended).

1. **Navigate to the app directory:**
   ```bash
   cd arunabhdas-com
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or the next available port).

---

## 🛠 Building for Production

To create a production-ready optimized build:

```bash
cd arunabhdas-com
npm run build
```

You can preview the production build locally using:
```bash
npm run preview
```

---

## 🌐 Deploying to PROD (Vercel)

This application is pre-configured with `@sveltejs/adapter-vercel`. 

### Option 1: Vercel CLI
If you have the Vercel CLI installed:
1. Run `vercel` in the `arunabhdas-com` directory to deploy a preview.
2. Run `vercel --prod` to deploy to production.

### Option 2: Git Integration (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in your Vercel Dashboard.
3. Vercel will automatically detect SvelteKit and use the correct build settings (`npm run build`).
4. Any subsequent pushes to the `main` branch will automatically trigger production deployments.
