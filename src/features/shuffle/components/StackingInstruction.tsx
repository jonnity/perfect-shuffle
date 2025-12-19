/**
 * 3つの束を重ねる指示を表示するコンポーネント
 *
 * すべてのカード配置が完了した後、右・真ん中・左の順に重ねる指示を表示する
 */
export function StackingInstruction() {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-8 py-8"
      role="status"
      aria-live="polite"
    >
      {/* タイトル */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">3つの束を重ねましょう</h2>
      </div>

      {/* 重ねる順序を視覚的に表示 */}
      <div className="flex flex-col items-center gap-3">
        <PileBox label="右" position="一番上" />
        <div className="text-2xl text-gray-400">↓</div>
        <PileBox label="真ん中" position="真ん中" />
        <div className="text-2xl text-gray-400">↓</div>
        <PileBox label="左" position="一番下" />
      </div>

      {/* タップ指示 */}
      <div className="text-sm text-gray-500" aria-label="タップまたはEnterキーで完了画面に進む">
        タップで完了
      </div>
    </div>
  )
}

interface PileBoxProps {
  label: string
  position: string
}

/**
 * 1つの束を表示するボックス
 */
function PileBox({ label, position }: PileBoxProps) {
  return (
    <div className="flex w-48 items-center justify-between rounded-lg border-2 border-gray-300 bg-white px-4 py-3 shadow-sm">
      <div className="text-lg font-bold text-gray-900">{label}の束</div>
      <div className="text-sm text-gray-500">{position}</div>
    </div>
  )
}
