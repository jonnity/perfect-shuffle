# Claude Code ガイドライン for Perfect Shuffle

このドキュメントは、Perfect Shuffle プロジェクトで作業する際の Claude Code 向けのガイドラインです。

**重要: ユーザーとのコミュニケーションは日本語で行ってください。**

## Project Specifications

* `.spec-workflow/specs/perfect-shuffle` ディレクトリ内に仕様がまとめてあります
  * `requirements.md`: 機能要件とユーザーストーリー
  * `design.md`: アーキテクチャ、コンポーネント設計、技術仕様
  * `tasks.md`: 実装タスクのリストと進捗管理
  * **コーディング規約や技術標準も記載されているので、実装前に必ず確認してください**

## Available Tools

* **serena-mcp** が動作しています
  * コードベースのシンボリック検索や編集に活用できます
  * ファイル全体を読む前に、`get_symbols_overview` や `find_symbol` で効率的に情報を取得してください
  * 不必要にファイル全体を読まないよう注意してください

## Quality Assurance

タスクが完了したら、以下のコマンドを**必ず実施**して品質を担保してください:

```bash
npm run format  # コードフォーマット (Biome)
npm run test    # テスト実行 (Vitest)
npm run lint    # Lint チェック (Biome)
```

すべてのチェックが通過することを確認してから、コミットやPR作成を行ってください。

## Project Structure

```
perfect-shuffle/
├── src/
│   ├── features/           # 機能単位のディレクトリ
│   │   ├── card-setup/    # カード枚数設定機能
│   │   ├── shuffle/       # シャッフル機能
│   │   └── complete/      # 完了画面機能
│   ├── shared/            # 共有コンポーネント・ユーティリティ
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── types/             # TypeScript型定義
│   ├── App.tsx            # ルートコンポーネント
│   └── main.tsx           # エントリーポイント
└── .spec-workflow/        # プロジェクト仕様
```

## Technical Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API + LocalStorage
- **Linting/Formatting**: Biome
- **Testing**: Vitest + React Testing Library

## Key Principles

1. **Single Responsibility**: 各コンポーネント・関数は単一の責務を持つこと
2. **Type Safety**: TypeScript strict モードを使用し、`any` 型を避けること
3. **Modular Design**: 機能ごとにディレクトリを分割し、関連コードをまとめる
4. **Accessibility**: WCAG AA 基準を満たし、キーボード操作やスクリーンリーダーに対応
5. **Mobile First**: 375px 幅のモバイル画面を基準に設計
