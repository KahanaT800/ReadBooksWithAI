# MODULE.md — 数据结构实现

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-12 |
| 模块名称 | 数据结构实现 |
| 原书章节 | Ch 17 |
| 课程数量 | 3 |
| 预计总时长 | 3 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 能用 C 实现堆栈/队列/二叉搜索树
2. 掌握接口与实现分离的设计原则
3. 理解 ADT 多实例和泛型改进方向

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-stack-implementation.md` | 堆栈实现 | 堆栈 ADT、数组实现、链表实现、接口设计 | ⬜ |
| 2 | `lesson-02-queue-implementation.md` | 队列实现 | 队列 ADT、循环数组、链表实现 | ⬜ |
| 3 | `lesson-03-tree-implementation.md` | 树实现 | 二叉搜索树、插入、查找、删除、遍历 | ⬜ |

---
## 前置模块
- [module-07-linked-lists](../module-07-linked-lists/MODULE.md) — 链表的实现技术
- [module-08-advanced-pointers](../module-08-advanced-pointers/MODULE.md) — 函数指针（用于泛型接口设计）

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-stack-implementation] --> L2[lesson-02-queue-implementation]
    L2 --> L3[lesson-03-tree-implementation]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 堆栈 | stack | lesson-01 |
| 接口 | interface | lesson-01 |
| 实现 | implementation | lesson-01 |
| 队列 | queue | lesson-02 |
| 二叉搜索树 | BST | lesson-03 |
