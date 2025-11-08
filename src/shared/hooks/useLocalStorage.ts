import { useEffect, useState } from "react"

/**
 * LocalStorage の読み書きのための汎用カスタムフック
 *
 * このフックは LocalStorage へのアクセスを抽象化し、エラーハンドリングを提供します。
 * LocalStorage が利用できない環境では、メモリ内の状態のみにフォールバックします。
 *
 * 特徴:
 * - マウント時に LocalStorage から値を読み込み
 * - 値変更時に LocalStorage に自動保存
 * - LocalStorage が利用できない場合はメモリのみで動作
 * - try-catch による適切なエラーハンドリング
 *
 * @template T - 保存する値の型
 * @param key - LocalStorage のキー
 * @param initialValue - 初期値（LocalStorage に値がない場合に使用）
 * @returns [value, setValue] - 現在の値と値を更新する関数のタプル
 *
 * @example
 * // 基本的な使用方法
 * const [name, setName] = useLocalStorage<string>("userName", "Guest");
 *
 * @example
 * // オブジェクトの保存
 * interface User {
 *   id: number;
 *   name: string;
 * }
 * const [user, setUser] = useLocalStorage<User>("currentUser", { id: 0, name: "Guest" });
 *
 * @example
 * // 配列の保存
 * const [items, setItems] = useLocalStorage<string[]>("items", []);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // If error, only update state (memory fallback)
      console.warn(`Error writing localStorage key "${key}":`, error)
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
    }
  }

  return [storedValue, setValue]
}
