# 课程总索引 — 《C和指针》

> 13 个模块，30 课

---

## Module 00: C 基础速览

> 原书章节：Ch1-5 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-00-c-basics/lesson-01-program-structure.md` | C 程序结构与编译 | 程序结构, 编译流程, 数据类型与 sizeof, 变量声明与常量, 作用域, 链接属性, 存储类型 | 👀 |
| 02 | `module-00-c-basics/lesson-02-control-and-operators.md` | 控制流与操作符 | 表达式语句与副作用, 控制流语句, 操作符分类, 左值与右值, 隐式类型转换, 优先级与求值顺序, typedef | 👀 |

---

## Module 01: 指针基础

> 原书章节：Ch6 | 3 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-01-pointer-fundamentals/lesson-01-memory-and-pointers.md` | 内存模型与指针入门 | 内存和地址, 值和类型, 指针声明与初始化, 间接访问（解引用） | 👀 |
| 02 | `module-01-pointer-fundamentals/lesson-02-pointer-pitfalls.md` | 指针陷阱与表达式 | 未初始化指针, NULL 指针, 指针与左值, 指针的指针, 指针表达式 | 👀 |
| 03 | `module-01-pointer-fundamentals/lesson-03-pointer-arithmetic.md` | 指针运算 | 指针加减整数, 指针相减, 指针关系运算 | 👀 |

---

## Module 02: 函数深入

> 原书章节：Ch7 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-02-functions/lesson-01-function-mechanics.md` | 函数机制与参数传递 | 函数定义与返回值, 函数原型, 参数传递（传值）, 传指针模拟传引用 | 👀 |
| 02 | `module-02-functions/lesson-02-recursion-and-design.md` | 递归与程序设计 | 递归, 递归与迭代, ADT 和黑盒设计, 可变参数(stdarg) | 👀 |

---

## Module 03: 数组与指针

> 原书章节：Ch8 | 3 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-03-arrays-and-pointers/lesson-01-array-basics.md` | 一维数组与指针关系 | 数组名, 下标引用, 指针与下标等价, 数组作为函数参数 | 👀 |
| 02 | `module-03-arrays-and-pointers/lesson-02-multidim-arrays.md` | 多维数组 | 存储顺序, 多维下标, 指向数组的指针, 多维数组作为函数参数 | 👀 |
| 03 | `module-03-arrays-and-pointers/lesson-03-pointer-arrays.md` | 指针数组与效率 | 指针数组, 指针效率 vs 下标, 字符指针数组 | 👀 |

---

## Module 04: 字符串处理

> 原书章节：Ch9 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-04-strings/lesson-01-string-basics.md` | 字符串基础与标准函数 | 字符串基础, strlen, strcpy/strncpy, strcat/strncat, strcmp/strncmp | 👀 |
| 02 | `module-04-strings/lesson-02-string-search.md` | 字符串查找与内存操作 | strchr, strstr, strtok, 字符分类/转换, memcpy/memmove/memset | 👀 |

---

## Module 05: 结构体与联合

> 原书章节：Ch10 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-05-structs-and-unions/lesson-01-struct-basics.md` | 结构体基础 | 结构声明, 成员访问(./->), 自引用, 初始化 | ⬜ |
| 02 | `module-05-structs-and-unions/lesson-02-struct-advanced.md` | 结构体进阶 | 结构与指针, 嵌套结构, 内存对齐, 作为函数参数, 位段, 联合 | ⬜ |

---

## Module 06: 动态内存管理

> 原书章节：Ch11 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-06-dynamic-memory/lesson-01-malloc-free.md` | 动态内存分配基础 | malloc/free, calloc/realloc, sizeof, 动态分配内存的使用 | ⬜ |
| 02 | `module-06-dynamic-memory/lesson-02-memory-errors.md` | 内存错误与防御编程 | 内存泄漏, 越界, use-after-free, 错误检查分配器, 动态数组 | ⬜ |

---

## Module 07: 链表实战

> 原书章节：Ch12 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-07-linked-lists/lesson-01-singly-linked-list.md` | 单链表 | 链表概念, 节点定义, 有序插入(三次迭代优化), 指针的指针简化插入 | ⬜ |
| 02 | `module-07-linked-lists/lesson-02-doubly-linked-list.md` | 双链表 | 双链表结构, 插入/删除/遍历, 单链表 vs 双链表 | ⬜ |

---

## Module 08: 高级指针技巧

> 原书章节：Ch13 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-08-advanced-pointers/lesson-01-advanced-declarations.md` | 高级声明与多级指针 | 多级指针, 高级声明解读, cdecl, 复杂声明实例 | ⬜ |
| 02 | `module-08-advanced-pointers/lesson-02-function-pointers.md` | 函数指针与回调 | 函数指针, 回调函数, 转移表, 命令行参数, 字符串常量 | ⬜ |

---

## Module 09: 预处理器与工程实践

> 原书章节：Ch14 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-09-preprocessor/lesson-01-preprocessor-basics.md` | 预处理器基础 | #define, 宏, 宏与函数区别, 副作用, #undef, 命令行定义 | ⬜ |
| 02 | `module-09-preprocessor/lesson-02-conditional-and-headers.md` | 条件编译与头文件 | 条件编译, include guard, 多文件项目组织 | ⬜ |

---

## Module 10: 文件 I/O

> 原书章节：Ch15 | 2 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-10-file-io/lesson-01-stream-io.md` | 流与基本 I/O | perror, exit, 流/FILE, fopen/fclose, 字符 I/O, fgets/fputs | ⬜ |
| 02 | `module-10-file-io/lesson-02-formatted-binary-io.md` | 格式化与二进制 I/O | scanf/printf 格式代码, fread/fwrite, fseek/ftell, 缓冲 | ⬜ |

---

## Module 11: 标准库与运行时

> 原书章节：Ch16, Ch18 | 3 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-11-stdlib-and-runtime/lesson-01-numeric-and-time.md` | 数值函数与时间 | 整型函数(算术/随机数/字符串转换), 浮点型函数, 日期和时间函数, vprintf | ⬜ |
| 02 | `module-11-stdlib-and-runtime/lesson-02-env-and-signals.md` | 执行控制与信号 | 非本地跳转(setjmp/longjmp), 信号(signal), 执行环境(exit/assert/system), qsort/bsearch, locale | ⬜ |
| 03 | `module-11-stdlib-and-runtime/lesson-03-runtime-environment.md` | 运行时环境 | 堆栈帧, 静态变量和初始化, 寄存器变量, 堆栈帧布局, 表达式的副作用, C和汇编接口, 运行时效率 | ⬜ |

---

## Module 12: 数据结构实现

> 原书章节：Ch17 | 3 课

| # | 文件 | 标题 | 核心概念 | 状态 |
|---|------|------|---------|------|
| 01 | `module-12-data-structures/lesson-01-stack-implementation.md` | 堆栈的实现 | ADT 内存策略, 堆栈接口, 静态/动态数组实现 | ⬜ |
| 02 | `module-12-data-structures/lesson-02-queue-implementation.md` | 队列的实现 | 队列接口, 循环数组实现, create/destroy 生命周期 | ⬜ |
| 03 | `module-12-data-structures/lesson-03-tree-implementation.md` | 二叉搜索树的实现 | BST 插入/删除/查找/遍历, 接口与实现, 改进(多实例/泛型) | ⬜ |
