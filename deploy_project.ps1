$ErrorActionPreference = "Stop"

Write-Host "=== Adarsh AI Portfolio Deployment Helper ===" -ForegroundColor Cyan
Write-Host "This script keeps your deployment simple." -ForegroundColor Gray

# Check Git
if (-not (Get-Command "git" -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed! Please install Git first."
    exit 1
}

# 1. Ask for Repo URL
Write-Host "`n[Step 1] GitHub Repository" -ForegroundColor Green
$RepoUrl = "https://github.com/AdarshVijay101/adarsh-ai-portfolio.git"
Write-Host "Target Repository: $RepoUrl"

if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
    Write-Error "Repository URL cannot be empty."
    exit 1
}

# 2. Add Remote
Write-Host "`n[Step 2] Linking Repository..." -ForegroundColor Green
try {
    git remote remove origin 2>$null
} catch {
    # Ignore if origin doesn't exist
}

git remote add origin $RepoUrl
Write-Host "Remote 'origin' linked to $RepoUrl" -ForegroundColor Gray

# 3. Push
Write-Host "`n[Step 3] Pushing Code..." -ForegroundColor Green
Write-Host "You may be asked to sign in to GitHub in a popup window." -ForegroundColor Yellow
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "Now go to Vercel/Railway and import this repository." -ForegroundColor Cyan
} else {
    Write-Error "Push failed. Please check your credentials and try again."
}

Pause
