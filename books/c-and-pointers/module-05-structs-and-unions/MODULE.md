# MODULE.md — 结构体与联合

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-05 |
| 模块名称 | 结构体与联合 |
| 原书章节 | Ch 10 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 能定义和使用结构体（含指针成员）
2. 理解结构体内存布局和对齐规则
3. 了解联合和位段的用途

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-struct-basics.md` | 结构体基础 | 结构体定义、成员访问、箭头操作符、结构体与函数 | ⬜ |
| 2 | `lesson-02-struct-advanced.md` | 结构体进阶 | 自引用结构、内存对齐、联合、位段 | ⬜ |

---
## 前置模块
- [module-01-pointer-fundamentals](../module-01-pointer-fundamentals/MODULE.md) — 指针的声明、使用和运算

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-struct-basics] --> L2[lesson-02-struct-advanced]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 结构体 | struct | lesson-01 |
| 箭头操作符 | arrow operator -> | lesson-01 |
| 自引用结构 | self-referential struct | lesson-02 |
| 内存对齐 | alignment | lesson-02 |
| 联合 | union | lesson-02 |
| 位段 | bit field | lesson-02 |
