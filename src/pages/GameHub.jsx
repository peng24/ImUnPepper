import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { games, categories, getGamesByCategory } from "../data/games.js";
import GameCard from "../components/GameCard.jsx";

// ไอคอนประจำหมวดหมู่
const categoryIcons = {
  พยัญชนะและสระ: "🔤",
  คำศัพท์: "📚",
  ชนิดของคำ: "🏷️",
  การสะกดคำ: "✏️",
};

const dialogues = [
  {
    imun: "มาเล่นเกมกับพี่อุ่นกันเถอะ! 🎉",
    pepper: "เปปเปอร์พร้อมลุยแล้วฮะ! 🚀",
  },
  {
    imun: "เกมนี้สนุกมากๆ เลยนะ! ✨",
    pepper: "เปปเปอร์จะทำคะแนนให้เต็มเลย! 💯",
  },
  {
    imun: "พร้อมทายคำศัพท์กันรึยัง? 🤔",
    pepper: "เปปเปอร์เก่งคำศัพท์ที่สุดเลย! 📚",
  },
  {
    imun: "ใครจับคู่ได้ไวที่สุดนะ? 🧩",
    pepper: "ต้องเป็นเปปเปอร์แน่นอนฮะ! 🏆",
  },
  {
    imun: "มาฝึกสมองกับพี่อุ่นกัน! 💡",
    pepper: "เปปเปอร์สู้ๆ สู้ตายฮะ! ⚡",
  },
  {
    imun: "เล่นเกมบ่อยๆ จะได้เก่งๆ นะ! 🌟",
    pepper: "เปปเปอร์ชอบเล่นเกมที่สุดเลย! 🎮",
  },
];

