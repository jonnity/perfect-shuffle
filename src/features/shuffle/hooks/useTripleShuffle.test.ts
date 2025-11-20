import { renderHook } from "@testing-library/react"
import { act } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useTripleShuffle } from "./useTripleShuffle"

// fisherYatesShuffle のモック
vi.mock("@/shared/utils/fisherYatesShuffle", () => ({
  fisherYatesShuffle: (n: number) => {
    // テスト用に固定順序を返す（1, 2, 3, ..., n）
    return Array.from({ length: n }, (_, i) => i + 1)
  },
}))

describe("useTripleShuffle", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("初期状態では3つの束のカード位置が正しく計算される", () => {
    const { result } = renderHook(() => useTripleShuffle(9))

    // 9枚のカードを3等分: 左3枚、前3枚、右3枚
    // シャッフル順序: [1,2,3,4,5,6,7,8,9]
    // 左の束: [1,2,3]、前の束: [4,5,6]、右の束: [7,8,9]
    // 初回ラウンド: 左1枚目(1)、前4枚目(4)、右7枚目(7)
    expect(result.current.currentCardPositions.left).toBe(1)
    expect(result.current.currentCardPositions.center).toBe(4)
    expect(result.current.currentCardPositions.right).toBe(7)
    expect(result.current.remainingCards).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(result.current.progress).toEqual({ current: 0, total: 9 })
    expect(result.current.isAllComplete).toBe(false)
  })

  it("nextRound を呼ぶと3つの束から同時にカードが削除される", () => {
    const { result } = renderHook(() => useTripleShuffle(9))

    act(() => {
      result.current.nextRound()
    })

    // 1, 4, 7 が削除されて [2,3,5,6,8,9] になる
    expect(result.current.remainingCards).toEqual([2, 3, 5, 6, 8, 9])
    expect(result.current.progress).toEqual({ current: 3, total: 9 })

    // 次のラウンド: 左2枚目(2)、前4枚目(5)、右6枚目(8)
    expect(result.current.currentCardPositions.left).toBe(1) // 残りの中で2は1番目
    expect(result.current.currentCardPositions.center).toBe(3) // 残りの中で5は3番目
    expect(result.current.currentCardPositions.right).toBe(5) // 残りの中で8は5番目
  })

  it("すべてのカードを配置すると isAllComplete が true になる", () => {
    const { result } = renderHook(() => useTripleShuffle(9))

    // 3ラウンド繰り返す
    act(() => {
      result.current.nextRound()
    })
    act(() => {
      result.current.nextRound()
    })
    act(() => {
      result.current.nextRound()
    })

    expect(result.current.remainingCards).toEqual([])
    expect(result.current.isAllComplete).toBe(true)
    expect(result.current.progress).toEqual({ current: 9, total: 9 })
  })

  it("カード数が3で割り切れない場合、余りが左と前の束に振り分けられる", () => {
    const { result } = renderHook(() => useTripleShuffle(10))

    // 10枚のカードを3等分: 左4枚、前3枚、右3枚
    // シャッフル順序: [1,2,3,4,5,6,7,8,9,10]
    // 左の束: [1,2,3,4]、前の束: [5,6,7]、右の束: [8,9,10]
    // 初回ラウンド: 左1枚目(1)、前5枚目(5)、右8枚目(8)
    expect(result.current.currentCardPositions.left).toBe(1)
    expect(result.current.currentCardPositions.center).toBe(5)
    expect(result.current.currentCardPositions.right).toBe(8)
  })

  it("reset を呼ぶと初期状態に戻る", () => {
    const { result } = renderHook(() => useTripleShuffle(9))

    act(() => {
      result.current.nextRound()
    })

    expect(result.current.remainingCards).toEqual([2, 3, 5, 6, 8, 9])

    act(() => {
      result.current.reset()
    })

    expect(result.current.remainingCards).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(result.current.progress).toEqual({ current: 0, total: 9 })
  })

  it("残りカードが0の場合、nextRoundを呼んでも変化しない", () => {
    const { result } = renderHook(() => useTripleShuffle(3))

    // 1ラウンドで全て配置
    act(() => {
      result.current.nextRound()
    })

    expect(result.current.isAllComplete).toBe(true)

    // もう一度呼んでも変化しない
    act(() => {
      result.current.nextRound()
    })

    expect(result.current.remainingCards).toEqual([])
    expect(result.current.isAllComplete).toBe(true)
  })
})
