import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import SearchResultPage from './pages/SearchResultPage'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/search-manufacturers" element={<SearchPage />} />
          <Route path="/search-result" element={<SearchResultPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App