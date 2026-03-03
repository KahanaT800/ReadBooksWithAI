# ReadBooksWithAI

**让 AI 帮你重写经典教材——定制化、现代化、读得懂。**

---

## 为什么做这个项目

读技术书的时候你一定遇到过这些情况：

- **看不懂就卡住了**——书里一句话带过的概念，你得花半小时上网查资料才能搞明白，运气好找到篇好文章，运气不好越查越糊涂
- **不知道自己不知道**——书里默认你会的东西你其实不会，但你甚至意识不到问题出在哪，只觉得"怎么读着读着就跟不上了"
- **内容过时了你也不知道**——书是十年前写的，某些工具、写法、最佳实践早就变了，你照着书学到的可能已经是过时的做法
- **章节编排不适合你**——你明明有经验的部分还在从零讲起，你薄弱的部分又一笔带过

**ReadBooksWithAI** 的核心思路：

1. **定制化**——告诉 AI 你的背景和目标，它会根据你的情况决定哪些要展开讲、哪些一笔带过、哪些"你以为你懂但其实不懂"的隐性知识需要主动补上
2. **AI 联网检索**——AI 写每一课时会主动搜索最新资料，判断原书内容是否过时，补充更现代的写法和工具，你不用自己去查
3. **系统化勘验**——每课写完后 AI 会进行七维审查（事实核查、代码编译验证、图表校验等），确保内容准确可靠

最终产出的不是笔记、不是摘要，而是一套**完整的、为你量身定制的自含式教材**。

---

## 产出的课程长什么样

每一课都是一个独立的 Markdown 文件（约 800-1000 行），打开就能学：

- **四段式讲解**：每个概念都走 `是什么 → 为什么重要 → 代码演示 → 易错点` 的完整流程
- **完整可运行代码**：不是片段，每个示例直接复制就能编译运行
- **正反对比**：每个概念配 ❌ 错误写法 + ✅ 正确写法，让你知道坑在哪
- **三档深度**：`[BEGINNER]` 入门补充 / 正文实用级 / `⭐ 深入` 底层原理，同一文件内按需阅读
- **隐性知识覆盖**：那些"书里不讲但你必须知道"的东西，AI 会根据你的背景主动补上
- **过时内容标注**：原书已过时的写法会标注 `🔄 原书更新说明`，给出现代替代方案
- **图表辅助**：Mermaid 流程图 + ASCII 内存布局图，概念可视化
- **陷阱清单 + 自测题**：每课附常见坑点总结和思考题

### 示例：一个"易错点"长什么样

每个概念都配有 ❌/✅ 正反对比。以下节选自"控制流"一课：

**❌ 错误：switch 忘写 break**

```c
int x = 1;
switch (x) {
    case 1:
        printf("one\n");
        /* 忘了 break; —— 继续执行下一个 case！ */
    case 2:
        printf("two\n");
    case 3:
        printf("three\n");
}
```

`x` 明明是 1，输出却是三行：`one`、`two`、`three`。没有 `break` 时执行会"穿透"到下一个 case——这就是 C 的 **fall-through** 特性。

**✅ 正确：每个 case 加 break**

```c
switch (x) {
    case 1:
        printf("one\n");
        break;          /* ← 加上 break，只输出 one */
    case 2:
        printf("two\n");
        break;
    ...
}
```

课程中每个概念都按 `是什么 → 为什么重要 → 代码演示 → 易错点` 四段式展开，完整代码可直接复制编译运行。

---

## 六步工作流

本项目基于 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 的 Skill 系统，六步流水线从需求到产出：

```
/init-book      需求确认 — 和 AI 聊清楚你的背景和目标
     ↓
/index-book     建立索引 — AI 为参考书建立精准的章节+概念索引
     ↓
/plan-book      规划路径 — AI 把原书重组为适合你的模块化学习路径
     ↓
/config-book    写作约束 — AI 生成本书的写作规则（代码规范、隐性知识清单等）
     ↓
/write-lesson   编写课程 — 逐课编写，每课联网搜索最新资料（循环）
     ↓
/review-lesson  勘验审查 — 七维系统化审查，自动修复问题（循环）
```

每一步都有明确的输入和输出，步骤之间通过文件传递上下文。你可以在任何一步介入调整——确认大纲、修改规划、审批修复方案。

### 快速开始

**前提**：安装 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)。

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/ReadBooksWithAI.git
cd ReadBooksWithAI

# 2. 用 Claude Code 打开项目，然后依次运行：

# Step 1: 告诉 AI 你要学什么、你的背景（分轮对话）
/init-book c-and-pointers

# Step 2: 把参考书 PDF 放入 refs/ 目录，然后建索引
cp ~/CandPointer.pdf books/c-and-pointers/refs/
/index-book c-and-pointers

# Step 3: AI 设计模块化学习路径（你确认后生成目录结构）
/plan-book c-and-pointers

# Step 4: AI 生成本书的写作约束
/config-book c-and-pointers

# Step 5: 开始写课！一次写一课
/write-lesson c-and-pointers module-00-c-basics lesson-01-program-structure