// หน้ารวบรวมเกม (Game Hub)
const GameHub = () => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState("imun"); // 'imun' หรือ 'pepper'
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);

  // ตรวจจับการเลื่อนหน้าจอด้วย IntersectionObserver (แม่นยำ 100%)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px",
      },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // สลับบทสนทนาและสลับผู้พูดทีละคนเพื่อไม่ให้ข้อความทับกัน
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpeaker((prev) => {
        if (prev === "imun") {
          return "pepper";
        } else {
          setDialogueIndex((prevIdx) => (prevIdx + 1) % dialogues.length);
          return "imun";
        }
      });
    }, 3000); // สลับทุกๆ 3 วินาที

    return () => clearInterval(timer);
  }, []);

  // เก็บสถิติ
  useEffect(() => {
    const today = new Date().toDateString();
    let stats = JSON.parse(localStorage.getItem("imun_pepper_stats")) || {
      today: 0,
      week: 0,
      total: 0,
      lastDate: null,
      popular: "ไม่มี",
    };

    if (stats.lastDate !== today) {
      stats.today = 1;
      stats.lastDate = today;
    } else {
      stats.today += 1;
    }
    stats.week += 1;
    stats.total += 1;
    stats.popular = "เกมเรียงคำ";

    localStorage.setItem("imun_pepper_stats", JSON.stringify(stats));

    fetch(
      "https://api.counterapi.dev/v1/imun-pepper-game-global/visits/up",
    ).catch((err) => console.error("Error updating global stats:", err));
  }, []);

  return (
    <>
      <div className="app">
        {/* Hero */}
        <motion.div
          ref={heroRef}
          className="hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-mascot-container">
            {!isScrolled && (
              <>
                <motion.div
                  layoutId="imun-mascot-wrapper"
                  className={`hero-mascot mascot-imun ${activeSpeaker === "imun" ? "is-talking" : ""}`}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                >
                  <AnimatePresence mode="wait">
                    {activeSpeaker === "imun" && (
                      <motion.div
                        key={`imun-${dialogueIndex}`}
                        className="speech-bubble bubble-imun"
                        initial={{ opacity: 0, x: "-50%", y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: "-50%", y: -10, scale: 0.8 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                      >
                        {dialogues[dialogueIndex].imun}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.img
                    layoutId="imun-mascot-img"
                    src="/imun_avatar_transparent.png"
                    alt="อิ่มอุ่น"
                    className="avatar-img"
                  />
                </motion.div>

                <motion.div
                  layoutId="pepper-mascot-wrapper"
                  className={`hero-mascot mascot-pepper ${activeSpeaker === "pepper" ? "is-talking" : ""}`}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                >
                  <AnimatePresence mode="wait">
                    {activeSpeaker === "pepper" && (
                      <motion.div
                        key={`pep-${dialogueIndex}`}
                        className="speech-bubble bubble-pepper"
                        initial={{ opacity: 0, x: "-50%", y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: "-50%", y: -10, scale: 0.8 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                      >
                        {dialogues[dialogueIndex].pepper}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.img
                    layoutId="pepper-mascot-img"
                    src="/pepper_avatar_transparent.png"
                    alt="เปปเปอร์"
                    className="avatar-img"
                  />
                </motion.div>
              </>
            )}
          </div>

          <h1 className="hero-title">ImUn &amp; Pepper Game</h1>
          <p className="hero-subtitle subtitle-pink">
            อิ่มอุ่นและเปปเปปอร์ เกมส์
          </p>
          <p className="hero-subtitle subtitle-orange">
            เลือกเกมที่อยากเล่นได้เลย!
          </p>
          <motion.div
            className="total-games-badge"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          >
            ✨ มีมินิเกมสนุกๆ รออยู่ตั้ง {games.length} เกมแหนะ! 🎮
          </motion.div>
        </motion.div>

        {/* แสดงเกมแบ่งตามหมวดหมู่ */}
        {categories.map((category, ci) => {
          const catGames = getGamesByCategory(category);
          if (catGames.length === 0) return null;
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
                  {categoryIcons[category] || "🎯"}
                </span>
                <h2 className="category-name">{category}</h2>
              </div>
              <div className="game-grid">
                {catGames.map((game, gi) => (
                  <GameCard key={game.id} game={game} index={gi} />
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Footer */}
        <footer className="footer">
          ทำด้วย{" "}
          <Link
            to="/stats"
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "default",
            }}
          >
            <span className="footer-heart">❤️</span>
          </Link>{" "}
          สำหรับนักผจญภัยตัวน้อย · เกมโดย Wordwall
        </footer>
      </div>

      {/* Floating Mascots - อยู่นอก .app เพื่อไม่ให้โดนบัง */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="floating-mascots-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              layoutId="imun-mascot-wrapper"
              className={`floating-avatar ${activeSpeaker === "imun" ? "is-talking" : ""}`}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {activeSpeaker === "imun" && (
                  <motion.div
                    key={`float-imun-${dialogueIndex}`}
                    className="floating-speech-bubble bubble-imun"
                    initial={{ opacity: 0, x: "-50%", y: 5, scale: 0.8 }}
                    animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: "-50%", y: -5, scale: 0.8 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                  >
                    {dialogues[dialogueIndex].imun}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.img
                layoutId="imun-mascot-img"
                src="/imun_avatar_transparent.png"
                alt="อิ่มอุ่น"
                className="floating-avatar-img"
              />
            </motion.div>

            <motion.div
              layoutId="pepper-mascot-wrapper"
              className={`floating-avatar ${activeSpeaker === "pepper" ? "is-talking" : ""}`}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {activeSpeaker === "pepper" && (
                  <motion.div
                    key={`float-pep-${dialogueIndex}`}
                    className="floating-speech-bubble bubble-pepper"
                    initial={{ opacity: 0, x: "-50%", y: 5, scale: 0.8 }}
                    animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: "-50%", y: -5, scale: 0.8 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                  >
                    {dialogues[dialogueIndex].pepper}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.img
                layoutId="pepper-mascot-img"
                src="/pepper_avatar_transparent.png"
                alt="เปปเปอร์"
                className="floating-avatar-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameHub;
