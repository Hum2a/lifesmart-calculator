#!/bin/bash

# LifeSmart Calculator WordPress Plugin Packaging Script
# This script packages the WordPress plugin for distribution

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_NAME="lifesmart-calculator"
ZIP_NAME="${PLUGIN_NAME}-wp-plugin.zip"

echo -e "${BLUE}🧮 LifeSmart Calculator WordPress Plugin Packager${NC}"
echo -e "${BLUE}=================================================${NC}"

# Check if we're in the right directory
if [[ ! -f "lifesmart-calculator.php" ]]; then
    echo -e "${RED}❌ Error: lifesmart-calculator.php not found in current directory${NC}"
    echo -e "${YELLOW}Please run this script from the plugin directory${NC}"
    exit 1
fi

# Step 1: Rename WP-README.md to readme.md
echo -e "${YELLOW}📝 Step 1: Renaming WP-README.md to readme.md${NC}"
if [[ -f "WP-README.md" ]]; then
    mv "WP-README.md" "readme.md"
    echo -e "${GREEN}✅ Successfully renamed WP-README.md to readme.md${NC}"
else
    echo -e "${YELLOW}⚠️  WP-README.md not found, skipping rename${NC}"
fi

# Step 2: Check if build directory exists
echo -e "${YELLOW}🔍 Step 2: Checking for React build files${NC}"
if [[ ! -d "build" ]]; then
    echo -e "${RED}❌ Error: build directory not found${NC}"
    echo -e "${YELLOW}Please run 'npm run build' first to create the React build${NC}"
    exit 1
fi

if [[ ! -f "build/static/css/main.79de0914.css" ]] || [[ ! -f "build/static/js/main.02195a11.js" ]]; then
    echo -e "${RED}❌ Error: Required build files not found${NC}"
    echo -e "${YELLOW}Please run 'npm run build' to generate the React build files${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build files found${NC}"

# Step 3: Create temporary directory for packaging
echo -e "${YELLOW}📦 Step 3: Creating plugin package${NC}"
TEMP_DIR=$(mktemp -d)
PLUGIN_DIR="${TEMP_DIR}/${PLUGIN_NAME}"

# Create plugin directory
mkdir -p "$PLUGIN_DIR"

# Copy required files
echo -e "${BLUE}Copying plugin files...${NC}"
cp "lifesmart-calculator.php" "$PLUGIN_DIR/"
cp "readme.md" "$PLUGIN_DIR/"

# Copy build directory
echo -e "${BLUE}Copying React build files...${NC}"
cp -r "build" "$PLUGIN_DIR/"

# Step 4: Create ZIP file
echo -e "${YELLOW}🗜️  Step 4: Creating ZIP file${NC}"
cd "$TEMP_DIR"
zip -r "$ZIP_NAME" "$PLUGIN_NAME" -q

# Move ZIP to original directory
mv "$ZIP_NAME" "$SCRIPT_DIR/"

# Clean up temporary directory
rm -rf "$TEMP_DIR"

# Step 5: Update .gitignore
echo -e "${YELLOW}📝 Step 5: Updating .gitignore${NC}"
cd "$SCRIPT_DIR"

if [[ ! -f ".gitignore" ]]; then
    echo -e "${BLUE}Creating new .gitignore file${NC}"
    touch .gitignore
fi

# Check if ZIP file is already in .gitignore
if ! grep -q "$ZIP_NAME" .gitignore 2>/dev/null; then
    echo "" >> .gitignore
    echo "# WordPress Plugin Distribution" >> .gitignore
    echo "$ZIP_NAME" >> .gitignore
    echo -e "${GREEN}✅ Added $ZIP_NAME to .gitignore${NC}"
else
    echo -e "${BLUE}ℹ️  $ZIP_NAME already in .gitignore${NC}"
fi

# Step 6: Display results
echo -e "${GREEN}🎉 WordPress Plugin Packaging Complete!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}✅ Plugin ZIP file created: ${ZIP_NAME}${NC}"
echo -e "${GREEN}✅ File size: $(du -h "$ZIP_NAME" | cut -f1)${NC}"
echo -e "${GREEN}✅ .gitignore updated${NC}"
echo ""
echo -e "${BLUE}📋 Package Contents:${NC}"
echo -e "${BLUE}  - lifesmart-calculator.php (main plugin file)${NC}"
echo -e "${BLUE}  - readme.md (WordPress plugin readme)${NC}"
echo -e "${BLUE}  - build/ (React app build files)${NC}"
echo ""
echo -e "${YELLOW}🚀 Ready for WordPress installation!${NC}"
echo -e "${YELLOW}Upload $ZIP_NAME to your WordPress site and activate the plugin.${NC}"
