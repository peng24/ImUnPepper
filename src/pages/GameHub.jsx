import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
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
  useEffect(() => {
    // ระบบเก็บสถิติการเข้าชม (เก็บในเครื่อง)
    const today = new Date().toDateString();
    let stats = JSON.parse(localStorage.getItem('imun_pepper_stats')) || {
      today: 0,
      week: 0,
      total: 0,
      lastDate: null,
      popular: 'ไม่มี'
    };

    if (stats.lastDate !== today) {
      stats.today = 1;
      stats.lastDate = today;
    } else {
      stats.today += 1;
    }
    stats.week += 1;
    stats.total += 1;
    stats.popular = 'เกมเรียงคำ'; // สมมติว่าเป็นเกมยอดฮิต

    localStorage.setItem('imun_pepper_stats', JSON.stringify(stats));

    // นับยอดเข้าชมรวมจากทุกเครื่อง (Global)
    fetch('https://api.counterapi.dev/v1/imun-pepper-game-global/visits/up')
      .catch(err => console.error('Error updating global stats:', err));
  }, []);

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
            <img src="/imun_avatar_transparent.png" alt="อิ่มอุ่น" className="avatar-img" />
          </div>
          <div className="hero-mascot mascot-pepper">
            <img src="/pepper_avatar_transparent.png" alt="เปปเปอร์" className="avatar-img" />
          </div>
        </div>
        <h1 className="hero-title">ImUn & Pepper Game</h1>
        <p className="hero-subtitle subtitle-pink">อิ่มอุ่นและเปปเปปอร์ เกมส์</p>
        <p className="hero-subtitle subtitle-orange">เลือกเกมที่อยากเล่นได้เลย!</p>
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
        ทำด้วย <Link to="/stats" style={{ textDecoration: 'none', color: 'inherit', cursor: 'default' }}><span className="footer-heart">❤️</span></Link> สำหรับนักผจญภัยตัวน้อย ·
        เกมโดย Wordwall
      </footer>
    </div>
  )
}

export default GameHub
