# CLAUDE.md — ReadBooksWithAI AI 操作手册

> 本文件是 Claude Code 在本仓库中工作时必须遵循的顶层指令。

---

## 项目定位

**ReadBooksWithAI** 是一个用 AI 为用户定制化重写经典教材的开源项目。目标是将传统教材转化为现代化、分段式、自含式学习材料。两个核心能力：

1. **定制化**：根据读者背景生成隐性知识补充，决定哪些展开讲、哪些跳过
2. **AI 联网检索**：写每一课时主动搜索最新资料，对比原书内容是否过时，将更现代的写法和更好的解释融入正文

---

## Skill 驱动工作流

本项目的核心是六步 skill 流水线。每本书从需求确认到课程产出，严格按此顺序执行：

```
/init-book → /index-book → /plan-book → /config-book → /write-lesson (循环) → /review-lesson (循环)
```

### Step 1: `/init-book <book-id>`

**需求确认**。与用户分轮对话确认：目标读者、学习目标、深度偏好、参考资源。
- 输出：`books/<book-id>/REQUIREMENTS.md`
- 用户需自行将参考 PDF 放入 `books/<book-id>/refs/`

### Step 2: `/index-book <book-id>`

**建立索引**。为 `refs/` 下的参考书籍逐本建立章节索引和概念反查表。
- 输出：`books/<book-id>/refs/*-index.md`
- 索引是后续写课时精准引用原书内容的关键

### Step 3: `/plan-book <book-id>`

**规划路径**。基于需求和索引，将原书重组为模块化学习路径。
- 输出：`BOOK.md`、`module-index.md`、每个模块的 `MODULE.md`
- 创建完整的目录结构

### Step 4: `/config-book <book-id>`

**写作约束**。生成本书特有的写作规则，桥接通用规范和具体写课。
- 输出：`BOOK-STYLE.md`（代码规范、隐性知识清单、图表偏好、⭐ 触发条件、术语翻译）
- 这是 write-lesson 执行时最重要的参照文件之一

### Step 5: `/write-lesson <book-id> <module> <lesson>`

**编写课程**。按课编写自含式教材，先骨架确认再填充内容。
- 每课写作时联网搜索最新资料，对比原书内容标记过时/可补充之处，在大纲中展示给用户确认
- 输出：`books/<book-id>/<module>/<lesson>.md`
- 每课编写后自动更新术语表和课程索引状态

### Step 6: `/review-lesson <book-id> <module> <lesson>`

**勘验课程**。对已完成课程进行七维系统化审查。
- 七个维度：事实准确性、代码验证（编译+运行）、Mermaid 图表验证、内部一致性、术语一致性、格式规范、前后衔接
- 输出勘验报告后提供三种处理方式：自动修复 / 逐条确认 / 仅保留报告
- 修复后更新 `module-index.md` 状态为 `👀`（已审阅）

---

## 仓库结构

```
ReadBooksWithAI/
├── CLAUDE.md                       # 本文件
├── README.md                       # 项目介绍
├── guides/                         # 通用写作基础设施（书无关）
│   ├── lesson-writing-guide.md     # 课程写作规范
│   ├── depth-system.md             # 三档深度标记规范
│   └── terminology-glossary.md     # 跨课术语一致性表
├── _templates/                     # 模板文件
│   ├── lesson-template.md          # 课程骨架
│   └── module-template.md          # 模块骨架
├── books/
│   └── <book-id>/                  # 每本书独立空间
│       ├── REQUIREMENTS.md         # /init-book 产出
│       ├── refs/                   # 用户放参考 PDF + 索引
│       │   ├── *.pdf               # 用户提供的参考资料
│       │   └── *-index.md          # /index-book 产出
│       ├── BOOK.md                 # /plan-book 产出：书级元数据
│       ├── BOOK-STYLE.md           # /config-book 产出：写作约束
│       ├── module-index.md         # /plan-book 产出：课程总索引
│       └── module-XX-xxx/          # /plan-book 产出：模块目录
│           ├── MODULE.md           # /plan-book 产出：模块概述
│           └── lesson-XX-xxx.md    # /write-lesson 产出：课程文件
└── .claude/skills/                 # Skill 定义
    ├── init-book/SKILL.md
    ├── index-book/SKILL.md
    ├── plan-book/SKILL.md
    ├── config-book/SKILL.md
    ├── write-lesson/SKILL.md
    └── review-lesson/SKILL.md
```

---

## 核心写作规则

以下规则适用于所有课程。详细通用规范见 `guides/lesson-writing-guide.md`，书级具体约束见各书的 `BOOK-STYLE.md`。

### 四段式概念结构

每个核心概念：是什么 → 为什么重要 → 代码/示例演示 → 易错点

### 代码/示例规范

- 完整可运行，禁止片段（具体完整性标准见 `BOOK-STYLE.md`）
- 每个概念至少一组 ❌ / ✅ 正反对比
- 关键行注释解释"为什么"
- 示例后附运行命令（具体命令见 `BOOK-STYLE.md`）

### 深度标记

详见 `guides/depth-system.md`：

| 档位 | 标记 | 说明 |
|------|------|------|
| 入门级 | `> [BEGINNER]` 块引用 | 补充前置概念 |
| 实用级 | 无标记（默认） | 能独立运用 |
| 深入级 | `⭐ 深入：` 前缀 | 底层原理，可跳过 |

具体触发条件和补充场景见各书的 `BOOK-STYLE.md`。

### 其他

- 图表：Mermaid 优先，ASCII 降级（≤ 80 字符宽），每课至少一张图
- 陷阱清单：每课 ≥ 3 条，表格格式
- 前置知识检查：每课开头 2-3 个问题
- 自测题：每课末尾 2-3 道思考题
- 体量：**内容完整性优先于行数**，每课不少于 300 行，无硬上限，不为压行数砍内容
- 语言：中文为主，代码/命令/专业术语英文原文，用"你"称呼读者

---

## 课程元数据格式

```yaml
---
module: "module-XX-name"
lesson: "lesson-XX"
title: "课程标题"
original_chapters:
  - chapter: N
    pages: "xx-xx"
prerequisites:
  - module: "module-XX-name"
    lesson: "lesson-XX"
    reason: "前置原因"
difficulty: standard
estimated_minutes: 45
concepts: [概念1, 概念2]
status: draft
---
```
