/**
 * Type definitions for Perfect Shuffle application
 */

// CardCount type and validation constraints
export type CardCount = number

export const MIN_CARD_COUNT = 1
export const MAX_CARD_COUNT = 99
export const DEFAULT_CARD_COUNT = 60
export const QUICK_SELECT_OPTIONS = [40, 60, 99] as const

// ShuffleResult interface
export interface ShuffleResult {
  // シャッフル後の各位置に配置されるカードの元の位置（1-indexed）
  order: number[]
}

// ShuffleState interface (Context State)
export interface ShuffleState {
  cardCount: number
  shuffleResult: ShuffleResult | null
}
