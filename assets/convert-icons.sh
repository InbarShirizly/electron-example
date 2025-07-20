#!/bin/bash

# MagnetCraft Icon Converter
# This script helps convert a PNG icon to the required formats for Electron Builder

echo "🎨 MagnetCraft Icon Converter"
echo "================================="

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing via Homebrew..."
    if command -v brew &> /dev/null; then
        brew install imagemagick
    else
        echo "Please install ImageMagick manually:"
        echo "  brew install imagemagick"
        echo "  or visit: https://imagemagick.org/script/download.php"
        exit 1
    fi
fi

# Check if input PNG exists
if [ ! -f "magnetcraft-icon-1024.png" ]; then
    echo "❌ Please save the generated icon as 'magnetcraft-icon-1024.png' in the assets folder"
    echo "   1. Open the browser with the icon generator"
    echo "   2. Click 'Download PNG'"
    echo "   3. Save as 'magnetcraft-icon-1024.png' in the assets folder"
    exit 1
fi

echo "🔍 Found magnetcraft-icon-1024.png"

# Create different sizes and formats
echo "🔧 Converting to different formats..."

# PNG for Linux (512x512)
convert magnetcraft-icon-1024.png -resize 512x512 icon.png
echo "✅ Created icon.png (512x512) for Linux"

# ICO for Windows (multiple sizes)
convert magnetcraft-icon-1024.png \
    \( -clone 0 -resize 16x16 \) \
    \( -clone 0 -resize 32x32 \) \
    \( -clone 0 -resize 48x48 \) \
    \( -clone 0 -resize 64x64 \) \
    \( -clone 0 -resize 128x128 \) \
    \( -clone 0 -resize 256x256 \) \
    -delete 0 icon.ico
echo "✅ Created icon.ico for Windows"

# ICNS for macOS
# Create iconset directory
mkdir -p MagnetCraft.iconset

# Generate all required sizes for icns
convert magnetcraft-icon-1024.png -resize 16x16 MagnetCraft.iconset/icon_16x16.png
convert magnetcraft-icon-1024.png -resize 32x32 MagnetCraft.iconset/icon_16x16@2x.png
convert magnetcraft-icon-1024.png -resize 32x32 MagnetCraft.iconset/icon_32x32.png
convert magnetcraft-icon-1024.png -resize 64x64 MagnetCraft.iconset/icon_32x32@2x.png
convert magnetcraft-icon-1024.png -resize 128x128 MagnetCraft.iconset/icon_128x128.png
convert magnetcraft-icon-1024.png -resize 256x256 MagnetCraft.iconset/icon_128x128@2x.png
convert magnetcraft-icon-1024.png -resize 256x256 MagnetCraft.iconset/icon_256x256.png
convert magnetcraft-icon-1024.png -resize 512x512 MagnetCraft.iconset/icon_256x256@2x.png
convert magnetcraft-icon-1024.png -resize 512x512 MagnetCraft.iconset/icon_512x512.png
convert magnetcraft-icon-1024.png -resize 1024x1024 MagnetCraft.iconset/icon_512x512@2x.png

# Convert to icns
iconutil -c icns MagnetCraft.iconset -o icon.icns

# Clean up
rm -rf MagnetCraft.iconset

echo "✅ Created icon.icns for macOS"

# Cleanup
rm -f magnetcraft-icon-1024.png

echo ""
echo "🎉 Icon conversion completed!"
echo "Generated files:"
echo "  📱 icon.png (Linux)"
echo "  🪟 icon.ico (Windows)"
echo "  🍎 icon.icns (macOS)"
echo ""
echo "Icons are ready for your Electron app! 🚀" 