# MODULE.md — 字符串处理

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-04 |
| 模块名称 | 字符串处理 |
| 原书章节 | Ch 9 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 掌握 C 字符串的本质（字符数组 + NUL 终止）
2. 熟练使用标准字符串函数并理解其安全隐患
3. 能使用内存操作函数

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-string-basics.md` | 字符串基础 | 字符串本质、NUL 终止符、字符串字面量、strlen/strcpy/strcat/strcmp | ⬜ |
| 2 | `lesson-02-string-search.md` | 字符串搜索与内存操作 | strtok、strstr、字符分类函数、memcpy/memmove/memset | ⬜ |

---
## 前置模块
- [module-03-arrays-and-pointers](../module-03-arrays-and-pointers/MODULE.md) — 数组与指针的关系，指针数组的使用

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-string-basics] --> L2[lesson-02-string-search]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| NUL 终止符 | NUL terminator | lesson-01 |
| 缓冲区溢出 | buffer overflow | lesson-01 |
| strtok | strtok | lesson-02 |
| memcpy/memmove | memcpy/memmove | lesson-02 |
