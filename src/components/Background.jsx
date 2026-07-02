// พื้นหลังประดับ - เมฆลอย + คลื่นทะเล
const clouds = [
  { emoji: '☁️', top: '6%', duration: 55, delay: 0 },
  { emoji: '☁️', top: '20%', duration: 70, delay: -25 },
  { emoji: '🌤️', top: '38%', duration: 60, delay: -40 },
  { emoji: '⛅', top: '55%', duration: 75, delay: -10 },
]

const Background = () => {
  return (
    <div className="bg-decor" aria-hidden="true">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud"
          style={{
            top: c.top,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.emoji}
        </div>
      ))}
      <svg className="bg-waves" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill="#4a90e2"
          fillOpacity="0.4"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,120L0,120Z"
        />
        <path
          fill="#2c6db5"
          fillOpacity="0.5"
          d="M0,96L60,90.7C120,85,240,75,360,74.7C480,75,600,85,720,85.3C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,120L0,120Z"
        />
      </svg>
    </div>
  )
}

export default Background
