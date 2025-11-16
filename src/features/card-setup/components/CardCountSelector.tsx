import { Button } from "../../../shared/components/Button"

interface CardCountSelectorProps {
  cardCount: number
  onIncrement: () => void
  onDecrement: () => void
}

/**
 * カード枚数選択コンポーネント
 *
 * 特徴:
 * - カード枚数を大きく中央に表示（text-5xl font-bold）
 * - +/- ボタンを横並びで配置
 * - タッチターゲットを最小 44px で確保
 *
 * @param cardCount - 現在のカード枚数
 * @param onIncrement - カード枚数を増やすコールバック
 * @param onDecrement - カード枚数を減らすコールバック
 */
export function CardCountSelector({ cardCount, onIncrement, onDecrement }: CardCountSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Decrement button */}
      <Button
        variant="secondary"
        onClick={onDecrement}
        className="h-14 w-14 text-2xl"
        aria-label="カード枚数を減らす"
      >
        -
      </Button>

      {/* Card count display */}
      <div className="min-w-32 text-center text-5xl font-bold text-gray-900">{cardCount}</div>

      {/* Increment button */}
      <Button
        variant="secondary"
        onClick={onIncrement}
        className="h-14 w-14 text-2xl"
        aria-label="カード枚数を増やす"
      >
        +
      </Button>
    </div>
  )
}
