# MagnetCraft - Photo Editor

A modern photo editing Electron application built with React. MagnetCraft allows users to import, organize, edit, and export photos with an intuitive interface.

## Features

- **📸 Photo Import**: Drag & drop or browse to add multiple images
- **✏️ Photo Editor**: Select and edit images with a clean interface
- **📋 Selection & Ordering**: Manage image quantities and order for printing
- **⚙️ Project Settings**: Configure project details and photo preferences
- **🖨️ Print & Export**: Print photos or export in various formats


## Interface

The app features a tabbed interface with four main sections:

1. **Editor**: Import and edit your photos
2. **Selection & Ordering**: Manage image quantities and arrange order
3. **Project Settings**: Configure project details and preferences
4. **Print & Export**: Print photos or export for external use

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the React app:
   ```bash
   npm run build
   ```

4. Start the Electron app:
   ```bash
   npm start
   ```

### Development

For development with hot reloading:

1. Start the webpack dev server:
   ```bash
   npm run dev
   ```

2. In another terminal, start Electron:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/
│   └── editor/
│       ├── EditorView.js         # Main photo editing interface
│       ├── SelectionView.js      # Image selection and ordering
│       ├── ProjectSettingsView.js # Project configuration
│       └── ExportView.js         # Print and export options
├── App.js                        # Main application component
├── index.js                      # React entry point
└── styles.css                    # Application styles
```

## Built With

- **Electron** - Desktop app framework
- **React** - User interface library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Webpack** - Module bundler

## Features in Detail

### Photo Import
- Drag and drop support for images
- Multiple file selection
- Automatic thumbnail generation
- Support for common image formats (JPG, PNG, GIF, BMP, WebP)

### Photo Editor
- Large image preview
- Basic editing controls
- Quantity management per image
- Image selection interface

### Project Management
- Project naming and organization
- Statistics tracking (total images, prints)
- Settings for print quality and size

### Export Options
- Multiple format support (JPEG, PNG, PDF, ZIP)
- Quality settings
- Print size configuration
- Cost estimation for prints

## Keyboard Shortcuts

- `Cmd/Ctrl + N` - New Project
- `Cmd/Ctrl + O` - Open Images
- `Cmd/Ctrl + S` - Save Project

## License

This project is licensed under the CC0-1.0 License - see the [LICENSE.md](LICENSE.md) file for details.
