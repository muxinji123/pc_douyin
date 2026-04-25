import React from 'react';
import './EquipmentView.css';

function EquipmentView() {
  const items = [
    { name: '支撑护腕', desc: '手腕酸', price: '39', tag: '必买', icon: '🧤' },
    { name: '弹力带', desc: '胸肌激活', price: '29', tag: '热身', icon: '🎗️' },
    { name: '防滑手套', desc: '握杆更稳', price: '49', tag: '入门', icon: '🧤' },
  ];

  return (
    <div className="equipment-view">
      <div className="equipment-header">
        <div className="status-bar">
          <span>9:41</span>
          <div className="status-icons">📶 🔋</div>
        </div>
        <nav className="nav-tabs">
          <span className="active">推荐</span>
          <span>关注</span>
          <span>训练</span>
          <span>装备</span>
          <span>🔍</span>
        </nav>
      </div>

      <div className="equipment-hero">
        <h1 className="hero-main-title">卧推练了1个月，<br />这些装备该补齐了</h1>
        <p className="hero-sub-title">AI 根据你的训练问题，推荐装备和附近健身课团购</p>
      </div>

      <div className="equipment-content">
        <div className="ai-solution-card">
          <div className="ai-sol-header">
            <div className="ai-bot-icon">🤖</div>
            <span className="ai-sol-title">AI 替你配齐卧推提升方案</span>
            <span className="arrow">›</span>
          </div>

          <div className="product-grid">
            {items.map((item, i) => (
              <div key={i} className="product-card">
                <div className="product-img-placeholder">{item.icon}</div>
                <h4 className="prod-name">{item.name}</h4>
                <p className="prod-desc">{item.desc}</p>
                <div className="prod-price-row">
                  <span className="price">¥{item.price} <small>起</small></span>
                  <span className={`tag ${item.tag === '必买' ? 'primary' : ''}`}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ai-tip">
            <span className="sparkle">✨</span>
            <p>装备解决稳定性，课程解决动作路径。你现在最缺的不是更大重量，而是有人帮你看肩胛、肘角和握距。</p>
          </div>

          <div className="gym-offer-card">
            <div className="gym-img-box">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200" alt="gym" />
              <div className="location-pin">📍</div>
            </div>
            <div className="gym-info">
              <h4 className="gym-title">附近健身房 | 卧推入门私教体验课</h4>
              <p className="gym-subtitle">1v1 动作评估 + 卧推发力教学 + 肩胛稳定训练</p>
              <div className="gym-price">
                <span className="current">抖音购价 ¥99<small>/1节</small></span>
                <span className="original">原价 ¥299</span>
              </div>
              <div className="gym-meta">
                <span>📍 距你 1.2km</span>
                <span>📅 可预约今晚</span>
              </div>
              <button className="buy-btn">去抖音抢购 ›</button>
            </div>
          </div>
        </div>

        <div className="quick-tags">
          <span>先上体验课</span>
          <span>护腕选硬挺</span>
          <span>凳子看承重</span>
        </div>

        <div className="footer-actions">
          <button className="secondary-btn">不感兴趣</button>
          <button className="primary-btn">查看完整方案</button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentView;
