# 🎨 Icon Setup Instructions

## Step 1: Generate Your Icon
1. Open `create-icons.html` in your browser (should already be open)
2. Click "Download PNG" to download `magnetcraft-icon-1024.png`
3. Save the file as `magnetcraft-icon-1024.png` in this `assets/` folder

## Step 2: Convert to Required Formats
Run the conversion script:
```bash
cd assets
./convert-icons.sh
```

This will automatically create:
- `icon.icns` (macOS)
- `icon.ico` (Windows)  
- `icon.png` (Linux)

## Step 3: Test Your Build
```bash
cd ..
npm run dist-mac  # Test macOS build with icons
```

## 🚀 Your download page will be available at:
- **Local preview**: Open `docs/index.html` in browser
- **Live site**: https://inbarshirizly.github.io/electron-example (after pushing to main)

## Notes:
- Icons are already configured in `package.json`
- The conversion script requires ImageMagick (will auto-install via Homebrew)
- You can customize the icon design in `create-icons.html` before generating

## Troubleshooting:
If the conversion script fails:
1. Install ImageMagick manually: `brew install imagemagick`
2. Make sure you saved the PNG as exactly `magnetcraft-icon-1024.png`
3. Check that you're in the `assets/` directory when running the script 