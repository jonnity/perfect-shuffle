/**
 * ProgressIndicator - シャッフル進捗表示コンポーネント
 *
 * 「X/N」形式で現在の進捗を表示します。
 * 画面上部エリアに配置されます。
 */

export interface ProgressIndicatorProps {
  /** 現在の番号 */
  current: number
  /** 総枚数 */
  total: number
}

/**
 * 進捗表示コンポーネント
 * @param props - current: 現在の番号, total: 総枚数
 * @returns 進捗表示 UI
 */
export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div
      className="text-tertiary-content text-2xl"
      role="status"
      aria-live="polite"
      aria-label={`進捗: ${current}枚目 / 全${total}枚`}
    >
      {current} / {total}
    </div>
  )
}
