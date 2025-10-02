#!/usr/bin/env python3
"""
Smart Changelog Generator for LifeSmart Calculator
Automatically generates meaningful changelog entries from git commits
"""

import os
import re
import subprocess
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

# Commit type patterns and their emojis
COMMIT_TYPES = {
    'feat': ('✨ Added', 'New features and enhancements'),
    'fix': ('🐛 Fixed', 'Bug fixes and improvements'),
    'docs': ('📚 Documentation', 'Documentation updates'),
    'style': ('🎨 Changed', 'Code style and formatting changes'),
    'refactor': ('🔧 Changed', 'Code refactoring and restructuring'),
    'perf': ('🚀 Performance', 'Performance improvements'),
    'test': ('🧪 Testing', 'Test additions and improvements'),
    'chore': ('🔧 Changed', 'Maintenance tasks and chores'),
    'security': ('🛡️ Security', 'Security improvements'),
    'build': ('🔧 Changed', 'Build system changes'),
    'ci': ('🔧 Changed', 'CI/CD pipeline changes'),
    'revert': ('🔄 Changed', 'Reverted changes'),
    'remove': ('🗑️ Removed', 'Removed features and cleanup'),
    'deps': ('📦 Changed', 'Dependency updates'),
}

def run_git_command(command: List[str]) -> str:
    """Run a git command and return the output with proper encoding handling"""
    try:
        # Set environment variables for better encoding handling on Windows
        env = os.environ.copy()
        env['PYTHONIOENCODING'] = 'utf-8'

        # Use text=True and encoding='utf-8' for better cross-platform compatibility
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            encoding='utf-8',
            env=env,
            errors='replace'  # Replace problematic characters instead of failing
        )

        if result.returncode != 0:
            print(f"Warning: Git command returned non-zero exit code: {result.returncode}")
            if result.stderr:
                print(f"Git stderr: {result.stderr}")
            return ""

        return result.stdout.strip() if result.stdout else ""

    except subprocess.CalledProcessError as e:
        print(f"Error running git command: {e}")
        return ""
    except Exception as e:
        print(f"Unexpected error running git command: {e}")
        return ""

def get_commit_stats(commit_hash: str) -> Tuple[int, int]:
    """Get insertion and deletion stats for a specific commit."""
    try:
        # Get the short stats for the commit
        stats = run_git_command(['git', 'show', '--shortstat', commit_hash])
        if not stats:
            return 0, 0

        # Parse the stats line (e.g., " 2 files changed, 15 insertions(+), 3 deletions(-)")
        lines = stats.strip().split('\n')
        stats_line = None

        # Find the line with file changes
        for line in lines:
            if 'files changed' in line or 'file changed' in line:
                stats_line = line
                break

        if not stats_line:
            return 0, 0

        # Extract insertions and deletions using regex
        insertions = 0
        deletions = 0

        # Look for patterns like "15 insertions(+)" or "15 insertions"
        insert_match = re.search(r'(\d+)\s+insertions?', stats_line)
        if insert_match:
            insertions = int(insert_match.group(1))

        # Look for patterns like "3 deletions(-)" or "3 deletions"
        delete_match = re.search(r'(\d+)\s+deletions?', stats_line)
        if delete_match:
            deletions = int(delete_match.group(1))

        return insertions, deletions

    except Exception as e:
        print(f"Warning: Could not get stats for commit {commit_hash}: {e}")
        return 0, 0

def get_commits_for_tag(tag: str) -> List[Dict]:
    """Get all commits up to a specific tag with detailed information"""
    try:
        # Get the commit hash for this tag
        tag_hash = run_git_command(['git', 'rev-parse', tag])
        if not tag_hash:
            print(f"Warning: Could not find commit hash for tag: {tag}")
            return []

        # Get commits from the beginning up to this tag
        format_str = "%H|%s|%an|%ad|%b"
        commits = run_git_command(['git', 'log', '--pretty=format:' + format_str, '--reverse', tag_hash])

        if not commits:
            print(f"Warning: No git output received for tag: {tag}")
            return []

        commit_list = []
        for commit in commits.split('\n'):
            if commit.strip():
                parts = commit.split('|', 4)
                if len(parts) >= 5:
                    # Get commit stats
                    insertions, deletions = get_commit_stats(parts[0])

                    commit_list.append({
                        'hash': parts[0],
                        'message': parts[1],
                        'author': parts[2],
                        'date': parts[3],
                        'body': parts[4] if len(parts) > 4 else '',
                        'insertions': insertions,
                        'deletions': deletions
                    })

        return commit_list

    except Exception as e:
        print(f"Error processing commits for tag {tag}: {e}")
        return []

