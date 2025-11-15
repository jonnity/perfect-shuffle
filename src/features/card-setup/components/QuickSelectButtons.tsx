import { Button } from "../../../shared/components/Button"

interface QuickSelectButtonsProps {
  onSelect: (count: number) => void
}

/**
 * クイック選択ボタンコンポーネント
 *
 * 特徴:
 * - 40、60、99 の 3 つのボタンをグリッドレイアウトで表示
 * - 各ボタンは最小 44px のタッチターゲット
 * - 選択された枚数で onSelect prop を呼び出す
 *
 * @param onSelect - 枚数が選択されたときのコールバック
 */
export function QuickSelectButtons({ onSelect }: QuickSelectButtonsProps) {
  const quickSelectOptions = [40, 60, 99]

  return (
    <div className="grid grid-cols-3 gap-4">
      {quickSelectOptions.map((count) => (
        <Button
          key={count}
          variant="secondary"
          onClick={() => onSelect(count)}
          className="h-14 w-full text-xl"
          aria-label={`${count}枚を選択`}
        >
          {count}
        </Button>
      ))}
    </div>
  )
}
