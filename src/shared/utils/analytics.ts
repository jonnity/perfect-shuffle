/**
 * Google Analytics 4 ユーティリティ
 * プロダクション環境でのみGA4を有効化し、ページビューとカスタムイベントを送信
 */

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: gtag.js の型定義
    gtag?: (...args: any[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * GA4が有効かどうかを判定
 * 開発環境では無効化される
 */
export const isGAEnabled = (): boolean => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  const isDev = import.meta.env.DEV

  return !isDev && typeof measurementId === "string" && measurementId.length > 0
}

/**
 * GA4を初期化
 * プロダクション環境でのみスクリプトを読み込む
 */
export const initializeGA = (): void => {
  if (!isGAEnabled()) {
    console.log("[GA] [DEV] Analytics disabled (development mode)")
    return
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  // gtag.js スクリプトを動的に読み込む
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // dataLayer の初期化
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // biome-ignore lint/style/noArguments: gtag.js の仕様に従う
    window.dataLayer?.push(arguments)
  }

  window.gtag("js", new Date())
  window.gtag("config", measurementId, {
    send_page_view: false, // 手動でページビューを送信
  })
}

/**
 * ページビューを送信
 * @param path - ページのパス
 * @param title - ページのタイトル
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!isGAEnabled()) {
    if (import.meta.env.DEV) {
      console.log(`[GA] [DEV] Page view: ${path} (not sent)`)
    }
    return
  }

  // gtag.js がロード中の場合は dataLayer に直接 push
  if (!window.gtag && window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_path: path,
      page_title: title || document.title,
    })
    return
  }

  // gtag.js がロード済みの場合は gtag を使用
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
    })
  }
}

/**
 * カスタムイベントを送信
 * @param eventName - イベント名
 * @param eventParams - イベントパラメータ
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>): void => {
  if (!isGAEnabled()) {
    if (import.meta.env.DEV) {
      console.log(`[GA] [DEV] Event: ${eventName} (not sent)`, eventParams)
    }
    return
  }

  // gtag.js がロード中の場合は dataLayer に直接 push
  if (!window.gtag && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    })
    return
  }

  // gtag.js がロード済みの場合は gtag を使用
  if (window.gtag) {
    window.gtag("event", eventName, eventParams)
  }
}

/**
 * シャッフル開始イベントを送信
 * @param cardCount - カード枚数
 */
export const trackShuffleStart = (cardCount: number): void => {
  trackEvent("shuffle_start", {
    card_count: cardCount,
  })
}

/**
 * シャッフル完了イベントを送信
 * @param cardCount - カード枚数
 * @param duration - シャッフルにかかった時間（ミリ秒）
 */
export const trackShuffleComplete = (cardCount: number, duration: number): void => {
  trackEvent("shuffle_complete", {
    card_count: cardCount,
    duration_ms: duration,
  })
}

/**
 * カード枚数選択イベントを送信
 * @param cardCount - 選択されたカード枚数
 */
export const trackCardCountSelection = (cardCount: number): void => {
  trackEvent("card_count_selection", {
    card_count: cardCount,
  })
}
