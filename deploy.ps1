# 推送到 GitHub，由 Cloudflare Pages 自动构建部署
$ErrorActionPreference = "Stop"

Write-Host ">> Pushing to GitHub..." -ForegroundColor Cyan
Set-Location $PSScriptRoot

$status = git status --porcelain
if (-not $status) {
    Write-Host ">> No changes to deploy" -ForegroundColor Yellow
    exit 0
}

git add -A
git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main

Write-Host ">> Pushed! Cloudflare Pages will build and deploy to https://quna.fun" -ForegroundColor Green