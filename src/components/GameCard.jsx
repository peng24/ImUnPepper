import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { difficultyLabels } from '../data/games.js'

// การ์ดเกม - แสดงภาพ + ชื่อ + ระดับความยาก
const GameCard = ({ game, index = 0 }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/play/${game.id}`)
  }

  return (
    <motion.button
      type="button"
      className="game-card"
      style={{ '--card-color': game.color }}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="game-card-thumb">
        <div className="game-card-emoji">{game.emoji}</div>
        <span className="game-card-difficulty">
          {difficultyLabels[game.difficulty]}
        </span>
        <img
          src={game.thumb}
          alt={game.title}
          loading="lazy"
          draggable="false"
          onError={(e) => {
            // หากภาพโหลดไม่ได้ ซ่อนไว้ ให้พื้นหลังสีแสดงแทน
            e.target.style.display = 'none'
          }}
        />
      </div>
      <div className="game-card-body">
        <div className="game-card-title">{game.title}</div>
        <div className="game-card-subtitle">{game.subtitle}</div>
        <div className="game-card-play">
          เล่นเลย <span className="arrow">→</span>
        </div>
      </div>
    </motion.button>
  )
}

export default GameCard
