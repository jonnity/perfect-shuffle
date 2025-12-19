import { useLocalStorage } from "@/shared/hooks/useLocalStorage"
import { DEFAULT_CARD_COUNT } from "@/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/components/Button"
import { ProgressIndicator } from "./components/ProgressIndicator"
import { StackingInstruction } from "./components/StackingInstruction"
import { TripleShuffleDisplay } from "./components/TripleShuffleDisplay"
import { useTripleShuffle } from "./hooks/useTripleShuffle"

/**
 * シャッフル表示ページ（3つの束版）
 * - useTripleShuffle フックで3つの束のシャッフル順序を管理
 * - TripleShuffleDisplay コンポーネントで3つの束の配置指示を表示
 * - タップで次のラウンドに進む
 * - 全カード配置完了後、束を重ねる指示を表示してから /complete に遷移
 */
export function ShufflePage() {
  const navigate = useNavigate()

  // LocalStorage からカード枚数を取得
  const [totalCards] = useLocalStorage<number>("cardCount", DEFAULT_CARD_COUNT)

  const { currentCardPositions, progress, isAllComplete, nextRound } = useTripleShuffle(totalCards)

  // 束を重ねる指示画面を表示中かどうか
  const [showStackingInstruction, setShowStackingInstruction] = useState(false)

  /**
   * 次のラウンドに進む、または完了画面に遷移する
   */
  const handleNext = () => {
    if (showStackingInstruction) {
      // 束を重ねる指示画面からは完了画面へ
      navigate("/complete")
    } else if (isAllComplete) {
      // 全カード配置完了したら、束を重ねる指示画面を表示
      setShowStackingInstruction(true)
    } else {
      // 次のラウンドへ
      nextRound()
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
      className="flex h-full min-h-[400px] w-full cursor-pointer flex-col"
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

      {/* メインコンテンツ: TripleShuffleDisplay または StackingInstruction */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          {showStackingInstruction ? (
            <StackingInstruction />
          ) : (
            <TripleShuffleDisplay
              leftPosition={currentCardPositions.left}
              centerPosition={currentCardPositions.center}
              rightPosition={currentCardPositions.right}
            />
          )}
        </div>
      </div>
    </div>
  )
}
