#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 GitHub Pages Deployment Setup');
console.log('================================');

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get current homepage
const currentHomepage = packageJson.homepage;

console.log(`Current homepage: ${currentHomepage}`);
console.log('');

// Ask for GitHub username
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your GitHub username: ', (username) => {
  const newHomepage = `https://${username}.github.io/T-ER`;
  
  // Update package.json
  packageJson.homepage = newHomepage;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('');
  console.log('✅ Updated package.json with your GitHub username');
  console.log(`New homepage: ${newHomepage}`);
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Enable GitHub Pages in your repository settings');
  console.log('3. Enable GitHub Actions in your repository settings');
  console.log('4. Your site will be deployed automatically when you push to main branch');
  console.log('');
  console.log('📖 See DEPLOYMENT.md for detailed instructions');
  
  rl.close();
}); 