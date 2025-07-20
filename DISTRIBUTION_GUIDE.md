# 📦 MagnetCraft Distribution Guide

Your MagnetCraft app has been successfully packaged! Here's how to share it with other users.

## 🚀 Quick Distribution Commands

```bash
# Build for macOS (creates .dmg and .zip)
npm run dist-mac

# Build for Windows (creates installer and portable)
npm run dist-win

# Build for Linux (creates AppImage and .deb)
npm run dist-linux

# Build for all platforms
npm run dist
```

## 📁 Generated Files

After running `npm run dist-mac`, you'll find these files in `dist-packages/`:

### macOS Files:
- **`MagnetCraft-1.0.0.dmg`** - macOS installer (Intel)
- **`MagnetCraft-1.0.0-arm64.dmg`** - macOS installer (Apple Silicon)
- **`MagnetCraft-1.0.0-mac.zip`** - macOS app bundle (Intel)
- **`MagnetCraft-1.0.0-arm64-mac.zip`** - macOS app bundle (Apple Silicon)

### Windows Files (when you run `npm run dist-win`):
- **`MagnetCraft Setup 1.0.0.exe`** - Windows installer
- **`MagnetCraft 1.0.0.exe`** - Portable Windows app

### Linux Files (when you run `npm run dist-linux`):
- **`MagnetCraft-1.0.0.AppImage`** - Universal Linux app
- **`magnetcraft_1.0.0_amd64.deb`** - Debian/Ubuntu package

## 📤 Distribution Methods

### 1. **GitHub Releases** (Recommended)
```bash
# 1. Create a release on GitHub
# 2. Upload the .dmg, .exe, .AppImage files
# 3. Users can download directly from GitHub
```

### 2. **Direct File Sharing**
- Share the `.dmg` file for macOS users
- Share the `.exe` installer for Windows users  
- Share the `.AppImage` for Linux users

### 3. **Cloud Storage**
- Upload to Google Drive, Dropbox, or similar
- Share download links with users

### 4. **App Stores** (Advanced)
- **Mac App Store**: Requires Apple Developer account ($99/year)
- **Microsoft Store**: Requires Microsoft Developer account
- **Snap Store**: Free for Linux distribution

## 🔐 Code Signing (Important for Trust)

### macOS Code Signing
```bash
# Get Apple Developer certificate
# Add to keychain
# Update package.json:
"mac": {
  "identity": "Developer ID Application: Your Name",
  "hardenedRuntime": true,
  "entitlements": "build/entitlements.mac.plist"
}
```

### Windows Code Signing
```bash
# Get code signing certificate
# Update package.json:
"win": {
  "certificateFile": "path/to/certificate.p12",
  "certificatePassword": "password"
}
```

## 📊 File Sizes (Approximate)
- **macOS DMG**: ~150-200 MB
- **Windows Installer**: ~120-150 MB  
- **Linux AppImage**: ~120-150 MB

## ⚡ Auto-Updates (Advanced)

Add auto-update functionality:

```bash
npm install electron-updater
```

Then add to your main.js:
```javascript
const { autoUpdater } = require('electron-updater')
autoUpdater.checkForUpdatesAndNotify()
```

## 🎯 Distribution Checklist

- [ ] Test the packaged app on the target platform
- [ ] Add proper app icons (see `assets/README.md`)
- [ ] Code sign for production (reduces security warnings)
- [ ] Create release notes
- [ ] Test installation process
- [ ] Verify app permissions work correctly

## 🌐 Web Distribution Alternative

Consider also creating a web version using:
- **Tauri** (Rust-based, smaller files)
- **PWA** (Progressive Web App)
- **Capacitor** (Cross-platform from web)

## 💡 Pro Tips

1. **Reduce App Size**: Use `--publish=never` to avoid uploading during build
2. **Universal Builds**: The current config builds for both Intel and Apple Silicon Macs
3. **Antivirus Issues**: Unsigned apps may trigger antivirus warnings
4. **User Instructions**: Provide clear installation instructions for each platform

## 🚦 Next Steps

1. **Test your .dmg file** - Install it on another Mac to verify it works
2. **Build for other platforms** if needed using the commands above
3. **Create a GitHub release** and upload the distribution files
4. **Share the download links** with your users!

Your app is now ready for distribution! 🎉 