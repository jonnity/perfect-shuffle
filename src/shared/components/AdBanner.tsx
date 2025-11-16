import { useEffect } from "react"

/**
 * AdBanner コンポーネント
 * - Google Adsense バナー広告を表示
 * - プロダクション環境でのみ広告を有効化
 * - 開発環境ではプレースホルダーを表示
 * - レスポンシブ対応
 * - 環境変数から広告ユニットIDを取得
 */
export function AdBanner() {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID
  const slotId = import.meta.env.VITE_ADSENSE_SLOT_ID
  const isProduction = import.meta.env.PROD

  useEffect(() => {
    // プロダクション環境かつ広告IDが設定されている場合のみ広告を表示
    if (isProduction && clientId && slotId) {
      try {
        // adsbygoogle スクリプトがロード済みの場合のみ push
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({})
        }
      } catch (error) {
        console.error("AdBanner initialization error:", error)
      }
    }
  }, [])

  // 開発環境の場合はプレースホルダーを表示
  if (!isProduction) {
    return (
      <div className="fixed bottom-0 left-0 right-0 w-full bg-gray-50 py-4">
        <div className="mx-auto max-w-screen-lg px-4">
          <div className="flex min-h-[90px] items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-100">
            <p className="text-sm text-gray-500">
              広告エリア（開発環境ではプレースホルダーを表示）
            </p>
          </div>
        </div>
      </div>
    )
  }

  // プロダクション環境で広告IDが未設定の場合は何も表示しない
  if (!clientId || !slotId) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-gray-50 py-4">
      <div className="mx-auto max-w-screen-lg px-4">
        {/* Google Adsense バナー広告 */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}

// TypeScript型定義: window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}
