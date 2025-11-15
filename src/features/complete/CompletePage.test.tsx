import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import { CompletePage } from "./CompletePage"

// useNavigate をモック化
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe("CompletePage", () => {
  describe("レンダリング", () => {
    it("should render completion message", () => {
      render(
        <BrowserRouter>
          <CompletePage />
        </BrowserRouter>,
      )

      expect(screen.getByText("完了！")).toBeTruthy()
      expect(screen.getByText("シャッフルが完了しました")).toBeTruthy()
    })

    it("should render 'ホームに戻る' button", () => {
      render(
        <BrowserRouter>
          <CompletePage />
        </BrowserRouter>,
      )

      expect(
        screen.getByRole("button", { name: "ホームに戻って新しいシャッフルを開始" }),
      ).toBeTruthy()
    })
  })

  describe("ナビゲーション", () => {
    it("should navigate to home when button is clicked", async () => {
      const user = userEvent.setup()
      render(
        <BrowserRouter>
          <CompletePage />
        </BrowserRouter>,
      )

      const button = screen.getByRole("button", { name: "ホームに戻って新しいシャッフルを開始" })
      await user.click(button)

      expect(mockNavigate).toHaveBeenCalledWith("/")
    })
  })

  describe("スタイリング", () => {
    it("should center content vertically and horizontally", () => {
      const { container } = render(
        <BrowserRouter>
          <CompletePage />
        </BrowserRouter>,
      )

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv.className).toContain("flex")
      expect(mainDiv.className).toContain("min-h-screen")
      expect(mainDiv.className).toContain("bg-gradient-to-b")
    })

    it("should display completion message prominently", () => {
      render(
        <BrowserRouter>
          <CompletePage />
        </BrowserRouter>,
      )

      const heading = screen.getByText("完了！")
      expect(heading.tagName).toBe("H1")
      expect(heading.className).toContain("text-5xl")
      expect(heading.className).toContain("font-extrabold")
    })
  })
})
