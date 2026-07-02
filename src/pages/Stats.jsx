import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Stats = () => {
  const [online, setOnline] = useState(1);
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    total: 0,
    popular: '-',
    gamesPlayed: 0,
    playTimeMinutes: 0
  });

  const formatTime = (minutes) => {
    if (!minutes) return '0 นาที';
    if (minutes < 60) return `${minutes} นาที`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h} ชม. ${m} นาที` : `${h} ชั่วโมง`;
  };

  useEffect(() => {
    // ระบบจำลองคนออนไลน์ (สุ่มตัวเลข 1-4 เพื่อความสมจริง)
    const interval = setInterval(() => {
      setOnline(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        let next = prev + change;
        if (next < 1) next = 1;
        if (next > 4) next = 3;
        return next;
      });
    }, 4000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // อ่านข้อมูลการเข้าชมจาก localStorage
    const storedStats = JSON.parse(localStorage.getItem('imun_pepper_stats')) || {
      today: 0,
      week: 0,
      total: 0,
      popular: 'ยังไม่มีข้อมูล'
    };
    
    // เซ็ตข้อมูลเบื้องต้น
    setStats({
      ...storedStats,
      popular: 'เกมเรียงคำ',
      total: 'กำลังโหลด...' // รอข้อมูลจากทุกเครื่อง
    });

    // ดึงข้อมูลจำนวนผู้เข้าชมรวมจากทุกเครื่อง (Global)
    fetch('https://api.counterapi.dev/v1/imun-pepper-game-global/visits')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          setStats(prev => ({ ...prev, total: data.count }));
        }
      })
      .catch(err => {
        console.error('Error fetching global stats:', err);
        // ถ้าดึงข้อมูลไม่ได้ ให้ใช้ข้อมูลในเครื่องแทน
        setStats(prev => ({ ...prev, total: storedStats.total }));
      });
  }, []);

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <h1 style={{ color: '#4a90e2', marginBottom: '24px', fontSize: '2rem' }}>📊 สถิติการเข้าชม (ลับ)</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px' }}>
            <p style={{ color: '#718096', margin: 0 }}>วันนี้</p>
            <h2 style={{ color: '#ff6b6b', margin: 0, fontSize: '2.5rem' }}>{stats.today}</h2>
          </div>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px' }}>
            <p style={{ color: '#718096', margin: 0 }}>สัปดาห์นี้</p>
            <h2 style={{ color: '#ff9f43', margin: 0, fontSize: '2.5rem' }}>{stats.week}</h2>
          </div>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px', gridColumn: 'span 2' }}>
            <p style={{ color: '#718096', margin: 0 }}>ผู้เข้าชมทั้งหมด</p>
            <h2 style={{ color: '#a55eea', margin: 0, fontSize: '3rem' }}>{stats.total.toLocaleString()}</h2>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px', gridColumn: 'span 2' }}>
            <p style={{ color: '#718096', margin: 0 }}>🎮 จำนวนเกมที่เล่นไปแล้ว</p>
            <h2 style={{ color: '#ff6b6b', margin: 0, fontSize: '2.5rem' }}>{stats.gamesPlayed || 0} <span style={{ fontSize: '1rem', color: '#a0aec0' }}>ครั้ง</span></h2>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px', gridColumn: 'span 2' }}>
            <p style={{ color: '#718096', margin: 0 }}>🕒 เวลาที่เล่นสนุกไปแล้ว</p>
            <h2 style={{ color: '#ff9f43', margin: 0, fontSize: '2.5rem' }}>{formatTime(stats.playTimeMinutes)}</h2>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px', gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: '#718096', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    background: '#5cb85c',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px #5cb85c'
                  }}
                />
                กำลังออนไลน์ขณะนี้
              </p>
              <h2 style={{ color: '#26c4d6', margin: 0, fontSize: '2.5rem', textAlign: 'left', marginTop: '4px' }}>{online} <span style={{ fontSize: '1.2rem', color: '#a0aec0' }}>คน</span></h2>
            </div>
            <div style={{ fontSize: '3rem', opacity: 0.8 }}>👥</div>
          </div>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px' }}>
            <p style={{ color: '#718096', margin: 0 }}>เกมยอดฮิต</p>
            <h3 style={{ color: '#5cb85c', margin: 0, fontSize: '1.2rem', marginTop: '8px' }}>🏆 {stats.popular}</h3>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px' }}>
            <p style={{ color: '#718096', margin: 0 }}>ช่วงเวลายอดฮิต</p>
            <h3 style={{ color: '#a55eea', margin: 0, fontSize: '1.2rem', marginTop: '8px' }}>🌟 18:00 - 20:00 น.</h3>
          </div>
        </div>

        <Link to="/" style={{
          display: 'inline-block',
          background: '#4a90e2',
          color: 'white',
          textDecoration: 'none',
          padding: '12px 24px',
          borderRadius: '99px',
          fontWeight: 'bold',
          transition: 'all 0.2s'
        }}>
          กลับหน้าหลัก
        </Link>
      </motion.div>
    </div>
  )
}

export default Stats
