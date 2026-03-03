# MODULE.md — 预处理器与工程实践

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-09 |
| 模块名称 | 预处理器与工程实践 |
| 原书章节 | Ch 14 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 掌握宏定义及其与函数的区别
2. 能使用条件编译管理代码
3. 能组织多文件 C 项目

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-preprocessor-basics.md` | 预处理器基础 | #define、宏与函数的区别、宏的副作用、#/## 操作符 | ⬜ |
| 2 | `lesson-02-conditional-and-headers.md` | 条件编译与头文件 | 条件编译、头文件保护、多文件项目组织 | ⬜ |

---
## 前置模块
- [module-02-functions](../module-02-functions/MODULE.md) — 函数的定义、声明和参数传递机制

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-preprocessor-basics] --> L2[lesson-02-conditional-and-headers]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 宏 | macro | lesson-01 |
| 预处理器 | preprocessor | lesson-01 |
| 条件编译 | conditional compilation | lesson-02 |
| 头文件保护 | include guard | lesson-02 |
