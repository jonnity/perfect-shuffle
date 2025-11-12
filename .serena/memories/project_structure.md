# プロジェクト構造

このドキュメントは、Perfect Shuffle プロジェクトのディレクトリ構造と各ファイルの役割を説明します。

## ルートディレクトリ構造

```
perfect-shuffle/
├── src/                    # ソースコード
├── dist/                   # ビルド出力（.gitignoreで無視）
├── node_modules/           # npmパッケージ（.gitignoreで無視）
├── .spec-workflow/         # プロジェクト仕様書
├── .claude/               # Claude Code設定
├── .github/               # GitHub設定（CI/CDなど）
├── .devcontainer/         # Dev Container設定
├── .git/                  # Gitリポジトリ
├── .serena/               # serena-mcp設定
├── index.html             # HTMLエントリポイント
├── package.json           # npm依存関係とスクリプト
├── package-lock.json      # npm依存関係ロック
├── tsconfig.json          # TypeScript設定（ルート）
├── tsconfig.app.json      # TypeScript設定（アプリ用）
├── tsconfig.node.json     # TypeScript設定（Node.js用）
├── vite.config.ts         # Vite設定
├── biome.json             # Biome設定（Lint/Format）
├── wrangler.toml          # Cloudflare設定
├── CLAUDE.md              # Claude Code向けガイドライン
└── .gitignore             # Git除外設定
```

## src/ ディレクトリ構造（詳細）

```
src/
├── features/              # 機能単位のディレクトリ
│   ├── card-setup/       # カード枚数設定機能
│   │   ├── components/
│   │   │   ├── CardCountSelector.tsx       # +/-ボタンで枚数調整
│   │   │   ├── CardCountSelector.test.tsx  # 単体テスト
│   │   │   ├── QuickSelectButtons.tsx      # 40/60/99クイック選択
│   │   │   └── QuickSelectButtons.test.tsx # 単体テスト
│   │   ├── hooks/
│   │   │   ├── useCardCount.ts             # カード枚数管理フック
│   │   │   └── useCardCount.test.ts        # 単体テスト
│   │   └── HomePage.tsx                    # カード設定画面（ルート: /）
│   ├── shuffle/          # シャッフル機能
│   │   ├── components/
│   │   │   ├── ShuffleDisplay.tsx          # 「○枚目を置いて」表示（未実装）
│   │   │   └── ProgressIndicator.tsx       # 進捗表示（未実装）
│   │   ├── hooks/
│   │   │   └── useShuffle.ts               # シャッフルロジック（未実装）
│   │   └── ShufflePage.tsx                 # シャッフル画面（未実装）
│   └── complete/         # 完了画面機能
│       └── CompletePage.tsx                # 完了画面（未実装）
├── shared/               # 共有コンポーネント・ユーティリティ
│   ├── components/
│   │   └── Footer.tsx                      # フッター（未実装）
│   ├── hooks/
│   │   ├── useLocalStorage.ts              # LocalStorage抽象化フック
│   │   └── useLocalStorage.test.ts         # 単体テスト
│   └── utils/
│       ├── fisherYatesShuffle.ts           # フィッシャー-イェーツアルゴリズム
│       ├── fisherYatesShuffle.test.ts      # 単体テスト
│       ├── validateCardCount.ts            # カード枚数バリデーション
│       └── validateCardCount.test.ts       # 単体テスト
├── types/                # TypeScript型定義
│   └── index.ts                            # 共通型定義
├── App.tsx               # ルートコンポーネント（未完成）
├── main.tsx              # エントリポイント
├── index.css             # グローバルCSS（Tailwind含む）
└── vite-env.d.ts         # Vite型定義
```

## 主要ファイルの役割

### エントリポイント
- **src/main.tsx**: Reactアプリケーションのブートストラップ
- **index.html**: HTMLテンプレート、Viteがsrc/main.tsxを読み込む

### ルーティング
- **src/App.tsx**: React Routerでルート設定
  - `/` → HomePage（カード設定）
  - `/shuffle` → ShufflePage（シャッフル表示）
  - `/complete` → CompletePage（完了）

### 機能別ディレクトリ
- **features/card-setup/**: カード枚数設定に関するすべてのコード
- **features/shuffle/**: シャッフル表示に関するすべてのコード
- **features/complete/**: 完了画面に関するすべてのコード

### 共有コード
- **shared/components/**: すべての画面で使用されるコンポーネント（Footer）
- **shared/hooks/**: 複数の機能で使用されるカスタムフック
- **shared/utils/**: ビジネスロジックやアルゴリズム

### 型定義
- **types/index.ts**: アプリケーション全体で使用される型定義
  - CardCount型
  - ShuffleResult インターフェース
  - ShuffleState インターフェース
  - 定数（MIN_CARD_COUNT, MAX_CARD_COUNT, etc.）

## 設計原則

### 機能ベース構成（Feature-Based Organization）
- 機能ごとにディレクトリを分割
- 関連するコンポーネント・フック・ユーティリティをまとめる
- 機能の追加・削除が容易

### 責務分離（Separation of Concerns）
- **Pages**: ページレベルのコンポーネント（ルーティング対象）
- **Components**: 再利用可能なUIコンポーネント
- **Hooks**: 状態管理とビジネスロジック
- **Utils**: 純粋関数とアルゴリズム
- **Types**: 型定義

### Single File Responsibility
- 各ファイルは単一の責務を持つ
- テストファイルは対象ファイルと同じディレクトリまたは`__tests__/`配下

## 命名規則

### ファイル名
- コンポーネント: `PascalCase.tsx`（例: `CardCountSelector.tsx`）
- フック: `useCamelCase.ts`（例: `useCardCount.ts`）
- ユーティリティ: `camelCase.ts`（例: `fisherYatesShuffle.ts`）
- テスト: `*.test.ts`または`*.test.tsx`

### ディレクトリ名
- 機能: `kebab-case`（例: `card-setup`）
- 種類: `kebab-case`（例: `components`, `hooks`, `utils`）

## 実装状況（2025-11現在）

### 実装済み
- ✅ プロジェクトセットアップ
- ✅ 型定義（types/index.ts）
- ✅ ユーティリティ（fisherYatesShuffle, validateCardCount）
- ✅ useLocalStorage フック
- ✅ useCardCount フック
- ✅ CardCountSelector コンポーネント
- ✅ QuickSelectButtons コンポーネント
- ✅ テスト（ユーティリティとフック）

### 未実装
- ⬜ HomePage（一部実装、統合が必要）
- ⬜ ShufflePage
- ⬜ CompletePage
- ⬜ Footer コンポーネント
- ⬜ App.tsx（ルーティング設定）
- ⬜ 統合テスト

## 参考
詳細な仕様は `.spec-workflow/specs/perfect-shuffle/` 配下を参照：
- `requirements.md`: 機能要件
- `design.md`: アーキテクチャと技術仕様
- `tasks.md`: 実装タスク一覧