# タスクドキュメント

## プロジェクトセットアップとインフラ

- [ ] 1. Vite + React + TypeScript + Tailwind CSS + Biome でプロジェクトを初期化
  - ファイル: package.json, vite.config.ts, tsconfig.json, tailwind.config.js, biome.json, index.html, src/main.tsx
  - React と TypeScript テンプレートで Vite プロジェクトを初期化
  - Tailwind CSS をインストール・設定
  - Biome をインストール・設定（linting と formatting 用）
  - React Router v6 をインストール
  - 基本的なプロジェクト構造をセットアップ (src/features, src/shared, src/types)
  - 目的: プロジェクトの基盤構造とツールを確立する
  - _活用: Vite CLI, npm/yarn パッケージマネージャー_
  - _要件: すべて（基盤）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: モダンなフロントエンドツールとビルドシステムに精通した DevOps エンジニア | Task: Vite、React、TypeScript、Tailwind CSS、Biome を使用して新しいプロジェクトを初期化し、design.md のすべての設定要件に従い、src/features と src/shared 配下に完全なプロジェクト構造をセットアップする | Restrictions: ビルドツールは Vite を使用（Create React App ではない）、Biome はダブルクオートと推奨ルールで設定、Tailwind はモバイルファースト設計（375px ベース）で適切に設定すること | Success: npm run dev でプロジェクトが動作、Biome の linting と formatting が正しく動作、Tailwind クラスが利用可能、すべての依存関係がインストール済み、ディレクトリ構造が design.md と一致 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 2. TypeScript 型定義を作成
  - ファイル: src/types/index.ts
  - CardCount 型と定数を定義（MIN/MAX/DEFAULT_CARD_COUNT, QUICK_SELECT_OPTIONS）
  - ShuffleResult インターフェースを定義
  - ShuffleState インターフェースを定義
  - 目的: アプリケーション全体の型安全性を確立する
  - _活用: TypeScript strict モード_
  - _要件: Design.md - Data Models セクション_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: 型システムとドメインモデリングに特化した TypeScript 開発者 | Task: design.md の Data Models セクションで指定された CardCount、ShuffleResult、ShuffleState の包括的な TypeScript 型定義をすべての定数を含めて作成する | Restrictions: TypeScript strict モードを使用、すべての型をエクスポート、定数には適切に readonly を使用、design.md の仕様に厳密に従うこと | Success: すべての型がエラーなくコンパイル、定数が 'as const' で適切に型付け、型が design.md のデータモデルを正確に反映 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## コアユーティリティの実装

