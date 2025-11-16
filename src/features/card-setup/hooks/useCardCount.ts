import { useLocalStorage } from "@/shared/hooks/useLocalStorage"
import { CardCount } from "@/shared/utils/validateCardCount"
import { DEFAULT_CARD_COUNT, MAX_CARD_COUNT, MIN_CARD_COUNT } from "@/types"
import { useState } from "react"

/**
 * カード枚数の状態管理を行うカスタムフック
 *
 * このフックは LocalStorage を使用してカード枚数を永続化し、
 * カード枚数の増減やクイック選択などの操作を提供します。
 *
 * 特徴:
 * - LocalStorage による永続化（saveCardCount 呼び出し時のみ）
 * - 境界チェック付きの increment/decrement 関数
 * - クイック選択機能（40/60/99）
 * - バリデーション機能を活用
 *
 * 動作:
 * - increment/decrement/setQuickSelect はメモリ上の状態のみを更新
 * - saveCardCount を呼び出した時に LocalStorage に永続化
 * - マウント時に LocalStorage から前回の値を読み込み
 *
 * @returns カード枚数の状態と操作関数
 *
 * @example
 * const { cardCount, increment, decrement, setQuickSelect, saveCardCount } = useCardCount();
 *
 * // カード枚数を増やす（メモリ上のみ）
 * increment();
 *
 * // カード枚数を減らす（メモリ上のみ）
 * decrement();
 *
 * // クイック選択で40枚に設定（メモリ上のみ）
 * setQuickSelect(40);
 *
 * // スタートボタンクリック時に LocalStorage に保存
 * saveCardCount();
 */
export function useCardCount() {
  // LocalStorage から初期値を読み込み
  const [persistedCount, setPersistedCount] = useLocalStorage<number>(
    "cardCount",
    DEFAULT_CARD_COUNT,
  )

  // メモリ上の状態（increment/decrement で即座に更新）
  // バリデーションを通して初期化
  const [cardCount, setCardCount] = useState<number>(() => {
    const validated = CardCount.create(persistedCount)
    return validated.value
  })

  /**
   * カード枚数を1増やす（上限: 99）
   */
  const increment = () => {
    setCardCount((prevCount) => {
      const newCount = prevCount + 1
      return newCount > MAX_CARD_COUNT ? MAX_CARD_COUNT : newCount
    })
  }

  /**
   * カード枚数を1減らす（下限: 1）
   */
  const decrement = () => {
    setCardCount((prevCount) => {
      const newCount = prevCount - 1
      return newCount < MIN_CARD_COUNT ? MIN_CARD_COUNT : newCount
    })
  }

  /**
   * クイック選択でカード枚数を設定（メモリ上のみ）
   * 有効な値: 40, 60, 99
   *
   * @param count - 設定するカード枚数
   */
  const setQuickSelect = (count: number) => {
    const validatedCount = CardCount.create(count)
    setCardCount(validatedCount.value)
  }

  /**
   * カード枚数を LocalStorage に保存
   * スタートボタンクリック時に呼び出す
   * バリデーションを通過した値のみ保存される
   */
  const saveCardCount = () => {
    const validatedCount = CardCount.create(cardCount)
    // LocalStorage に保存
    setPersistedCount(validatedCount.value)
  }

  return {
    cardCount,
    increment,
    decrement,
    setQuickSelect,
    saveCardCount,
  }
}
