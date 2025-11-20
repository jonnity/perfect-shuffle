interface TripleShuffleDisplayProps {
  leftPosition: number
  centerPosition: number
  rightPosition: number
}

/**
 * 3つの束を表示するシャッフルコンポーネント
 *
 * 左・前・右の3つの束に対して、それぞれ「上からn枚目を置いて」と指示を表示する
 *
 * @param leftPosition - 左の束に置くカードの位置（0の場合は配置済み）
 * @param centerPosition - 前の束に置くカードの位置（0の場合は配置済み）
 * @param rightPosition - 右の束に置くカードの位置（0の場合は配置済み）
 */
export function TripleShuffleDisplay({
  leftPosition,
  centerPosition,
  rightPosition,
}: TripleShuffleDisplayProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-8 py-8"
      role="status"
      aria-live="polite"
    >
      {/* 3つの束を横並びで表示 */}
      <div className="grid w-full grid-cols-3 gap-4">
        {/* 左の束 */}
        <PileDisplay position={leftPosition} label="左" />

        {/* 前の束 */}
        <PileDisplay position={centerPosition} label="前" />

        {/* 右の束 */}
        <PileDisplay position={rightPosition} label="右" />
      </div>

      {/* タップ指示 */}
      <div className="text-sm text-gray-500" aria-label="タップまたはEnterキーで次のラウンドに進む">
        タップで次へ
      </div>
    </div>
  )
}

interface PileDisplayProps {
  position: number
  label: string
}

/**
 * 1つの束の表示コンポーネント
 */
function PileDisplay({ position, label }: PileDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* 束のラベル */}
      <div className="text-xs text-gray-500">{label}</div>

      {/* カード位置または完了マーク */}
      {position > 0 ? (
        <div
          className="text-center"
          aria-label={`${label}の束に上から${position}枚目を置いてください`}
        >
          <div className="text-xs text-gray-600">上から</div>
          <div className="text-4xl font-extrabold text-gray-900">{position}</div>
          <div className="text-xs font-bold text-gray-700">枚目</div>
        </div>
      ) : (
        <div className="flex h-20 items-center justify-center text-2xl text-gray-400">✓</div>
      )}
    </div>
  )
}
