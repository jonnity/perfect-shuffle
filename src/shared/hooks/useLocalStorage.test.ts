import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useLocalStorage } from "./useLocalStorage"

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear()
    // Clear console.warn mock
    vi.restoreAllMocks()
  })

  describe("初期値の読み込み", () => {
    it("LocalStorage に値がない場合、initialValue を使用する", () => {
      const { result } = renderHook(() => useLocalStorage("testKey", "defaultValue"))

      expect(result.current[0]).toBe("defaultValue")
    })

    it("LocalStorage に値がある場合、その値を使用する", () => {
      window.localStorage.setItem("testKey", JSON.stringify("storedValue"))

      const { result } = renderHook(() => useLocalStorage("testKey", "defaultValue"))

      expect(result.current[0]).toBe("storedValue")
    })

    it("数値型の値を正しく読み込める", () => {
      window.localStorage.setItem("numberKey", JSON.stringify(42))

      const { result } = renderHook(() => useLocalStorage("numberKey", 0))

      expect(result.current[0]).toBe(42)
    })

    it("オブジェクト型の値を正しく読み込める", () => {
      const testObject = { id: 1, name: "Test User" }
      window.localStorage.setItem("objectKey", JSON.stringify(testObject))

      const { result } = renderHook(() => useLocalStorage("objectKey", { id: 0, name: "" }))

      expect(result.current[0]).toEqual(testObject)
    })

    it("配列型の値を正しく読み込める", () => {
      const testArray = ["item1", "item2", "item3"]
      window.localStorage.setItem("arrayKey", JSON.stringify(testArray))

      const { result } = renderHook(() => useLocalStorage<string[]>("arrayKey", []))

      expect(result.current[0]).toEqual(testArray)
    })
  })

  describe("値の書き込み", () => {
    it("setValue で値を更新すると LocalStorage に保存される", () => {
      const { result } = renderHook(() => useLocalStorage("testKey", "initial"))

      act(() => {
        result.current[1]("updated")
      })

      expect(result.current[0]).toBe("updated")
      expect(window.localStorage.getItem("testKey")).toBe(JSON.stringify("updated"))
    })

    it("数値型の値を正しく保存できる", () => {
      const { result } = renderHook(() => useLocalStorage("numberKey", 0))

      act(() => {
        result.current[1](100)
      })

      expect(result.current[0]).toBe(100)
      expect(window.localStorage.getItem("numberKey")).toBe(JSON.stringify(100))
    })

    it("オブジェクト型の値を正しく保存できる", () => {
      const { result } = renderHook(() => useLocalStorage("objectKey", { id: 0, name: "" }))

      const newObject = { id: 1, name: "Updated User" }

      act(() => {
        result.current[1](newObject)
      })

      expect(result.current[0]).toEqual(newObject)
      expect(window.localStorage.getItem("objectKey")).toBe(JSON.stringify(newObject))
    })

    it("配列型の値を正しく保存できる", () => {
      const { result } = renderHook(() => useLocalStorage<string[]>("arrayKey", []))

      const newArray = ["new1", "new2"]

      act(() => {
        result.current[1](newArray)
      })

      expect(result.current[0]).toEqual(newArray)
      expect(window.localStorage.getItem("arrayKey")).toBe(JSON.stringify(newArray))
    })

    it("関数形式で値を更新できる（useState と同じ API）", () => {
      const { result } = renderHook(() => useLocalStorage("counterKey", 0))

      act(() => {
        result.current[1]((prev) => prev + 1)
      })

      expect(result.current[0]).toBe(1)

      act(() => {
        result.current[1]((prev) => prev + 1)
      })

      expect(result.current[0]).toBe(2)
      expect(window.localStorage.getItem("counterKey")).toBe(JSON.stringify(2))
    })
  })

  describe("エラーハンドリング - 読み込み時", () => {
    it("LocalStorage の読み込みに失敗した場合、initialValue を使用する", () => {
      // 不正な JSON を設定
      window.localStorage.setItem("invalidKey", "{ invalid json }")

      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

      const { result } = renderHook(() => useLocalStorage("invalidKey", "fallback"))

      expect(result.current[0]).toBe("fallback")
      expect(consoleWarnSpy).toHaveBeenCalled()
    })

    it("LocalStorage が利用できない場合、initialValue を使用する", () => {
      // localStorage.getItem をモック
      const originalGetItem = Storage.prototype.getItem
      Storage.prototype.getItem = vi.fn(() => {
        throw new Error("LocalStorage not available")
      })

      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

      const { result } = renderHook(() => useLocalStorage("testKey", "fallback"))

      expect(result.current[0]).toBe("fallback")
      expect(consoleWarnSpy).toHaveBeenCalled()

      // モックを復元
      Storage.prototype.getItem = originalGetItem
    })
  })

  describe("エラーハンドリング - 書き込み時", () => {
    it("LocalStorage への書き込みに失敗しても、メモリ内の状態は更新される", () => {
      // localStorage.setItem をモック
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error("LocalStorage write failed")
      })

      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})

      const { result } = renderHook(() => useLocalStorage("testKey", "initial"))

      act(() => {
        result.current[1]("updated")
      })

      // メモリ内の状態は更新される
      expect(result.current[0]).toBe("updated")
      expect(consoleWarnSpy).toHaveBeenCalled()

      // モックを復元
      Storage.prototype.setItem = originalSetItem
    })

    it("書き込みエラー時も関数形式の更新が動作する", () => {
      // localStorage.setItem をモック
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error("LocalStorage write failed")
      })

      vi.spyOn(console, "warn").mockImplementation(() => {})

      const { result } = renderHook(() => useLocalStorage("counterKey", 0))

      act(() => {
        result.current[1]((prev) => prev + 1)
      })

      // メモリ内の状態は更新される
      expect(result.current[0]).toBe(1)

      // モックを復元
      Storage.prototype.setItem = originalSetItem
    })
  })

  describe("複数インスタンス", () => {
    it("同じキーで複数のフックインスタンスを作成できる", () => {
      const { result: result1 } = renderHook(() => useLocalStorage("sharedKey", "initial"))
      const { result: result2 } = renderHook(() => useLocalStorage("sharedKey", "initial"))

      // 初期値は LocalStorage から読み込まれた同じ値
      expect(result1.current[0]).toBe("initial")
      expect(result2.current[0]).toBe("initial")

      // 一方を更新
      act(() => {
        result1.current[1]("updated")
      })

      expect(result1.current[0]).toBe("updated")
      // 注: result2 は自動的には同期されない（これは React の状態管理の仕様）
    })
  })

  describe("データ型のサポート", () => {
    it("boolean 型の値を扱える", () => {
      const { result } = renderHook(() => useLocalStorage("boolKey", false))

      act(() => {
        result.current[1](true)
      })

      expect(result.current[0]).toBe(true)
      expect(window.localStorage.getItem("boolKey")).toBe(JSON.stringify(true))
    })

    it("null 値を扱える", () => {
      const { result } = renderHook(() => useLocalStorage<string | null>("nullKey", null))

      expect(result.current[0]).toBe(null)

      act(() => {
        result.current[1]("notNull")
      })

      expect(result.current[0]).toBe("notNull")
    })

    it("複雑なネストされたオブジェクトを扱える", () => {
      interface ComplexObject {
        user: {
          id: number
          profile: {
            name: string
            tags: string[]
          }
        }
      }

      const complexData: ComplexObject = {
        user: {
          id: 1,
          profile: {
            name: "Test User",
            tags: ["tag1", "tag2"],
          },
        },
      }

      const { result } = renderHook(() =>
        useLocalStorage<ComplexObject>("complexKey", {
          user: { id: 0, profile: { name: "", tags: [] } },
        }),
      )

      act(() => {
        result.current[1](complexData)
      })

      expect(result.current[0]).toEqual(complexData)
      expect(window.localStorage.getItem("complexKey")).toBe(JSON.stringify(complexData))
    })
  })
})
