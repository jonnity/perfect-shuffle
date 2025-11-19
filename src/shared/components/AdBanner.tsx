import { useEffect } from "react"

/**
 * AdBanner コンポーネント
 * - Google Adsense バナー広告を表示
 * - 開発環境ではテスト広告を表示（data-adtest="on"）
 * - 本番環境では実際の広告を表示
 * - レスポンシブ対応
 * - 環境変数から広告ユニットIDを取得
 */
export function AdBanner() {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID
  const slotId = import.meta.env.VITE_ADSENSE_SLOT_ID
  const isProduction = import.meta.env.PROD

  useEffect(() => {
    // 広告IDが設定されている場合のみ広告を表示
    if (clientId && slotId && window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
  }, [])

  // 広告IDが未設定の場合は何も表示しない
  if (!clientId || !slotId) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-0 mt-4">
      <div className="w-full max-w-screen-md">
        <ins
          className="adsbygoogle block h-[90px] w-full"
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-full-width-responsive="true"
          {...(!isProduction && { "data-adtest": "on" })}
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
