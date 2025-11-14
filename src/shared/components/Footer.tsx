/**
 * Footer コンポーネント
 * - 画面下部に固定表示
 * - Privacy Policy リンクと著作権表示を縦に配置
 * - グレー背景でフロート表示
 * - 高さ 16（h-16）
 */
export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-gray-100 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center space-y-1 px-4">
        {/* Privacy Policy リンク */}
        <a
          href="#"
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Privacy Policy
        </a>

        {/* 著作権表示 */}
        <p className="text-xs text-gray-600">© jonnity 2025</p>
      </div>
    </footer>
  )
}
