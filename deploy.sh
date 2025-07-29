#!/bin/bash

# GitHub Pages Deployment Script

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist folder not found."
    exit 1
fi

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment completed!"
echo "🌍 Your site should be available at: https://yourusername.github.io/T-ER"
echo "⚠️  Remember to update the homepage URL in package.json with your actual GitHub username!" 