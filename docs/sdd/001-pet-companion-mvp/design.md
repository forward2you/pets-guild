# 新手宠物养护助手 MVP 技术设计

> 关联规格：[spec.md](./spec.md)  
> 状态：基线已确认  
> 设计目标：以前端 MVP 验证“选择、计划、记录”闭环，同时为后续服务端和更多宠物规则保留清晰边界。

## 1. 设计原则

1. **规则与界面分离**：测评、阶段判断和任务生成必须可以脱离 React 组件测试。
2. **渐进式收集信息**：先生成基础结果，再提示用户补充提高准确度的信息。
3. **安全优先**：健康限制可以覆盖普通任务，缺少数据时不虚构结论。
4. **本地优先**：MVP 无需注册即可完整体验，持久化层可在后续替换为 API。
5. **按宠物扩展**：共用外壳和领域协议，使用宠物专属规则，避免强行套用同一内容。

## 2. 技术栈

| 层级           | 方案                                    | 选择理由                                 |
| -------------- | --------------------------------------- | ---------------------------------------- |
| 应用框架       | Next.js App Router + React + TypeScript | 路由、静态内容、SEO 和后续服务端能力兼顾 |
| 样式           | Tailwind CSS + CSS 变量                 | 快速建立响应式设计令牌，同时保留主题控制 |
| 客户端状态     | Zustand                                 | 适合建档向导、任务状态和轻量持久化       |
| 数据校验       | Zod                                     | 运行时校验 LocalStorage 和表单数据       |
| 日期处理       | date-fns                                | 任务日期、间隔和本地化显示               |
| 单元与组件测试 | Vitest + Testing Library                | 测试纯规则和用户交互                     |
| 端到端测试     | Playwright                              | 覆盖测评、建档、计划和恢复流程           |
| 代码质量       | ESLint + Prettier + TypeScript strict   | 统一代码风格并减少数据模型错误           |

## 3. 应用信息架构

| 路由                    | 页面职责                   | 主要需求                |
| ----------------------- | -------------------------- | ----------------------- |
| `/`                     | 首页、双入口、五类宠物入口 | FR-001 FR-002           |
| `/match`                | 适宠测评向导               | FR-003                  |
| `/match/result`         | 结果、解释和比较           | FR-004 FR-005           |
| `/breeds/dog`           | 犬种筛选与详情             | FR-006                  |
| `/guides/[petKind]`     | 宠物路线图与阶段内容       | FR-007 FR-008           |
| `/checklists/[petKind]` | 接宠前用品清单             | FR-009                  |
| `/onboarding`           | 宠物建档向导               | FR-010 FR-011 FR-012    |
| `/dashboard`            | 今日任务、提醒和阶段重点   | FR-013 至 FR-017 FR-021 |
| `/health`               | 健康异常快速查询           | FR-018                  |
| `/pets/[petId]/records` | 健康记录管理               | FR-019                  |

Dashboard 在没有档案时渲染引导状态，而不是直接重定向，以便用户理解为什么需要建档。

## 4. 页面与组件结构

```text
AppShell
├── Header
├── Main
│   ├── HomePage
│   │   ├── HeroChoice
│   │   ├── PetTypeGrid
│   │   └── HowItWorks
│   ├── MatchWizard
│   │   ├── ProgressIndicator
│   │   ├── QuestionStep
│   │   └── MatchResultCards
│   ├── GuideTimeline
│   │   ├── StageNavigation
│   │   └── GuideModuleList
│   ├── PetOnboardingWizard
│   ├── Dashboard
│   │   ├── PetSummary
│   │   ├── TodayTaskList
│   │   ├── UpcomingReminderList
│   │   └── StageFocus
│   └── HealthTriage
└── Footer
```

展示组件不得直接读取 LocalStorage。页面通过 store 或 repository 获取已校验的数据。

## 5. 领域模型

以下为设计级接口，实施时可调整命名，但语义和约束必须保持。

