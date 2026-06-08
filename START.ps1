Write-Host "`n╔════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Elevating Nations CIC - Website                  ║" -ForegroundColor Cyan
Write-Host "║  Starting Backend Server...                       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Check if Node.js is installed
try {
  $nodeVersion = node --version
  Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
  Write-Host "❌ ERROR: Node.js is not installed!" -ForegroundColor Red
  Write-Host "Please download from: https://nodejs.org" -ForegroundColor Yellow
  Read-Host "Press Enter to exit"
  exit
}

# Navigate to backend and start server
Set-Location backend
Write-Host "📦 Starting server on http://localhost:5000...`n" -ForegroundColor Green
npm start
