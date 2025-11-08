import {
  DEFAULT_CARD_COUNT,
  MAX_CARD_COUNT,
  MIN_CARD_COUNT,
} from "@/types";

/**
 * カード枚数を表す値オブジェクト
 *
 * カード枚数のバリデーションとデータ整合性を保証します。
 * 値オブジェクトパターンを採用し、不変性と型安全性を確保します。
 *
 * バリデーションルール:
 * - 有効範囲: 1-99（境界値を含む）
 * - 無効な値（範囲外、非数値、NaN、undefined など）の場合、デフォルト値 60 を使用
 *
 * @example
 * // 有効な値で値オブジェクトを作成
 * const cardCount1 = CardCount.create(50);
 * console.log(cardCount1.value); // => 50
 *
 * const cardCount2 = CardCount.create(1);
 * console.log(cardCount2.value); // => 1
 *
 * @example
 * // 無効な値の場合、デフォルト値を使用
 * const cardCount3 = CardCount.create(0);
 * console.log(cardCount3.value); // => 60 (範囲外)
 *
 * const cardCount4 = CardCount.create(100);
 * console.log(cardCount4.value); // => 60 (範囲外)
 *
 * const cardCount5 = CardCount.create(NaN);
 * console.log(cardCount5.value); // => 60 (非数値)
 *
 * @example
 * // 値オブジェクトは不変
 * const cardCount = CardCount.create(50);
 * // cardCount.value = 100; // Error: Cannot assign to 'value' because it is a read-only property
 */
export class CardCount {
  private readonly _value: number;

  /**
   * プライベートコンストラクタ
   * 外部からは create メソッドを使用してインスタンスを生成する
   *
   * @param value - バリデート済みのカード枚数
   */
  private constructor(value: number) {
    this._value = value;
  }

  /**
   * CardCount 値オブジェクトを作成
   *
   * @param count - カード枚数（未定義も許容）
   * @returns CardCount 値オブジェクト
   */
  static create(count: number | undefined): CardCount {
    const validatedCount = this.validate(count);
    return new CardCount(validatedCount);
  }

  /**
   * カード枚数をバリデート
   *
   * @param count - バリデートするカード枚数
   * @returns バリデート済みのカード枚数（無効な場合はデフォルト値）
   */
  private static validate(count: number | undefined): number {
    // 数値チェック: NaN、undefined、または有効な数値でない場合
    if (typeof count !== "number" || Number.isNaN(count)) {
      return DEFAULT_CARD_COUNT;
    }

    // 範囲チェック: MIN_CARD_COUNT - MAX_CARD_COUNT の範囲外の場合
    if (count < MIN_CARD_COUNT || count > MAX_CARD_COUNT) {
      return DEFAULT_CARD_COUNT;
    }

    // 有効な値の場合、そのまま返す
    return count;
  }

  /**
   * カード枚数の値を取得
   */
  get value(): number {
    return this._value;
  }
}
