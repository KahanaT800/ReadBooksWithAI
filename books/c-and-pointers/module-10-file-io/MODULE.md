# MODULE.md — 文件 I/O

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-10 |
| 模块名称 | 文件 I/O |
| 原书章节 | Ch 15 |
| 课程数量 | 2 |
| 预计总时长 | 2 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 理解流和 FILE 的概念
2. 掌握字符/行/格式化/二进制四种 I/O 方式
3. 能进行文件定位和缓冲控制

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-stream-io.md` | 流与基本 I/O | 流的概念、FILE 指针、fopen/fclose、字符 I/O、行 I/O | ⬜ |
| 2 | `lesson-02-formatted-binary-io.md` | 格式化与二进制 I/O | fprintf/fscanf、fread/fwrite、fseek/ftell、缓冲控制 | ⬜ |

---
## 前置模块
- [module-01-pointer-fundamentals](../module-01-pointer-fundamentals/MODULE.md) — 指针的基本使用

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-stream-io] --> L2[lesson-02-formatted-binary-io]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 流 | stream | lesson-01 |
| FILE 指针 | FILE pointer | lesson-01 |
| fopen/fclose | fopen/fclose | lesson-01 |
| fgets/fputs | fgets/fputs | lesson-01 |
| fprintf/fscanf | fprintf/fscanf | lesson-02 |
| fread/fwrite | fread/fwrite | lesson-02 |
| fseek/ftell | fseek/ftell | lesson-02 |