- [ ] 3. Fisher-Yates シャッフルアルゴリズムを実装
  - ファイル: src/shared/utils/fisherYatesShuffle.ts
  - Fisher-Yates シャッフルアルゴリズムを実装
  - シャッフル後の位置の配列を返す（1-indexed）
  - アルゴリズムを説明する JSDoc コメントを追加
  - 目的: 公平で偏りのないシャッフル機能を提供する
  - _活用: Math.random(), TypeScript_
  - _要件: 要件2（シャッフル実行）、Design.md - fisherYatesShuffle 仕様_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: ランダム化と JavaScript に精通したアルゴリズム開発者 | Task: design.md で指定された通りに Fisher-Yates シャッフルアルゴリズムを実装し、配列 [1,2,...,count] を作成、Math.random() を使用してシャッフルし、シャッフル後の順序を返す | Restrictions: Fisher-Yates アルゴリズムを使用（他のシャッフル方法は不可）、O(n) の時間計算量を確保、Math.random() でランダム性を実現、1-indexed の位置を返すこと | Success: 関数が [1,2,...,count] の有効な順列を返す、すべての数字が正確に1回出現、99枚のカードで100ms未満の実行時間、JSDoc で適切にドキュメント化 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 4. カード枚数バリデーションユーティリティを実装
  - ファイル: src/shared/utils/validateCardCount.ts
  - カード枚数が 1-99 の範囲内かをバリデート
  - 無効な場合（範囲外または非数値）は 60 を返す
  - JSDoc コメントを追加
  - 目的: カード枚数のデータ整合性を確保する
  - _活用: TypeScript の数値バリデーション_
  - _要件: エラーハンドリング - 無効なカード枚数、Design.md - validateCardCount 仕様_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: 入力サニタイゼーションとエッジケース処理に精通したバリデーションエンジニア | Task: design.md で指定された通り、無効な入力（< 1, > 99, NaN, 非数値）に対して 60 を返し、有効な場合（1-99）は入力をそのまま返す validateCardCount 関数を実装する | Restrictions: すべての無効なケースに対して正確に 60 を返す（MIN や MAX ではない）、NaN や undefined を含むすべてのエッジケースを処理、例外をスローしないこと | Success: 0, 100, NaN, undefined に対して 60 を返す、有効範囲 1-99 では入力を返す、JSDoc で適切にドキュメント化 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 5. useLocalStorage カスタムフックを実装
  - ファイル: src/shared/hooks/useLocalStorage.ts
  - LocalStorage の読み書きのための汎用フックを作成
  - LocalStorage が利用できない場合を適切に処理（try-catch）
  - タプル [value, setValue] を返す
  - 目的: エラーハンドリング付きで LocalStorage 操作を抽象化する
  - _活用: React hooks (useState, useEffect)_
  - _要件: エラーハンドリング - LocalStorage 利用不可、Design.md - useLocalStorage 仕様_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: カスタムフックとブラウザ API に精通した React 開発者 | Task: LocalStorage 操作を try-catch エラーハンドリングでラップし、LocalStorage が利用できない場合はメモリ内の状態にフォールバックする useLocalStorage フックを design.md の仕様に従って作成する | Restrictions: LocalStorage のクォータ超過エラーを処理、プライベートブラウジングモードでも動作、柔軟性のためにジェネリック TypeScript 型を使用、React hooks のルールに従うこと | Success: フックはマウント時に LocalStorage から読み込み、値変更時に書き込み、利用できない場合はメモリのみにフォールバック、ジェネリックで適切に型付け、コンソールエラーなし | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## 機能: カード設定（枚数設定）

