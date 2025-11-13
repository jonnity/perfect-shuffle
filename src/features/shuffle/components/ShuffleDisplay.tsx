interface ShuffleDisplayProps {
  cardPosition: number
  onClick: () => void
}

/**
 * シャッフル表示コンポーネント
 *
 * 特徴:
 * - カード位置を非常に大きく中央に表示（text-7xl font-extrabold）
 * - 「○枚目を置いて」形式で表示
 * - 「タップで次へ」メッセージを下に表示（text-base）
 * - 表示エリア全体をクリック可能にする
 *
 * @param cardPosition - 表示するカード位置（現在の手札での位置）
 * @param onClick - タップ/クリックハンドラ
 */
export function ShuffleDisplay({ cardPosition, onClick }: ShuffleDisplayProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col items-center justify-center gap-8 py-16"
      aria-label={`${cardPosition}枚目を置いて、次へ`}
    >
      {/* Card position display */}
      <div className="text-center">
        <div className="text-7xl font-extrabold text-gray-900">{cardPosition}</div>
        <div className="mt-2 text-2xl font-bold text-gray-700">枚目を置いて</div>
      </div>

      {/* Tap instruction */}
      <div className="text-base text-gray-500">タップで次へ</div>
    </button>
  )
}
