#!/usr/bin/env bash

# LifeSmart Calculator Release Manager
# Creates and manages semantic versioning tags for releases
# Automatically updates CHANGELOG.md and builds the project
# Works on Windows (Git Bash), Linux, and macOS

# Initialize variables
INCREMENT=""
NAME=""
SET_TAG=""
SHOW_CURRENT=false
FORCE=false
UPDATE_CHANGELOG=true
BUILD_PROJECT=true
RUN_TESTS=true

# Show help function
show_help() {
  echo "Usage: $0 [OPTIONS]"
  echo "LifeSmart Calculator Release Manager - Manage releases with semantic versioning"
  echo ""
  echo "Options:"
  echo "  --major           Increment major version (vX.0.0)"
  echo "  --minor           Increment minor version (v0.X.0)"
  echo "  --patch           Increment patch version (v0.0.X) (default)"
  echo "  --name NAME       Append custom name to version (e.g., beta)"
  echo "  --set-tag TAG     Set specific tag (must be vX.Y.Z format)"
  echo "  --current         Show current release tag"
  echo "  --force           Force tag creation even if commit is tagged"
  echo "  --no-changelog    Skip updating CHANGELOG.md"
  echo "  --no-build        Skip building the project"
  echo "  --no-tests        Skip running tests"
  echo "  --help            Show this help message"
  echo ""
  echo "Examples:"
  echo "  $0 --current"
  echo "  $0 --minor"
  echo "  $0 --major --name beta"
  echo "  $0 --set-tag v1.2.3"
  echo "  $0 --patch --no-build"
  echo ""
  echo "Project: LifeSmart Calculator - Professional Financial & Life Planning Tool"
  echo "Tech Stack: React, TypeScript, Tailwind CSS, Chart.js"
  exit 0
}

# Function to run tests
run_tests() {
  echo "🧪 Running tests for LifeSmart Calculator..."

  # Check if npm is available
  if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed or not accessible"
    echo "Please install Node.js and npm to run tests"
    exit 1
  fi

  # Run tests
  echo "📋 Running test suite..."
  npm test -- --watchAll=false --coverage --passWithNoTests

  if [[ $? -eq 0 ]]; then
    echo "✅ All tests passed successfully!"
  else
    echo "❌ Tests failed! Please fix failing tests before releasing."
    exit 1
  fi
}

# Function to build the project
build_project() {
  echo "🏗️  Building LifeSmart Calculator for production..."

  # Check if npm is available
  if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed or not accessible"
    echo "Please install Node.js and npm to build the project"
    exit 1
  fi

  # Install dependencies if node_modules doesn't exist
  if [[ ! -d "node_modules" ]]; then
    echo "📦 Installing dependencies..."
    npm install
  fi

  # Build the project
  echo "🔨 Building production bundle..."
  npm run build

  if [[ $? -eq 0 ]]; then
    echo "✅ Build completed successfully!"
    echo "   - Production files created in ./build/"
    echo "   - Bundle size optimized for deployment"
  else
    echo "❌ Build failed! Please fix build errors before releasing."
    exit 1
  fi
}

# Function to update CHANGELOG.md using Python script
update_changelog() {
  local new_tag="$1"

  echo "🚀 Updating CHANGELOG.md with smart categorization..."
  echo "This will analyze commits and create a beautiful, categorized changelog entry."
  echo ""

  # Check if Python is available
  if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Error: Python is not installed or not accessible"
    echo "Please install Python 3.6+ to use the smart changelog updater"
    exit 1
  fi

  # Check if the Python script exists
  if [[ ! -f "scripts/update_changelog.py" ]]; then
    echo "❌ Error: update_changelog.py script not found!"
    echo "Please ensure the script exists in the scripts/ directory."
    exit 1
  fi

  # Run the Python changelog updater
  echo "📝 Running smart changelog updater..."
  if command -v python3 &> /dev/null; then
    python3 scripts/update_changelog.py "$new_tag"
  else
    python scripts/update_changelog.py "$new_tag"
  fi

  if [[ $? -eq 0 ]]; then
    echo ""
    echo "✅ CHANGELOG.md updated successfully with smart categorization!"
    echo "   - New release section added: [$new_tag]"
    echo "   - Unreleased section reset for future changes"
    echo "   - Commits automatically categorized into meaningful sections"
  else
    echo "❌ Failed to update CHANGELOG.md"
    exit 1
  fi
}