# Step 6: 写完后勘验，自动修复问题
/review-lesson c-and-pointers module-00-c-basics lesson-01-program-structure
```

---

## 七维勘验系统

`/review-lesson` 会对每课进行系统化审查：

| 维度 | 检查内容 | 方法 |
|------|---------|------|
| 事实准确性 | 技术陈述是否正确、标准引用是否准确 | 对照原书 + 联网搜索 |
| 代码验证 | 每个代码示例是否编译通过、输出是否匹配 | 实际编译运行 |
| Mermaid 图表 | 语法是否正确、逻辑是否与正文一致 | 语法检查 + 走读 |
| 内部一致性 | 数量词是否匹配、交叉引用是否正确 | 全文交叉检查 |
| 术语一致性 | 同一概念是否始终使用相同译名 | 对照术语表 |
| 格式规范 | 四段式、正反对比、陷阱清单等是否齐全 | 对照写作规范 |
| 前后衔接 | 是否超纲、是否为后续课程留好接口 | 对照前后课程 |

审查完成后生成报告，你可以选择自动修复、逐条确认、或手动处理。

---

## 当前进度

### 《C和指针》(Pointers on C)

13 个模块，29 课。当前进度：

| 状态 | 含义 | 数量 |
|------|------|------|
| ✅ | 已发布 | 0 |
| 👀 | 已审阅 | 5 |
| 📝 | 初稿完成 | 0 |
| ⬜ | 未开始 | 24 |

已完成的课程：
- Module 00: C 基础速览
  - lesson-01: C 程序结构与编译 👀
  - lesson-02: 控制流与操作符 👀
- Module 01: 指针基础
  - lesson-01: 内存模型与指针入门 👀
  - lesson-02: 指针陷阱与表达式 👀
  - lesson-03: 指针运算 👀

### 构建电子书

课程可以用 [honkit](https://github.com/honkit/honkit) 构建为可浏览的静态 HTML 电子书：

```bash
cd books/c-and-pointers
npm install            # 首次需要安装依赖
npx honkit serve       # 本地预览 http://localhost:4000
npx honkit build       # 构建到 _book/ 目录
```

---

## 仓库结构

```
ReadBooksWithAI/
├── CLAUDE.md                       # AI 操作手册（顶层指令）
├── README.md                       # 本文件
├── guides/                         # 通用写作基础设施（适用于所有书）
│   ├── lesson-writing-guide.md     # 课程写作规范
│   ├── depth-system.md             # 三档深度标记规范
│   └── terminology-glossary.md     # 跨课术语一致性表
├── _templates/                     # 模板文件
│   ├── lesson-template.md
│   └── module-template.md
├── books/                          # 每本书独立空间
│   └── <book-id>/
│       ├── REQUIREMENTS.md         # /init-book 产出：你的需求和背景
│       ├── refs/                   # 参考 PDF + AI 生成的索引
│       │   ├── *.pdf
│       │   └── *-index.md
│       ├── BOOK.md                 # /plan-book 产出：书级元数据
│       ├── BOOK-STYLE.md           # /config-book 产出：写作约束
│       ├── module-index.md         # /plan-book 产出：课程总索引
│       └── module-XX-xxx/          # 模块目录
│           ├── MODULE.md           # 模块概述
│           └── lesson-XX-xxx.md    # 课程文件（最终产出）
└── .claude/skills/                 # Skill 定义（六步流水线的核心）
    ├── init-book/SKILL.md
    ├── index-book/SKILL.md
    ├── plan-book/SKILL.md
    ├── config-book/SKILL.md
    ├── write-lesson/SKILL.md
    └── review-lesson/SKILL.md
```

---

## 想学另一本书？

```bash
/init-book <your-book-id>
# 然后按提示走完流水线
```

`guides/` 下的写作规范适用于所有书，每本书的特有约束在各自的 `BOOK-STYLE.md` 中——换一本书不需要改任何基础设施。

---

## 设计理念

### 为什么是 Skill 流水线而不是一键生成？

一键生成整本书听起来很诱人，但实际效果很差：

- **上下文窗口有限**——AI 一次能处理的信息量有上限，逐课编写能确保每课都有充分的上下文
- **用户需要介入**——学习路径规划、大纲确认、勘验修复，每一步你都可以调整方向
- **质量需要保证**——索引确保引用精准，勘验确保内容正确，这些无法在一步中完成

### 为什么需要原书 PDF？

AI 不是凭空创作，而是**基于原书内容重写**。PDF 索引让 AI 能精准定位到原书的具体页码，确保：

- 知识体系完整，不遗漏原书的关键内容
- 能发现原书过时的内容并标注更新
- 重组后的学习路径仍然覆盖原书的核心知识

### 为什么要勘验？

AI 生成的内容不可避免会有错误。七维勘验系统通过实际编译运行代码、对照原书核查事实、交叉验证术语一致性等手段，将错误率降到最低。在已完成的 5 课勘验中，共发现并修复了 6 个问题（含 3 个事实错误）。

---

## License

MIT
