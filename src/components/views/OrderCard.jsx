import React from 'react';
import './OrderCard.css';

function OrderCard({ onBack }) {
  return (
    <div className="order-card-overlay">
      <div className="order-card-container">
        <button className="back-btn" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>
        </button>
        
        <div className="order-content">
          <div className="placeholder-image">🛒</div>
          <h2>拼单确认</h2>
          <p className="description">
            正在为您发起拼单请求...<br/>
            这是一个占位卡片，后续可以接入支付和教练详情。
          </p>
          
          <div className="order-info">
            <div className="info-row">
              <span>课程类型</span>
              <span>卧推进阶纠偏课</span>
            </div>
            <div className="info-row">
              <span>拼单人数</span>
              <span>已成团 1/3</span>
            </div>
          </div>
          
          <button className="confirm-btn">确认加入拼单</button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
