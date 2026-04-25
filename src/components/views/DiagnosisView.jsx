import React from 'react';
import './DiagnosisView.css';
import heroImage from '../../assets/hero.png';

function DiagnosisView() {
  return (
    <div className="diagnosis-container">
      {/* 顶部头图区域 */}
      <div className="hero-section">
        <img src={heroImage} alt="Hero Bench Press" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">
            卧推练胸，<br />为什么充血的是手臂？
          </h1>
        </div>
      </div>

      <div className="content-area">
        {/* AI智能顾问区域 */}
        <div className="ai-advisor-section">
          <div className="ai-header">
            <div className="ai-icon-bg">AI</div>
            <div className="ai-title-wrap">
              <h3 className="ai-title">AI智能顾问</h3>
              <p className="ai-subtitle">随时为你答疑解惑</p>
            </div>
          </div>
          
          <div className="ai-cards-container">
            <div className="ai-card">
              <span className="ai-card-icon">🔥</span>
              <p className="ai-card-text">一天训练到晚<br />如何才不会过度疲劳</p>
            </div>
            <div className="ai-card">
              <span className="ai-card-icon">💪</span>
              <p className="ai-card-text">增肌不掉脂<br />确定不是在骗我？</p>
            </div>
          </div>
        </div>

        {/* 文章列表区域 */}
        <div className="articles-section">
          {/* 文章卡片 1 */}
          <div className="article-card">
            <div className="article-main">
              <div className="article-info">
                <h3 className="article-title">在国外健身房<br />还能这样子</h3>
                <p className="article-subtitle">关于健身的冷知识</p>
              </div>
              <div className="article-icon-box blue">
                🏋️
              </div>
            </div>
            <div className="article-footer">
              <span>⭐</span>
              <span>今天确认上！给我增肌变壮吧，少量多餐每天五顿饭</span>
            </div>
          </div>

          {/* 文章卡片 2 */}
          <div className="article-card">
            <div className="article-main">
              <div className="article-info">
                <h3 className="article-title">一次练两个部位<br />真的会更练这？</h3>
                <p className="article-subtitle">专家来为你解答</p>
              </div>
              <div className="article-icon-box indigo">
                💼
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisView;