def get_commits_between_tags(from_tag: str, to_tag: str) -> List[Dict]:
    """Get commits between two tags"""
    try:
        if not from_tag:
            # If no from_tag, get all commits up to to_tag
            return get_commits_for_tag(to_tag)

        # Get commit hashes for both tags
        from_hash = run_git_command(['git', 'rev-parse', from_tag])
        to_hash = run_git_command(['git', 'rev-parse', to_tag])

        if not from_hash or not to_hash:
            print(f"Warning: Could not find commit hashes for tags: {from_tag} or {to_tag}")
            return []

        # Use the range notation to get commits between tags (exclusive of from_tag, inclusive of to_tag)
        format_str = "%H|%s|%an|%ad|%b"
        commits = run_git_command(['git', 'log', '--pretty=format:' + format_str, '--reverse', f'{from_hash}..{to_hash}'])

        if not commits:
            return []

        commit_list = []
        for commit in commits.split('\n'):
            if commit.strip():
                parts = commit.split('|', 4)
                if len(parts) >= 5:
                    # Get commit stats
                    insertions, deletions = get_commit_stats(parts[0])

                    commit_list.append({
                        'hash': parts[0],
                        'message': parts[1],
                        'author': parts[2],
                        'date': parts[3],
                        'body': parts[4] if len(parts) > 4 else '',
                        'insertions': insertions,
                        'deletions': deletions
                    })

        return commit_list

    except Exception as e:
        print(f"Error processing commits between tags {from_tag} and {to_tag}: {e}")
        return []

def get_commit_date(tag: str) -> str:
    """Get the commit date for a given tag"""
    try:
        date_str = run_git_command(['git', 'show', '-s', '--format=%ci', tag])
        if date_str:
            # Parse the date and return YYYY-MM-DD format
            try:
                dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                return dt.strftime("%Y-%m-%d")
            except:
                return "Unknown"
        return "Unknown"
    except Exception as e:
        print(f"Error getting date for tag {tag}: {e}")
        return "Unknown"

def categorize_commit(commit_data: Dict) -> Tuple[str, str, str]:
    """Categorize a commit message and return (type, emoji, description)"""
    message = commit_data['message'].lower()

    # Check for conventional commit format
    for commit_type, (emoji, description) in COMMIT_TYPES.items():
        if message.startswith(f'{commit_type}:'):
            return commit_type, emoji, description

    # Check for common patterns in the message
    if any(word in message for word in ['add', 'new', 'feature', 'implement', 'create', 'introduce', 'calculator', 'chart']):
        return 'feat', '✨ Added', 'New features and enhancements'
    elif any(word in message for word in ['fix', 'bug', 'issue', 'error', 'resolve', 'crash']):
        return 'fix', '🐛 Fixed', 'Bug fixes and improvements'
    elif any(word in message for word in ['doc', 'readme', 'comment', 'changelog', 'update readme']):
        return 'docs', '📚 Documentation', 'Documentation updates'
    elif any(word in message for word in ['style', 'format', 'indent', 'ui', 'ux', 'css', 'styling', 'tailwind']):
        return 'style', '🎨 Changed', 'Code style and formatting changes'
    elif any(word in message for word in ['refactor', 'restructure', 'clean', 'optimize', 'enhance']):
        return 'refactor', '🔧 Changed', 'Code refactoring and restructuring'
    elif any(word in message for word in ['perf', 'performance', 'speed', 'optimize']):
        return 'perf', '🚀 Performance', 'Performance improvements'
    elif any(word in message for word in ['test', 'spec', 'coverage', 'testing']):
        return 'test', '🧪 Testing', 'Test additions and improvements'
    elif any(word in message for word in ['security', 'vulnerability', 'auth', 'protect']):
        return 'security', '🛡️ Security', 'Security improvements'
    elif any(word in message for word in ['remove', 'delete', 'cleanup', 'deprecate', 'drop']):
        return 'remove', '🗑️ Removed', 'Removed features and cleanup'
    elif any(word in message for word in ['deps', 'dependency', 'package', 'npm', 'yarn', 'install']):
        return 'deps', '📦 Changed', 'Dependency updates'
    elif any(word in message for word in ['update', 'change', 'modify', 'improve', 'enhance']):
        return 'chore', '🔧 Changed', 'Maintenance tasks and chores'
    else:
        return 'chore', '🔧 Changed', 'Maintenance tasks and chores'

def clean_commit_message(message: str) -> str:
    """Clean up commit message for display"""
    # Remove conventional commit prefixes
    message = re.sub(r'^(feat|fix|docs|style|refactor|perf|test|chore|security|build|ci|revert|remove|deps):\s*', '', message, flags=re.IGNORECASE)

    # Remove common prefixes
    prefixes_to_remove = [
        'feat:', 'fix:', 'docs:', 'style:', 'refactor:', 'test:', 'chore:',
        'feat(', 'fix(', 'docs(', 'style(', 'refactor(', 'test(', 'chore('
    ]

    for prefix in prefixes_to_remove:
        if message.lower().startswith(prefix.lower()):
            message = message[len(prefix):].strip()
            break

    # Capitalize first letter
    if message:
        message = message[0].upper() + message[1:]

    return message

