/**
 * Footer コンポーネント
 * - 画面下部に固定表示（広告の上）
 * - Privacy Policy リンクと著作権表示を縦に配置
 * - 角丸の小さい背景で控えめに表示
 * - 44px最小タッチターゲットを確保
 */
export function Footer() {
  return (
    <footer className="fixed bottom-28 left-0 right-0 flex justify-center">
      <div className="flex flex-col items-center space-y-1 rounded-lg bg-gray-100 px-4 py-2 shadow-md">
        {/* Privacy Policy リンク */}
        <a
          href="#"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="プライバシーポリシーを表示"
        >
          Privacy Policy
        </a>

        {/* 著作権表示 */}
        <p className="text-xs text-gray-600">© jonnity 2025</p>
      </div>
    </footer>
  )
}
