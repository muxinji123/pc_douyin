import React, { useRef, useEffect, useState, useCallback } from 'react';
import HorizontalCardSwiper from './HorizontalCardSwiper';
import RightActionBar from './RightActionBar';
import './FeedContainer.css';

const VIDEO_SOURCES = [
  "/videos/14785822_1080_1920_25fps.mp4",
  "/videos/15192954_2160_3840_25fps.mp4"
];

// 独立的视频播放组件，利用 IntersectionObserver 优化性能
const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 在视野内才播放
          videoRef.current?.play().catch(() => {});
        } else {
          // 离开视野就暂停
          videoRef.current?.pause();
        }
      });
    }, { threshold: 0.6 }); // 当视频有60%可见时触发

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="metadata" // 仅预加载元数据，避免同时下载大量视频导致卡顿
    />
  );
};

// 辅助函数：生成随机点赞数据和头像
const generateRandomStats = () => {
  const formatNum = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };
  
  const avatars = ['💪', '🏋️', '🏃', '🚴', '🏊', '🤸', '🧘', '🥊', '🔥', '✨', '⚡'];
  
  return {
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    likes: formatNum(Math.floor(Math.random() * 500000) + 1000),
    comments: formatNum(Math.floor(Math.random() * 10000) + 100),
    bookmarks: formatNum(Math.floor(Math.random() * 50000) + 500),
    shares: formatNum(Math.floor(Math.random() * 20000) + 200)
  };
};

function FeedContainer() {
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const isAppending = useRef(false); 
  const [items, setItems] = useState([]);

  const appendItems = useCallback((count = 3) => {
    if (isAppending.current) return;
    isAppending.current = true;

    setItems(prev => {
      const startIndex = prev.length;
      const cycleLength = VIDEO_SOURCES.length + 1; 
      
      const newItems = Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        const positionInCycle = index % cycleLength;
        
        if (positionInCycle < VIDEO_SOURCES.length) {
          return {
            type: 'video',
            src: VIDEO_SOURCES[positionInCycle],
            id: `item-${index}`,
            stats: generateRandomStats()
          };
        } else {
          return {
            type: 'card',
            id: `item-${index}-card`,
            stats: generateRandomStats()
          };
        }
      });
      
      return [...prev, ...newItems];
    });

    setTimeout(() => {
      isAppending.current = false;
    }, 500);
  }, []);

  // 初始化内容
  useEffect(() => {
    setItems(prev => {
      if (prev.length > 0) return prev;
      
      const cycleLength = VIDEO_SOURCES.length + 1;
      const initialCount = 4; 
      
      const initialItems = Array.from({ length: initialCount }).map((_, index) => {
        const positionInCycle = index % cycleLength;
        if (positionInCycle < VIDEO_SOURCES.length) {
          return {
            type: 'video',
            src: VIDEO_SOURCES[positionInCycle],
            id: `item-${index}`,
            stats: generateRandomStats()
          };
        } else {
          return {
            type: 'card',
            id: `item-${index}-card`,
            stats: generateRandomStats()
          };
        }
      });
      
      return initialItems;
    });
  }, []);

  const scrollToNext = useCallback((direction) => {
    const container = containerRef.current;
    if (!container || isScrolling.current) return;

    const scrollAmount = container.clientHeight;
    isScrolling.current = true;
    container.scrollBy({
      top: direction * scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollToNext(e.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToNext(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToNext(-1);
      }
    };

    const handleScroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 500) {
        appendItems(3);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [appendItems, scrollToNext]);

  return (
    <div className="feed-container" ref={containerRef}>
      {items.map((item, index) => (
        <div key={item.id} className={`feed-item ${item.type === 'card' ? 'our-card' : 'dummy-video'}`}>
          <div className="video-wrapper">
            {item.type === 'video' ? (
              <>
                <VideoPlayer src={item.src} />
                <div className="dummy-content-overlay" style={{
                  position: 'absolute',
                  bottom: '80px',
                  left: '20px',
                  pointerEvents: 'none'
                }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    {index === 0 ? '向上滑动查看更多' : '随机视频'}
                  </p>
                </div>
              </>
            ) : (
              <HorizontalCardSwiper />
            )}
          </div>
          <div className="item-actions">
            <RightActionBar {...item.stats} />
          </div>
        </div>
      ))}

      {/* 悬浮导航按钮 */}
      <div className="navigation-arrows">
        <button className="nav-arrow" onClick={() => scrollToNext(-1)} title="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10.8L7.1 15.7L5.7 14.3L12 8L18.3 14.3L16.9 15.7z"/></svg>
        </button>
        <button className="nav-arrow" onClick={() => scrollToNext(1)} title="Next">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13.2L16.9 8.3L18.3 9.7L12 16L5.7 9.7L7.1 8.3z"/></svg>
        </button>
      </div>
    </div>
  );
}

export default FeedContainer;
