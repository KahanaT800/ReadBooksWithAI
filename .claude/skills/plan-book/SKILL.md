---
name: plan-book
description: "第三步：基于需求和索引，设计模块化学习路径。调用方式：/plan-book <book-id>"
argument-hint: "<book-id> 例: c-and-pointers"
---

# 规划学习路径：$ARGUMENTS

你是一位课程架构师。现在请基于用户需求和书籍索引，将原书重组为现代化的模块式学习路径。

## 参数

- `BOOK_ID`：从 `$ARGUMENTS` 获取

---

## 前置检查

1. 检查 `books/$BOOK_ID/REQUIREMENTS.md` 是否存在
   - **若不存在**：提示用户先运行 `/init-book $BOOK_ID`，停止
2. 检查 `books/$BOOK_ID/refs/` 下是否有索引文件（`*-index.md`）
   - **若无索引**：提示用户先运行 `/index-book $BOOK_ID`，停止
3. 检查 `books/$BOOK_ID/BOOK.md` 是否已存在
   - **若已存在**：展示现有规划概要，询问用户是"在此基础上调整"还是"重新规划"
   - 若调整：读取现有文件，进入第三步让用户提修改意见
   - 若重新规划：备份现有文件（`BOOK.backup.md`、`module-index.backup.md`、各模块的 `MODULE.backup.md`），继续

---

## 执行流程

### 第一步：读取输入

1. 读取 `books/$BOOK_ID/REQUIREMENTS.md` — 用户需求、目标读者、深度设定、学科领域
2. 读取 `books/$BOOK_ID/refs/` 下所有索引文件（`*-index.md`）— 原书结构和概念分布
3. 读取 `guides/depth-system.md` — 深度标记规范
4. 读取 `_templates/module-template.md` — 模块模板

### 第二步：设计重组方案

基于原书章节索引和用户需求，设计模块化重组方案。

#### 通用原则

1. **概念依赖优先**：被大量后续概念依赖的基础知识前移
2. **紧密关联合并**：逻辑紧密的章节合入同一模块
3. **认知负担平衡**：每个模块 2-4 课，每课预计 45-60 分钟
4. **实践导向**：每个模块结束时读者应能完成有意义的实践
5. **尊重用户偏好**：按 REQUIREMENTS.md 中的强化/跳过要求调整权重

#### 重组决策过程

对原书每一章，思考：
- 这章的核心概念**依赖**哪些前序概念？
- 这章的核心概念**被哪些**后续章节依赖？
- 用户标记为"强化"的内容应该给更多课时
- 用户标记为"跳过"的内容可以合并或省略
- 原书中分散但逻辑紧密的内容是否应该合并？
- 原书中过早出现的高级话题是否应该后移？

### 第三步：输出重组方案（写入文件，等用户确认）

将重组方案写入 `books/$BOOK_ID/PLAN-DRAFT.md`，包含以下三部分：

#### 3.1 模块总览表

```markdown
| 模块 | 名称 | 原书章节 | 课数 | 重组理由 |
|------|------|---------|------|---------|
| 0 | ... | Ch1, Ch2 | 2 | ... |
| 1 | ... | Ch3, Ch6 | 3 | ... |
```

#### 3.2 每个模块的课程拆分

```markdown
### Module 0: 模块名
- lesson-01-slug: 标题 — [概念A, 概念B, 概念C]
- lesson-02-slug: 标题 — [概念D, 概念E]
```

**lesson 命名规范**：
- 格式：`lesson-NN-slug`，NN 两位数字，slug 为英文短横线连接的关键词
- slug 应体现课程核心主题，2-4 个单词
- 示例：`lesson-01-first-program`、`lesson-02-pointer-basics`、`lesson-03-dynamic-memory`

#### 3.3 关键重组决策说明

逐条解释与原书顺序不同的地方及理由，让用户理解设计意图。

**提示用户审阅**：

> 📋 重组方案已写入 `books/$BOOK_ID/PLAN-DRAFT.md`，请查看。
> - 如需调整，告诉我你的修改意见
> - 确认无误后，回复"确认"，我将创建完整的目录和文件

**等待用户确认或提出修改。** 如用户提出调整，修改 PLAN-DRAFT.md 后再次确认。

### 第四步：创建目录和文件

用户确认后，基于 PLAN-DRAFT.md 创建完整的书籍结构。

#### 4.1 创建模块目录

```
books/$BOOK_ID/
├── module-00-xxx/
├── module-01-xxx/
├── ...
```

模块目录命名：`module-NN-slug`，slug 与模块名对应的英文短横线形式。

#### 4.2 生成 BOOK.md

书级元数据文件，内容从 REQUIREMENTS.md 和确认后的 PLAN-DRAFT.md 提取：

```markdown
# BOOK.md — 《书名》

## 原书信息
（从 REQUIREMENTS.md 提取）

## 目标读者
（从 REQUIREMENTS.md 提取）

## 深度设定
（从 REQUIREMENTS.md 提取 target_depth YAML 块）

## 重组方案
（从 PLAN-DRAFT.md 提取确认后的模块总览表）

## 开发环境
（从 REQUIREMENTS.md 提取，若有）
```

#### 4.3 生成 module-index.md

课程总索引，包含所有模块和课程，带状态追踪：

```markdown
## Module N: 模块名

> 原书章节：ChX, ChY | N 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-NN-slug/lesson-01-slug.md` | ... | ... | ⬜ |
```

状态标记：⬜ not started / 📝 draft / 👀 review / ✅ published

#### 4.4 生成每个模块的 MODULE.md

按 `_templates/module-template.md` 模板生成，包含：
- 模块信息（编号、名称、原书章节、课程数量）
- 模块目标（学完后能做什么，3-5 条）
- 课程列表（文件名、标题、核心概念、状态）
- 前置模块依赖
- 模块内课程依赖图（Mermaid）
- 关键术语预览

#### 4.5 清理

删除 `PLAN-DRAFT.md`（内容已落地到 BOOK.md 和 module-index.md）。

### 第五步：提示下一步

```
✅ 学习路径规划完成：
- N 个模块，共 M 课
- books/$BOOK_ID/BOOK.md — 书级元数据
- books/$BOOK_ID/module-index.md — 课程总索引
- 每个模块的 MODULE.md — 模块概述

下一步：运行 /config-book $BOOK_ID 生成本书写作约束
（写作约束配置完成后才能开始编写课程）
```
