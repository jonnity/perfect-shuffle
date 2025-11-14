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
    <div className="page-container bg-app-gradient">
      <main className="content-wrapper space-y-8 text-center">
        {/* 完了メッセージ */}
        <header>
          <h1 className="text-brand-title text-5xl font-extrabold">完了！</h1>
          <p className="text-secondary-content mt-4 text-xl" role="status" aria-live="polite">
            シャッフルが完了しました
          </p>
        </header>

        {/* ホームに戻るボタン */}
        <button
          type="button"
          onClick={handleBackToHome}
          className="btn-primary w-full py-4 text-lg"
          aria-label="ホームに戻って新しいシャッフルを開始"
        >
          ホームに戻る
        </button>
      </main>
    </div>
  )
}