- [ ] 6. useCardCount カスタムフックを作成
  - ファイル: src/features/card-setup/hooks/useCardCount.ts
  - LocalStorage による永続化でカード枚数の状態を管理
  - increment/decrement 関数を提供（1-99 で境界チェック）
  - setQuickSelect 関数を提供
  - saveCardCount 関数を提供
  - 初期化時に LocalStorage から保存された枚数をロード（デフォルト 60）
  - 目的: カード枚数の状態管理を一元化する
  - _活用: src/shared/hooks/useLocalStorage.ts, src/shared/utils/validateCardCount.ts_
  - _要件: 要件1（カード枚数設定）、要件2（LocalStorage に保存）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: カスタムフックに精通した React 状態管理開発者 | Task: カード枚数の状態（1-99）を管理し、キー 'perfect-shuffle-card-count' で LocalStorage に永続化し、increment/decrement/setQuickSelect/saveCardCount 関数を提供し、マウント時に保存値をロード（デフォルト 60）する useCardCount フックを、useLocalStorage と validateCardCount ユーティリティを使用して作成する | Restrictions: increment（最大 99）と decrement（最小 1）で境界チェック、すべての入力を validateCardCount で検証、指定された正確な LocalStorage キーを使用、既存のユーティリティと統合すること | Success: フックはマウント時に LocalStorage から枚数をロード、increment/decrement が境界を尊重、クイック選択が 40/60/99 で動作、saveCardCount が LocalStorage に永続化、無効な値は 60 にフォールバック | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 7. CardCountSelector コンポーネントを作成
  - ファイル: src/features/card-setup/components/CardCountSelector.tsx
  - 現在の枚数を目立つように表示（text-5xl font-bold）
  - +/- ボタンを横並びで表示（最小 44px のタッチターゲット）
  - props コールバックで increment/decrement を処理
  - 目的: 直感的なカード枚数調整 UI を提供する
  - _活用: Tailwind CSS クラス_
  - _要件: 要件1.4、1.5（+/- ボタン）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React コンポーネントとアクセシビリティに精通した UI/UX 開発者 | Task: カード枚数を大きなテキスト（text-5xl font-bold）で表示し、+/- ボタンを水平に配置し、最小 44px のタッチターゲットを確保する CardCountSelector コンポーネントを、design.md の Tailwind スタイリングガイドラインに従って作成する | Restrictions: Tailwind ユーティリティクラスのみ使用（カスタム CSS なし）、タッチターゲットサイズが 44px 最小を満たすこと、ボタンは視覚的に目立つこと、適切な aria-labels でアクセシビリティを維持 | Success: 枚数が大きく中央に表示、+/- ボタンが 44px 最小、ボタンが水平配置、コンポーネントがアクセシブル、スタイリングガイドラインに一致 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 8. QuickSelectButtons コンポーネントを作成
  - ファイル: src/features/card-setup/components/QuickSelectButtons.tsx
  - 40、60、99 の 3 つのボタンをグリッドレイアウトで表示
  - 各ボタンは最小 44px のタッチターゲット
  - 選択された枚数で onSelect prop を呼び出す
  - 目的: 一般的なカード枚数の迅速な選択を可能にする
  - _活用: Tailwind CSS grid クラス_
  - _要件: 要件1.6、1.7（クイック選択 40/60/99）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: レスポンシブレイアウトと Tailwind CSS に精通したフロントエンド開発者 | Task: グリッドレイアウトで 3 つのボタン（40、60、99）を配置し、各ボタンは最小 44px のタッチターゲットで、選択された枚数で onSelect コールバックを呼び出す QuickSelectButtons コンポーネントを、Tailwind grid ユーティリティを使用して作成する | Restrictions: レイアウトには Tailwind grid クラス（grid grid-cols-3）を使用、44px 最小タッチターゲットを確保、ボタンは均等に配置、CardCountSelector と一貫したスタイリングを維持 | Success: 3 つのボタンがグリッドで表示、各ボタンは 44px 最小、クリックすると正しい枚数（40/60/99）で onSelect を呼び出す、視覚的に一貫性がありアクセシブル | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 9. HomePage（カード設定ページ）を作成
  - ファイル: src/features/card-setup/HomePage.tsx
  - タイトル「Perfect Shuffle」を表示（text-4xl）
  - サブタイトル「枚数を指定してスタート！」を表示（text-lg）
  - CardCountSelector と QuickSelectButtons コンポーネントを統合
  - 「スタート」ボタンを追加（枚数を保存して /shuffle に遷移）
  - コンテンツを垂直・水平方向に中央配置
  - 目的: ユーザーがシャッフルをセットアップするためのメインエントリポイント
  - _活用: useCardCount hook, React Router の useNavigate, CardCountSelector, QuickSelectButtons_
  - _要件: 要件1（カード枚数設定）、要件2（スタートボタンと保存）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: ページ構成とルーティングに精通したフルスタック React 開発者 | Task: タイトル「Perfect Shuffle」、サブタイトル「枚数を指定してスタート！」を表示し、CardCountSelector と QuickSelectButtons を統合し、useCardCount フックと useNavigate を使用して枚数を LocalStorage に保存して /shuffle に遷移する「スタート」ボタンを持つ HomePage を、design.md のコンポーネント別スタイリングに従って作成する | Restrictions: flex 中央配置（min-h-screen flex flex-col items-center justify-center）を使用、指定された正確なテキスト内容、遷移前に LocalStorage に保存、すべての子コンポーネントを正しく統合 | Success: ページがタイトルとサブタイトルを正しく表示、CardCountSelector と QuickSelectButtons が動作、スタートボタンが枚数を保存して /shuffle に遷移、レイアウトが垂直・水平に中央配置 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## 機能: シャッフル（シャッフル表示）

