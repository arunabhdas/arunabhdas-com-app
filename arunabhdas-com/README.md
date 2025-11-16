# Arunabh Das - Portfolio Website

A modern, responsive portfolio website built with Svelte 5, SvelteKit, and Tailwind CSS. Features a sleek dark theme inspired by neural interfaces and modern best practices.

## 🚀 Features

- **Modern Stack**: Built with Svelte 5 (using new runes API), SvelteKit, and TypeScript
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Theme**: Elegant dark theme with neural-inspired color palette
- **Smooth Animations**: Subtle animations and transitions for better UX
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Performance Focused**: Optimized for fast loading and smooth interactions
- **Accessible**: ARIA labels and semantic HTML for better accessibility
- **Well Commented**: Comprehensive code comments for easy maintenance

## 📋 Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🌐 Deploying to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: arunabhdas-portfolio (or your preference)
   - Directory: ./ (press Enter)
   - Want to override settings: No

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New Project"

4. Import your Git repository

5. Vercel will auto-detect SvelteKit and configure:
   - Framework Preset: SvelteKit
   - Build Command: `npm run build`
   - Output Directory: `.svelte-kit`

6. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

### Custom Domain Setup

1. In Vercel Dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain: `arunabhdas.com`
4. Follow Vercel's instructions to configure your DNS

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`src/lib/components/Hero.svelte`)
   - Update name and bio

2. **About Section** (`src/lib/components/About.svelte`)
   - Replace placeholder text with your actual bio
   - Update experience years and project count

3. **Skills** (`src/lib/components/Skills.svelte`)
   - Modify `skillCategories` array with your skills
   - Update skill levels (0-100)

4. **Projects** (`src/lib/components/Projects.svelte`)
   - Replace sample projects with your actual projects
   - Add real GitHub/demo links
   - Replace placeholder images with actual screenshots

5. **Contact** (`src/lib/components/Contact.svelte`)
   - Update social media links in `socialLinks` array
   - Configure form submission (currently simulated)
   - Update location information

### Form Submission

The contact form currently simulates submission. To make it functional:

1. **Using Email Service (e.g., EmailJS)**
   ```typescript
   // In Contact.svelte, replace the handleSubmit function
   import emailjs from '@emailjs/browser';
   
   async function handleSubmit(event: Event) {
     event.preventDefault();
     formStatus = 'submitting';
     
     try {
       await emailjs.send(
         'YOUR_SERVICE_ID',
         'YOUR_TEMPLATE_ID',
         formData,
         'YOUR_PUBLIC_KEY'
       );
       formStatus = 'success';
     } catch (error) {
       formStatus = 'error';
     }
   }
   ```

2. **Using API Endpoint**
   ```typescript
   async function handleSubmit(event: Event) {
     event.preventDefault();
     formStatus = 'submitting';
     
     try {
       const response = await fetch('/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });
       
       if (response.ok) {
         formStatus = 'success';
       } else {
         throw new Error('Failed to send');
       }
     } catch (error) {
       formStatus = 'error';
     }
   }
   ```

### Color Theme

Colors are defined in `tailwind.config.js`:
```javascript
colors: {
  neural: {
    dark: '#0a0e27',      // Main dark background
    darker: '#050812',    // Darker background
    blue: '#6b9bd1',      // Primary blue
    'blue-light': '#8fb5e0', // Light blue accent
    accent: '#4a90e2'     // Accent color
  }
}
```

### Add Profile Image

Replace the placeholder in `About.svelte`:
```svelte
<!-- Replace this div with an img tag -->
<img 
  src="/path/to/your/image.jpg" 
  alt="Arunabh Das"
  class="w-full h-full object-cover rounded-2xl card-glow"
/>
```

### Add Favicon

Replace `static/favicon.png` with your own favicon.

## 📁 Project Structure

```
arunabhdas-portfolio/
├── src/
│   ├── lib/
│   │   └── components/
│   │       ├── Header.svelte      # Navigation
│   │       ├── Hero.svelte        # Landing section
│   │       ├── About.svelte       # About section
│   │       ├── Skills.svelte      # Skills showcase
│   │       ├── Projects.svelte    # Project portfolio
│   │       ├── Contact.svelte     # Contact form
│   │       └── Footer.svelte      # Footer
│   ├── routes/
│   │   ├── +layout.svelte         # Root layout
│   │   └── +page.svelte           # Main page
│   ├── app.css                    # Global styles
│   └── app.html                   # HTML template
├── static/                        # Static assets
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Technologies Used

- **Svelte 5**: Latest version with runes API
- **SvelteKit**: Framework for building web applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vercel**: Deployment platform

## 📝 Best Practices Implemented

- ✅ Semantic HTML for better SEO and accessibility
- ✅ Responsive design with mobile-first approach
- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ Smooth animations and transitions
- ✅ Optimized performance
- ✅ Clean, commented code
- ✅ Modern Svelte 5 patterns (runes, snippets)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 📧 Contact

For questions or feedback, reach out via the contact form on the website or through social media links.

---

**Note**: Remember to update all placeholder content (personal info, project links, social media URLs, etc.) with your actual information before deploying!
