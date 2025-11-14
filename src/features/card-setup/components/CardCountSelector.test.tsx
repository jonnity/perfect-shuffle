import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { CardCountSelector } from "./CardCountSelector"

describe("CardCountSelector", () => {
  describe("レンダリング", () => {
    it("should render the card count prominently", () => {
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const countDisplay = screen.getByText("60")
      expect(countDisplay).toBeTruthy()
      expect(countDisplay.className).toContain("text-5xl")
      expect(countDisplay.className).toContain("text-primary-content")
    })

    it("should render increment button", () => {
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const incrementButton = screen.getByLabelText("カード枚数を増やす")
      expect(incrementButton).toBeTruthy()
      expect(incrementButton.textContent).toBe("+")
    })

    it("should render decrement button", () => {
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const decrementButton = screen.getByLabelText("カード枚数を減らす")
      expect(decrementButton).toBeTruthy()
      expect(decrementButton.textContent).toBe("-")
    })

    it("should render buttons with minimum 44px touch target", () => {
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const incrementButton = screen.getByLabelText("カード枚数を増やす")
      const decrementButton = screen.getByLabelText("カード枚数を減らす")

      // h-14 = 56px (14 * 4px) which is > 44px
      expect(incrementButton.className).toContain("h-14")
      expect(incrementButton.className).toContain("w-14")
      expect(decrementButton.className).toContain("h-14")
      expect(decrementButton.className).toContain("w-14")
    })

    it("should render buttons in horizontal layout", () => {
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      const { container } = render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain("flex")
    })
  })

  describe("インタラクション", () => {
    it("should call onIncrement when increment button is clicked", async () => {
      const user = userEvent.setup()
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const incrementButton = screen.getByLabelText("カード枚数を増やす")
      await user.click(incrementButton)

      expect(mockIncrement).toHaveBeenCalledTimes(1)
      expect(mockDecrement).not.toHaveBeenCalled()
    })

    it("should call onDecrement when decrement button is clicked", async () => {
      const user = userEvent.setup()
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const decrementButton = screen.getByLabelText("カード枚数を減らす")
      await user.click(decrementButton)

      expect(mockDecrement).toHaveBeenCalledTimes(1)
      expect(mockIncrement).not.toHaveBeenCalled()
    })

    it("should handle multiple clicks", async () => {
      const user = userEvent.setup()
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      render(
        <CardCountSelector
          cardCount={60}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )

      const incrementButton = screen.getByLabelText("カード枚数を増やす")
      const decrementButton = screen.getByLabelText("カード枚数を減らす")

      await user.click(incrementButton)
      await user.click(incrementButton)
      await user.click(decrementButton)

      expect(mockIncrement).toHaveBeenCalledTimes(2)
      expect(mockDecrement).toHaveBeenCalledTimes(1)
    })
  })

  describe("表示バリエーション", () => {
    it("should display different card counts correctly", () => {
      const mockIncrement = vi.fn()
      const mockDecrement = vi.fn()

      const { rerender } = render(
        <CardCountSelector cardCount={1} onIncrement={mockIncrement} onDecrement={mockDecrement} />,
      )
      expect(screen.getByText("1")).toBeTruthy()

      rerender(
        <CardCountSelector
          cardCount={40}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )
      expect(screen.getByText("40")).toBeTruthy()

      rerender(
        <CardCountSelector
          cardCount={99}
          onIncrement={mockIncrement}
          onDecrement={mockDecrement}
        />,
      )
      expect(screen.getByText("99")).toBeTruthy()
    })
  })
})
