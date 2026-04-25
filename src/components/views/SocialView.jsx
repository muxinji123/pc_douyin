import React from 'react';

function SocialView() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🤝 找搭子</h2>
      <p style={styles.desc}>同城摇人，冲极限需要保护！</p>
      <div style={styles.placeholderBox}>
        [附近健身搭子匹配与卡片列表占位]
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    background: 'linear-gradient(to bottom, #331a00, #000)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  desc: {
    color: '#aaa',
    marginBottom: '30px',
  },
  placeholderBox: {
    flex: 1,
    border: '2px dashed #444',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    backgroundColor: 'rgba(255,255,255,0.05)',
  }
};

export default SocialView;
