import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "neutral"
  children: React.ReactNode
}

/**
 * 再利用可能なボタンコンポーネント
 *
 * バリアント:
 * - primary: メインアクションボタン（スタート、ホームに戻るなど）
 * - secondary: サブアクションボタン（カード枚数の増減、クイックセレクトなど）
 * - neutral: ニュートラルアクションボタン（中断など）
 *
 * すべてのボタンはアクセシビリティ基準（最小44pxタッチターゲット）を満たします。
 */
export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "rounded-lg font-semibold transition-colors focus:outline-none"

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300",
    secondary:
      "inline-flex items-center justify-center bg-blue-500 font-bold text-white hover:bg-blue-600 active:bg-blue-700",
    neutral: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
  }

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
