#!/bin/bash

# MagnetCraft Release Script
# This script helps you create a new release

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 MagnetCraft Release Helper${NC}"
echo

# Check if we're on main branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    echo -e "${RED}❌ You must be on the main branch to create a release${NC}"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Working directory is not clean. Please commit or stash your changes.${NC}"
    exit 1
fi

# Get current version from package.json
current_version=$(node -p "require('./package.json').version")
echo -e "Current version: ${YELLOW}v$current_version${NC}"

# Ask for new version
echo
echo "Enter the new version (without 'v' prefix):"
echo "Examples: 1.0.1, 1.1.0, 2.0.0"
read -p "New version: " new_version

# Validate version format
if [[ ! $new_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "${RED}❌ Invalid version format. Use semantic versioning (e.g., 1.0.1)${NC}"
    exit 1
fi

# Update package.json version
echo -e "${GREEN}📝 Updating package.json version...${NC}"
npm version $new_version --no-git-tag-version

# Commit the version change
echo -e "${GREEN}💾 Committing version update...${NC}"
git add package.json package-lock.json
git commit -m "chore: bump version to v$new_version"

# Create and push tag
echo -e "${GREEN}🏷️  Creating and pushing tag...${NC}"
git tag "v$new_version"
git push origin main
git push origin "v$new_version"

echo
echo -e "${GREEN}✅ Release v$new_version created successfully!${NC}"
echo -e "${YELLOW}🔄 GitHub Actions will now build and create the release automatically.${NC}"
echo -e "${YELLOW}📦 Check the Actions tab in your GitHub repo to monitor the build progress.${NC}"
echo
echo -e "Release will be available at: ${GREEN}https://github.com/YOUR_USERNAME/YOUR_REPO/releases/tag/v$new_version${NC}" 