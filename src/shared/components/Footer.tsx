/**
 * Footer コンポーネント
 * - 画面下部に固定表示
 * - Privacy Policy リンクと著作権表示を縦に配置
 * - 角丸の小さい背景で控えめに表示
 * - 44px最小タッチターゲットを確保
 */
export function Footer() {
  return (
    <footer className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="flex flex-col items-center space-y-1 rounded-lg bg-gray-100 px-4 py-2 shadow-md">
        {/* Privacy Policy リンク */}
        <a
          href="#"
          className="link-primary inline-flex items-center justify-center px-2 text-sm"
          aria-label="プライバシーポリシーを表示"
        >
          Privacy Policy
        </a>

        {/* 著作権表示 */}
        <p className="text-tertiary-content text-xs">© jonnity 2025</p>
      </div>
    </footer>
  )
}