```ts
type PetKind = "dog" | "cat" | "fish" | "turtle" | "parrot";
type LifeStage = "pre_arrival" | "first_week" | "young" | "growing" | "adult" | "senior";

interface PetProfile {
  id: string;
  name: string;
  kind: PetKind;
  breed?: string;
  birthDate?: string;
  estimatedAgeRange?: string;
  sex?: "female" | "male" | "unknown";
  weightKg?: number;
  arrivalDate?: string;
  details: PetSpecificDetails;
  createdAt: string;
  updatedAt: string;
}

type PetSpecificDetails =
  | { kind: "dog"; size?: string; activityLevel?: string }
  | { kind: "cat"; lifestyle?: "indoor" | "outdoor" | "mixed"; litterBoxCount?: number }
  | {
      kind: "fish";
      species?: string[];
      count?: number;
      tankLiters?: number;
      filterType?: string;
      waterTemperatureC?: number;
    }
  | {
      kind: "turtle";
      species?: string;
      habitat?: string;
      hasBaskingArea?: boolean;
      hasUvb?: boolean;
      waterTemperatureC?: number;
    }
  | {
      kind: "parrot";
      species?: string;
      cageSize?: string;
      dailyInteractionMinutes?: number;
      flightEnvironment?: string;
    };

type HealthRecordType =
  "vaccine" | "internal_deworming" | "external_deworming" | "checkup" | "neutering" | "grooming";

interface HealthRecord {
  id: string;
  petId: string;
  type: HealthRecordType;
  performedAt: string;
  nextDueAt?: string;
  note?: string;
}

interface CareTask {
  id: string;
  logicalKey: string;
  petId: string;
  date: string;
  category: "feeding" | "water" | "cleaning" | "exercise" | "training" | "health" | "environment";
  title: string;
  suggestedTime?: string;
  rationaleId?: string;
  sourceRuleId: string;
  status: "pending" | "completed" | "skipped";
}

interface Reminder {
  id: string;
  petId: string;
  title: string;
  dueAt?: string;
  state: "missing_data" | "overdue" | "upcoming" | "future";
  sourceRuleId: string;
}
```

## 6. 内容模型

```ts
interface GuideContent {
  id: string;
  petKind: PetKind;
  stage: LifeStage;
  module: "food" | "home" | "health" | "behavior" | "care";
  title: string;
  actions: string[];
  rationale: string;
  sourceRefs: string[];
  reviewStatus: "draft" | "reviewed" | "approved";
  reviewedAt?: string;
}
```

生产构建只加载 `approved` 的健康安全内容。普通演示内容至少需要 `reviewed`，草稿内容只能在开发环境出现。

## 7. 测评设计

### 7.1 评分模型

每个答案形成多个维度分值：空间、每日时间、持续预算、清洁承受度、噪声承受度、互动需求、离家频率和照护复杂度。宠物候选包含对应需求区间。

```text
原始答案
→ 维度归一化
→ 硬性冲突检查
→ 加权匹配
→ 推荐理由与代价生成
→ 候选排序
```

结果页必须同时展示：

- 适合度等级，不展示伪精确的小数分数。
- 贡献最大的推荐理由。
- 主要冲突或生活方式代价。
- 用户可以采取的改善措施。

权重和文案存入版本化配置，测试固定输入与输出，避免页面改动改变结果。

## 8. 养护规则引擎

### 8.1 规则结构

```ts
interface CareRule {
  id: string;
  version: number;
  petKinds: PetKind[];
  priority: number;
  when: RuleCondition[];
  produce: RuleOutput[];
  rationaleId: string;
  sourceRefs: string[];
  reviewStatus: "draft" | "reviewed" | "approved";
}
```

### 8.2 执行过程

```text
加载并校验档案与记录
→ 计算宠物年龄和阶段
→ 选择适用规则
→ 先执行安全限制规则
→ 生成日常任务与提醒
→ 按 logicalKey 去重
→ 解决冲突并排序
→ 合并当天的完成状态
```

### 8.3 冲突策略

1. 紧急健康提示优先于所有普通内容。
2. 明确禁止或限制规则优先于建议规则。
3. 更具体的宠物类型、阶段和健康条件优先于通用规则。
4. 同级冲突使用更高 `priority`；仍冲突时记录开发告警并不输出风险较高的建议。
5. 缺少数据时生成补充资料提醒，不猜测健康日期。

### 8.4 稳定标识

任务使用 `petId + date + sourceRuleId + occurrence` 生成 `logicalKey`，保证重复计算不会产生重复任务。

## 9. 状态与持久化

### 9.1 Store 划分

