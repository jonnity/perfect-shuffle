import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Button } from "./Button"

describe("Button", () => {
  describe("レンダリング", () => {
    it("should render children correctly", () => {
      render(<Button>Click me</Button>)

      expect(screen.getByText("Click me")).toBeTruthy()
    })

    it("should have button type by default", () => {
      render(<Button>Test</Button>)

      const button = screen.getByRole("button")
      expect(button.getAttribute("type")).toBe("button")
    })

    it("should apply custom className", () => {
      render(<Button className="custom-class">Test</Button>)

      const button = screen.getByRole("button")
      expect(button.className).toContain("custom-class")
    })
  })

  describe("バリアント", () => {
    it("should render primary variant by default", () => {
      render(<Button>Primary</Button>)

      const button = screen.getByRole("button")
      expect(button.className).toContain("bg-blue-600")
      expect(button.className).toContain("text-white")
    })

    it("should render secondary variant correctly", () => {
      render(<Button variant="secondary">Secondary</Button>)

      const button = screen.getByRole("button")
      expect(button.className).toContain("bg-blue-500")
      expect(button.className).toContain("font-bold")
    })

    it("should render neutral variant correctly", () => {
      render(<Button variant="neutral">Neutral</Button>)

      const button = screen.getByRole("button")
      expect(button.className).toContain("bg-gray-200")
      expect(button.className).toContain("text-gray-700")
    })
  })

  describe("インタラクション", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<Button onClick={handleClick}>Click</Button>)

      const button = screen.getByRole("button")
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("should pass through other button props", () => {
      render(
        <Button disabled aria-label="Test button">
          Disabled
        </Button>,
      )

      const button = screen.getByRole("button")
      expect(button.getAttribute("disabled")).toBe("")
      expect(button.getAttribute("aria-label")).toBe("Test button")
    })
  })
})
