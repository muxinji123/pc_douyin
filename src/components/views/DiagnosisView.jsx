import React from 'react';

function DiagnosisView() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💪 动作诊断</h2>
      <p style={styles.desc}>肩膀疼？起桥不稳？AI帮你看看动作</p>
      <div style={styles.placeholderBox}>
        [视频/图片上传与诊断区域占位]
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
    background: 'linear-gradient(to bottom, #1a0033, #000)',
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

export default DiagnosisView;
