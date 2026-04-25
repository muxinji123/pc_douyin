# TikTok Hackathon 项目理解文档

更新时间：2026-04-25

## 一句话理解

这是一个用 React + Vite 做的桌面版 TikTok 风格健身内容流 demo。它把真实短视频和几张已经设计好的“诊断/建议结果页”图片混排在一个竖向刷视频 feed 里，形成“看健身痛点视频，然后刷到 AI 诊断结果”的产品叙事。

当前系统能跑通，构建也能通过。最大的结构性问题不是技术栈，而是关键业务页仍然是整张 PNG：页面看起来完成度高，但内部没有可复用的数据、状态、布局组件和可交互区域。

## 项目技术栈

- 构建工具：Vite 8
- 前端框架：React 19
- 样式方式：普通 CSS 文件 + 少量 inline style
- 路由：无
- 状态管理：React 本地 state
- 数据来源：源码里的常量数组、图片导入、`public/video` 里的静态视频
- 后端/API：无

相关文件：

- `package.json`：只依赖 `react` 和 `react-dom`，开发依赖为 Vite、ESLint、React 插件。
- `vite.config.js`：默认 Vite React 配置。
- `eslint.config.js`：启用 JS recommended、React Hooks、React Refresh 规则。
- `index.html`：挂载 `#root`，标题仍是默认 `webapp`。
- `README.md`：仍是 Vite 模板文档，不是项目说明。

## 运行入口

渲染路径是：

```txt
index.html
  -> src/main.jsx
    -> src/App.jsx
      -> src/components/TikTokDesktopLayout.jsx
        -> Sidebar
        -> FeedContainer
```

`App.jsx` 本身很薄，只包了一层 `.app-root`，核心全部在 `TikTokDesktopLayout` 和 `FeedContainer`。

## 当前主界面结构

### `TikTokDesktopLayout`

文件：

- `src/components/TikTokDesktopLayout.jsx`
- `src/components/TikTokDesktopLayout.css`

职责：

- 搭出桌面 TikTok 外壳。
- 左侧固定 `Sidebar`。
- 右上角有一个 header pill，包含图标按钮和 Log in。
- 中间区域通过 `FeedContainer` 展示竖向视频流。

布局特点：

- 整体是 `100vw x 100vh`。
- 左侧栏固定 250px。
- 中间 feed 使用绝对定位撑满，并通过 `padding-right: 250px` 去平衡左侧栏视觉。
- 视频容器比例固定为 `9 / 16`，适合竖屏内容。

风险：

- 右侧 action bar 的位置和视频高度有强耦合，`left: calc(50% + ((100vh - 40px) * 9 / 32) + 20px)` 比较脆。
- 桌面布局优先，移动端只有局部适配。

### `Sidebar`

文件：

- `src/components/Sidebar.jsx`
- `src/components/Sidebar.css`

职责：

- 模拟 TikTok 桌面侧边栏。
- 包含 logo、搜索框、For You / Explore / Following / LIVE / Upload / Profile、登录按钮和 footer links。

特点：

- 目前是静态 UI，没有实际导航行为。
- SVG 图标直接写在 JSX 里。
- logo 用了 emoji 音符和 TikTok 文案。

可优化点：

- 导航项可以抽成数组渲染。
- 图标可以统一成 `Icon` 组件或独立常量。
- 搜索框目前只是视觉元素。

## Feed 系统

### `FeedContainer`

文件：

- `src/components/FeedContainer.jsx`
- `src/components/FeedContainer.css`

这是当前系统的核心。

它做了三件事：

1. 定义三组健身内容：`diagnosis`、`injury`、`alimentary`。
2. 每组先放 2 个视频，再放 2 个 story 图片页。
3. 把所有 item 展平成一个竖向 scroll snap feed。

当前内容组：

```txt
diagnosis
  video: /video/痛苦卧推/1.mp4
  video: /video/痛苦卧推/download.mp4
  story: diagnosis-1.png
  story: diagnosis-2.png

injury
  video: /video/没带护具健身/发现更多精彩视频 - 抖音搜索.mp4
  video: /video/没带护具健身/2 - 抖音搜索.mp4
  story: injury-1.png
  story: injury-2.png

alimentary
  video: /video/健身没效果/发现更多精彩视频 - 抖音搜索.mp4
  video: /video/健身没效果/2 - 抖音搜索.mp4
  story: alimentary-1.png
  story: alimentary-2.png
```

关键实现：

- `VIDEO_GROUPS` 是半数据化的内容配置。
- `buildFeedItems()` 把每组内容展开成 feed item。
- `VideoPlayer` 用 `IntersectionObserver` 控制可见时播放、离开时暂停。
- story item 统一复用 `DiagnosisView`，只是传入不同 `pages`。
- 视频 item 右侧显示 `RightActionBar`。

