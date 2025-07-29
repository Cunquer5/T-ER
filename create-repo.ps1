# PowerShell script to create GitHub repository
# This script will help create the T-ER repository on GitHub

Write-Host "🔧 Creating T-ER repository on GitHub..." -ForegroundColor Green

# Repository details
$repoName = "T-ER"
$description = "Farm Fresh Goods E-commerce Site"

Write-Host "Repository Name: $repoName" -ForegroundColor Yellow
Write-Host "Description: $description" -ForegroundColor Yellow
Write-Host "Visibility: Public" -ForegroundColor Yellow

Write-Host "`n📋 Instructions:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: $repoName" -ForegroundColor White
Write-Host "3. Description: $description" -ForegroundColor White
Write-Host "4. Make it PUBLIC (required for GitHub Pages)" -ForegroundColor White
Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor White
Write-Host "6. Click 'Create repository'" -ForegroundColor White

Write-Host "`n⏳ After creating the repository, press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host "`n🚀 Pushing code to the new repository..." -ForegroundColor Green

# Try to push to the repository
try {
    git push -u origin master
    Write-Host "✅ Successfully pushed to $repoName repository!" -ForegroundColor Green
    
    Write-Host "`n🌐 Deploying to GitHub Pages..." -ForegroundColor Green
    npm run deploy
    
    Write-Host "`n🎉 Deployment completed!" -ForegroundColor Green
    Write-Host "Your site will be available at: https://assasin27.github.io/$repoName" -ForegroundColor Cyan
    
    Write-Host "`n📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/assasin27/$repoName/settings/pages" -ForegroundColor White
    Write-Host "2. Select 'Deploy from a branch'" -ForegroundColor White
    Write-Host "3. Choose 'gh-pages' branch and '/(root)' folder" -ForegroundColor White
    Write-Host "4. Click 'Save'" -ForegroundColor White
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure the repository exists and you have the correct permissions." -ForegroundColor Yellow
} 