import { HomePage } from "@/features/card-setup/HomePage"
import { CompletePage } from "@/features/complete/CompletePage"
import { ShufflePage } from "@/features/shuffle/ShufflePage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shuffle" element={<ShufflePage />} />
        <Route path="/complete" element={<CompletePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
