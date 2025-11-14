/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // モバイルファースト設定 (375px ベース)
      // Tailwind はデフォルトでモバイルファーストです
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      // カラーパレット設定 (design.md 準拠)
      colors: {
        primary: "#2563eb", // blue-600 (ボタン、アクセント)
        bg: "#f9fafb", // gray-50 (背景)
        text: "#111827", // gray-900 (メインテキスト)
        border: "#d1d5db", // gray-300 (ボーダー)
      },
      // フォントサイズ設定 (design.md 準拠)
      fontSize: {
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px (操作ガイド)
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px (サブタイトル)
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px (進捗表示)
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px (タイトル)
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px (カード位置表示)
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px (カード位置表示)
      },
      // タッチターゲット: 最小 44px
      spacing: {
        11: "2.75rem", // 44px
      },
    },
  },
  plugins: [],
}
