import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/components/Button"
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
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center px-4">
      <main className="w-full max-w-md space-y-8">
        {/* タイトル */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-900">Perfect Shuffle</h1>
          <p className="mt-2 text-lg text-gray-700">枚数を指定してスタート！</p>
        </header>

        {/* カード枚数選択セクション */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <CardCountSelector
            cardCount={cardCount}
            onIncrement={increment}
            onDecrement={decrement}
          />

          <div className="mt-6">
            <QuickSelectButtons onSelect={setQuickSelect} />
          </div>

          {/* スタートボタン */}
          <Button
            onClick={handleStart}
            className="mt-8 w-full py-4 text-lg"
            aria-label={`${cardCount}枚でシャッフルを開始`}
          >
            スタート
          </Button>
        </div>
      </main>
    </div>
  )
}
