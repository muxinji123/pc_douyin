import React from 'react';
import Sidebar from './Sidebar';
import RightActionBar from './RightActionBar';
import FeedContainer from './FeedContainer';
import './TikTokDesktopLayout.css';

function TikTokDesktopLayout() {
  return (
    <div className="desktop-layout">
      <Sidebar />
      
      <main className="main-content-area">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-pill">
            <button className="pill-icon-btn">
              {/* TikTok Logo replacement - using Home/Brand icon from set */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M12 21q-3.45 0-6.012-2.288T3.127 13h1.011q.3 2.925 2.506 4.963T12 20t5.356-2.037t2.506-4.963h1.01q-.3 3.45-2.862 5.738T12 21"/></svg>
            </button>
            <button className="pill-icon-btn">
              {/* Mobile Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M16 21H8q-.825 0-1.412-.587T6 19V5q0-.825.588-1.412T8 3h8q.825 0 1.413.588T18 5v14q0 .825-.587 1.413T16 21M8 19h8V5H8zm4-1q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18"/></svg>
            </button>
            <button className="pill-icon-btn like-trigger" title="Like">
              {/* Heart Icon for "点赞" */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829q-1.601-1.593-2.528-2.81t-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369 .986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z"/></svg>
            </button>
            <div className="pill-divider"></div>
            <button className="pill-primary-btn">Log in</button>
          </div>
        </header>

        {/* Center Feed Area */}
        <div className="feed-wrapper">
          <div className="video-player-container">
            <FeedContainer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default TikTokDesktopLayout;
