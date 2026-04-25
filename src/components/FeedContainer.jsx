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

function FeedContainer() {
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const isAppending = useRef(false); // 防止重复触发追加
  const [items, setItems] = useState([]);

  const appendItems = useCallback((count = 3) => {
    if (isAppending.current) return;
    isAppending.current = true;

    setItems(prev => {
      const startIndex = prev.length;
      const cycleLength = VIDEO_SOURCES.length + 1; // n个视频 + 1个卡片
      
      const newItems = Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        const positionInCycle = index % cycleLength;
        
        if (positionInCycle < VIDEO_SOURCES.length) {
          return {
            type: 'video',
            src: VIDEO_SOURCES[positionInCycle], // 严格按照数组顺序取视频
            id: `item-${index}` // 基于位置的稳定ID
          };
        } else {
          return {
            type: 'card',
            id: `item-${index}-card`
          };
        }
      });
      
      return [...prev, ...newItems];
    });

    // 延迟重置追加锁，等待DOM渲染更新高度
    setTimeout(() => {
      isAppending.current = false;
    }, 500);
  }, []);

  // 初始化内容
  useEffect(() => {
    // 确保只初始化一次
    setItems(prev => {
      if (prev.length > 0) return prev;
      
      // 首次加载一整个循环（视频1、视频2、卡片），加一个预加载的视频1
      const cycleLength = VIDEO_SOURCES.length + 1;
      const initialCount = 4; 
      
      const initialItems = Array.from({ length: initialCount }).map((_, index) => {
        const positionInCycle = index % cycleLength;
        if (positionInCycle < VIDEO_SOURCES.length) {
          return {
            type: 'video',
            src: VIDEO_SOURCES[positionInCycle],
            id: `item-${index}`
          };
        } else {
          return {
            type: 'card',
            id: `item-${index}-card`
          };
        }
      });
      
      return initialItems;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToNext(direction);
    };

    const handleKeyDown = (e) => {
      if (isScrolling.current) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToNext(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToNext(-1);
      }
    };

    const handleScroll = () => {
      // 如果距离底部小于 500px，追加视频
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 500) {
        appendItems(3);
      }
    };

    const scrollToNext = (direction) => {
      const scrollAmount = container.clientHeight;
      isScrolling.current = true;
      container.scrollBy({
        top: direction * scrollAmount,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 600);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [appendItems]);

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
            <RightActionBar />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedContainer;
