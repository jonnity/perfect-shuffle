# Perfect Shuffle

Perfect Shuffleは、トレーディングカードゲームのプレイヤーがデッキをランダムにシャッフルする際に使用するWebアプリケーションです。フィッシャー-イェーツアルゴリズムを用いて公平なシャッフル順序を生成し、プレイヤーに「手元のカードの何枚目を次に置くか」を順次指示することで、物理的なカードを正確にシャッフルできるようにします。

## 主な機能

- **カード枚数設定**: 1〜99枚のカードに対応し、よく使う枚数（40, 60, 99）のクイック選択も可能
- **公平なシャッフル**: フィッシャー-イェーツアルゴリズムによる数学的に公平なランダムシャッフル
- **直感的な表示**: 大きな文字で「上から○枚目を置いて」と順次指示
- **進捗管理**: 現在の進捗を「X/N」形式で表示
- **設定の保存**: 前回使用した枚数をLocalStorageに保存し、次回訪問時に自動設定
- **モバイルフレンドリー**: スマートフォン画面（375px幅）を基準に設計

## セットアップ手順

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

1. リポジトリをクローン:

```bash
git clone <repository-url>
cd perfect-shuffle
```

2. 依存パッケージをインストール:

```bash
npm install
```

3. 開発サーバーを起動:

```bash
npm run dev
```

4. ブラウザで `http://localhost:5173` を開く

## 利用可能なスクリプト

### 開発

```bash
npm run dev
```

開発サーバーを起動します（ホットリロード対応）。

### ビルド

```bash
npm run build
```

本番用にアプリケーションをビルドします。TypeScriptのコンパイルとViteによる最適化が実行されます。

### リント

```bash
npm run lint
```

Biomeを使用してコードの静的解析を実行します。コーディング規約違反や潜在的な問題を検出します。

### フォーマット

```bash
npm run format
```

Biomeを使用してコードを自動整形します。統一されたコードスタイルを維持します。

### テスト

```bash
npm run test
```

Vitestを使用してユニットテストと統合テストを実行します。

### プレビュー

```bash
npm run preview
```

ビルド後のアプリケーションをローカルでプレビューします。

## プロジェクト構造

```
perfect-shuffle/
├── src/
│   ├── features/           # 機能単位のディレクトリ
│   │   ├── card-setup/    # カード枚数設定機能
│   │   │   ├── components/
│   │   │   │   ├── CardCountSelector.tsx
│   │   │   │   └── QuickSelectButtons.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useCardCount.ts
│   │   │   └── HomePage.tsx
│   │   ├── shuffle/       # シャッフル機能
│   │   │   ├── components/
│   │   │   │   ├── ShuffleDisplay.tsx
│   │   │   │   └── ProgressIndicator.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useShuffle.ts
│   │   │   └── ShufflePage.tsx
│   │   └── complete/      # 完了画面機能
│   │       └── CompletePage.tsx
│   ├── shared/            # 共有コンポーネント・ユーティリティ
│   │   ├── components/
│   │   │   └── Footer.tsx
│   │   ├── hooks/
│   │   │   └── useLocalStorage.ts
│   │   └── utils/
│   │       ├── fisherYatesShuffle.ts
│   │       └── validateCardCount.ts
│   ├── types/             # TypeScript型定義
│   │   └── index.ts
│   ├── App.tsx            # ルートコンポーネント
│   └── main.tsx           # エントリーポイント
├── public/                # 静的ファイル
└── .spec-workflow/        # プロジェクト仕様
```

### アーキテクチャの特徴

- **機能ベースの構成**: 関連するコンポーネント、フック、ページを機能ごとにまとめて管理
- **単一責任の原則**: 各モジュールは明確な単一の責務を持つ
- **型安全性**: TypeScript strict モードを使用し、型の安全性を確保
- **テスタビリティ**: ビジネスロジックとUIを分離し、テストしやすい構造

## エンドユーザー向け使用手順

### 1. カード枚数を設定

アプリケーションを開くと、カード枚数設定画面が表示されます。

- **+/-ボタン**: 1枚ずつ増減（1〜99枚の範囲）
- **クイック選択**: 40枚、60枚、99枚のボタンで即座に設定
- デフォルトは60枚、前回使用した枚数がある場合はその値が表示されます

### 2. シャッフルを開始

「スタート」ボタンをクリックすると、シャッフルが開始されます。

### 3. カードを配置

画面に「上から○枚目を置いて」と表示されます。

1. 手元のカード束の上から指定された枚数目のカードを取り出す
2. そのカードを新しい束の上に置く
3. 画面をタップまたはクリックして次の指示を表示
4. すべてのカードを置き終わるまで繰り返す

### 4. シャッフル完了

すべてのカードを配置すると、完了画面が表示されます。「ホームに戻る」ボタンで最初の画面に戻ります。

### 途中で中断したい場合

シャッフル画面左上の「中断」ボタンをクリックすると、カード枚数設定画面に戻ります。

## 技術スタック

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (beta)
- **Routing**: React Router v6
- **State Management**: React Context API + LocalStorage
- **Linting/Formatting**: Biome
- **Testing**: Vitest + React Testing Library

## アクセシビリティ

- WCAG AA基準（コントラスト比 4.5:1以上）を満たす色設計
- キーボード操作に対応
- 最小44pxのタッチターゲットサイズを確保
- スクリーンリーダー対応（aria-label付与）

## ブラウザ対応

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## ライセンス

© jonnity 2025

## 開発者向け情報

### コーディング規約

詳細な仕様は `.spec-workflow/specs/perfect-shuffle/` ディレクトリを参照してください：

- `requirements.md`: 機能要件とユーザーストーリー
- `design.md`: アーキテクチャ、コンポーネント設計、技術仕様
- `tasks.md`: 実装タスクのリストと進捗管理

### 品質保証

コミット前に以下のコマンドを実行して品質を確保してください：

```bash
npm run format  # コードフォーマット
npm run lint    # 静的解析
npm run test    # テスト実行
```

### コントリビューション

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。