def format_commit_with_stats(message: str, insertions: int, deletions: int) -> str:
    """Format commit message with insertion/deletion stats."""
    clean_msg = clean_commit_message(message)

    # Create stats badge
    if insertions > 0 or deletions > 0:
        stats_parts = []
        if insertions > 0:
            stats_parts.append(f"+{insertions}")
        if deletions > 0:
            stats_parts.append(f"-{deletions}")

        stats_badge = f" `{', '.join(stats_parts)}`"
        return f"{clean_msg}{stats_badge}"
    else:
        return clean_msg

def generate_release_section(tag: str, commits: List[Dict], release_date: str) -> str:
    """Generate a changelog section for a specific release"""
    if not commits:
        return f"## [{tag}] - {release_date}\n\n### ✨ Added\n- N/A\n\n### 🔧 Changed\n- N/A\n\n### 🐛 Fixed\n- N/A\n\n---\n\n"

    # Categorize commits
    categorized = defaultdict(list)
    for commit in commits:
        commit_type, emoji, description = categorize_commit(commit)
        categorized[commit_type].append(commit)

    # Generate the release section
    section = f"## [{tag}] - {release_date}\n\n"

    # Add categorized changes
    for commit_type, (emoji, description) in COMMIT_TYPES.items():
        if commit_type in categorized:
            section += f"### {emoji} {description}\n"
            for commit in categorized[commit_type]:
                formatted_msg = format_commit_with_stats(
                    commit['message'],
                    commit.get('insertions', 0),
                    commit.get('deletions', 0)
                )
                section += f"- {formatted_msg}\n"
            section += "\n"

    # Add summary
    total_commits = len(commits)
    section += f"**Total Changes:** {total_commits} commits\n\n"

    section += "---\n\n"
    return section

def update_changelog_for_tag(new_tag: str):
    """Update changelog for a specific new tag"""
    print(f"🔍 Updating changelog for release: {new_tag}")

    # Get all existing tags
    tags_output = run_git_command(['git', 'tag', '--sort=-version:refname'])
    existing_tags = [tag.strip() for tag in tags_output.split('\n') if tag.strip()] if tags_output else []

    # Remove the new tag if it already exists in the list
    if new_tag in existing_tags:
        existing_tags.remove(new_tag)

    # Get commits since last tag (unreleased)
    if existing_tags:
        last_tag = existing_tags[0]
        unreleased_commits = get_commits_between_tags(last_tag, 'HEAD')
        print(f"Found {len(unreleased_commits)} commits since last tag: {last_tag}")
    else:
        unreleased_commits = get_commits_for_tag('HEAD')
        print(f"Found {len(unreleased_commits)} commits (first release)")

    # Get release date for new tag
    release_date = get_commit_date(new_tag)
    if release_date == "Unknown":
        release_date = datetime.now().strftime("%Y-%m-%d")

    # Generate release section for the new tag
    release_section = generate_release_section(new_tag, unreleased_commits, release_date)

    # Read existing changelog
    changelog_path = Path("CHANGELOG.md")
    if changelog_path.exists():
        with open(changelog_path, 'r', encoding='utf-8') as f:
            existing_content = f.read()
    else:
        existing_content = """# Changelog

All notable changes to the LifeSmart Calculator project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### ✨ Added
- N/A

### 🔧 Changed
- N/A

### 🐛 Fixed
- N/A

---

"""

    # Find the position to insert the new release
    unreleased_section_end = existing_content.find("---\n\n", existing_content.find("## [Unreleased]"))
    if unreleased_section_end == -1:
        # If no unreleased section found, append at the end
        new_content = existing_content + "\n" + release_section
    else:
        # Insert after the unreleased section
        insert_pos = unreleased_section_end + 6  # After "---\n\n"
        new_content = existing_content[:insert_pos] + release_section + existing_content[insert_pos:]

    # Write the updated changelog
    with open(changelog_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ CHANGELOG.md updated successfully!")
    print(f"   - Added release section for {new_tag}")
    print(f"   - Processed {len(unreleased_commits)} commits")
    print(f"   - Release date: {release_date}")

def main():
    """Main function"""
    if len(sys.argv) != 2:
        print("Usage: python update_changelog.py <tag>")
        print("Example: python update_changelog.py v1.2.3")
        sys.exit(1)

    new_tag = sys.argv[1]

    print("🚀 Smart Changelog Generator for LifeSmart Calculator")
    print(f"Updating changelog for release: {new_tag}")
    print()

    # Check if we're in a git repository
    if not run_git_command(['git', 'rev-parse', '--git-dir']):
        print("❌ Error: Not in a git repository")
        print("Please run this script from the root of your git repository.")
        sys.exit(1)

    # Check if there are any commits
    if not run_git_command(['git', 'log', '--oneline']):
        print("❌ Error: No commits found in repository")
        sys.exit(1)

    # Update the changelog for the specific tag
    update_changelog_for_tag(new_tag)

    print("\n📋 Changelog update complete!")
    print("You can now review the updated CHANGELOG.md file and commit it:")

if __name__ == "__main__":
    main()
