import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ProgressIndicator } from "./ProgressIndicator"

describe("ProgressIndicator", () => {
  describe("レンダリング", () => {
    it("should render progress in 'X / Y' format", () => {
      render(<ProgressIndicator current={5} total={10} />)

      expect(screen.getByText("5 / 10")).toBeTruthy()
    })

    it("should render with text-2xl styling", () => {
      const { container } = render(<ProgressIndicator current={3} total={52} />)

      const progressDiv = container.firstChild as HTMLElement
      expect(progressDiv.className).toContain("text-2xl")
    })

    it("should render with tertiary content text color", () => {
      const { container } = render(<ProgressIndicator current={1} total={99} />)

      const progressDiv = container.firstChild as HTMLElement
      expect(progressDiv.className).toContain("text-tertiary-content")
    })
  })

  describe("進捗表示", () => {
    it("should display initial progress (1/40)", () => {
      render(<ProgressIndicator current={1} total={40} />)

      expect(screen.getByText("1 / 40")).toBeTruthy()
    })

    it("should display mid-progress (25/52)", () => {
      render(<ProgressIndicator current={25} total={52} />)

      expect(screen.getByText("25 / 52")).toBeTruthy()
    })

    it("should display final progress (99/99)", () => {
      render(<ProgressIndicator current={99} total={99} />)

      expect(screen.getByText("99 / 99")).toBeTruthy()
    })

    it("should handle single digit numbers", () => {
      render(<ProgressIndicator current={1} total={5} />)

      expect(screen.getByText("1 / 5")).toBeTruthy()
    })

    it("should handle two digit numbers", () => {
      render(<ProgressIndicator current={10} total={60} />)

      expect(screen.getByText("10 / 60")).toBeTruthy()
    })

    it("should handle three digit numbers", () => {
      render(<ProgressIndicator current={99} total={99} />)

      expect(screen.getByText("99 / 99")).toBeTruthy()
    })
  })

  describe("Props", () => {
    it("should accept current and total as props", () => {
      const props = { current: 7, total: 52 }
      render(<ProgressIndicator {...props} />)

      expect(screen.getByText("7 / 52")).toBeTruthy()
    })

    it("should update when props change", () => {
      const { rerender } = render(<ProgressIndicator current={1} total={10} />)
      expect(screen.getByText("1 / 10")).toBeTruthy()

      rerender(<ProgressIndicator current={2} total={10} />)
      expect(screen.getByText("2 / 10")).toBeTruthy()

      rerender(<ProgressIndicator current={10} total={10} />)
      expect(screen.getByText("10 / 10")).toBeTruthy()
    })
  })
})
