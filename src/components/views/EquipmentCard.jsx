import React from 'react';
import './EquipmentCard.css';

function EquipmentCard({ onBack }) {
  return (
    <div className="equipment-card-overlay">
      <div className="equipment-card-container">
        <button className="back-btn" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>
        </button>
        
        <div className="equipment-content">
          <div className="header-tag">精选装备</div>
          <div className="equipment-main">
            <div className="equipment-icon">🏷️</div>
            <h2>装备详情</h2>
            <p className="subtitle">正在跳转至商品详情页...</p>
          </div>
          
          <div className="promo-box">
            <div className="discount">券后价 <span className="price">¥??</span> 起</div>
            <p className="tips">专属优惠券已自动领取</p>
          </div>
          
          <button className="buy-btn">立即领券购买</button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentCard;
