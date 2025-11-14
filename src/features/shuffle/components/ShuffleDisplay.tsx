interface ShuffleDisplayProps {
  cardPosition: number
}

/**
 * シャッフル表示コンポーネント
 *
 * 特徴:
 * - カード位置を非常に大きく中央に表示（text-7xl font-extrabold）
 * - 「上から○枚目を置いて」形式で表示
 * - 「タップで次へ」メッセージを下に表示（text-base）
 * - クリック処理は親コンポーネントで行う
 *
 * @param cardPosition - 表示するカード位置（現在の手札での位置）
 */
export function ShuffleDisplay({ cardPosition }: ShuffleDisplayProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-8 py-16"
      role="status"
      aria-live="polite"
    >
      {/* Card position display */}
      <div className="text-center" aria-label={`上から${cardPosition}枚目を置いてください`}>
        <div className="text-tertiary-content text-base">上から</div>
        <div className="text-primary-content text-7xl font-extrabold">{cardPosition}</div>
        <div className="text-secondary-content mt-2 text-2xl">枚目を置いて</div>
      </div>

      {/* Tap instruction */}
      <div className="text-hint text-base" aria-label="タップまたはEnterキーで次のカードに進む">
        タップで次へ
      </div>
    </div>
  )
}
