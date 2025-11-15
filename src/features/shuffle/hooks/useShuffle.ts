import { fisherYatesShuffle } from "@/shared/utils/fisherYatesShuffle"
import { useCallback, useMemo, useState } from "react"

/**
 * useShuffle カスタムフック
 * Fisher-Yates アルゴリズムを使用してカードのシャッフル順序を生成し、
 * ユーザーのカードシャッフル作業を補助する機能を提供する
 *
 * @param totalCards - シャッフルするカードの総数
 * @returns シャッフル状態と操作関数
 */
export function useShuffle(totalCards: number) {
  // シャッフル順序を生成（初回のみ実行）
  const shuffleOrder = useMemo(() => fisherYatesShuffle(totalCards), [totalCards])

  // 元の順序のカード配列を生成（初回のみ実行）
  const initialCards = useMemo(
    () => Array.from({ length: totalCards }, (_, i) => i + 1),
    [totalCards],
  )

  // 残りのカード配列（まだめくっていないカード）
  const [remainingCards, setRemainingCards] = useState<number[]>(initialCards)

  // 現在のカードインデックス（0-indexed）
  const currentIndex = totalCards - remainingCards.length

  // 現在のカード位置（1-indexed）
  // shuffleOrder[currentIndex] が「次に置くべきカード」
  // そのカードが remainingCards の何番目にあるか + 1
  const currentCardPosition = useMemo(() => {
    if (remainingCards.length === 0) {
      return 0 // 全カードめくり終わった場合
    }
    const nextCard = shuffleOrder[currentIndex]
    return remainingCards.indexOf(nextCard) + 1
  }, [remainingCards, shuffleOrder, currentIndex])

  // 進捗情報
  const progress = {
    current: Math.min(currentIndex + 1, totalCards), // 1-indexed (ユーザーには「1 / N」から表示)
    total: totalCards,
  }

  /**
   * 次のカードに進む
   * remainingCards から次に置くべきカードを削除する
   */
  const nextCard = useCallback(() => {
    setRemainingCards((prev) => {
      if (prev.length === 0) {
        return prev // すでに全てめくり終わっている場合は何もしない
      }
      const currentIdx = totalCards - prev.length
      const nextCardToRemove = shuffleOrder[currentIdx]
      const indexToRemove = prev.indexOf(nextCardToRemove)
      if (indexToRemove === -1) {
        return prev // カードが見つからない場合は何もしない
      }
      // 指定位置の要素を削除
      return [...prev.slice(0, indexToRemove), ...prev.slice(indexToRemove + 1)]
    })
  }, [shuffleOrder, totalCards])

  /**
   * シャッフルをリセット
   * remainingCards を初期状態に戻す
   */
  const reset = useCallback(() => {
    setRemainingCards(initialCards)
  }, [initialCards])

  return {
    /** 現在のカード位置（1-indexed、シャッフル順序内での位置） */
    currentCardPosition,
    /** 残りのカード配列 */
    remainingCards,
    /** 進捗情報（current: めくった枚数, total: 総枚数） */
    progress,
    /** 次のカードに進む関数 */
    nextCard,
    /** シャッフルをリセットする関数 */
    reset,
  }
}