- [ ] 10. useShuffle カスタムフックを作成
  - ファイル: src/features/shuffle/hooks/useShuffle.ts
  - マウント時に fisherYatesShuffle を使用してシャッフル順序を生成
  - 現在の手札状態を追跡する remainingCards 配列を維持
  - shuffledOrder と remainingCards から currentCardPosition を計算（design.md のアルゴリズム通り）
  - 次のカードに進む nextCard 関数を提供
  - 進捗（current/total）を追跡
  - isComplete 状態を判定
  - 目的: シャッフル状態と進行ロジックを管理する
  - _活用: src/shared/utils/fisherYatesShuffle.ts_
  - _要件: 要件2（シャッフル実行）、要件3（シャッフル順序の表示）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: アルゴリズムと状態マシンに精通した React 状態管理開発者 | Task: fisherYatesShuffle を使用してシャッフル順序を生成し、remainingCards 配列を維持し、design.md のアルゴリズム（remainingCards での indexOf + 1）を使用して現在のカード位置を計算し、配置したカードを remainingCards から削除する nextCard 関数を提供し、進捗を追跡し、isComplete を判定する useShuffle フックを、cardCount をパラメータとして作成する | Restrictions: design.md の ShuffleDisplay セクションの正確なアルゴリズムに従うこと、fisherYatesShuffle ユーティリティを使用、currentIndex を 0 から開始、位置を remainingCards.indexOf(shuffledOrder[currentIndex]) + 1 として計算、各 nextCard 呼び出し後に remainingCards からカードを削除 | Success: フックはマウント時に有効なシャッフルを生成、currentCardPosition がアルゴリズム通りに正しく計算、nextCard が進めて remainingCards を更新、進捗が正確（currentIndex+1 / total）、すべてのカード表示後に isComplete が true | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 11. ShuffleDisplay コンポーネントを作成
  - ファイル: src/features/shuffle/components/ShuffleDisplay.tsx
  - カード位置を非常に大きなテキストで表示（text-7xl font-extrabold）
  - 「○枚目を置いて」形式で表示
  - 「タップで次へ」メッセージを表示（text-base）
  - 表示エリア全体をクリック可能にする
  - 目的: 現在のカード指示を目立って表示する
  - _活用: Tailwind CSS タイポグラフィクラス_
  - _要件: 要件3.2、3.4（表示形式、タップで進む）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: タイポグラフィとユーザーインタラクションデザインに精通した UI 開発者 | Task: cardPosition を非常に大きなテキスト（text-7xl font-extrabold）で「○枚目を置いて」形式で表示し、下に「タップで次へ」メッセージを表示し、onClick ハンドラでエリア全体をクリック可能にする ShuffleDisplay コンポーネントを、design.md のスタイリングガイドラインに従って作成する | Restrictions: 正確なテキスト形式「{cardPosition}枚目を置いて」を使用、カード位置には text-7xl、タップメッセージには text-base、コンポーネント全体をクリック可能に（ボタンだけでなく）、すべてのテキストを中央揃え | Success: カード位置が非常に大きく中央に表示、「タップで次へ」メッセージが下に表示、エリア全体がクリックに反応、テキストが適切にフォーマット、視覚的に目立ち読みやすい | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 12. ProgressIndicator コンポーネントを作成
  - ファイル: src/features/shuffle/components/ProgressIndicator.tsx
  - 「X/N」形式で進捗を表示（text-2xl）
  - 画面の上部エリアに配置
  - 目的: ユーザーのシャッフル進捗を表示する
  - _活用: Tailwind CSS 配置クラス_
  - _要件: 要件3.3（進捗表示）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: UI インジケーターと Tailwind CSS に精通したフロントエンド開発者 | Task: 「X/N」形式（例: 「3/60」）で進捗を text-2xl で表示し、画面の上部エリアに配置する ProgressIndicator コンポーネントを、current と total を props として受け取って作成する | Restrictions: 正確な形式「{current}/{total}」を使用、サイズには text-2xl、Tailwind ユーティリティで上部または上部エリアに配置、背景に対する視認性を維持 | Success: 進捗が正しい形式で表示、テキストサイズが text-2xl、上部エリアに明確に配置、シャッフル進行に合わせて正しく更新 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 13. ShufflePage を作成
  - ファイル: src/features/shuffle/ShufflePage.tsx
  - ShuffleDisplay、ProgressIndicator コンポーネントを統合
  - 左上に「中断」ボタンを追加（/ に遷移）
  - Context またはルート状態から cardCount を取得
  - useShuffle フックを使用
  - ShuffleDisplay のクリックで nextCard を呼び出す
  - isComplete が true になったら /complete に遷移
  - 目的: シャッフル表示とユーザーインタラクションを統括する
  - _活用: useShuffle hook, useNavigate, ShuffleDisplay, ProgressIndicator_
  - _要件: 要件3（シャッフル表示）、要件3.7、3.8（中断ボタン）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: ページオーケストレーションと状態管理に精通したフルスタック React 開発者 | Task: ShuffleDisplay と ProgressIndicator を統合し、/ に遷移する左上の「中断」ボタンを追加し、ルート状態または localStorage から cardCount を取得し、useShuffle フックを使用し、ShuffleDisplay クリックで nextCard を呼び出し、isComplete が true になったら /complete に遷移する ShufflePage を、design.md のレイアウトに従って作成する | Restrictions: location.state から cardCount を取得、フォールバックで localStorage を使用、isComplete 変更時に遷移するには useEffect を使用、中断ボタンは適切なスタイリングで左上に配置、cardCount 欠落のエッジケースを処理 | Success: ページが現在のカード位置と進捗を表示、クリックで次のカードに進む、中断ボタンがホームに戻る、完了時に自動的に /complete に遷移、すべての状態を正しく処理 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## 機能: 完了（完了画面）

