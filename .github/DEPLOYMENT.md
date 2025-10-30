# Deployment and CI/CD Setup

This document describes the GitHub Actions workflows and branching strategy for deploying Perfect Shuffle to Cloudflare Pages.

## Branching Strategy

The project uses the following branches:

- **`main`**: Protected production branch. Only version branches can be merged here.
- **`dev`**: Protected development branch. Feature branches are merged here for testing.
- **`v*.*.*`**: Version branches (e.g., `v1.0.0`, `v1.2.3`). Used for releases.
- **Feature branches**: Created for individual tasks, merged to `dev`.

## Workflows

### 1. Deploy to Cloudflare (`deploy.yml`)

**Trigger**: Push to `main` branch

**Behavior**:
- Checks if the push is from a version branch merge
- Only deploys if the merge came from a version branch (matching pattern `v*.*.*`)
- Builds the project with `npm run build`
- Deploys the `dist` folder to Cloudflare Pages
- Creates a GitHub release with the version tag

**Required Secrets**:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Pages write permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

### 2. Check PR to Main (`check-pr.yml`)

**Trigger**: Pull request opened/updated to `main` branch

**Behavior**:
- Checks if the source branch is a version branch (matches `v*.*.*` pattern)
- **If NOT a version branch**: Automatically closes the PR with a comment explaining the policy
- **If IS a version branch**: Adds a comment confirming the PR will trigger deployment

## Setup Instructions

### 1. Create Cloudflare Pages Project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** > **Create application** > **Pages**
3. Create a project named `perfect-shuffle`
4. Note: Don't connect the Git repository - we'll deploy via GitHub Actions

### 2. Get Cloudflare Credentials

1. **API Token**: Go to **My Profile** > **API Tokens** > **Create Token**
   - Use the "Edit Cloudflare Workers" template
   - Or create a custom token with "Cloudflare Pages:Edit" permission

2. **Account ID**: Found in the URL when viewing your Cloudflare dashboard
   - Format: `https://dash.cloudflare.com/<ACCOUNT_ID>`

### 3. Configure GitHub Secrets

Go to your repository **Settings** > **Secrets and variables** > **Actions** and add:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### 4. Protect Branches

Go to **Settings** > **Branches** and add branch protection rules:

**For `main`**:
- Require pull request before merging
- Require status checks to pass
- Do not allow bypassing the above settings

**For `dev`**:
- Require pull request before merging
- Require status checks to pass

## Release Workflow

1. **Feature Development**:
   ```bash
   git checkout dev
   git checkout -b feature/my-feature
   # Make changes
   git push origin feature/my-feature
   # Create PR to dev
   ```

2. **Testing on Dev**:
   - Merge feature branches to `dev`
   - Test thoroughly

3. **Create Release**:
   ```bash
   git checkout dev
   git checkout -b v1.0.0
   # Update version in package.json if needed
   git push origin v1.0.0
   # Create PR to main
   ```

4. **Deploy**:
   - Merge the version branch PR to `main`
   - GitHub Actions automatically:
     - Deploys to Cloudflare Pages
     - Creates a GitHub release with tag `v1.0.0`

## Notes

- Non-version branch PRs to `main` will be automatically closed
- Only merges from version branches trigger deployments
- The version branch name should follow semantic versioning (e.g., `v1.0.0`, `v2.1.3`)
