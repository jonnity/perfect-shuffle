import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Footer } from "./Footer"

describe("Footer", () => {
  describe("レンダリング", () => {
    it("should render Privacy Policy link", () => {
      render(<Footer />)

      const link = screen.getByText("Privacy Policy")
      expect(link).toBeTruthy()
      expect(link.tagName).toBe("A")
      expect(link.getAttribute("href")).toBe("#")
    })

    it("should render copyright text", () => {
      render(<Footer />)

      expect(screen.getByText("© jonnity 2025")).toBeTruthy()
    })
  })

  describe("スタイリング", () => {
    it("should be fixed at the bottom with spacing", () => {
      const { container } = render(<Footer />)

      const footer = container.firstChild as HTMLElement
      expect(footer.tagName).toBe("FOOTER")
      expect(footer.className).toContain("fixed")
      expect(footer.className).toContain("bottom-4")
    })

    it("should center content", () => {
      const { container } = render(<Footer />)

      const footer = container.firstChild as HTMLElement
      expect(footer.className).toContain("justify-center")
    })

    it("should have rounded background with shadow", () => {
      const { container } = render(<Footer />)

      const footer = container.firstChild as HTMLElement
      const innerDiv = footer.firstChild as HTMLElement
      expect(innerDiv.className).toContain("rounded-lg")
      expect(innerDiv.className).toContain("bg-gray-100")
      expect(innerDiv.className).toContain("shadow-md")
    })

    it("should display items in vertical column", () => {
      const { container } = render(<Footer />)

      const footer = container.firstChild as HTMLElement
      const innerDiv = footer.firstChild as HTMLElement
      expect(innerDiv.className).toContain("flex-col")
      expect(innerDiv.className).toContain("items-center")
    })
  })

  describe("アクセシビリティ", () => {
    it("should have focusable Privacy Policy link", () => {
      render(<Footer />)

      const link = screen.getByText("Privacy Policy")
      expect(link.className).toContain("focus:outline-none")
      expect(link.className).toContain("focus:ring-2")
    })
  })
})
