import { HomePage } from "@/features/card-setup/HomePage"
import { CompletePage } from "@/features/complete/CompletePage"
import { ShufflePage } from "@/features/shuffle/ShufflePage"
import { Footer } from "@/shared/components/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shuffle" element={<ShufflePage />} />
        <Route path="/complete" element={<CompletePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
