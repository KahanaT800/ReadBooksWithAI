# MODULE.md — 标准库与运行时

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-11 |
| 模块名称 | 标准库与运行时 |
| 原书章节 | Ch 16, Ch 18 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 熟练使用常用标准库函数（qsort/bsearch/assert 等）
2. 理解 C 程序的运行时环境（堆栈帧/调用机制）
3. 了解信号处理基础

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-stdlib-essentials.md` | 标准库精要 | qsort、bsearch、assert、数学函数、时间函数 | ⬜ |
| 2 | `lesson-02-runtime-environment.md` | 运行时环境 | 堆栈帧、函数调用机制、信号处理、setjmp/longjmp | ⬜ |

---
## 前置模块
- [module-08-advanced-pointers](../module-08-advanced-pointers/MODULE.md) — 函数指针和回调函数（qsort/bsearch 需要）

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-stdlib-essentials] --> L2[lesson-02-runtime-environment]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| qsort | qsort | lesson-01 |
| bsearch | bsearch | lesson-01 |
| assert | assert | lesson-01 |
| 堆栈帧 | stack frame | lesson-02 |
| 信号 | signal | lesson-02 |
| setjmp/longjmp | setjmp/longjmp | lesson-02 |
