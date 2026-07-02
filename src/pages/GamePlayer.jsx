import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getGameById } from '../data/games.js'

// หน้าเล่นเกม (iframe ของ Wordwall)
const GamePlayer = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const game = getGameById(gameId)

  // รีเซ็ตสถานะ loading เมื่อเปลี่ยนเกม
  useEffect(() => {
    setLoaded(false)
    window.scrollTo(0, 0)
  }, [gameId])

  // หากเกมไม่พบ กลับหน้าหลัก
  if (!game) {
    return (
      <div className="app" style={{ textAlign: 'center', paddingTop: '15vh' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🤔</div>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--c-text)',
            marginBottom: 12,
          }}
        >
          ไม่พบเกมนี้
        </h1>
        <button className="btn-primary" onClick={() => navigate('/')}>
          กลับหน้าหลัก
        </button>
      </div>
    )
  }

  return (
    <div className="app player">
      {/* Header */}
      <motion.div
        className="player-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="player-back"
          onClick={() => navigate('/')}
          aria-label="กลับ"
        >
          ← กลับ
        </button>
        <span className="player-emoji-badge">{game.emoji}</span>
        <div className="player-title-wrap">
          <div className="player-title">{game.title}</div>
          <div className="player-subtitle">{game.subtitle}</div>
        </div>
      </motion.div>

      {/* iframe */}
      <motion.div
        className="player-frame-wrap"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {!loaded && (
          <div className="player-loading">
            <div className="player-loading-emoji">{game.emoji}</div>
            <div className="spinner" />
            <div className="player-loading-text">กำลังโหลดเกม...</div>
          </div>
        )}
        <iframe
          src={game.embed}
          width="500"
          height="380"
          allowFullScreen
          title={game.title}
          onLoad={() => setLoaded(true)}
          style={{ border: 0, '--card-color': game.color }}
        />
      </motion.div>
    </div>
  )
}

export default GamePlayer
