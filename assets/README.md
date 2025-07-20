# App Icons

To properly package your app, you need icons in different formats:

## Required Icons:

### macOS
- `icon.icns` - macOS app icon (can convert from PNG using online tools)

### Windows  
- `icon.ico` - Windows app icon (can convert from PNG using online tools)

### Linux
- `icon.png` - Linux app icon (512x512 PNG recommended)

## How to Create Icons:

1. Create a 1024x1024 PNG image for your app
2. Use online converters to create:
   - `.icns` file for macOS
   - `.ico` file for Windows
   - Keep the PNG for Linux

## Temporary Solution:
The build will work without icons, but the app will use default Electron icons.

For now, you can create placeholder files or the build will continue without them. 