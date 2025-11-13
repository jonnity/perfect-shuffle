import { HomePage } from "@/features/card-setup/HomePage"
import { ShufflePage } from "@/features/shuffle/ShufflePage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shuffle" element={<ShufflePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