值得肯定的地方：

- `IntersectionObserver` 是正确方向，避免多个视频同时播放。
- `scroll-snap-type: y mandatory` 很适合 TikTok 体验。
- 已经出现了“内容组”的数据结构雏形，这是后续半 hardcode 的入口。

主要问题：

- `generateRandomStats()` 在构建 item 时随机生成，每次刷新都会变，演示时数字不稳定。
- `VIDEO_GROUPS` 既包含视频路径，又引用页面图片，业务结构还没有独立出去。
- story item 全部叫 `DiagnosisView`，但其实里面既有 injury，也有 alimentary，不再只是 diagnosis。
- 图片 story 没有自己的 action bar、标题、解释或交互，只是整图。
- `public/video` 和根目录 `video` 有重复素材，占用空间也容易造成维护混乱。

## 当前“整图页面”机制

### `DiagnosisView`

文件：

- `src/components/views/DiagnosisView.jsx`
- `src/components/views/DiagnosisView.css`

这是你们说的“页面是一整个图片”的核心位置。

当前实现：

```jsx
function DiagnosisView({ page = 1, pages = diagnosisPages }) {
  const currentPage = pages[Math.max(0, Math.min(page - 1, pages.length - 1))];

  return (
    <div className="diagnosis-view" aria-label={currentPage.label}>
      <img className="diagnosis-background" src={currentPage.image} alt="" />
    </div>
  );
}
```

它本质上是一个 `StoryImageView`：

- 输入：第几页、页面图片数组。
- 输出：一张铺满整个 9:16 容器的图片。
- 没有内部布局。
- 没有文字组件。
- 没有按钮组件。
- 没有卡片组件。
- 没有可复用的数据 schema。

CSS 也说明了这点：

- `.diagnosis-view` 只是容器。
- `.diagnosis-background` 用 `position: absolute; inset: 0; object-fit: cover;` 铺满。

为什么这是最大难点：

- 视觉细节都被烘焙进 PNG，代码无法单独调整其中某个标题、标签、卡片、按钮。
- 文字不可被浏览器选中，也没有真实语义，对无障碍、响应式和动态内容都不友好。
- 如果要做动画，只能整体淡入淡出，很难让“风险标签”“动作建议”“装备卡片”等局部动起来。
- 图片尺寸和容器比例绑定很紧，一旦移动端或不同桌面窗口尺寸变化，细节可能被裁切或缩放失真。

## 未挂载但有价值的横向解决方案原型

### `HorizontalCardSwiper`

文件：

- `src/components/HorizontalCardSwiper.jsx`
- `src/components/HorizontalCardSwiper.css`

这个组件目前没有被主渲染路径使用。`App.jsx` 只挂了 `TikTokDesktopLayout`，`TikTokDesktopLayout` 只挂了 `FeedContainer`，所以 `HorizontalCardSwiper` 是闲置原型。

它的产品想法很有价值：

- 先展示一句痛点文案：`又没有保护架！推不起来了谁来帮我！`
- 用户点击后进入横向 swiper。
- 横向四页分别是：
  - `DiagnosisView`
  - `EquipmentView`
  - `GymRecommendView`
  - `SocialView`
- 底部有分页标签：诊断 / 装备 / 找馆 / 搭子。
- 支持左右键切换。

这其实是一个更完整的“从内容痛点到解决方案闭环”的雏形：

```txt
痛点视频
  -> AI 诊断
  -> 装备推荐
  -> 附近健身房
  -> 找训练搭子
```

但它现在没有进入主 feed，所以用户不会看到。

## 其他 view 组件

### `EquipmentView`

文件：

- `src/components/views/EquipmentView.jsx`
- `src/components/views/EquipmentView.css`

这是目前最接近真正组件化页面的部分。

它包含：

- 顶部手机状态栏和 tab。
- hero 标题。
- AI 方案卡片。
- 商品 grid。
- AI tip。
- 健身房体验课团购卡片。
- quick tags。
- footer actions。

它的结构比 `DiagnosisView` 更可拆：

```txt
EquipmentView
  -> MobileHeader
  -> HeroCopy
  -> AISolutionCard
  -> ProductGrid
  -> ProductCard
  -> AITip
  -> GymOfferCard
  -> QuickTags
  -> FooterActions
```

主要问题：

- `items` 定义在组件内部。
- 文案和价格全部写死。
- 使用外链 Unsplash 图片，比赛现场网络不稳时可能加载失败。
- 样式有较多紫色渐变，和 TikTok 主色、健身内容、整图页面之间的风格还没有统一。

### `GymRecommendView` 和 `SocialView`

文件：

- `src/components/views/GymRecommendView.jsx`
- `src/components/views/SocialView.jsx`

两者都是占位页：

