import { HomePage } from "@/features/card-setup/HomePage"
import { CompletePage } from "@/features/complete/CompletePage"
import { ShufflePage } from "@/features/shuffle/ShufflePage"
import { AdBanner } from "@/shared/components/AdBanner"
import { Footer } from "@/shared/components/Footer"
import { initializeGA, trackPageView } from "@/shared/utils/analytics"
import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

/**
 * ページ遷移を検知してGA4にページビューを送信するコンポーネント
 */
function PageViewTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location])

  return null
}

function App() {
  useEffect(() => {
    // アプリ起動時にGA4を初期化
    initializeGA()
  }, [])

  return (
    <BrowserRouter>
      <PageViewTracker />
      <div className="flex h-screen flex-col">
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shuffle" element={<ShufflePage />} />
            <Route path="/complete" element={<CompletePage />} />
          </Routes>
        </main>
        <Footer />
        <AdBanner />
      </div>
    </BrowserRouter>
  )
}

export default App
