# MODULE.md — C 基础速览

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-00 |
| 模块名称 | C 基础速览 |
| 原书章节 | Ch 1, Ch 2, Ch 3, Ch 4, Ch 5 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 回顾 C 程序基本结构和编译流程
2. 理解作用域/链接属性/存储类型
3. 掌握操作符优先级和左值右值概念

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-program-structure.md` | C 程序结构与编译 | 程序结构、编译流程、作用域、链接属性、存储类型 | ⬜ |
| 2 | `lesson-02-control-and-operators.md` | 控制流与操作符 | 控制流语句、操作符优先级、左值与右值、typedef | ⬜ |

---
## 前置模块
- 无

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-program-structure] --> L2[lesson-02-control-and-operators]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 作用域 | scope | lesson-01 |
| 链接属性 | linkage | lesson-01 |
| 存储类型 | storage class | lesson-01 |
| 左值 | lvalue | lesson-02 |
| 右值 | rvalue | lesson-02 |
| typedef | typedef | lesson-02 |
