import { fisherYatesShuffle } from "@/shared/utils/fisherYatesShuffle"
import { useCallback, useMemo, useState } from "react"

/**
 * 3つの束（左・前・右）に分けてシャッフルするカスタムフック
 *
 * シャッフル順序を3等分し、各束に対して並行してカード配置を指示する
 * - 下1/3: 左の束
 * - 中1/3: 前の束
 * - 上1/3: 右の束
 *
 * @param totalCards - シャッフルするカードの総数
 * @returns シャッフル状態と操作関数
 */
export function useTripleShuffle(totalCards: number) {
  // シャッフル順序を生成（初回のみ実行）
  const shuffleOrder = useMemo(() => fisherYatesShuffle(totalCards), [totalCards])

  // 元の順序のカード配列を生成（初回のみ実行）
  const initialCards = useMemo(
    () => Array.from({ length: totalCards }, (_, i) => i + 1),
    [totalCards],
  )

  // 残りのカード配列（まだめくっていないカード）
  const [remainingCards, setRemainingCards] = useState<number[]>(initialCards)

  // 現在のラウンド（0から開始、3枚ごとに+1）
  const currentRound = Math.floor((totalCards - remainingCards.length) / 3)

  // 各束のカード数を計算
  const pileSize = Math.floor(totalCards / 3)
  const leftPileSize = pileSize + (totalCards % 3 > 0 ? 1 : 0) // 余りがある場合、左に1枚追加
  const centerPileSize = pileSize + (totalCards % 3 > 1 ? 1 : 0) // 余りが2以上の場合、中央に1枚追加

  // シャッフル順序を3つの束に分割
  // 下1/3を左、中1/3を前、上1/3を右
  const leftPile = useMemo(() => shuffleOrder.slice(0, leftPileSize), [shuffleOrder, leftPileSize])
  const centerPile = useMemo(
    () => shuffleOrder.slice(leftPileSize, leftPileSize + centerPileSize),
    [shuffleOrder, leftPileSize, centerPileSize],
  )
  const rightPile = useMemo(
    () => shuffleOrder.slice(leftPileSize + centerPileSize),
    [shuffleOrder, leftPileSize, centerPileSize],
  )

  // 現在のラウンドで配置すべきカードの位置を計算
  const getCurrentCardPositions = useCallback(() => {
    const positions = {
      left: 0,
      center: 0,
      right: 0,
    }

    // 各束の現在のインデックス（そのラウンドまでに配置したカード数）
    if (currentRound < leftPile.length) {
      const nextCard = leftPile[currentRound]
      positions.left = remainingCards.indexOf(nextCard) + 1
    }
    if (currentRound < centerPile.length) {
      const nextCard = centerPile[currentRound]
      positions.center = remainingCards.indexOf(nextCard) + 1
    }
    if (currentRound < rightPile.length) {
      const nextCard = rightPile[currentRound]
      positions.right = remainingCards.indexOf(nextCard) + 1
    }

    return positions
  }, [currentRound, leftPile, centerPile, rightPile, remainingCards])

  // 進捗情報
  const progress = {
    current: Math.min(totalCards - remainingCards.length, totalCards),
    total: totalCards,
  }

  // 現在のラウンドが完了しているか（3枚すべて配置済みか）
  const isRoundComplete = (totalCards - remainingCards.length) % 3 === 0

  // すべてのカード配置が完了したか
  const isAllComplete = remainingCards.length === 0

  /**
   * 次のカードに進む
   * 現在のラウンドで配置すべき3枚のカードをまとめて削除する
   */
  const nextRound = useCallback(() => {
    setRemainingCards((prev) => {
      if (prev.length === 0) {
        return prev // すでに全てめくり終わっている場合は何もしない
      }

      // 現在のラウンドで配置する最大3枚のカードを特定
      const round = Math.floor((totalCards - prev.length) / 3)
      const cardsToRemove: number[] = []

      // 左の束
      if (round < leftPile.length) {
        cardsToRemove.push(leftPile[round])
      }
      // 前の束
      if (round < centerPile.length) {
        cardsToRemove.push(centerPile[round])
      }
      // 右の束
      if (round < rightPile.length) {
        cardsToRemove.push(rightPile[round])
      }

      // 削除するカードをフィルタリング
      return prev.filter((card) => !cardsToRemove.includes(card))
    })
  }, [leftPile, centerPile, rightPile, totalCards])

  /**
   * シャッフルをリセット
   * remainingCards を初期状態に戻す
   */
  const reset = useCallback(() => {
    setRemainingCards(initialCards)
  }, [initialCards])

  return {
    /** 現在のラウンドで配置すべきカード位置（左・前・右） */
    currentCardPositions: getCurrentCardPositions(),
    /** 残りのカード配列 */
    remainingCards,
    /** 進捗情報（current: めくった枚数, total: 総枚数） */
    progress,
    /** 現在のラウンドが完了しているか */
    isRoundComplete,
    /** すべてのカード配置が完了したか */
    isAllComplete,
    /** 次のラウンドに進む関数 */
    nextRound,
    /** シャッフルをリセットする関数 */
    reset,
  }
}