- 使用 inline style。
- 显示标题、描述和虚线 placeholder box。
- 没有被主 feed 挂载。
- 只有在 `HorizontalCardSwiper` 被使用时才可能出现。

价值：

- 它们代表了产品闭环方向。
- 但当前完成度明显低于整图页和 `EquipmentView`。

## 右侧操作栏

### `RightActionBar`

文件：

- `src/components/RightActionBar.jsx`
- `src/components/RightActionBar.css`

职责：

- 模拟 TikTok 右侧点赞、评论、收藏、分享、音乐唱片按钮。
- 接受 avatar、likes、comments、bookmarks、shares。

特点：

- 组件 API 已经存在，适合保留。
- 图标仍然直接写在 JSX 内。
- 按钮无真实交互状态。

风险：

- 只在视频 item 上显示，story 图片页没有。
- 如果 story 页也要像 TikTok 原生内容，右侧 action bar 应该统一由 feed item 管理，而不是只给 video。

## 静态资源

### 图片

源码图片都在 `src/assets`：

- `src/assets/Diagnosis/diagnosis-1.png`
- `src/assets/Diagnosis/diagnosis-2.png`
- `src/assets/injury/injury-1.png`
- `src/assets/injury/injury-2.png`
- `src/assets/alimentary/alimentary-1.png`
- `src/assets/alimentary/alimentary-2.png`
- `src/assets/hero.png`
- `src/assets/react.svg`
- `src/assets/vite.svg`

业务图片大小都在 1.5MB 到 1.8MB 左右，构建后会进入 bundle assets。它们是当前视觉完成度的来源，也是组件化最大的锁定点。

### 视频

视频有两份：

- `public/video/...`
- `video/...`

当前代码使用的是 `public/video/...` 路径，因为浏览器要通过 `/video/...` 访问。

根目录 `video/...` 更像原始素材备份，不参与构建路径。现在这两份内容重复，后续建议保留一个权威位置，避免改了一个忘了另一个。

当前 `.gitignore` 没有忽略 `public/video` 和 `video`，所以这些视频会进入 git。黑客松可以接受，但如果仓库要长期维护，建议慎重。

## 当前系统真实的数据模型

虽然项目没有单独的数据层，但从代码里可以推断出一个隐含模型：

```ts
type ContentGroup = {
  key: 'diagnosis' | 'injury' | 'alimentary';
  videos: string[];
  pages: {
    image: string;
    label: string;
  }[];
};

type FeedItem =
  | {
      type: 'video';
      src: string;
      id: string;
      stats: ActionStats;
    }
  | {
      type: 'story';
      id: string;
      page: number;
      pages: StoryPage[];
    };
```

这是后续半 hardcode 的最佳切入点。也就是说，第一步不需要完全重写 UI，只需要把这个隐含模型显式化。

## 现在的核心产品叙事

我理解现在的产品不是“健身工具 app”，而是更像：

> 在短视频信息流里识别用户的健身痛点，把原本只会刷过去的视频，变成一个可诊断、可推荐、可购买、可连接真人支持的智能消费入口。

当前三个 case 对应：

1. 痛苦卧推：动作风险诊断。
2. 没带护具健身：安全防护/装备建议。
3. 健身没效果：训练方法/饮食或计划建议。

这三个 case 比单一 demo 更有价值，因为它们说明系统可以围绕不同健身内容生成不同解决路径。

## 最大结构问题

### 1. 完成度依赖整图，而非组件

`DiagnosisView` 只是图片容器。所有“页面结构”都在 PNG 里。

这让页面非常快地好看起来，但会带来：

- 不可编辑。
- 不可动画化。
- 不可响应式重排。
- 不可复用。
- 不可接数据。
- 不可做细节交互。

### 2. 已有两个页面体系，但没有统一

系统里有两套思路：

- 主 feed：竖向刷视频 + 整图 story。
- `HorizontalCardSwiper`：横向解决方案链路。

它们没有合并。主 feed 更像 TikTok，swiper 更像产品闭环。真正理想的 demo 应该让两者合作，而不是二选一。

### 3. 数据 hardcode 和 UI hardcode 混在一起

例如：

- `VIDEO_GROUPS` 写在 `FeedContainer.jsx`。
- `EquipmentView` 的商品数据写在组件内部。
- `DiagnosisView` 的页面数组写在 view 文件里。
- 随机 stats 写在 FeedContainer 里。

这会让每一次新增 case 都要改组件代码。

### 4. 未使用组件增加认知成本

`HorizontalCardSwiper`、`EquipmentView`、`GymRecommendView`、`SocialView` 都存在，但主路径不用它们。对接手的人来说，会误判哪些是当前产品的一部分。

## 我建议的组件化方向

先不要试图把整张 PNG 一次性还原成组件。那会消耗太多时间，而且很可能把当前视觉质量弄坏。