- [ ] 14. CompletePage を作成
  - ファイル: src/features/complete/CompletePage.tsx
  - 完了メッセージを目立って表示
  - 「ホームに戻る」ボタンを表示
  - ボタンクリックで / に遷移
  - コンテンツを垂直・水平方向に中央配置
  - 目的: シャッフル完了を確認し、再開を可能にする
  - _活用: React Router の useNavigate_
  - _要件: 要件4（シャッフル完了）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: ユーザーフロー完了と React ルーティングに精通したフロントエンド開発者 | Task: 目立つ完了メッセージ（例: 「シャッフル完了！」）を表示し、/ に遷移する「ホームに戻る」ボタンを表示する CompletePage を、design.md のコンポーネント別スタイリングに一致する中央配置レイアウトで作成する | Restrictions: flex 中央配置（min-h-screen flex flex-col items-center justify-center）を使用、完了メッセージは大きく祝福的に、ボタンは目立ち中央配置、遷移には useNavigate を使用 | Success: 完了メッセージが目立って表示、ホームに戻るボタンが表示され機能的、クリックで / に遷移、レイアウトが垂直・水平に中央配置 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## 共有コンポーネント

- [ ] 15. Footer コンポーネントを作成
  - ファイル: src/shared/components/Footer.tsx
  - 左側に「Privacy Policy」リンクを表示（href="#"）
  - 右側に「© jonnity 2025」を表示
  - 画面下部に固定（fixed bottom-0）
  - 背景は白でシャドウ付き
  - 高さ 16（h-16）
  - 目的: すべてのページで一貫したフッターを提供する
  - _活用: Tailwind CSS fixed 配置と flex レイアウト_
  - _要件: 要件5（フッター表示）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: レイアウトコンポーネントと Tailwind CSS に精通した UI 開発者 | Task: 左側に「Privacy Policy」リンク（href="#"）、右側に「© jonnity 2025」を表示し、下部に固定（fixed bottom-0 w-full）、白背景でシャドウ付き（bg-white shadow-md）、高さ h-16、flexbox でレイアウトする Footer コンポーネントを、design.md の Footer 仕様に従って作成する | Restrictions: 指定された正確なテキスト内容を使用、href は「#」にすること、Tailwind fixed 配置（fixed bottom-0）を使用、レイアウトには flex と space-between を使用、高さは正確に h-16、奥行きのためシャドウを維持 | Success: フッターがすべてのページで下部に固定、Privacy Policy リンクが左側、著作権が右側、白背景でシャドウ付き、高さが h-16、レイアウトが flex space-between を使用 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## アプリケーションセットアップとルーティング

