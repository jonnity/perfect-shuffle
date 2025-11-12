import { fisherYatesShuffle } from "@/shared/utils/fisherYatesShuffle"
import { useCallback, useMemo, useState } from "react"

/**
 * useShuffle カスタムフック
 * Fisher-Yates アルゴリズムを使用してカードをシャッフルし、
 * 1枚ずつカードを引いていく機能を提供する
 *
 * @param totalCards - シャッフルするカードの総数
 * @returns シャッフル状態と操作関数
 */
export function useShuffle(totalCards: number) {
  // シャッフル順序を生成（初回のみ実行）
  const shuffleOrder = useMemo(() => fisherYatesShuffle(totalCards), [totalCards])

  // 残りのカード配列（まだ引かれていないカード）
  const [remainingCards, setRemainingCards] = useState<number[]>(shuffleOrder)

  // 現在のカードインデックス（0-indexed）
  const currentIndex = shuffleOrder.length - remainingCards.length

  // 現在のカード位置（1-indexed）
  // remainingCards の先頭要素が「現在引こうとしているカード」
  // その位置 = remainingCards[0] が shuffleOrder の何番目にあるか + 1
  const currentCardPosition = useMemo(() => {
    if (remainingCards.length === 0) {
      return 0 // 全カード引き終わった場合
    }
    const currentCard = remainingCards[0]
    return shuffleOrder.indexOf(currentCard) + 1
  }, [remainingCards, shuffleOrder])

  // 進捗情報
  const progress = {
    current: currentIndex,
    total: totalCards,
  }

  /**
   * 次のカードを引く
   * remainingCards から先頭要素を削除する
   */
  const nextCard = useCallback(() => {
    setRemainingCards((prev) => {
      if (prev.length === 0) {
        return prev // すでに全て引き終わっている場合は何もしない
      }
      return prev.slice(1) // 先頭要素を削除
    })
  }, [])

  /**
   * シャッフルをリセット
   * remainingCards を初期状態に戻す
   */
  const reset = useCallback(() => {
    setRemainingCards(shuffleOrder)
  }, [shuffleOrder])

  return {
    /** 現在のカード位置（1-indexed、シャッフル順序内での位置） */
    currentCardPosition,
    /** 残りのカード配列 */
    remainingCards,
    /** 進捗情報（current: 引いた枚数, total: 総枚数） */
    progress,
    /** 次のカードを引く関数 */
    nextCard,
    /** シャッフルをリセットする関数 */
    reset,
  }
}
