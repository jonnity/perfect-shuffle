# 技術スタックとツール

## システム環境
- **OS**: Linux (WSL2環境)
- **ランタイム**: Node.js + npm

## フロントエンド技術スタック
- **React 18+**: UIライブラリ（関数コンポーネント + フック）
- **TypeScript**: 型安全な開発（strict モード有効）
- **Vite**: ビルドツール（Create React Appではなく、Viteを使用）
- **Tailwind CSS 4.0-beta**: ユーティリティファーストのスタイリング
- **React Router v6**: シングルページアプリケーションのルーティング

## 状態管理
- **React Context API**: グローバル状態管理
- **LocalStorage**: カード枚数の永続化（ブラウザ標準API）

## コード品質ツール
- **Biome**: 静的解析とコードフォーマッター
  - Linting: `biome check .`
  - Formatting: `biome format --write .`
  - 設定: `biome.json`（ダブルクオート、インデント2スペース、行幅100）

## テストツール
- **Vitest**: ユニット・統合テストフレームワーク
- **React Testing Library**: Reactコンポーネントのテスト
- **jsdom**: ブラウザ環境のシミュレーション

## デプロイ
- **Cloudflare Pages**: 静的サイトホスティング
- **Wrangler**: Cloudflareのデプロイツール

## 開発ツール
- **Git**: バージョン管理
- **GitHub**: リポジトリホスティング
- **VS Code**: 推奨エディタ
- **serena-mcp**: シンボリック検索と編集ツール

## 依存関係の重要ポイント
- React Router以外の外部依存は最小限に抑える
- バンドルサイズを小さく保つ（目標: 500KB未満）
- 標準的なWeb APIを優先的に使用（例: LocalStorage、Math.random()）