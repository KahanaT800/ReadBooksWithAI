# MODULE.md — 链表实战

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-07 |
| 模块名称 | 链表实战 |
| 原书章节 | Ch 12 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 能用 C 实现单链表的增删查操作
2. 理解指向指针的指针在链表中的妙用
3. 能实现双链表

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-singly-linked-list.md` | 单链表 | 节点定义、插入、删除、查找、指向指针的指针 | ⬜ |
| 2 | `lesson-02-doubly-linked-list.md` | 双链表 | 双链表结构、双向遍历、插入删除操作 | ⬜ |

---
## 前置模块
- [module-05-structs-and-unions](../module-05-structs-and-unions/MODULE.md) — 结构体定义和自引用结构
- [module-06-dynamic-memory](../module-06-dynamic-memory/MODULE.md) — 动态内存分配与释放

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-singly-linked-list] --> L2[lesson-02-doubly-linked-list]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 链表 | linked list | lesson-01 |
| 节点 | node | lesson-01 |
| 根指针 | root pointer | lesson-01 |
| 单链表 | singly linked list | lesson-01 |
| 双链表 | doubly linked list | lesson-02 |
