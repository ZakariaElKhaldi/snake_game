import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import QuickStartPage from './pages/QuickStartPage'
import PlayPage from './pages/PlayPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<QuickStartPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/play" element={<PlayPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
