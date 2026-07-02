import { Routes, Route, Navigate } from 'react-router-dom'
import Background from './components/Background.jsx'
import GameHub from './pages/GameHub.jsx'
import GamePlayer from './pages/GamePlayer.jsx'

function App() {
  return (
    <>
      <Background />
      <Routes>
        <Route path="/" element={<GameHub />} />
        <Route path="/play/:gameId" element={<GamePlayer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
