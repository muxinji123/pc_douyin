import React, { useRef, useEffect, useState } from 'react';
import DiagnosisView, { diagnosisPages } from './views/DiagnosisView';
import RightActionBar from './RightActionBar';
import './FeedContainer.css';
import injuryPageOne from '../assets/injury/injury-1.png';
import injuryPageTwo from '../assets/injury/injury-2.png';
import alimentaryFallback from '../assets/hero.png';

const alimentaryAssets = import.meta.glob('../assets/alimentary/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
  query: '?url'
});

const alimentaryPages = Object.entries(alimentaryAssets)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .slice(0, 2)
  .map(([, image], index) => ({
    image,
    label: `Alimentary page ${index + 1}`
  }));

const alimentaryFallbackPages = [
  {
    image: alimentaryFallback,
    label: 'Alimentary page 1'
  },
  {
    image: alimentaryFallback,
    label: 'Alimentary page 2'
  }
];

const VIDEO_GROUPS = [
  {
    key: 'diagnosis',
    videos: [
      '/video/痛苦卧推/1.mp4',
      '/video/痛苦卧推/download.mp4'
    ],
    pages: diagnosisPages
  },
  {
    key: 'injury',
    videos: [
      '/video/没带护具健身/发现更多精彩视频 - 抖音搜索.mp4',
      '/video/没带护具健身/2 - 抖音搜索.mp4'
    ],
    pages: [
      {
        image: injuryPageOne,
        label: 'Injury page 1'
      },
      {
        image: injuryPageTwo,
        label: 'Injury page 2'
      }
    ]
  },
  {
    key: 'alimentary',
    videos: [
      '/video/健身没效果/发现更多精彩视频 - 抖音搜索.mp4',
      '/video/健身没效果/2 - 抖音搜索.mp4'
    ],
    pages: alimentaryPages.length >= 2 ? alimentaryPages : alimentaryFallbackPages
  }
];

const buildFeedItems = () => VIDEO_GROUPS.flatMap((group) => [
  ...group.videos.map((src, index) => ({
    type: 'video',
    src,
    id: `${group.key}-video-${index + 1}`,
    stats: generateRandomStats()
  })),
  ...group.pages.map((_, index) => ({
    type: 'story',
    id: `${group.key}-page-${index + 1}`,
    page: index + 1,
    pages: group.pages
  }))
]);

// 独立的视频播放组件
const VideoPlayer = ({ src, isMuted, onToggleMute }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      });
    }, { threshold: 0.6 });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 当全局静音状态改变时，同步更新视频元素
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="video-container-inner" onClick={onToggleMute} style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
      />
      {isMuted && (
        <div className="mute-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63m2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71M4.27 3L3 4.27L7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21L21 19.73l-9-9zM12 4L9.91 6.09L12 8.18z"/></svg>
        </div>
      )}
    </div>
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
  const [items, setItems] = useState(buildFeedItems());
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  // 实现无限滚动逻辑
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // 当滚动到距离底部还有 500px 时，追加新的一组数据
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 500) {
        setItems(prev => {
          const newSet = buildFeedItems().map(item => ({
            ...item,
            id: `${item.id}-${prev.length}` // 确保 ID 唯一
          }));
          return [...prev, ...newSet];
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="feed-container" ref={containerRef}>
      {items.map((item) => (
        <div key={item.id} className={`feed-item ${item.type === 'story' ? 'story-item' : 'dummy-video'}`}>
          <div className="video-wrapper">
            {item.type === 'video' ? (
              <VideoPlayer 
                src={item.src} 
                isMuted={isMuted} 
                onToggleMute={toggleMute}
              />
            ) : (
              <DiagnosisView page={item.page} pages={item.pages} />
            )}
          </div>
          {item.type === 'video' && (
            <div className="item-actions">
              <RightActionBar {...item.stats} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeedContainer;
