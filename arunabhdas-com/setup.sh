#!/bin/bash

# Portfolio Setup Script
# This script helps you get started quickly

echo "🚀 Setting up your portfolio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Customize your content (see DEPLOYMENT_CHECKLIST.md)"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Visit http://localhost:5173 to see your site"
    echo ""
    echo "When ready to deploy:"
    echo "- See QUICKSTART.md for deployment instructions"
    echo ""
else
    echo ""
    echo "❌ Failed to install dependencies"
    echo "   Please run 'npm install' manually and check for errors"
    exit 1
fi