更好的路径是“外壳组件化 + 局部覆盖 + 数据显式化”。

### 第一阶段：把现有 hardcode 显式数据化

新增类似：

```txt
src/data/scenarios.js
```

把现在的 `VIDEO_GROUPS`、图片 pages、文案、stats 都搬进去。

目标不是减少代码行数，而是让系统变成：

```txt
FeedContainer 负责渲染 feed
scenarios.js 负责描述内容
```

这是最小代价、最大收益。

### 第二阶段：把 `DiagnosisView` 改名或泛化

当前 `DiagnosisView` 已经被 injury/alimentary story 复用，名字不准确。

建议先拆成：

```txt
StoryImageView
DiagnosisView
```

其中：

- `StoryImageView` 负责显示整图。
- `DiagnosisView` 以后可以逐步变成真正的组件化诊断页。

短期可以先不改视觉，只改命名和职责边界。

### 第三阶段：只抽“覆盖层”，不要马上重画整图

在整图上加真实组件 overlay，例如：

```txt
StoryImageView
  -> image background
  -> optional OverlayActions
  -> optional DiagnosisProgress
  -> optional CTA button
```

这样既保留 PNG 的完成度，又能增加可交互、可演示的真实部分。

最适合先组件化的元素：

- 页码/进度点。
- “AI 分析中”的扫描状态。
- 底部 CTA。
- 风险等级 badge。
- 右侧 action bar。
- case 切换标签。

不建议最先组件化的元素：

- 整页复杂排版。
- 所有卡片视觉。
- 大段文字布局。
- 图片里已经做好的细小图表。

### 第四阶段：把 `HorizontalCardSwiper` 接回主叙事

它可以变成 story 页点击后的“解决方案详情”，或者替代当前每组后面的两张 story 图片。

更适合黑客松 demo 的交互：

```txt
刷到痛苦卧推视频
  -> 下一屏 AI 诊断整图
  -> 点击“查看解决方案”
  -> 横向切换：诊断 / 装备 / 找馆 / 搭子
```

这会让 demo 从“几张图”变成“有分支、有闭环的产品体验”。

## 12 小时内最现实的优化顺序

### P0：保住演示稳定性

- 不动 feed 主结构。
- 不大规模还原 PNG。
- 保持 `npm run build` 通过。

### P1：数据层抽离

把 `VIDEO_GROUPS`、story pages、固定 stats、case 标题文案放到 `src/data/scenarios.js`。

收益：

- 以后新增 case 很快。
- 代码更像产品系统。
- 评委问“是不是 hardcode”时，可以解释为 scenario configuration。

### P2：重命名/泛化整图组件

新增 `StoryImageView.jsx`，让 `DiagnosisView` 不再承担所有 story。

收益：

- 架构语义变清楚。
- 后面真正做 `DiagnosisView` 时不影响 injury/alimentary。

### P3：给整图加真实 overlay

最推荐加：

- 顶部 case 标签：动作风险 / 防护建议 / 训练效果。
- 底部 CTA：查看解决方案。
- 一个短暂的 AI 分析 loading/reveal。

收益：

- 既保留当前图片质量，又让页面“活起来”。
- 不需要完全重画 UI。

### P4：把 `HorizontalCardSwiper` 用起来

让 CTA 触发横向方案页，或者把某个 story item 替换为 swiper。

收益：

- demo 趣味性提升最大。
- 已有代码可复用，不是从零开始。

## 不建议现在做的事

- 不建议把所有图片里的 UI 完整还原成 JSX/CSS，时间不够且风险很大。
- 不建议引入复杂状态管理或路由。
- 不建议接真实后端或模型，除非已经有稳定 API。
- 不建议大改整体视觉风格，现在已经有足够 demo 感。
- 不建议继续添加更多占位页，应该把现有闭环打磨清楚。

## 构建验证

已运行：

```bash
npm run build
```

结果：

- 构建成功。
- JS bundle 约 203KB，gzip 后约 64KB。
- CSS 约 6.66KB，gzip 后约 1.87KB。
- 六张业务 PNG 进入构建产物，每张约 1.58MB 到 1.77MB。

这说明当前源码没有阻塞性构建问题。主要风险集中在资源体积、整图硬编码、组件边界和演示交互深度。

## 总结

当前系统已经不是空壳，它有一个清晰的 demo 骨架：

```txt
TikTok 外壳
  -> 健身痛点视频 feed
    -> AI 诊断/建议 story
      -> 潜在解决方案闭环
```

现在最聪明的优化不是“消灭 hardcode”，而是把 hardcode 升级成可解释、可扩展的 scenario 配置；把整图页面包进更清楚的 story 组件；再用少量真实 overlay 和交互，让它看起来不是一组静态截图，而是一个正在工作的产品原型。
