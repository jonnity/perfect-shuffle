import { useNavigate } from "react-router-dom"

/**
 * シャッフル完了ページ
 * - 完了メッセージを目立って表示
 * - 「ホームに戻る」ボタンを表示
 * - ボタンクリックで / に遷移
 * - コンテンツを垂直・水平方向に中央配置
 */
export function CompletePage() {
  const navigate = useNavigate()

  /**
   * ホームに戻る
   */
  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* 完了メッセージ */}
        <div>
          <h1 className="text-5xl font-extrabold text-blue-900">完了！</h1>
          <p className="mt-4 text-xl text-gray-700">シャッフルが完了しました</p>
        </div>

        {/* ホームに戻るボタン */}
        <button
          type="button"
          onClick={handleBackToHome}
          className="w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  )
}