- `assessmentStore`：问卷答案、当前步骤、结果版本。
- `petStore`：宠物档案与当前宠物。
- `careStore`：健康记录、任务完成状态和提醒。
- `uiStore`：一次性引导和非业务界面状态。

### 9.2 仓储接口

```ts
interface PetRepository {
  list(): Promise<PetProfile[]>;
  get(id: string): Promise<PetProfile | null>;
  save(profile: PetProfile): Promise<void>;
  remove(id: string): Promise<void>;
}
```

MVP 使用 `LocalPetRepository`；未来可以添加 `ApiPetRepository`，页面和规则层不感知存储变化。

### 9.3 本地数据包

```ts
interface PersistedAppData {
  schemaVersion: number;
  savedAt: string;
  pets: PetProfile[];
  healthRecords: HealthRecord[];
  taskStates: Record<string, CareTask["status"]>;
  assessment?: unknown;
}
```

读取时先通过 Zod 校验，再按 `schemaVersion` 迁移。迁移失败时保留错误日志并向用户提供清除损坏数据的确认操作。

## 10. 交互与视觉设计

- 视觉气质采用暖白背景、低饱和暖色和圆角卡片，不采用医疗系统式的大面积冷蓝绿色。
- 主要行动按钮在页面中保持单一视觉优先级。
- Dashboard 先显示“今天”，再显示“即将到来”和“当前阶段”。
- 重要健康警告不只依赖颜色，同时使用图标、标题和明确动作。
- 长内容默认折叠为行动摘要，用户通过“为什么”逐层展开。
- 表单每一步只解决一个主题，显示进度、返回和稍后补充选项。

## 11. 异常与边界状态

- 没有档案：显示创建档案和适宠测评入口。
- 档案信息不足：生成基础任务，并列出影响准确度的缺失信息。
- 未知生日：使用年龄区间，避免显示精确日龄。
- 没有近期提醒：说明当前没有根据已录入信息生成的提醒。
- 过期提醒：置顶显示，但允许用户补记实际完成日期。
- 本地存储不可用：应用继续提供只读指南和临时会话，并提示数据不会保存。
- 规则执行失败：保留页面外壳和静态指南，不显示未经计算的建议。
- 非 MVP 宠物：展示基础内容和未来能力边界，不生成伪个性化计划。

## 12. 测试策略

### 12.1 单元测试

- 年龄与成长阶段计算。
- 测评归一化、硬性冲突和排序。
- 规则匹配、优先级、冲突和去重。
- 提醒日期状态。
- LocalStorage 数据校验与迁移。

### 12.2 组件测试

- 问卷键盘操作、返回和错误提示。
- 建档表单的条件字段和校验。
- 任务勾选、取消和进度同步。
- 健康风险提示的可见性。

### 12.3 端到端测试

- AC-001 未决定用户完成测评。
- AC-002 接宠前用户查看路线与清单。
- AC-003 创建狗猫档案并看到计划。
- AC-004 安全规则覆盖普通任务。
- AC-005 刷新后保持任务状态。
- AC-006 紧急健康提示。
- AC-007 损坏数据恢复。

### 12.4 内容安全测试

- 生产数据中不存在未审核健康规则。
- 所有紧急症状均有明确就医动作。
- 不存在诊断结论、药物剂量或保证性表达。
- 每条限制性建议均有“为什么”和来源字段。

## 13. 建议目录结构

```text
src/
├── app/                    # 页面与路由
├── components/             # 通用展示组件
├── features/
│   ├── assessment/         # 适宠测评
│   ├── guides/             # 成长路线与内容模块
│   ├── onboarding/         # 宠物建档
│   ├── care-plan/          # 今日任务与提醒
│   └── health/             # 健康异常查询
├── domain/
│   ├── pets/               # 宠物类型与阶段
│   ├── assessment/         # 测评模型
│   └── rules/              # 规则协议与执行器
├── content/                # 版本化内容与规则数据
├── repositories/           # LocalStorage 与未来 API 适配
├── stores/                 # Zustand stores
├── lib/                    # 日期、校验和通用工具
└── test/                   # 测试夹具与公共配置
```

## 14. 后续服务端演进

MVP 验证后可按以下顺序演进：账号与云端档案、多宠物共享、真实通知、内容管理与审核后台、鱼缸和其他宠物专属规则。前端不提前实现这些能力，只保留仓储接口、版本字段和宠物专属详情联合类型。
