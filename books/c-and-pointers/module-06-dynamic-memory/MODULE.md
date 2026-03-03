# MODULE.md — 动态内存管理

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-06 |
| 模块名称 | 动态内存管理 |
| 原书章节 | Ch 11 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 掌握动态内存分配四件套（malloc/calloc/realloc/free）
2. 能识别和避免常见内存错误
3. 能实现错误检查分配器

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-malloc-free.md` | malloc 与 free | malloc、calloc、realloc、free、内存分配策略 | ⬜ |
| 2 | `lesson-02-memory-errors.md` | 内存错误 | 内存泄漏、悬空指针、重复释放、错误检查分配器 | ⬜ |

---
## 前置模块
- [module-05-structs-and-unions](../module-05-structs-and-unions/MODULE.md) — 结构体的定义和使用，理解复合数据类型

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-malloc-free] --> L2[lesson-02-memory-errors]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 动态内存分配 | dynamic memory allocation | lesson-01 |
| 堆 | heap | lesson-01 |
| 内存泄漏 | memory leak | lesson-02 |
| 悬空指针 | dangling pointer | lesson-02 |
