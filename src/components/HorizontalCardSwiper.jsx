import React, { useState } from 'react';
import DiagnosisView from './views/DiagnosisView';
import GymRecommendView from './views/GymRecommendView';
import SocialView from './views/SocialView';
import './HorizontalCardSwiper.css';

function HorizontalCardSwiper() {
  const [showContent, setShowContent] = useState(false);

  const zuitiText = "又没有保护架！推不起来了谁来帮我！";

  return (
    <div className="horizontal-swiper-container">
      <div 
        className={`zuiti-overlay ${showContent ? 'fade-out' : ''}`}
        onClick={() => setShowContent(true)}
      >
        <div className="zuiti-content">
          <h1>"{zuitiText}"</h1>
          <p className="hint">点击查看解决方案 👆</p>
        </div>
      </div>

      <div className={`swiper-track ${showContent ? 'active' : ''}`}>
        <div className="swiper-slide">
          <DiagnosisView />
        </div>
        <div className="swiper-slide">
          <GymRecommendView />
        </div>
        <div className="swiper-slide">
          <SocialView />
        </div>
      </div>
      
      {showContent && (
        <div className="pagination-dots">
          <div className="dot">诊断</div>
          <div className="dot">找馆</div>
          <div className="dot">搭子</div>
        </div>
      )}
    </div>
  );
}

export default HorizontalCardSwiper;
