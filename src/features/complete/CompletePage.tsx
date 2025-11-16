import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/components/Button"

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4 pb-32">
      <main className="w-full max-w-md space-y-8 text-center">
        {/* 完了メッセージ */}
        <header>
          <h1 className="text-5xl font-extrabold text-blue-900">完了！</h1>
          <p className="mt-4 text-xl text-gray-700" role="status" aria-live="polite">
            シャッフルが完了しました
          </p>
        </header>

        {/* ホームに戻るボタン */}
        <Button
          onClick={handleBackToHome}
          className="w-full py-4 text-lg"
          aria-label="ホームに戻って新しいシャッフルを開始"
        >
          ホームに戻る
        </Button>
      </main>
    </div>
  )
}
