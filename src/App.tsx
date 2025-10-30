import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<div className="p-4">Perfect Shuffle - Coming Soon</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