- [ ] 16. ルーティングを備えた App コンポーネントを作成
  - ファイル: src/App.tsx
  - React Router でルートを設定: / (HomePage), /shuffle (ShufflePage), /complete (CompletePage)
  - レイアウトに Footer を含める
  - グローバルスタイリングまたはコンテキストプロバイダーを追加
  - 目的: アプリケーションのルーティングとレイアウト構造を設定する
  - _活用: React Router v6 (BrowserRouter, Routes, Route)_
  - _要件: Design.md - Routing セクション、すべてのページ要件_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Router とアプリ構造に精通した React アプリケーションアーキテクト | Task: / (HomePage)、/shuffle (ShufflePage)、/complete (CompletePage) のルートを設定し、レイアウトに Footer コンポーネントを含め、必要なコンテキストプロバイダーを設定する App コンポーネントを、design.md の Routing 仕様に従って作成する | Restrictions: React Router v6 構文（BrowserRouter, Routes, Route）を使用、Footer がすべてのページに表示されることを確保、design.md で指定された適切なルートパスを使用、404/不明なルートを適切に処理 | Success: すべてのルート（/, /shuffle, /complete）が正しく動作、Footer がすべてのページに表示、ページ間のナビゲーションがスムーズ、コンソールエラーや警告なし | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 17. メインエントリポイントを設定
  - ファイル: src/main.tsx
  - App コンポーネントを DOM にレンダリング
  - Tailwind CSS のインポートを含める
  - グローバルエラーバウンダリーやプロバイダーを追加
  - 目的: React アプリケーションをブートストラップする
  - _活用: React 18 createRoot API_
  - _要件: すべて（アプリケーション基盤）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React ブートストラップと Vite に精通したフロントエンドビルドエンジニア | Task: React 18 createRoot API を使用して App コンポーネントをレンダリングし、Tailwind CSS が正しくインポートされていることを確認し、StrictMode と必要なグローバルプロバイダーを追加し、Vite 設定が正しいことを確認する main.tsx を設定する | Restrictions: React 18 createRoot を使用（レガシー ReactDOM.render ではない）、Tailwind CSS を正しい場所（通常 index.css）でインポート、開発用に StrictMode を有効化、TypeScript 型が正しいことを確保 | Success: アプリケーションがエラーなくレンダリング、Tailwind スタイルが適用、StrictMode が有効、コンソール警告なし、開発時にホットモジュールリプレースメントが動作 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## スタイリングと仕上げ

- [ ] 18. グローバル Tailwind 設定とスタイリングを適用
  - ファイル: tailwind.config.js, src/index.css
  - モバイルファースト用に Tailwind を設定（375px ベース）
  - カラーパレットを設定（blue-600, gray-50, gray-900, gray-300）
  - design.md に従ってフォントサイズを設定
  - 必要なカスタムユーティリティを追加
  - WCAG AA コントラスト比（4.5:1 以上）を確保
  - 目的: 一貫した視覚デザインシステムを確立する
  - _活用: Tailwind CSS 設定、デザイントークン_
  - _要件: Design.md - Styling Guidelines、Usability（WCAG AA）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Tailwind CSS とアクセシビリティに精通したデザインシステムエンジニア | Task: モバイルファーストアプローチ（375px ベース）で Tailwind を設定し、カラーパレット（primary blue-600、bg gray-50、text gray-900、border gray-300）をセットアップし、フォントサイズ（text-4xl、text-lg、text-7xl、text-2xl、text-base）を設定し、WCAG AA コントラスト比を確保し、design.md の Styling Guidelines に従う | Restrictions: モバイルファーストのみ（レスポンシブブレークポイント不要）、指定された色を正確に使用、すべてのテキストが 4.5:1 コントラスト比を満たすこと、tailwind.config.js と index.css で適切に設定 | Success: Tailwind がモバイルファースト用に設定、カラーパレットが design.md と一致、フォントサイズが正しく設定、すべてのテキストが WCAG AA コントラストチェックに合格、カスタム設定が適切にロード | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 19. コンポーネントスタイリングとユーザーエクスペリエンスを洗練
  - ファイル: すべてのコンポーネントファイル
  - すべてのタッチターゲットが 44px 最小を満たすことを確保
  - 視覚的階層と可読性を検証
  - キーボードナビゲーションサポートを追加（タブ順序、エンターキー）
  - アクセシビリティのための aria-labels を追加
  - アニメーション/トランジションがある場合はテストして洗練
  - 目的: 洗練されたアクセシブルなユーザーエクスペリエンスを確保する
  - _活用: Tailwind ユーティリティ、ARIA 属性_
  - _要件: アクセシビリティ要件、ユーザビリティ要件_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: WCAG とインクルーシブデザインに精通したアクセシビリティスペシャリストおよび UX デザイナー | Task: すべてのコンポーネントをレビューして洗練し、44px 最小タッチターゲット、適切な視覚的階層、キーボードナビゲーションサポート（タブ順序、エンターキー処理）、適切な aria-labels、スムーズなユーザーエクスペリエンスを確保し、design.md の Accessibility セクションに従う | Restrictions: すべてのインタラクティブ要素は 44px 最小、キーボードナビゲーションを完全にサポート、すべてのコントロールに適切な aria-labels が必要、視覚的一貫性を維持、必要でない限りカスタムアニメーションなし | Success: すべてのタッチターゲットが 44px 以上、キーボードナビゲーションがアプリ全体で動作、スクリーンリーダーがすべての機能を使用可能、視覚的階層が明確、ユーザーエクスペリエンスがスムーズで直感的 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## テスト

