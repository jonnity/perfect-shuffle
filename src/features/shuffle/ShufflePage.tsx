import { useLocalStorage } from "@/shared/hooks/useLocalStorage"
import { DEFAULT_CARD_COUNT } from "@/types"
import { useNavigate } from "react-router-dom"
import { ProgressIndicator } from "./components/ProgressIndicator"
import { ShuffleDisplay } from "./components/ShuffleDisplay"
import { useShuffle } from "./hooks/useShuffle"

/**
 * シャッフル表示ページ
 * - useShuffle フックでシャッフル順序を管理
 * - ShuffleDisplay コンポーネントで現在のカード位置を表示
 * - タップで次のカードに進む
 * - 全カードめくり終わったら /complete に遷移
 */
export function ShufflePage() {
  const navigate = useNavigate()

  // LocalStorage からカード枚数を取得
  const [totalCards] = useLocalStorage<number>("cardCount", DEFAULT_CARD_COUNT)

  const { currentCardPosition, remainingCards, progress, nextCard } = useShuffle(totalCards)

  /**
   * 次のカードに進む
   * 全カードめくり終わったら /complete に遷移
   */
  const handleNext = () => {
    if (remainingCards.length === 1) {
      // 最後のカード
      nextCard()
      navigate("/complete")
    } else {
      nextCard()
    }
  }

  /**
   * ホームに戻る
   */
  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      {/* ヘッダー: 進捗表示と中断ボタン */}
      <header className="flex items-center justify-center p-4">
        <div className="flex w-full max-w-md items-center justify-between">
          <ProgressIndicator current={progress.current} total={progress.total} />
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
          >
            中断
          </button>
        </div>
      </header>

      {/* メインコンテンツ: ShuffleDisplay */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <ShuffleDisplay cardPosition={currentCardPosition} onClick={handleNext} />
        </div>
      </main>
    </div>
  )
}
