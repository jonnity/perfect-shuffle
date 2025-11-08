import { DEFAULT_CARD_COUNT, MAX_CARD_COUNT, MIN_CARD_COUNT } from "@/types"
import { describe, expect, it } from "vitest"
import { CardCount } from "./validateCardCount"

describe("CardCount", () => {
  describe("値オブジェクトの生成", () => {
    it("有効範囲（1-99）内の値で値オブジェクトを生成できる", () => {
      const cardCount1 = CardCount.create(1)
      expect(cardCount1.value).toBe(1)

      const cardCount50 = CardCount.create(50)
      expect(cardCount50.value).toBe(50)

      const cardCount99 = CardCount.create(99)
      expect(cardCount99.value).toBe(99)
    })

    it("境界値（1と99）で正しく生成できる", () => {
      const minCardCount = CardCount.create(MIN_CARD_COUNT)
      expect(minCardCount.value).toBe(MIN_CARD_COUNT)

      const maxCardCount = CardCount.create(MAX_CARD_COUNT)
      expect(maxCardCount.value).toBe(MAX_CARD_COUNT)
    })
  })

  describe("無効な値（範囲外）", () => {
    it("0はデフォルト値60を使用する", () => {
      const cardCount = CardCount.create(0)
      expect(cardCount.value).toBe(DEFAULT_CARD_COUNT)
    })

    it("100はデフォルト値60を使用する", () => {
      const cardCount = CardCount.create(100)
      expect(cardCount.value).toBe(DEFAULT_CARD_COUNT)
    })

    it("負の数はデフォルト値60を使用する", () => {
      const cardCount1 = CardCount.create(-1)
      expect(cardCount1.value).toBe(DEFAULT_CARD_COUNT)

      const cardCount2 = CardCount.create(-10)
      expect(cardCount2.value).toBe(DEFAULT_CARD_COUNT)
    })

    it("100を超える値はデフォルト値60を使用する", () => {
      const cardCount1 = CardCount.create(101)
      expect(cardCount1.value).toBe(DEFAULT_CARD_COUNT)

      const cardCount2 = CardCount.create(200)
      expect(cardCount2.value).toBe(DEFAULT_CARD_COUNT)

      const cardCount3 = CardCount.create(1000)
      expect(cardCount3.value).toBe(DEFAULT_CARD_COUNT)
    })
  })

  describe("無効な値（非数値）", () => {
    it("NaNはデフォルト値60を使用する", () => {
      const cardCount = CardCount.create(Number.NaN)
      expect(cardCount.value).toBe(DEFAULT_CARD_COUNT)
    })

    it("undefinedはデフォルト値60を使用する", () => {
      const cardCount = CardCount.create(undefined)
      expect(cardCount.value).toBe(DEFAULT_CARD_COUNT)
    })

    it("Infinityはデフォルト値60を使用する", () => {
      const cardCount1 = CardCount.create(Number.POSITIVE_INFINITY)
      expect(cardCount1.value).toBe(DEFAULT_CARD_COUNT)

      const cardCount2 = CardCount.create(Number.NEGATIVE_INFINITY)
      expect(cardCount2.value).toBe(DEFAULT_CARD_COUNT)
    })
  })

  describe("値オブジェクトの不変性", () => {
    it("値オブジェクトは不変である", () => {
      const cardCount = CardCount.create(50)

      // TypeScript の型システムにより、以下はコンパイルエラーになる
      // cardCount.value = 100;
      // cardCount._value = 100;

      // 値が変更されていないことを確認
      expect(cardCount.value).toBe(50)
    })

    it("同じ値から生成した値オブジェクトは値が等しい", () => {
      const cardCount1 = CardCount.create(50)
      const cardCount2 = CardCount.create(50)

      // インスタンスは異なるが、値は等しい
      expect(cardCount1).not.toBe(cardCount2) // 参照は異なる
      expect(cardCount1.value).toBe(cardCount2.value) // 値は等しい
    })
  })

  describe("エッジケース", () => {
    it("有効範囲内の小数点数はそのまま返される", () => {
      const cardCount1 = CardCount.create(1.5)
      expect(cardCount1.value).toBe(1.5)

      const cardCount2 = CardCount.create(50.7)
      expect(cardCount2.value).toBe(50.7)

      const cardCount3 = CardCount.create(98.5)
      expect(cardCount3.value).toBe(98.5)
    })

    it("範囲外の小数点数はデフォルト値60を使用する", () => {
      const cardCount1 = CardCount.create(0.5)
      expect(cardCount1.value).toBe(DEFAULT_CARD_COUNT)

      const cardCount2 = CardCount.create(99.1)
      expect(cardCount2.value).toBe(DEFAULT_CARD_COUNT)

      const cardCount3 = CardCount.create(100.1)
      expect(cardCount3.value).toBe(DEFAULT_CARD_COUNT)
    })
  })

  describe("データ整合性", () => {
    it("生成された値オブジェクトの値は常に1-99の範囲内", () => {
      const testCases = [
        -100,
        -1,
        0,
        0.5,
        1,
        30,
        50,
        60,
        99,
        99.9,
        100,
        200,
        Number.NaN,
        undefined,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
      ]

      for (const testCase of testCases) {
        const cardCount = CardCount.create(testCase)
        expect(cardCount.value).toBeGreaterThanOrEqual(MIN_CARD_COUNT)
        expect(cardCount.value).toBeLessThanOrEqual(MAX_CARD_COUNT)
      }
    })

    it("デフォルト値は常に有効な範囲内", () => {
      expect(DEFAULT_CARD_COUNT).toBeGreaterThanOrEqual(MIN_CARD_COUNT)
      expect(DEFAULT_CARD_COUNT).toBeLessThanOrEqual(MAX_CARD_COUNT)

      const defaultCardCount = CardCount.create(undefined)
      expect(defaultCardCount.value).toBe(DEFAULT_CARD_COUNT)
    })
  })
})
