# MODULE.md — 标准库与运行时

## 模块信息
| 字段 | 值 |
|------|---|
| 模块编号 | module-11 |
| 模块名称 | 标准库与运行时 |
| 原书章节 | Ch 16, Ch 18 |
| 课程数量 | 3 |
| 预计总时长 | 3 小时 |

---
## 模块目标
学完本模块后，你应该能够：
1. 熟练使用常用标准库函数（qsort/bsearch/assert/时间函数等）
2. 理解信号处理和非本地跳转机制
3. 理解 C 程序的运行时环境（堆栈帧/调用机制/运行时效率）

---
## 课程列表
| # | 课程文件 | 标题 | 核心概念 | 状态 |
|---|---------|------|---------|------|
| 1 | `lesson-01-numeric-and-time.md` | 数值函数与时间 | 整型函数(算术/随机数/字符串转换), 浮点型函数, 日期和时间函数, 打印可变参数列表(vprintf) | ⬜ |
| 2 | `lesson-02-env-and-signals.md` | 执行控制与信号 | 非本地跳转(setjmp/longjmp), 信号(signal), 执行环境(exit/assert/system), qsort/bsearch, locale | ⬜ |
| 3 | `lesson-03-runtime-environment.md` | 运行时环境 | 堆栈帧, 静态变量和初始化, 寄存器变量, 堆栈帧布局, 表达式的副作用, C 和汇编接口, 运行时效率 | ⬜ |

---
## 前置模块
- [module-08-advanced-pointers](../module-08-advanced-pointers/MODULE.md) — 函数指针和回调函数（qsort/bsearch 需要）

---
## 模块内课程依赖
```mermaid
graph LR
    L1[lesson-01-numeric-and-time] --> L2[lesson-02-env-and-signals]
    L2 --> L3[lesson-03-runtime-environment]
```

---
## 关键术语预览
| 术语 | 英文 | 首次出现课程 |
|------|------|------------|
| 随机数 | random number | lesson-01 |
| 日期和时间 | date and time | lesson-01 |
| vprintf | vprintf | lesson-01 |
| setjmp/longjmp | setjmp/longjmp | lesson-02 |
| 信号 | signal | lesson-02 |
| qsort | qsort | lesson-02 |
| bsearch | bsearch | lesson-02 |
| assert | assert | lesson-02 |
| locale | locale | lesson-02 |
| 堆栈帧 | stack frame | lesson-03 |
| 寄存器变量 | register variable | lesson-03 |
| 运行时效率 | runtime efficiency | lesson-03 |
