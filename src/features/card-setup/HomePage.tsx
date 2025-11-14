import { useNavigate } from "react-router-dom"
import { CardCountSelector } from "./components/CardCountSelector"
import { QuickSelectButtons } from "./components/QuickSelectButtons"
import { useCardCount } from "./hooks/useCardCount"

/**
 * カード設定ページ（ホームページ）
 * - タイトル「Perfect Shuffle」を表示
 * - サブタイトル「枚数を指定してスタート！」を表示
 * - CardCountSelector と QuickSelectButtons を統合
 * - スタートボタン（枚数を保存して /shuffle に遷移）
 */
export function HomePage() {
  const navigate = useNavigate()
  const { cardCount, increment, decrement, setQuickSelect, saveCardCount } = useCardCount()

  /**
   * スタートボタンクリック時の処理
   * - カード枚数を LocalStorage に保存
   * - /shuffle ページに遷移
   */
  const handleStart = () => {
    saveCardCount()
    navigate("/shuffle")
  }

  return (
    <div className="page-container bg-app-gradient">
      <main className="content-wrapper space-y-8">
        {/* タイトル */}
        <header className="text-center">
          <h1 className="text-brand-title text-4xl">Perfect Shuffle</h1>
          <p className="text-secondary-content mt-2 text-lg">枚数を指定してスタート！</p>
        </header>

        {/* カード枚数選択セクション */}
        <div className="card p-6">
          <CardCountSelector
            cardCount={cardCount}
            onIncrement={increment}
            onDecrement={decrement}
          />

          <div className="mt-6">
            <QuickSelectButtons onSelect={setQuickSelect} />
          </div>

          {/* スタートボタン */}
          <button
            type="button"
            onClick={handleStart}
            className="btn-primary mt-8 w-full py-4 text-lg"
            aria-label={`${cardCount}枚でシャッフルを開始`}
          >
            スタート
          </button>
        </div>
      </main>
    </div>
  )
}
