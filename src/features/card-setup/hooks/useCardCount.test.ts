import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { useCardCount } from "./useCardCount"

describe("useCardCount", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear()
  })

  describe("初期値の読み込み", () => {
    it("LocalStorage に値がない場合、デフォルト値 60 を使用する", () => {
      const { result } = renderHook(() => useCardCount())

      expect(result.current.cardCount).toBe(60)
    })

    it("LocalStorage に値がある場合、その値を使用する", () => {
      window.localStorage.setItem("cardCount", JSON.stringify(45))

      const { result } = renderHook(() => useCardCount())

      expect(result.current.cardCount).toBe(45)
    })

    it("LocalStorage に無効な値がある場合、デフォルト値 60 を使用する", () => {
      window.localStorage.setItem("cardCount", JSON.stringify(150))

      const { result } = renderHook(() => useCardCount())

      expect(result.current.cardCount).toBe(60)
    })
  })

  describe("increment 関数", () => {
    it("カード枚数を1増やす", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.increment()
      })

      expect(result.current.cardCount).toBe(61)
    })

    it("上限値（99）を超えない", () => {
      window.localStorage.setItem("cardCount", JSON.stringify(99))
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.increment()
      })

      expect(result.current.cardCount).toBe(99)
    })

    it("複数回呼び出すと累積して増える", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.increment()
        result.current.increment()
        result.current.increment()
      })

      expect(result.current.cardCount).toBe(63)
    })

    it("LocalStorage には即座に保存されない", () => {
      const { result } = renderHook(() => useCardCount())

      // 初期値が保存される
      const initialValue = window.localStorage.getItem("cardCount")

      act(() => {
        result.current.increment()
      })

      // increment後も初期値のまま（保存されていない）
      expect(window.localStorage.getItem("cardCount")).toBe(initialValue)
    })
  })

  describe("decrement 関数", () => {
    it("カード枚数を1減らす", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.decrement()
      })

      expect(result.current.cardCount).toBe(59)
    })

    it("下限値（1）を下回らない", () => {
      window.localStorage.setItem("cardCount", JSON.stringify(1))
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.decrement()
      })

      expect(result.current.cardCount).toBe(1)
    })

    it("複数回呼び出すと累積して減る", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.decrement()
        result.current.decrement()
        result.current.decrement()
      })

      expect(result.current.cardCount).toBe(57)
    })

    it("LocalStorage には即座に保存されない", () => {
      const { result } = renderHook(() => useCardCount())

      const initialValue = window.localStorage.getItem("cardCount")

      act(() => {
        result.current.decrement()
      })

      expect(window.localStorage.getItem("cardCount")).toBe(initialValue)
    })
  })

  describe("setQuickSelect 関数", () => {
    it("40枚に設定できる", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.setQuickSelect(40)
      })

      expect(result.current.cardCount).toBe(40)
    })

    it("60枚に設定できる", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.setQuickSelect(60)
      })

      expect(result.current.cardCount).toBe(60)
    })

    it("99枚に設定できる", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.setQuickSelect(99)
      })

      expect(result.current.cardCount).toBe(99)
    })

    it("無効な値（0）はデフォルト値 60 に補正される", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.setQuickSelect(0)
      })

      expect(result.current.cardCount).toBe(60)
    })

    it("無効な値（100）はデフォルト値 60 に補正される", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.setQuickSelect(100)
      })

      expect(result.current.cardCount).toBe(60)
    })

    it("LocalStorage には即座に保存されない", () => {
      const { result } = renderHook(() => useCardCount())

      const initialValue = window.localStorage.getItem("cardCount")

      act(() => {
        result.current.setQuickSelect(40)
      })

      expect(window.localStorage.getItem("cardCount")).toBe(initialValue)
    })
  })

  describe("saveCardCount 関数", () => {
    it("現在のカード枚数を LocalStorage に保存する", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.increment()
        result.current.increment()
      })

      expect(result.current.cardCount).toBe(62)

      act(() => {
        result.current.saveCardCount()
      })

      expect(window.localStorage.getItem("cardCount")).toBe(JSON.stringify(62))
    })

    it("setQuickSelect で設定した値を保存できる", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.setQuickSelect(40)
      })

      act(() => {
        result.current.saveCardCount()
      })

      expect(window.localStorage.getItem("cardCount")).toBe(JSON.stringify(40))
    })

    it("バリデーションを通過した値のみ保存される", () => {
      const { result } = renderHook(() => useCardCount())

      // 有効な値を設定して保存
      act(() => {
        result.current.setQuickSelect(99)
      })

      act(() => {
        result.current.saveCardCount()
      })

      expect(window.localStorage.getItem("cardCount")).toBe(JSON.stringify(99))
    })
  })

  describe("統合テスト", () => {
    it("increment → decrement → saveCardCount の一連の操作が正しく動作する", () => {
      const { result } = renderHook(() => useCardCount())

      act(() => {
        result.current.increment()
        result.current.increment()
        result.current.increment()
        result.current.decrement()
      })

      expect(result.current.cardCount).toBe(62)

      act(() => {
        result.current.saveCardCount()
      })

      expect(window.localStorage.getItem("cardCount")).toBe(JSON.stringify(62))
    })

    it("保存後に再マウントすると保存された値が読み込まれる", () => {
      const { result, unmount } = renderHook(() => useCardCount())

      act(() => {
        result.current.setQuickSelect(40)
      })

      act(() => {
        result.current.saveCardCount()
      })

      unmount()

      const { result: result2 } = renderHook(() => useCardCount())

      expect(result2.current.cardCount).toBe(40)
    })

    it("保存せずに再マウントすると前回保存した値が読み込まれる", () => {
      window.localStorage.setItem("cardCount", JSON.stringify(75))
      const { result, unmount } = renderHook(() => useCardCount())

      act(() => {
        result.current.increment()
        result.current.increment()
        // saveCardCount を呼ばない
      })

      expect(result.current.cardCount).toBe(77)

      unmount()

      const { result: result2 } = renderHook(() => useCardCount())

      // 保存していないので、前回の値（75）が読み込まれる
      expect(result2.current.cardCount).toBe(75)
    })
  })
})
