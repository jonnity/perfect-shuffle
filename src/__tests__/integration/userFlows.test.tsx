import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import App from "../../App"

// Fisher-Yates シャッフルをモック化して決定的な結果を得る
vi.mock("@/shared/utils/fisherYatesShuffle", () => ({
  fisherYatesShuffle: (n: number) => {
    // テスト用の決定的なシャッフル結果を返す（1, 2, 3, ... の順序）
    return Array.from({ length: n }, (_, i) => i + 1)
  },
}))

/**
 * 統合テスト: 主要なユーザーフロー
 *
 * このテストスイートは、Perfect Shuffle アプリケーションの3つの主要フローを検証します:
 * 1. 完全なシャッフルフロー (枚数設定 → スタート → シャッフル → 完了 → ホームに戻る)
 * 2. LocalStorage 永続化フロー (枚数変更 → リロード → 状態確認)
 * 3. 中断フロー (クイック選択 → シャッフル → 中断 → ホームに戻る)
 */
describe("ユーザーフロー統合テスト", () => {
  beforeEach(() => {
    // LocalStorage をクリア
    window.localStorage.clear()
    // URL をホームにリセット
    window.history.replaceState(null, "", "/")
  })

  afterEach(() => {
    // LocalStorage をクリア
    window.localStorage.clear()
  })

  describe("フロー1: 完全なシャッフルフロー", () => {
    it("枚数設定 → スタート → シャッフル → 完了 → ホームに戻る", async () => {
      const user = userEvent.setup()

      // アプリをレンダリング
      render(<App />)

      // ホームページが表示されることを確認
      expect(screen.getByText("Perfect Shuffle")).toBeTruthy()
      expect(screen.getByText("枚数を指定してスタート！")).toBeTruthy()

      // デフォルトのカード枚数（60枚）が表示されることを確認
      // カウンター表示部分を取得（クイック選択ボタンと区別するため）
      const initialCardCountDisplay = screen.getAllByText("60")[0]
      expect(initialCardCountDisplay).toBeTruthy()
      expect(initialCardCountDisplay.className).toContain("text-5xl")

      // カード枚数を40枚に減らす
      const decrementButton = screen.getByLabelText("カード枚数を減らす")
      for (let i = 0; i < 20; i++) {
        await user.click(decrementButton)
      }

      // 40枚が表示されることを確認
      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("40")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })

      // スタートボタンをクリック
      const startButton = screen.getByText("スタート")
      await user.click(startButton)

      // LocalStorage に cardCount が保存されていることを確認
      await waitFor(() => {
        const storedCardCount = window.localStorage.getItem("cardCount")
        expect(storedCardCount).toBe("40")
      })

      // シャッフルページに遷移したことを確認
      await waitFor(() => {
        expect(screen.getByLabelText("次のカードに進む")).toBeTruthy()
      })

      // 進捗表示が表示されることを確認（3つの束方式では0から開始）
      expect(screen.getByText("0 / 40")).toBeTruthy()

      // 中断ボタンが表示されることを確認
      expect(screen.getByText("中断")).toBeTruthy()

      // 3つの束のカード位置が表示されることを確認
      expect(screen.getByText("左")).toBeTruthy()
      expect(screen.getByText("前")).toBeTruthy()
      expect(screen.getByText("右")).toBeTruthy()

      // ラウンドを数回進める（2回）
      const shuffleArea = screen.getByLabelText("次のカードに進む")
      await user.click(shuffleArea)
      await waitFor(() => {
        expect(screen.getByText("3 / 40")).toBeTruthy()
      })

      await user.click(shuffleArea)
      await waitFor(() => {
        expect(screen.getByText("6 / 40")).toBeTruthy()
      })

      // 残りのラウンドをすべて進める（40枚を3枚ずつ配置するので14ラウンド、残り12ラウンド）
      // 40枚の場合、40/3=13.33なので、14ラウンド必要（左14枚、前13枚、右13枚）
      for (let i = 2; i < 14; i++) {
        await user.click(shuffleArea)
      }

      // 最後のラウンド後、進捗が40/40になることを確認
      await waitFor(() => {
        expect(screen.getByText("40 / 40")).toBeTruthy()
      })

      // もう一度クリックして束を重ねる指示画面を表示
      await user.click(shuffleArea)

      // 束を重ねる指示画面が表示されることを確認
      await waitFor(() => {
        expect(screen.getByText("3つの束を重ねましょう")).toBeTruthy()
      })

      // 束を重ねる指示画面をクリックして完了画面へ
      await user.click(shuffleArea)

      // 完了ページに遷移したことを確認
      await waitFor(
        () => {
          expect(screen.getByText("完了！")).toBeTruthy()
          expect(screen.getByText("シャッフルが完了しました")).toBeTruthy()
        },
        { timeout: 3000 },
      )

      // ホームに戻るボタンをクリック
      const backToHomeButton = screen.getByText("ホームに戻る")
      await user.click(backToHomeButton)

      // ホームページに戻ったことを確認
      await waitFor(() => {
        expect(screen.getByText("Perfect Shuffle")).toBeTruthy()
        expect(screen.getByText("枚数を指定してスタート！")).toBeTruthy()
      })

      // LocalStorage に保存された枚数（40）が表示されることを確認
      const returnedCardCountDisplay = screen.getAllByText("40")[0]
      expect(returnedCardCountDisplay).toBeTruthy()
      expect(returnedCardCountDisplay.className).toContain("text-5xl")
    })
  })

  describe("フロー2: LocalStorage 永続化フロー", () => {
    it("枚数変更 → LocalStorage 永続化 → リロードで状態が復元される", async () => {
      const user = userEvent.setup()

      // アプリをレンダリング
      const { unmount } = render(<App />)

      // ホームページが表示されることを確認
      expect(screen.getByText("Perfect Shuffle")).toBeTruthy()

      // デフォルトのカード枚数（60枚）が表示されることを確認
      const initialCardCountDisplay = screen.getAllByText("60")[0]
      expect(initialCardCountDisplay).toBeTruthy()
      expect(initialCardCountDisplay.className).toContain("text-5xl")

      // カード枚数を99枚に変更（クイック選択ボタンを使用）
      const quickSelect99Button = screen.getByLabelText("99枚を選択")
      await user.click(quickSelect99Button)

      // 99枚が表示されることを確認
      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("99")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })

      // スタートボタンをクリックして LocalStorage に保存
      const startButton = screen.getByText("スタート")
      await user.click(startButton)

      // LocalStorage に cardCount が保存されていることを確認
      await waitFor(() => {
        const storedCardCount = window.localStorage.getItem("cardCount")
        expect(storedCardCount).toBe("99")
      })

      // コンポーネントをアンマウント（リロードをシミュレート）
      unmount()

      // URL をホームにリセット（リロード時にホームから始まる）
      window.history.replaceState(null, "", "/")

      // 再度レンダリング（リロード後）
      render(<App />)

      // ホームページが表示されることを確認
      expect(screen.getByText("Perfect Shuffle")).toBeTruthy()

      // LocalStorage から復元された枚数（99）が表示されることを確認
      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("99")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })

      // LocalStorage に保存されている値を直接確認
      const storedCardCount = window.localStorage.getItem("cardCount")
      expect(storedCardCount).toBe("99")
    })

    it("LocalStorage が空の場合はデフォルト値（60枚）が使用される", async () => {
      // LocalStorage をクリア
      window.localStorage.clear()

      // アプリをレンダリング
      render(<App />)

      // ホームページが表示されることを確認
      expect(screen.getByText("Perfect Shuffle")).toBeTruthy()

      // デフォルトのカード枚数（60枚）が表示されることを確認
      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("60")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })

      // LocalStorage に何も保存されていないことを確認
      const storedCardCount = window.localStorage.getItem("cardCount")
      expect(storedCardCount).toBeNull()
    })
  })

  describe("フロー3: クイック選択と中断フロー", () => {
    it("クイック選択 → シャッフル → 中断 → ホームに戻る", async () => {
      const user = userEvent.setup()

      // アプリをレンダリング
      render(<App />)

      // ホームページが表示されることを確認
      expect(screen.getByText("Perfect Shuffle")).toBeTruthy()

      // クイック選択ボタン（40枚）をクリック
      const quickSelect40Button = screen.getByLabelText("40枚を選択")
      await user.click(quickSelect40Button)

      // 40枚が表示されることを確認
      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("40")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })

      // スタートボタンをクリック
      const startButton = screen.getByText("スタート")
      await user.click(startButton)

      // シャッフルページに遷移したことを確認
      await waitFor(() => {
        expect(screen.getByLabelText("次のカードに進む")).toBeTruthy()
      })

      // 進捗表示が表示されることを確認（3つの束方式では0から開始）
      expect(screen.getByText("0 / 40")).toBeTruthy()

      // ラウンドを数回進める（2回）
      const shuffleArea = screen.getByLabelText("次のカードに進む")
      for (let i = 0; i < 2; i++) {
        await user.click(shuffleArea)
      }

      // 進捗が進んでいることを確認（2ラウンドで6枚配置）
      await waitFor(() => {
        expect(screen.getByText("6 / 40")).toBeTruthy()
      })

      // 中断ボタンをクリック
      const interruptButton = screen.getByText("中断")
      await user.click(interruptButton)

      // ホームページに戻ったことを確認
      await waitFor(() => {
        expect(screen.getByText("Perfect Shuffle")).toBeTruthy()
        expect(screen.getByText("枚数を指定してスタート！")).toBeTruthy()
      })

      // LocalStorage に保存された枚数（40）が表示されることを確認
      const returnedCardCountDisplay = screen.getAllByText("40")[0]
      expect(returnedCardCountDisplay).toBeTruthy()
      expect(returnedCardCountDisplay.className).toContain("text-5xl")

      // LocalStorage に保存されていることを確認
      const storedCardCount = window.localStorage.getItem("cardCount")
      expect(storedCardCount).toBe("40")
    })

    it("複数のクイック選択ボタンが正しく動作する", async () => {
      const user = userEvent.setup()

      // アプリをレンダリング
      render(<App />)

      // ホームページが表示されることを確認
      expect(screen.getByText("Perfect Shuffle")).toBeTruthy()

      // クイック選択ボタン（40枚）をクリック
      const quickSelect40Button = screen.getByLabelText("40枚を選択")
      await user.click(quickSelect40Button)

      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("40")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })

      // クイック選択ボタン（60枚）をクリック
      const quickSelect60Button = screen.getByLabelText("60枚を選択")
      await user.click(quickSelect60Button)

      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("60")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })

      // クイック選択ボタン（99枚）をクリック
      const quickSelect99Button = screen.getByLabelText("99枚を選択")
      await user.click(quickSelect99Button)

      await waitFor(() => {
        const cardCountDisplay = screen.getAllByText("99")[0]
        expect(cardCountDisplay).toBeTruthy()
        expect(cardCountDisplay.className).toContain("text-5xl")
      })
    })
  })

  describe("エッジケースとエラーハンドリング", () => {
    it("最小枚数（1枚）でのシャッフルフロー", async () => {
      const user = userEvent.setup()

      // アプリをレンダリング
      render(<App />)

      // カード枚数を1枚に減らす（60 → 1）
      const decrementButton = screen.getByLabelText("カード枚数を減らす")
      for (let i = 0; i < 59; i++) {
        await user.click(decrementButton)
      }

      // 1枚が表示されることを確認
      await waitFor(() => {
        expect(screen.getByText("1")).toBeTruthy()
      })

      // スタートボタンをクリック
      const startButton = screen.getByText("スタート")
      await user.click(startButton)

      // シャッフルページに遷移したことを確認
      await waitFor(() => {
        expect(screen.getByLabelText("次のカードに進む")).toBeTruthy()
      })

      // 進捗表示が表示されることを確認（3つの束方式では0から開始）
      expect(screen.getByText("0 / 1")).toBeTruthy()

      // 1回クリックして1枚配置（1枚の場合は左の束のみ）
      const shuffleArea = screen.getByLabelText("次のカードに進む")
      await user.click(shuffleArea)

      // 進捗が1/1になることを確認
      await waitFor(() => {
        expect(screen.getByText("1 / 1")).toBeTruthy()
      })

      // もう一度クリックして束を重ねる指示画面を表示
      await user.click(shuffleArea)

      // 束を重ねる指示画面が表示されることを確認
      await waitFor(() => {
        expect(screen.getByText("3つの束を重ねましょう")).toBeTruthy()
      })

      // 束を重ねる指示画面をクリックして完了画面へ
      await user.click(shuffleArea)

      // 完了ページに遷移したことを確認
      await waitFor(
        () => {
          expect(screen.getByText("完了！")).toBeTruthy()
        },
        { timeout: 3000 },
      )
    })

    it("キーボード操作でシャッフルを進める（Enter キー）", async () => {
      const user = userEvent.setup()

      // アプリをレンダリング
      render(<App />)

      // スタートボタンをクリック
      const startButton = screen.getByText("スタート")
      await user.click(startButton)

      // シャッフルページに遷移したことを確認
      await waitFor(() => {
        expect(screen.getByLabelText("次のカードに進む")).toBeTruthy()
      })

      // Enter キーで次に進む（3つの束方式では1回で3枚進む）
      const shuffleArea = screen.getByLabelText("次のカードに進む")
      shuffleArea.focus()
      await user.keyboard("{Enter}")

      // 進捗が進んだことを確認（3枚配置）
      await waitFor(() => {
        expect(screen.getByText("3 / 60")).toBeTruthy()
      })

      // Space キーで次に進む（さらに3枚配置）
      await user.keyboard(" ")

      // 進捗が進んだことを確認（6枚配置）
      await waitFor(() => {
        expect(screen.getByText("6 / 60")).toBeTruthy()
      })
    })
  })
})
