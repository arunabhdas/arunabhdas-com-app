# Quick Email Setup - 5 Minutes ⚡

Follow these steps to get your contact form sending emails to `arunabhdas@gmail.com`:

## 1. Install Resend (if not already installed)

```bash
cd arunabhdas-com
npm install resend
```

## 2. Get Your Resend API Key

1. Go to **[resend.com](https://resend.com)** and create a free account
2. Go to **API Keys** → **Create API Key**
3. Copy the key (starts with `re_...`)

## 3. Add API Key Locally

Create a `.env` file:

```bash
echo "RESEND_API_KEY=re_your_api_key_here" > .env
```

Replace `re_your_api_key_here` with your actual key!

## 4. Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` and test the contact form. You should receive an email! 📧

## 5. Deploy to Vercel

### Add Environment Variable to Vercel:

1. Go to [vercel.com](https://vercel.com) → Your Project
2. **Settings** → **Environment Variables**
3. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your API key
   - **Environments:** Check all boxes
4. Click **Save**

### Deploy:

```bash
git add .
git commit -m "Add email functionality"
git push
```

## ✅ Done!

Your contact form is now live and will send emails to `arunabhdas@gmail.com`.

---

## Files Created/Modified:

- ✅ `src/routes/api/contact/+server.ts` - Email API endpoint
- ✅ `src/lib/components/Contact.svelte` - Updated form handler
- 📄 `.env` - Local environment variables (create this yourself)

## What Happens When Someone Submits:

1. Form data sent to `/api/contact` endpoint
2. Server validates the data
3. Resend sends a styled email to `arunabhdas@gmail.com`
4. User sees success message
5. You receive email with their message and reply-to address

## Troubleshooting:

**Email not sending?**
- Check API key is correct in Vercel
- Check Vercel function logs: Dashboard → Functions → `/api/contact`
- Verify Resend account is active

**Need help?** See detailed guide in `EMAIL_SETUP.md`

