# PawGuide

PawGuide 是面向新手的宠物选择与养护助手。产品从“什么宠物适合我的生活”开始，再把成长阶段、健康记录和日常养护转化为清楚的下一步。

## 本地开发

```bash
npm install
npm run dev
```

打开 <http://localhost:3000>。

## 质量检查

```bash
npm run check
npm run build
npm run test:e2e
```

首次执行端到端测试前，需要安装浏览器：

```bash
npx playwright install chromium
```

## 规格驱动开发

开发从 [PROJECT_PLAN.md](./PROJECT_PLAN.md) 开始。需求、技术设计和任务清单位于 `docs/sdd/001-pet-companion-mvp`。任何产品行为变更都应先更新规格，再更新实现和测试。
