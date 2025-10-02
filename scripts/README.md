# Scripts Directory

This directory contains automation scripts for the LifeSmart Calculator project.

## Files

### `update_changelog.py`

A smart changelog generator that automatically creates meaningful changelog entries from git commits.

**Features:**
- ✨ **Smart categorization** - Automatically categorizes commits by type
- 📊 **Commit statistics** - Shows insertion/deletion counts
- 🎨 **Professional formatting** - Beautiful emoji-based sections
- 🔍 **Conventional commits** - Supports conventional commit format
- 📅 **Automatic dating** - Extracts commit dates for releases

**Usage:**
```bash
# Update changelog for a specific release
python scripts/update_changelog.py v1.2.3

# Or use the release script (recommended)
./release.sh --minor
```

**Commit Types Supported:**
- `feat:` - New features and enhancements
- `fix:` - Bug fixes and improvements
- `docs:` - Documentation updates
- `style:` - Code style and formatting changes
- `refactor:` - Code refactoring and restructuring
- `perf:` - Performance improvements
- `test:` - Test additions and improvements
- `chore:` - Maintenance tasks and chores
- `security:` - Security improvements
- `build:` - Build system changes
- `ci:` - CI/CD pipeline changes
- `revert:` - Reverted changes
- `remove:` - Removed features and cleanup
- `deps:` - Dependency updates

**Requirements:**
- Python 3.6+
- Git repository with commit history
- Proper git configuration

## Integration

This script is automatically called by the `release.sh` script when creating new releases. It ensures that every release has a properly formatted changelog entry with categorized changes.

## Examples

The script will automatically:
1. Analyze all commits since the last release
2. Categorize them by type and impact
3. Format them with emojis and statistics
4. Insert them into the CHANGELOG.md file
5. Maintain proper chronological order

This creates professional, readable changelogs that users and developers can easily understand.
