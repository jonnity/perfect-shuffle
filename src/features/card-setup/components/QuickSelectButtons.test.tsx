import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { QuickSelectButtons } from "./QuickSelectButtons"

describe("QuickSelectButtons", () => {
  describe("レンダリング", () => {
    it("should render three buttons in a grid layout", () => {
      const mockOnSelect = vi.fn()

      const { container } = render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.className).toContain("grid")
      expect(wrapper.className).toContain("grid-cols-3")

      const buttons = screen.getAllByRole("button")
      expect(buttons).toHaveLength(3)
    })

    it("should render buttons with correct labels", () => {
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      expect(screen.getByLabelText("40枚を選択")).toBeTruthy()
      expect(screen.getByLabelText("60枚を選択")).toBeTruthy()
      expect(screen.getByLabelText("99枚を選択")).toBeTruthy()
    })

    it("should render buttons with correct text content", () => {
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      expect(screen.getByText("40")).toBeTruthy()
      expect(screen.getByText("60")).toBeTruthy()
      expect(screen.getByText("99")).toBeTruthy()
    })

    it("should render buttons with minimum 44px touch target", () => {
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const buttons = screen.getAllByRole("button")

      for (const button of buttons) {
        // h-14 = 56px (14 * 4px) which is > 44px
        expect(button.className).toContain("h-14")
      }
    })

    it("should render buttons with consistent styling", () => {
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const buttons = screen.getAllByRole("button")

      for (const button of buttons) {
        expect(button.className).toContain("btn-secondary")
        expect(button.className).toContain("h-14")
        expect(button.className).toContain("w-full")
        expect(button.className).toContain("text-xl")
      }
    })
  })

  describe("インタラクション", () => {
    it("should call onSelect with 40 when 40 button is clicked", async () => {
      const user = userEvent.setup()
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const button40 = screen.getByLabelText("40枚を選択")
      await user.click(button40)

      expect(mockOnSelect).toHaveBeenCalledTimes(1)
      expect(mockOnSelect).toHaveBeenCalledWith(40)
    })

    it("should call onSelect with 60 when 60 button is clicked", async () => {
      const user = userEvent.setup()
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const button60 = screen.getByLabelText("60枚を選択")
      await user.click(button60)

      expect(mockOnSelect).toHaveBeenCalledTimes(1)
      expect(mockOnSelect).toHaveBeenCalledWith(60)
    })

    it("should call onSelect with 99 when 99 button is clicked", async () => {
      const user = userEvent.setup()
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const button99 = screen.getByLabelText("99枚を選択")
      await user.click(button99)

      expect(mockOnSelect).toHaveBeenCalledTimes(1)
      expect(mockOnSelect).toHaveBeenCalledWith(99)
    })

    it("should handle multiple clicks on different buttons", async () => {
      const user = userEvent.setup()
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const button40 = screen.getByLabelText("40枚を選択")
      const button60 = screen.getByLabelText("60枚を選択")
      const button99 = screen.getByLabelText("99枚を選択")

      await user.click(button40)
      await user.click(button60)
      await user.click(button99)

      expect(mockOnSelect).toHaveBeenCalledTimes(3)
      expect(mockOnSelect).toHaveBeenNthCalledWith(1, 40)
      expect(mockOnSelect).toHaveBeenNthCalledWith(2, 60)
      expect(mockOnSelect).toHaveBeenNthCalledWith(3, 99)
    })

    it("should handle multiple clicks on the same button", async () => {
      const user = userEvent.setup()
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const button60 = screen.getByLabelText("60枚を選択")

      await user.click(button60)
      await user.click(button60)
      await user.click(button60)

      expect(mockOnSelect).toHaveBeenCalledTimes(3)
      expect(mockOnSelect).toHaveBeenNthCalledWith(1, 60)
      expect(mockOnSelect).toHaveBeenNthCalledWith(2, 60)
      expect(mockOnSelect).toHaveBeenNthCalledWith(3, 60)
    })
  })

  describe("アクセシビリティ", () => {
    it("should have button type attribute", () => {
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const buttons = screen.getAllByRole("button")

      for (const button of buttons) {
        expect(button.getAttribute("type")).toBe("button")
      }
    })

    it("should have descriptive aria-labels", () => {
      const mockOnSelect = vi.fn()

      render(<QuickSelectButtons onSelect={mockOnSelect} />)

      const button40 = screen.getByLabelText("40枚を選択")
      const button60 = screen.getByLabelText("60枚を選択")
      const button99 = screen.getByLabelText("99枚を選択")

      expect(button40).toBeTruthy()
      expect(button60).toBeTruthy()
      expect(button99).toBeTruthy()
    })
  })
})
