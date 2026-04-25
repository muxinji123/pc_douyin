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
  const [items] = useState(buildFeedItems);

  return (
    <div className="feed-container">
      {items.map((item) => (
        <div key={item.id} className={`feed-item ${item.type === 'story' ? 'story-item' : 'dummy-video'}`}>
          <div className="video-wrapper">
            {item.type === 'video' ? (
              <VideoPlayer src={item.src} />
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
