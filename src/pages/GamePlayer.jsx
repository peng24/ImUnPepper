import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getGameById } from '../data/games.js'
import { playPopSound } from '../utils/audio.js'

// หน้าเล่นเกม (iframe ของ Wordwall)
const GamePlayer = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const game = getGameById(gameId)

  // รีเซ็ตสถานะ loading และนับสถิติเมื่อเปลี่ยนเกม
  useEffect(() => {
    setLoaded(false)
    window.scrollTo(0, 0)

    if (gameId) {
      let stats = JSON.parse(localStorage.getItem('imun_pepper_stats')) || {
        today: 0, week: 0, total: 0, lastDate: null, popular: 'ไม่มี',
        gamesPlayed: 0, playTimeMinutes: 0
      };
      stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
      localStorage.setItem('imun_pepper_stats', JSON.stringify(stats));
    }
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
        <button className="btn-primary" onClick={() => { playPopSound(); navigate('/') }}>
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
          onClick={() => { playPopSound(); navigate('/') }}
          aria-label="กลับ"
        >
          ← กลับ
        </button>
        <span className="player-emoji-badge">{game.emoji}</span>
        <div className="player-title-wrap">
          <div className="player-title">{game.title}</div>
          <div className="player-subtitle">{game.subtitle}</div>
        </div>
        <button
          className="player-fullscreen-btn"
          onClick={() => {
            playPopSound()
            const playerElem = document.querySelector('.player-frame-wrap')
            if (!document.fullscreenElement) {
              playerElem?.requestFullscreen?.().catch((err) => {
                console.error('Error attempting to enable fullscreen:', err.message)
              })
            } else {
              document.exitFullscreen?.()
            }
          }}
          aria-label="เต็มจอ"
          title="เล่นเต็มจอ"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
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
            <div className="hero-mascot-container" style={{ marginBottom: 16 }}>
              <div className="hero-mascot mascot-imun" style={{ width: '60px', height: '60px' }}>
                <img src="/imun_avatar_transparent.png" alt="อิ่มอุ่น" className="avatar-img" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="hero-mascot mascot-pepper" style={{ width: '60px', height: '60px' }}>
                <img src="/pepper_avatar_transparent.png" alt="เปปเปอร์" className="avatar-img" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
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
