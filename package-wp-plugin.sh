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

# Check if WP-README.md exists
if [[ ! -f "WP-README.md" ]]; then
    echo -e "${RED}❌ Error: WP-README.md not found in current directory${NC}"
    exit 1
fi

# Step 1: Create temporary directory for packaging
echo -e "${YELLOW}📦 Step 1: Creating plugin package${NC}"
TEMP_DIR=$(mktemp -d)
PLUGIN_DIR="${TEMP_DIR}/${PLUGIN_NAME}"

# Create plugin directory
mkdir -p "$PLUGIN_DIR"

# Copy required files
echo -e "${BLUE}Copying plugin files...${NC}"
cp "lifesmart-calculator.php" "$PLUGIN_DIR/"

# Copy WP-README.md as readme.md in the package
echo -e "${BLUE}Copying WP-README.md as readme.md (for WordPress)...${NC}"
cp "WP-README.md" "$PLUGIN_DIR/readme.md"

# Step 2: Create ZIP file
echo -e "${YELLOW}🗜️  Step 2: Creating ZIP file${NC}"
cd "$TEMP_DIR"
zip -r "$ZIP_NAME" "$PLUGIN_NAME" -q

# Move ZIP to original directory
mv "$ZIP_NAME" "$SCRIPT_DIR/"

# Clean up temporary directory
rm -rf "$TEMP_DIR"

# Step 3: Update .gitignore
echo -e "${YELLOW}📝 Step 3: Updating .gitignore${NC}"
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

# Step 4: Display results
echo -e "${GREEN}🎉 WordPress Plugin Packaging Complete!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}✅ Plugin ZIP file created: ${ZIP_NAME}${NC}"
echo -e "${GREEN}✅ File size: $(du -h "$ZIP_NAME" | cut -f1)${NC}"
echo -e "${GREEN}✅ .gitignore updated${NC}"
echo ""
echo -e "${BLUE}📋 Package Contents:${NC}"
echo -e "${BLUE}  - lifesmart-calculator.php (main plugin file)${NC}"
echo -e "${BLUE}  - readme.md (WordPress plugin readme)${NC}"
echo ""
echo -e "${YELLOW}🚀 Ready for WordPress installation!${NC}"
echo -e "${YELLOW}Upload $ZIP_NAME to your WordPress site and activate the plugin.${NC}"
