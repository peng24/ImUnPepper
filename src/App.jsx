import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Background from './components/Background.jsx'
import GameHub from './pages/GameHub.jsx'
import GamePlayer from './pages/GamePlayer.jsx'
import Stats from './pages/Stats.jsx'

function App() {
  useEffect(() => {
    // นับเวลาการเล่น (ทุกๆ 1 นาที)
    const playTimer = setInterval(() => {
      let stats = JSON.parse(localStorage.getItem('imun_pepper_stats')) || {
        today: 0, week: 0, total: 0, lastDate: null, popular: 'ไม่มี',
        gamesPlayed: 0, playTimeMinutes: 0
      };
      stats.playTimeMinutes = (stats.playTimeMinutes || 0) + 1;
      localStorage.setItem('imun_pepper_stats', JSON.stringify(stats));
    }, 60000);
    return () => clearInterval(playTimer);
  }, []);

  return (
    <>
      <Background />
      <Routes>
        <Route path="/" element={<GameHub />} />
        <Route path="/play/:gameId" element={<GamePlayer />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
