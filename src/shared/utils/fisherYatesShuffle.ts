/**
 * Fisher-Yates (Knuth) Shuffle Algorithm
 *
 * フィッシャー-イェーツアルゴリズムで公平なシャッフルを実現します。
 * このアルゴリズムは、すべての順列が等確率で生成されることが数学的に証明されています。
 *
 * アルゴリズムの仕組み:
 * 1. 配列の末尾から開始して、先頭に向かって処理
 * 2. 各位置で、その位置以下のランダムな位置と要素を交換
 * 3. これにより、各要素が各位置に配置される確率が 1/n となり、完全に公平
 *
 * 計算量: O(n) - 配列を1回走査するだけで完了
 * 空間計算量: O(1) - 入力配列を直接シャッフル
 *
 * @param count - シャッフルするカードの枚数（1以上の整数）
 * @returns シャッフル後の各位置に配置されるカードの元の位置（1-indexed）
 *
 * @example
 * // 10枚のカードをシャッフル
 * const shuffled = fisherYatesShuffle(10);
 * // 結果例: [4, 1, 7, 2, 8, 3, 6, 9, 10, 5]
 * // 意味: 新しい束の1枚目は元の4枚目、2枚目は元の1枚目、など
 */
export function fisherYatesShuffle(count: number): number[] {
  // 1からcountまでの配列を作成（1-indexed）
  const array: number[] = Array.from({ length: count }, (_, i) => i + 1)

  // Fisher-Yatesアルゴリズム: 末尾から開始
  for (let i = array.length - 1; i > 0; i--) {
    // 0からi（inclusive）の範囲でランダムなインデックスを生成
    const randomIndex = Math.floor(Math.random() * (i + 1))

    // 現在の要素とランダムな位置の要素を交換
    // 分割代入（destructuring）を使用してスワップ
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }

  return array
}
