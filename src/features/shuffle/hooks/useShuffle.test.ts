import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useShuffle } from "./useShuffle"

describe("useShuffle", () => {
  // Math.random をモック化して決定的なシャッフルを生成
  beforeEach(() => {
    let callCount = 0
    vi.spyOn(Math, "random").mockImplementation(() => {
      // 簡単なシャッフルパターンを生成
      // totalCards=5 の場合: [3, 1, 5, 2, 4] のような順序になる
      callCount++
      return callCount % 2 === 0 ? 0.1 : 0.9
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("初期化", () => {
    it("指定された枚数でシャッフル順序を生成する", () => {
      const { result } = renderHook(() => useShuffle(5))

      expect(result.current.remainingCards).toHaveLength(5)
      expect(result.current.progress.total).toBe(5)
      expect(result.current.progress.current).toBe(0)
    })

    it("currentCardPosition が正しく計算される", () => {
      const { result } = renderHook(() => useShuffle(5))

      // 最初のカードの位置は 1 以上
      expect(result.current.currentCardPosition).toBeGreaterThanOrEqual(1)
      expect(result.current.currentCardPosition).toBeLessThanOrEqual(5)
    })

    it("remainingCards が元の順序 [1,2,3,...,n] で初期化される", () => {
      const { result } = renderHook(() => useShuffle(3))

      // remainingCards は [1, 2, 3] の順序で初期化される
      expect(result.current.remainingCards).toEqual([1, 2, 3])
    })
  })

  describe("nextCard", () => {
    it("nextCard を呼ぶと remainingCards から次に置くべきカードが削除される（次のカードに進む）", () => {
      const { result } = renderHook(() => useShuffle(5))

      const initialLength = result.current.remainingCards.length
      const initialPosition = result.current.currentCardPosition
      // currentCardPosition の位置にあるカードが削除される
      const cardToRemove = result.current.remainingCards[initialPosition - 1]

      act(() => {
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(initialLength - 1)
      expect(result.current.remainingCards).not.toContain(cardToRemove)
    })

    it("nextCard を複数回呼ぶと remainingCards が順次減少する", () => {
      const { result } = renderHook(() => useShuffle(5))

      act(() => {
        result.current.nextCard()
      })
      expect(result.current.remainingCards).toHaveLength(4)

      act(() => {
        result.current.nextCard()
      })
      expect(result.current.remainingCards).toHaveLength(3)

      act(() => {
        result.current.nextCard()
      })
      expect(result.current.remainingCards).toHaveLength(2)
    })

    it("全てのカードをめくり終わった後は remainingCards が空配列になる", () => {
      const { result } = renderHook(() => useShuffle(3))

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(0)
      expect(result.current.currentCardPosition).toBe(0)
    })

    it("全てのカードをめくり終わった後に nextCard を呼んでも何も起きない", () => {
      const { result } = renderHook(() => useShuffle(2))

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(0)

      act(() => {
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(0)
    })
  })

  describe("progress", () => {
    it("progress.current が nextCard で増加する", () => {
      const { result } = renderHook(() => useShuffle(5))

      expect(result.current.progress.current).toBe(0)

      act(() => {
        result.current.nextCard()
      })
      expect(result.current.progress.current).toBe(1)

      act(() => {
        result.current.nextCard()
      })
      expect(result.current.progress.current).toBe(2)
    })

    it("progress.total は常に totalCards と一致する", () => {
      const { result } = renderHook(() => useShuffle(10))

      expect(result.current.progress.total).toBe(10)

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.progress.total).toBe(10)
    })

    it("全てのカードをめくり終わると progress.current === progress.total になる", () => {
      const { result } = renderHook(() => useShuffle(3))

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.progress.current).toBe(result.current.progress.total)
    })
  })

  describe("currentCardPosition", () => {
    it("currentCardPosition は remainingCards の先頭要素のシャッフル順序内の位置を表す", () => {
      const { result } = renderHook(() => useShuffle(5))

      const firstCardPosition = result.current.currentCardPosition

      // 位置は 1-indexed で 1〜5 の範囲内
      expect(firstCardPosition).toBeGreaterThanOrEqual(1)
      expect(firstCardPosition).toBeLessThanOrEqual(5)
    })

    it("nextCard を呼ぶと currentCardPosition が次のカードの位置に更新される", () => {
      const { result } = renderHook(() => useShuffle(5))

      const firstPosition = result.current.currentCardPosition

      act(() => {
        result.current.nextCard()
      })

      const secondPosition = result.current.currentCardPosition

      // 位置は変わる（シャッフルされているため）
      expect(secondPosition).toBeGreaterThanOrEqual(1)
      expect(secondPosition).toBeLessThanOrEqual(5)
      // 異なる位置になる可能性が高い（確定的ではないが、このテストでは変わる）
      expect(secondPosition).not.toBe(firstPosition)
    })

    it("全てのカードをめくり終わると currentCardPosition は 0 になる", () => {
      const { result } = renderHook(() => useShuffle(2))

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.currentCardPosition).toBe(0)
    })
  })

  describe("reset", () => {
    it("reset を呼ぶと remainingCards が初期状態に戻る", () => {
      const { result } = renderHook(() => useShuffle(5))

      const initialCards = [...result.current.remainingCards]

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(3)

      act(() => {
        result.current.reset()
      })

      expect(result.current.remainingCards).toEqual(initialCards)
      expect(result.current.remainingCards).toHaveLength(5)
    })

    it("reset を呼ぶと progress.current が 0 に戻る", () => {
      const { result } = renderHook(() => useShuffle(5))

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.progress.current).toBe(3)

      act(() => {
        result.current.reset()
      })

      expect(result.current.progress.current).toBe(0)
    })

    it("全てのカードをめくり終わった後に reset を呼ぶと初期状態に戻る", () => {
      const { result } = renderHook(() => useShuffle(3))

      act(() => {
        result.current.nextCard()
        result.current.nextCard()
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(0)

      act(() => {
        result.current.reset()
      })

      expect(result.current.remainingCards).toHaveLength(3)
      expect(result.current.progress.current).toBe(0)
    })
  })

  describe("エッジケース", () => {
    it("totalCards が 1 の場合も正しく動作する", () => {
      const { result } = renderHook(() => useShuffle(1))

      expect(result.current.remainingCards).toHaveLength(1)
      expect(result.current.remainingCards[0]).toBe(1)
      expect(result.current.currentCardPosition).toBe(1)

      act(() => {
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(0)
      expect(result.current.currentCardPosition).toBe(0)
      expect(result.current.progress.current).toBe(1)
    })

    it("totalCards が大きい数値でも正しく動作する", () => {
      const { result } = renderHook(() => useShuffle(99))

      expect(result.current.remainingCards).toHaveLength(99)
      expect(result.current.progress.total).toBe(99)

      act(() => {
        result.current.nextCard()
      })

      expect(result.current.remainingCards).toHaveLength(98)
      expect(result.current.progress.current).toBe(1)
    })
  })
})
