# GitHub Pages Deployment Guide

This guide will help you deploy your React application to GitHub Pages.

## Prerequisites

1. Make sure your project is pushed to a GitHub repository
2. Ensure you have the necessary permissions to enable GitHub Pages

## Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment. Follow these steps:

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **gh-pages** branch and **/(root)** folder
5. Click **Save**

### 2. Enable GitHub Actions

1. Go to your repository's **Actions** tab
2. The workflow should automatically run when you push to the main branch
3. You can manually trigger it by going to **Actions** > **Deploy to GitHub Pages** > **Run workflow**

### 3. Update Repository Settings

1. In your repository settings, go to **Actions** > **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

## Manual Deployment

If you prefer manual deployment:

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update the homepage in `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/T-ER"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Configuration Notes

- The app uses **HashRouter** instead of BrowserRouter for GitHub Pages compatibility
- The base path is set to `/T-ER/` for production builds
- Static assets are served from the `dist` folder

## Troubleshooting

### Common Issues:

1. **404 Errors**: Make sure you're using HashRouter and the base path is correctly set
2. **Assets not loading**: Check that the base path in `vite.config.ts` matches your repository name
3. **Routing issues**: Ensure all routes are properly configured in the React Router setup

### Update Repository Name

If your repository has a different name than `T-ER`, update these files:

1. `vite.config.ts` - Change the base path
2. `package.json` - Update the homepage URL
3. Update the GitHub Actions workflow if needed

## Live Site

Once deployed, your site will be available at:
`https://yourusername.github.io/T-ER`

Replace `yourusername` with your actual GitHub username. 