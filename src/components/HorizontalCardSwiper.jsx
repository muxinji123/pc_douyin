import React, { useState, useRef, useEffect } from 'react';
import DiagnosisView from './views/DiagnosisView';
import EquipmentView from './views/EquipmentView';
import GymRecommendView from './views/GymRecommendView';
import SocialView from './views/SocialView';
import './HorizontalCardSwiper.css';

function HorizontalCardSwiper() {
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const isScrolling = useRef(false);

  const zuitiText = "又没有保护架！推不起来了谁来帮我！";

  const scrollToSlide = (index) => {
    if (!trackRef.current) return;
    const slideWidth = trackRef.current.clientWidth;
    isScrolling.current = true;
    trackRef.current.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  };

  useEffect(() => {
    if (!showContent) return;

    const handleKeyDown = (e) => {
      if (isScrolling.current) return;
      if (e.key === 'ArrowRight') {
        if (activeIndex < 3) scrollToSlide(activeIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        if (activeIndex > 0) scrollToSlide(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showContent, activeIndex]);

  // 监听原生滚动以更新当前索引（用于手动滑动时）
  const handleScroll = () => {
    if (isScrolling.current || !trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const slideWidth = trackRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

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

      <div 
        className={`swiper-track ${showContent ? 'active' : ''}`} 
        ref={trackRef}
        onScroll={handleScroll}
      >
        <div className="swiper-slide">
          <DiagnosisView />
        </div>
        <div className="swiper-slide">
          <EquipmentView />
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
          {['诊断', '装备', '找馆', '搭子'].map((label, idx) => (
            <div 
              key={idx} 
              className={`dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => scrollToSlide(idx)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HorizontalCardSwiper;
