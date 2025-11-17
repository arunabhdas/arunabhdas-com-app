# Email Contact Form Setup Guide

This guide will help you set up the contact form to send emails to `arunabhdas@gmail.com` using Resend.

## Prerequisites

- Node.js and npm installed
- Vercel account for deployment
- Resend account (free tier includes 3,000 emails/month)

## Step-by-Step Setup

### 1. Install Resend Package

```bash
cd arunabhdas-com
npm install resend
```

### 2. Sign Up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Create a free account
3. Verify your email address

### 3. Get Your Resend API Key

1. Log in to your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Portfolio Contact Form")
5. Copy the API key (it starts with `re_`)
6. **Important:** Save this key securely - you won't be able to see it again!

### 4. Set Up Local Environment Variable

Create a `.env` file in the `arunabhdas-com` directory:

```bash
# In arunabhdas-com directory
touch .env
```

Add your Resend API key to `.env`:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

**Note:** The `.env` file should be git-ignored and never committed to your repository.

### 5. Add .env to .gitignore

Create or update `.gitignore` in the `arunabhdas-com` directory:

```gitignore
# Environment variables
.env
.env.*
!.env.example

# Dependencies
node_modules

# Build output
.svelte-kit
build
dist

# Logs
*.log
```

### 6. Set Up Vercel Environment Variables

For your deployed site to work, you need to add the API key to Vercel:

1. Go to your project on [Vercel Dashboard](https://vercel.com)
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starting with `re_`)
   - **Environments:** Select all (Production, Preview, Development)
4. Click **Save**

### 7. Test Locally

Start your development server:

```bash
npm run dev
```

Visit your site and try submitting the contact form. You should receive an email at `arunabhdas@gmail.com`.

### 8. Deploy to Vercel

```bash
git add .
git commit -m "Add email functionality to contact form"
git push
```

Vercel will automatically deploy your changes.

## Upgrading from Test Email to Custom Domain

By default, Resend uses their test domain (`onboarding@resend.dev`). For better deliverability, you should:

1. **Verify Your Domain in Resend:**
   - Go to Resend Dashboard → Domains
   - Click "Add Domain"
   - Follow the DNS verification steps

2. **Update the API Endpoint:**

   In `src/routes/api/contact/+server.ts`, change:
   ```typescript
   from: 'Portfolio Contact <onboarding@resend.dev>',
   ```

   To:
   ```typescript
   from: 'Portfolio Contact <noreply@yourdomain.com>',
   ```

## Troubleshooting

### Email Not Sending

1. **Check API Key:**
   - Make sure `RESEND_API_KEY` is set correctly in Vercel
   - Verify the key starts with `re_`

2. **Check Logs:**
   - In Vercel: Go to your deployment → Functions tab
   - Look for error messages in the `/api/contact` function logs

3. **Test API Key:**
   ```bash
   # In terminal
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer re_your_key_here" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "arunabhdas@gmail.com",
       "subject": "Test Email",
       "html": "<p>Test</p>"
     }'
   ```

### Emails Going to Spam

1. Verify your domain with Resend (see "Upgrading" section above)
2. Add SPF, DKIM, and DMARC records to your domain
3. Use a professional "from" address

### Rate Limiting

- Free tier: 3,000 emails/month, 100 emails/day
- If you hit limits, upgrade to a paid plan or implement rate limiting

## Security Best Practices

1. **Never commit `.env` file** - Already handled by .gitignore
2. **Use environment variables** - API key is only in Vercel, not in code
3. **Validate inputs** - Already implemented in the API endpoint
4. **Add rate limiting** - Consider adding for production

## File Structure

```
arunabhdas-com/
├── src/
│   ├── lib/
│   │   └── components/
│   │       └── Contact.svelte          # Form component
│   └── routes/
│       └── api/
│           └── contact/
│               └── +server.ts          # Email API endpoint
├── .env                                # Local environment variables (git-ignored)
└── EMAIL_SETUP.md                      # This guide
```

## Support

- **Resend Documentation:** [https://resend.com/docs](https://resend.com/docs)
- **SvelteKit API Routes:** [https://kit.svelte.dev/docs/routing#server](https://kit.svelte.dev/docs/routing#server)

## What's Implemented

✅ API endpoint at `/api/contact`
✅ Form validation (required fields, email format)
✅ HTML email template with styling
✅ Plain text fallback
✅ Reply-to functionality (user's email)
✅ Error handling and user feedback
✅ Loading states
✅ Success confirmation

Your contact form is now production-ready! 🎉

