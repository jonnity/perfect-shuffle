import { CardCountSelector } from "@/features/card-setup/components/CardCountSelector"
import { useCardCount } from "@/features/card-setup/hooks/useCardCount"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function DemoPage() {
  const { cardCount, increment, decrement } = useCardCount()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          CardCountSelector デモ
        </h1>
        <CardCountSelector cardCount={cardCount} onIncrement={increment} onDecrement={decrement} />
        <p className="mt-4 text-center text-sm text-gray-600">現在のカード枚数: {cardCount}</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<DemoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