- [ ] 20. ユーティリティのユニットテストを作成
  - ファイル: src/shared/utils/__tests__/fisherYatesShuffle.test.ts, src/shared/utils/__tests__/validateCardCount.test.ts
  - fisherYatesShuffle をテスト: 有効な順列、すべての数字が1回出現、ランダム性
  - validateCardCount をテスト: 境界値（0→60, 100→60, 50→50, NaN→60）
  - 重要なロジックで高いカバレッジを達成
  - 目的: コアユーティリティの信頼性を確保する
  - _活用: Vitest テストフレームワーク_
  - _要件: Design.md - Testing Strategy（Unit Testing）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: ユニットテストと Vitest に精通した QA エンジニア | Task: fisherYatesShuffle（有効な順列を検証、すべての数字 1-N が正確に1回出現、複数回実行で異なる結果を生成）と validateCardCount（境界ケース: 0→60, 100→60, 50→50, NaN→60, undefined→60）の包括的なユニットテストを、design.md の Testing Strategy に従って作成する | Restrictions: テストフレームワークとして Vitest を使用、成功とエッジケースの両方をテスト、ランダム性テスト以外は決定論的なテストを確保、これらの重要なユーティリティで高いカバレッジを達成 | Success: fisherYatesShuffle テストが順列の有効性とランダム性を検証、validateCardCount テストがすべてのエッジケース（0, 100, NaN, undefined, 有効範囲）をカバー、すべてのテストが合格、カバレッジが高い | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 21. 主要なユーザーフローの統合テストを作成
  - ファイル: src/__tests__/integration/*.test.tsx
  - フローをテスト: 枚数設定 → スタート → シャッフル → 完了 → ホームに戻る
  - フローをテスト: 枚数変更 → LocalStorage 永続化 → リロード
  - フローをテスト: クイック選択 → シャッフル → 中断 → ホームに戻る
  - React Testing Library を使用
  - 目的: エンドツーエンドのユーザージャーニーが正しく動作することを検証する
  - _活用: React Testing Library, Vitest_
  - _要件: Design.md - Testing Strategy（Integration Testing）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Testing Library とユーザージャーニーテストに精通した統合テストエンジニア | Task: 主要なフローをカバーする統合テストを作成: (1) 枚数設定→スタート→シャッフル→完了→ホーム、(2) 枚数変更→localStorage 検証→リロード→永続化検証、(3) クイック選択→シャッフル→中断→ホーム、React Testing Library と Vitest を使用し、design.md の Testing Strategy に従う | Restrictions: コンポーネントテストには React Testing Library を使用、必要に応じて localStorage をモック、実際のユーザーインタラクション（クリック、タイプ）をテスト、実装詳細のテストを避ける、テストが信頼性があり保守可能であることを確保 | Success: 3 つの主要なフローすべてに包括的な統合テストがある、テストが実際のユーザー動作をシミュレート、localStorage 永続化が検証、すべてのテストが確実に合格、カバレッジがハッピーパスと中断を含む | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

## 最終レビューとドキュメント

- [ ] 22. 最終コードレビューとクリーンアップ
  - ファイル: すべてのソースファイル
  - Biome linting を実行してすべての問題を修正
  - console.log やデバッグコードを削除
  - すべての TypeScript 型が適切であることを確認（'any' なし）
  - エラーハンドリングが堅牢であることを検証
  - コード構成が design.md の構造に従っていることを確認
  - 目的: コード品質と保守性を確保する
  - _活用: Biome CLI, TypeScript コンパイラ_
  - _要件: すべて（コード品質）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript とコード品質に精通したシニアコードレビュアー | Task: 包括的なコードレビューを実行: Biome linting/formatting を実行してすべての問題を修正、デバッグコードを削除、TypeScript の 'any' 型を排除、全体的なエラーハンドリングを検証、ファイル構成が design.md と一致することを確保、インポートと未使用コードをクリーンアップ | Restrictions: Biome エラー/警告ゼロ、本番コードに console.log なし、'any' 型なし（unknown または適切な型を使用）、すべてのエラーを処理、design.md の構造を厳密に維持 | Success: Biome linting がエラーなしで合格、デバッグコードが残っていない、TypeScript strict モードが合格、エラーハンドリングが包括的、コード構成が design.md と完全に一致 | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 23. README とドキュメントを作成
  - ファイル: README.md
  - プロジェクトの目的と機能をドキュメント化
  - セットアップ手順を追加（npm install, npm run dev）
  - 利用可能なスクリプトをリスト化（dev, build, lint, format, test）
  - プロジェクト構造を簡潔に説明
  - エンドユーザー向けの使用手順を追加
  - 目的: 開発者とユーザー向けの明確なドキュメントを提供する
  - _活用: Markdown フォーマット_
  - _要件: すべて（ドキュメント）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: 開発者ドキュメントに精通したテクニカルライター | Task: プロジェクトの目的（Perfect Shuffle カードシャッフルアプリ）、機能リスト、セットアップ手順（npm install, npm run dev）、利用可能なスクリプト（dev, build, lint, format, test）、プロジェクト構造の説明、エンドユーザー使用手順をドキュメント化した包括的な README.md を作成する | Restrictions: ドキュメントは簡潔で明確に保つ、適切な markdown フォーマットを使用、すべての npm スクリプトを含める、ユーザー視点から機能を説明、design.md に基づいてプロジェクト構造をドキュメント化 | Success: README にプロジェクト概要、完全なセットアップ手順、すべての npm スクリプトのドキュメント、プロジェクト構造の説明、ユーザー手順が明確、markdown が適切にフォーマット | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_

- [ ] 24. 本番バンドルをビルドして検証
  - コマンド: npm run build
  - ビルドがエラーなく完了することを検証
  - バンドルサイズが妥当であることを確認
  - 本番ビルドをローカルでテスト（npm run preview）
  - すべての機能が本番モードで動作することを検証
  - 目的: アプリケーションがデプロイ準備完了であることを確保する
  - _活用: Vite ビルドツール_
  - _要件: すべて（デプロイ準備）_
  - _Prompt: Implement the task for spec perfect-shuffle, first run spec-workflow-guide to get the workflow guide then implement the task: Role: フロントエンドビルド最適化と Vite に精通した DevOps エンジニア | Task: 本番ビルド（npm run build）を実行、エラーなく完了することを検証、バンドルサイズが妥当（500KB 未満）であることを確認、npm run preview で本番ビルドをテスト、LocalStorage とルーティングを含むすべての機能が本番モードで正しく動作することを検証 | Restrictions: ビルドがゼロエラーで完了、バンドルサイズが最適化されている（必要に応じてコード分割）、すべての機能が本番ビルドで動作、バンドルに開発専用コードなし | Success: npm run build が正常に完了、バンドルサイズが妥当、npm run preview が動作、すべてのアプリ機能が本番ビルドで正しく機能、本番環境でコンソールエラーなし | Instructions: タスク完了後、tasks.md を編集してこのタスクを [x] 完了としてマークすること_
