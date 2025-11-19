import { useLocalStorage } from "@/shared/hooks/useLocalStorage"
import { DEFAULT_CARD_COUNT } from "@/types"
import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/components/Button"
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

  /**
   * キーボードイベントハンドラ（Enter または Space で次へ）
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNext}
      onKeyDown={handleKeyDown}
      className="flex h-full w-full cursor-pointer flex-col bg-gradient-to-b from-blue-50 to-blue-100"
      aria-label="次のカードに進む"
    >
      {/* ヘッダー: 進捗表示と中断ボタン - pointer-events-none で透過 */}
      <header className="pointer-events-none flex items-center justify-center p-4">
        <div className="flex w-full max-w-md items-center justify-between">
          <ProgressIndicator current={progress.current} total={progress.total} />
          <Button
            variant="neutral"
            onClick={(e) => {
              e.stopPropagation()
              handleBack()
            }}
            className="pointer-events-auto px-4 py-3 text-sm"
            aria-label="シャッフルを中断してホームに戻る"
          >
            中断
          </Button>
        </div>
      </header>

      {/* メインコンテンツ: ShuffleDisplay - 画面全体がタップ可能 */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <ShuffleDisplay cardPosition={currentCardPosition} />
        </div>
      </div>
    </div>
  )
}