# Parse long arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --major)
      if [[ -n "$INCREMENT" ]]; then
        echo "Error: Cannot use multiple version flags together (--major, --minor, --patch, --set-tag)"
        exit 1
      fi
      INCREMENT="major"
      shift
      ;;
    --minor)
      if [[ -n "$INCREMENT" ]]; then
        echo "Error: Cannot use multiple version flags together (--major, --minor, --patch, --set-tag)"
        exit 1
      fi
      INCREMENT="minor"
      shift
      ;;
    --patch)
      if [[ -n "$INCREMENT" ]]; then
        echo "Error: Cannot use multiple version flags together (--major, --minor, --patch, --set-tag)"
        exit 1
      fi
      INCREMENT="patch"
      shift
      ;;
    --name)
      if [[ "$SHOW_CURRENT" == true ]]; then
        echo "Error: Cannot use --name with --current"
        exit 1
      fi
      NAME="$2"
      shift 2
      ;;
    --set-tag)
      if [[ -n "$INCREMENT" ]]; then
        echo "Error: Cannot use multiple version flags together (--major, --minor, --patch, --set-tag)"
        exit 1
      fi
      SET_TAG="$2"
      # Validate tag format
      if [[ ! "$SET_TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9-]+)?$ ]]; then
        echo "Error: Tag must be in format vX.Y.Z or vX.Y.Z-NAME (e.g., v1.2.3 or v1.2.3-beta)"
        exit 1
      fi
      INCREMENT="set"
      shift 2
      ;;
    --current)
      if [[ -n "$INCREMENT" || -n "$NAME" || "$FORCE" == true ]]; then
        echo "Error: Cannot combine --current with other options"
        exit 1
      fi
      SHOW_CURRENT=true
      shift
      ;;
    --force)
      if [[ "$SHOW_CURRENT" == true ]]; then
        echo "Error: Cannot use --force with --current"
        exit 1
      fi
      FORCE=true
      shift
      ;;
    --no-changelog)
      UPDATE_CHANGELOG=false
      shift
      ;;
    --no-build)
      BUILD_PROJECT=false
      shift
      ;;
    --no-tests)
      RUN_TESTS=false
      shift
      ;;
    --help)
      show_help
      ;;
    *)
      echo "Error: Unknown option $1"
      show_help
      exit 1
      ;;
  esac
done

# Default to patch if no version option specified
if [[ -z "$INCREMENT" && "$SHOW_CURRENT" == false ]]; then
  INCREMENT="patch"
fi

# Pre-release checks
if [[ "$SHOW_CURRENT" == false ]]; then
  echo "🔍 LifeSmart Calculator Release Manager"
  echo "======================================"
  echo ""

  # Run tests if enabled
  if [[ "$RUN_TESTS" == true ]]; then
    run_tests
    echo ""
  fi

  # Build project if enabled
  if [[ "$BUILD_PROJECT" == true ]]; then
    build_project
    echo ""
  fi
fi

# Always sync with remote tags first
echo "🔄 Syncing with remote tags..."
git fetch --tags --force >/dev/null 2>&1

# Get current commit hash
CURRENT_COMMIT=$(git rev-parse HEAD)

# Get latest tag from remote
LATEST_TAG=$(git ls-remote --tags --refs --sort=-v:refname origin | head -n 1 | sed 's/.*\///')

# Show current tag if requested
if [[ "$SHOW_CURRENT" == true ]]; then
  if [[ -z "$LATEST_TAG" ]]; then
    echo "No releases found"
    exit 0
  fi

  TAG_COMMIT=$(git ls-remote origin refs/tags/"$LATEST_TAG" | cut -f 1)
  echo "Latest release tag: $LATEST_TAG"
  echo "Tag points to commit: $TAG_COMMIT"
  echo "Current commit: $CURRENT_COMMIT"

  if [[ "$TAG_COMMIT" == "$CURRENT_COMMIT" ]]; then
    echo "Status: Current commit is tagged"
  else
    echo "Status: Current commit is not tagged"
  fi
  exit 0
fi

# Handle set-tag mode
if [[ "$INCREMENT" == "set" ]]; then
  NEW_TAG="$SET_TAG"
  echo "Setting tag directly to: $NEW_TAG"
