import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/search-manufacturers" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App