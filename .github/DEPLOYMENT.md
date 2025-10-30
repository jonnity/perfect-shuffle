# デプロイとCI/CDセットアップ

このドキュメントは、Perfect ShuffleをCloudflare Pagesにデプロイするための、GitHub Actionsワークフローとブランチ戦略について説明します。

## ブランチ戦略

プロジェクトでは以下のブランチを使用します：

- **`main`**: 保護された本番ブランチ。バージョンブランチのみがマージ可能です。
- **`dev`**: 保護された開発ブランチ。機能ブランチはここにマージしてテストします。
- **`v*.*.*`**: バージョンブランチ（例：`v1.0.0`、`v1.2.3`）。リリースに使用します。
- **機能ブランチ**: 個別のタスクごとに作成し、`dev`にマージします。

## ワークフロー

### 1. Cloudflareへのデプロイ (`deploy.yml`)

**トリガー**: `main`ブランチへのプッシュ

**動作**:
- プッシュがバージョンブランチからのマージかどうかをチェック
- バージョンブランチ（`v*.*.*`パターンに一致）からのマージの場合のみデプロイ
- `npm run build`でプロジェクトをビルド
- `dist`フォルダをCloudflare Pagesにデプロイ
- バージョンタグでGitHubリリースを作成

**必要なシークレット**:
- `CLOUDFLARE_API_TOKEN`: Pages書き込み権限を持つCloudflare APIトークン
- `CLOUDFLARE_ACCOUNT_ID`: CloudflareアカウントID
- `GITHUB_TOKEN`: GitHub Actionsにより自動提供

### 2. mainへのPRチェック (`check-pr.yml`)

**トリガー**: `main`ブランチへのプルリクエストの作成・更新

**動作**:
- ソースブランチがバージョンブランチ（`v*.*.*`パターン）かどうかをチェック
- **バージョンブランチでない場合**: ポリシーを説明するコメントと共にPRを自動クローズ
- **バージョンブランチの場合**: PRがデプロイをトリガーすることを確認するコメントを追加

## セットアップ手順

### 1. Cloudflare Pagesプロジェクトの作成

1. [Cloudflareダッシュボード](https://dash.cloudflare.com/)にログイン
2. **Workers & Pages** > **Create application** > **Pages**に移動
3. `perfect-shuffle`という名前でプロジェクトを作成
4. 注意: Gitリポジトリは接続しないでください - GitHub Actions経由でデプロイします

### 2. Cloudflare認証情報の取得

1. **APIトークン**: **My Profile** > **API Tokens** > **Create Token**に移動
   - "Edit Cloudflare Workers"テンプレートを使用
   - または"Cloudflare Pages:Edit"権限でカスタムトークンを作成

2. **アカウントID**: Cloudflareダッシュボードを表示したときのURLで確認できます
   - フォーマット: `https://dash.cloudflare.com/<ACCOUNT_ID>`

### 3. GitHubシークレットの設定

リポジトリの **Settings** > **Secrets and variables** > **Actions**に移動し、以下を追加：

- `CLOUDFLARE_API_TOKEN`: Cloudflare APIトークン
- `CLOUDFLARE_ACCOUNT_ID`: CloudflareアカウントID

### 4. ブランチ保護の設定

**Settings** > **Branches**に移動し、ブランチ保護ルールを追加：

**`main`の場合**:
- マージ前にプルリクエストを要求
- ステータスチェックの合格を要求
- 上記設定のバイパスを許可しない

**`dev`の場合**:
- マージ前にプルリクエストを要求
- ステータスチェックの合格を要求

## リリースワークフロー

1. **機能開発**:
   ```bash
   git checkout dev
   git checkout -b feature/my-feature
   # 変更を加える
   git push origin feature/my-feature
   # devへのPRを作成
   ```

2. **Devでのテスト**:
   - 機能ブランチを`dev`にマージ
   - 徹底的にテスト

3. **リリース作成**:
   ```bash
   git checkout dev
   git checkout -b v1.0.0
   # 必要に応じてpackage.jsonのバージョンを更新
   git push origin v1.0.0
   # mainへのPRを作成
   ```

4. **デプロイ**:
   - バージョンブランチのPRを`main`にマージ
   - GitHub Actionsが自動的に：
     - Cloudflare Pagesにデプロイ
     - タグ`v1.0.0`でGitHubリリースを作成

## 注意事項

- バージョンブランチでないPRが`main`に作成された場合、自動的にクローズされます
- バージョンブランチからのマージのみがデプロイをトリガーします
- バージョンブランチ名はセマンティックバージョニングに従う必要があります（例：`v1.0.0`、`v2.1.3`）
