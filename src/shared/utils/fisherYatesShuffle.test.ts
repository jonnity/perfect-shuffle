import { describe, expect, it } from "vitest"
import { fisherYatesShuffle } from "./fisherYatesShuffle"

describe("fisherYatesShuffle", () => {
  describe("基本的な機能", () => {
    it("指定された枚数の配列を返す", () => {
      const result = fisherYatesShuffle(10)
      expect(result).toHaveLength(10)
    })

    it("1から指定された枚数までの数字がすべて含まれる", () => {
      const count = 10
      const result = fisherYatesShuffle(count)
      const sorted = [...result].sort((a, b) => a - b)

      // 1からcountまでの配列と一致するか確認
      expect(sorted).toEqual(Array.from({ length: count }, (_, i) => i + 1))
    })

    it("各数字が正確に1回だけ出現する", () => {
      const result = fisherYatesShuffle(20)
      const uniqueNumbers = new Set(result)

      expect(uniqueNumbers.size).toBe(result.length)
    })

    it("1枚のカードの場合は[1]を返す", () => {
      const result = fisherYatesShuffle(1)
      expect(result).toEqual([1])
    })
  })

  describe("シャッフルのランダム性", () => {
    it("複数回実行すると異なる結果が生成される（確率的テスト）", () => {
      const results = new Set<string>()
      const iterations = 100

      for (let i = 0; i < iterations; i++) {
        const shuffled = fisherYatesShuffle(10)
        results.add(JSON.stringify(shuffled))
      }

      // 100回実行して、少なくとも90種類以上の異なる順列が生成されることを期待
      // （完全にランダムであれば、ほぼ100種類すべて異なるはず）
      expect(results.size).toBeGreaterThan(90)
    })

    it("元の順序[1,2,3,...]と異なる結果が高確率で生成される", () => {
      const original = Array.from({ length: 10 }, (_, i) => i + 1)
      let differentCount = 0

      // 50回実行
      for (let i = 0; i < 50; i++) {
        const shuffled = fisherYatesShuffle(10)
        if (JSON.stringify(shuffled) !== JSON.stringify(original)) {
          differentCount++
        }
      }

      // 少なくとも45回以上は元の順序と異なるはず
      // （元の順序になる確率は 1/10! ≈ 0.0000028%）
      expect(differentCount).toBeGreaterThan(45)
    })
  })

  describe("境界値テスト", () => {
    it("99枚（最大枚数）で正しく動作する", () => {
      const result = fisherYatesShuffle(99)
      expect(result).toHaveLength(99)

      const sorted = [...result].sort((a, b) => a - b)
      expect(sorted).toEqual(Array.from({ length: 99 }, (_, i) => i + 1))
    })

    it("2枚の場合、[1,2]または[2,1]のいずれかを返す", () => {
      const result = fisherYatesShuffle(2)
      expect(result).toHaveLength(2)
      expect(result).toSatisfy((arr: number[]) => {
        return (
          JSON.stringify(arr) === JSON.stringify([1, 2]) ||
          JSON.stringify(arr) === JSON.stringify([2, 1])
        )
      })
    })
  })

  describe("パフォーマンス要件", () => {
    it("99枚のカードで100ms未満で実行される", () => {
      const startTime = performance.now()
      fisherYatesShuffle(99)
      const endTime = performance.now()

      const executionTime = endTime - startTime
      expect(executionTime).toBeLessThan(100)
    })

    it("大量の実行でも安定したパフォーマンス", () => {
      const iterations = 1000
      const startTime = performance.now()

      for (let i = 0; i < iterations; i++) {
        fisherYatesShuffle(99)
      }

      const endTime = performance.now()
      const averageTime = (endTime - startTime) / iterations

      // 平均実行時間が1ms未満であることを確認
      expect(averageTime).toBeLessThan(1)
    })
  })

  describe("結果の正当性", () => {
    it("すべての要素が1以上99以下の整数である", () => {
      const result = fisherYatesShuffle(99)

      for (const num of result) {
        expect(num).toBeGreaterThanOrEqual(1)
        expect(num).toBeLessThanOrEqual(99)
        expect(Number.isInteger(num)).toBe(true)
      }
    })

    it("有効な順列である（重複なし、欠損なし）", () => {
      const count = 52 // トランプ1デッキ分
      const result = fisherYatesShuffle(count)

      // 重複チェック
      const uniqueNumbers = new Set(result)
      expect(uniqueNumbers.size).toBe(count)

      // 範囲チェック
      for (const num of result) {
        expect(num).toBeGreaterThanOrEqual(1)
        expect(num).toBeLessThanOrEqual(count)
      }

      // ソートすると[1,2,3,...,count]になるか確認
      const sorted = [...result].sort((a, b) => a - b)
      expect(sorted).toEqual(Array.from({ length: count }, (_, i) => i + 1))
    })
  })
})