else
  # Set default version if no tags exist
  if [[ -z "$LATEST_TAG" ]]; then
    LATEST_TAG="v0.0.0"
    echo "No existing tags found. Starting from v0.0.0"
  else
    echo "Current release tag: $LATEST_TAG"
  fi

  # Extract version numbers
  CLEAN_TAG=${LATEST_TAG#v}
  MAJOR=$(echo "$CLEAN_TAG" | cut -d. -f1)
  MINOR=$(echo "$CLEAN_TAG" | cut -d. -f2)
  PATCH=$(echo "$CLEAN_TAG" | cut -d. -f3 | sed 's/-.*//') # Remove any suffixes

  # Increment version based on selection
  case $INCREMENT in
    major)
      MAJOR=$((MAJOR + 1))
      MINOR=0
      PATCH=0
      ;;
    minor)
      MINOR=$((MINOR + 1))
      PATCH=0
      ;;
    patch)
      PATCH=$((PATCH + 1))
      ;;
  esac

  # Construct new tag
  NEW_TAG="v${MAJOR}.${MINOR}.${PATCH}"

  # Append custom name if provided
  if [[ -n "$NAME" ]]; then
    SANITIZED_NAME=$(echo "$NAME" | tr -cd '[:alnum:]-' | tr ' ' '-')
    NEW_TAG="${NEW_TAG}-${SANITIZED_NAME}"
  fi
fi

# Check if tag already exists locally or remotely
echo "Checking for existing tags..."
EXISTING_REMOTE=$(git ls-remote origin "refs/tags/${NEW_TAG}")
EXISTING_LOCAL=$(git tag -l "$NEW_TAG")

# Delete existing tags if found
if [[ -n "$EXISTING_REMOTE" || -n "$EXISTING_LOCAL" ]]; then
  echo "Tag $NEW_TAG already exists - deleting old version"

  # Delete remote tag
  if [[ -n "$EXISTING_REMOTE" ]]; then
    echo "Deleting remote tag: $NEW_TAG"
    git push --delete origin "$NEW_TAG" >/dev/null 2>&1 || true
  fi

  # Delete local tag
  if [[ -n "$EXISTING_LOCAL" ]]; then
    echo "Deleting local tag: $NEW_TAG"
    git tag -d "$NEW_TAG" >/dev/null 2>&1 || true
  fi
fi

# Check if current commit is already tagged
if [[ -n "$LATEST_TAG" ]]; then
  TAG_COMMIT=$(git ls-remote origin refs/tags/"$LATEST_TAG" | cut -f 1)
  if [[ "$TAG_COMMIT" == "$CURRENT_COMMIT" && "$FORCE" == false ]]; then
    echo "Error: Current commit is already tagged as $LATEST_TAG"
    echo "Use --force to create a new tag on this commit"
    exit 1
  fi
fi

# Update CHANGELOG.md if enabled
if [[ "$UPDATE_CHANGELOG" == true ]]; then
  update_changelog "$NEW_TAG"

  # Stage the updated CHANGELOG.md
  git add CHANGELOG.md
  echo "✅ CHANGELOG.md staged for commit"
fi

# Create and push new tag
echo "Creating new tag: $NEW_TAG"
git tag "$NEW_TAG" && git push origin "$NEW_TAG"

if [[ $? -eq 0 ]]; then
  echo "🎉 LifeSmart Calculator Release Created Successfully!"
  echo "=================================================="
  echo "📦 Release Tag: $NEW_TAG"
  echo "📝 Tag URL: https://github.com/$(git remote get-url origin | sed -E 's/.*[:/]([^/]+\/[^/]+)\.git.*/\1/')/releases/tag/$NEW_TAG"
  echo ""
  echo "🚀 What's included in this release:"
  echo "   ✅ Credit Card Interest Calculator"
  echo "   ✅ SPZero Comparison Tool"
  echo "   ✅ Interactive Investment Growth Chart"
  echo "   ✅ Professional PWA-ready interface"
  echo "   ✅ TypeScript + Tailwind CSS + Chart.js"
  echo ""

  if [[ "$UPDATE_CHANGELOG" == true ]]; then
    echo "📋 Smart Changelog System:"
    echo "   ✅ CHANGELOG.md has been updated with smart categorization"
    echo "   ✅ Commits automatically sorted into meaningful sections"
    echo "   ✅ Professional formatting with emojis and clear structure"
    echo ""
    echo "💡 Next steps:"
    echo "   1. Review the updated CHANGELOG.md"
    echo "   2. Commit the changelog changes:"
    echo "      git commit -m 'docs: update changelog for $NEW_TAG'"
    echo "   3. Push the commit: git push"
    echo "   4. Deploy to production:"
    echo "      - The build/ folder contains production-ready files"
    echo "      - Deploy to your hosting platform (Netlify, Vercel, etc.)"
    echo "      - Update your domain DNS if needed"
  fi

  echo ""
  echo "🌟 LifeSmart Calculator is ready for the world!"
else
  echo "❌ Error: Failed to create tag"
  exit 1
fi
