export const PET_KINDS = ["dog", "cat", "fish", "turtle", "parrot"] as const;

export type PetKind = (typeof PET_KINDS)[number];

export interface PetTypeSummary {
  kind: PetKind;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  time: string;
  commitment: string;
  tone: "apricot" | "rose" | "sky" | "sage" | "sun";
}

export const petTypes: PetTypeSummary[] = [
  {
    kind: "dog",
    name: "狗狗",
    emoji: "🐶",
    tagline: "热情的生活搭档",
    description: "喜欢陪伴和规律互动，也需要训练、运动与长期稳定的时间投入。",
    time: "每天 2–3 小时",
    commitment: "陪伴需求高",
    tone: "apricot",
  },
  {
    kind: "cat",
    name: "猫咪",
    emoji: "🐱",
    tagline: "有边界的亲密室友",
    description: "相对独立，但依然需要游戏、环境丰富化和细致的健康观察。",
    time: "每天 1–2 小时",
    commitment: "空间需求适中",
    tone: "rose",
  },
  {
    kind: "fish",
    name: "鱼儿",
    emoji: "🐟",
    tagline: "安静的水下世界",
    description: "日常互动少，但开缸、水质和过滤系统需要提前认真学习。",
    time: "稳定维护水质",
    commitment: "前期准备较多",
    tone: "sky",
  },
  {
    kind: "turtle",
    name: "乌龟",
    emoji: "🐢",
    tagline: "慢节奏的长久陪伴",
    description: "看起来省心，实际需要合适的温度、光照、水质和很长的照护承诺。",
    time: "规律环境维护",
    commitment: "寿命可能很长",
    tone: "sage",
  },
  {
    kind: "parrot",
    name: "鹦鹉",
    emoji: "🦜",
    tagline: "聪明的社交伙伴",
    description: "聪明敏感、需要高质量互动，也要提前考虑声音和家庭安全。",
    time: "每天充分互动",
    commitment: "社交需求高",
    tone: "sun",
  },
];

export function getPetType(kind: string) {
  return petTypes.find((pet) => pet.kind === kind);
}
