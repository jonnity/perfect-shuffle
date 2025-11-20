/**
 * 3つの束を重ねる指示を表示するコンポーネント
 *
 * すべてのカード配置が完了した後、右・前・左の順に重ねる指示を表示する
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

      {/* 重ねる順序の指示 */}
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InstructionStep step={1} text="右の束を手に取る" />
        <InstructionStep step={2} text="前の束を右の束の下に重ねる" />
        <InstructionStep step={3} text="左の束を一番下に重ねる" />
      </div>

      {/* 完了説明 */}
      <div className="text-center text-sm text-gray-600">
        <p>右の束が一番上に、</p>
        <p>前の束が真ん中に、</p>
        <p>左の束が一番下になります</p>
      </div>

      {/* タップ指示 */}
      <div className="text-sm text-gray-500" aria-label="タップまたはEnterキーで完了画面に進む">
        タップで完了
      </div>
    </div>
  )
}

interface InstructionStepProps {
  step: number
  text: string
}

/**
 * 1つの指示ステップ
 */
function InstructionStep({ step, text }: InstructionStepProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
        {step}
      </div>
      <div className="text-base text-gray-700">{text}</div>
    </div>
  )
}
