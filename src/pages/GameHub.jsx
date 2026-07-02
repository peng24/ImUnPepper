import { motion } from 'framer-motion'
import { categories, getGamesByCategory } from '../data/games.js'
import GameCard from '../components/GameCard.jsx'

// ไอคอนประจำหมวดหมู่
const categoryIcons = {
  พยัญชนะและสระ: '🔤',
  คำศัพท์: '📚',
  ชนิดของคำ: '🏷️',
  การสะกดคำ: '✏️',
}

// หน้ารวบรวมเกม (Game Hub)
const GameHub = () => {
  return (
    <div className="app">
      {/* Hero */}
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="hero-badge">🎮 สนุกกับการเรียนรู้</span>
        <div className="hero-mascot-container">
          <div className="hero-mascot mascot-imun">
            <img src="/imun_emoji.png" alt="อิ่มอุ่น" className="avatar-img" />
          </div>
          <div className="hero-mascot mascot-pepper">
            <img src="/pepper_emoji.png" alt="เปปเปอร์" className="avatar-img" />
          </div>
        </div>
        <h1 className="hero-title">ImUn & Pepper Game</h1>
        <p className="hero-subtitle" style={{ fontSize: '1rem', marginTop: '-0.5rem', opacity: 0.85 }}>อิ่มอุ่นและเปปเปปอร์ เกมส์</p>
        <p className="hero-subtitle">เลือกเกมที่อยากเล่นได้เลย!</p>
      </motion.div>

      {/* แสดงเกมแบ่งตามหมวดหมู่ */}
      {categories.map((category, ci) => {
        const games = getGamesByCategory(category)
        if (games.length === 0) return null
        return (
          <motion.section
            className="category"
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + ci * 0.08 }}
          >
            <div className="category-header">
              <span className="category-icon">
                {categoryIcons[category] || '🎯'}
              </span>
              <h2 className="category-name">{category}</h2>
            </div>
            <div className="game-grid">
              {games.map((game, gi) => (
                <GameCard key={game.id} game={game} index={gi} />
              ))}
            </div>
          </motion.section>
        )
      })}

      {/* Footer */}
      <footer className="footer">
        ทำด้วย <span className="footer-heart">❤️</span> สำหรับนักผจญภัยตัวน้อย ·
        เกมโดย Wordwall
      </footer>
    </div>
  )
}

export default GameHub
