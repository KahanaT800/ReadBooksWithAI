---
module: "module-01-pointer-fundamentals"
lesson: "lesson-03"
title: "指针运算"
original_chapters:
  - chapter: 6
    pages: "105-116"
prerequisites:
  - module: "module-01-pointer-fundamentals"
    lesson: "lesson-01"
    reason: "需要理解指针声明、解引用、& 和 * 操作符"
  - module: "module-01-pointer-fundamentals"
    lesson: "lesson-02"
    reason: "需要理解指针表达式、*p++ 惯用法、指针的指针"
difficulty: standard
estimated_minutes: 45
concepts:
  - 指针加减整数
  - 指针相减
  - 指针关系运算
status: draft
---

# 指针运算

## 前置知识检查

> 开始前确认这几个问题你能回答，否则回头补前序课程。

1. `int a = 42; int *p = &a;` 中，`p` 的值是什么？`*p` 的值是什么？→ 见 [lesson-01-memory-and-pointers](lesson-01-memory-and-pointers.md)
2. `*p++` 是先取值还是先移动指针？返回的是旧位置还是新位置的值？→ 见 [lesson-02-pointer-pitfalls](lesson-02-pointer-pitfalls.md)
3. 什么是未定义行为（UB）？对未初始化指针解引用为什么是 UB？→ 见 [lesson-01-memory-and-pointers](lesson-01-memory-and-pointers.md) 和 [lesson-02-pointer-pitfalls](lesson-02-pointer-pitfalls.md)

---

## 核心概念

### 1. 指针加减整数

#### 是什么

指针运算（pointer arithmetic）可以对指针（pointer）加上或减去一个整数，结果仍然是指针。关键在于：**加的不是字节数，而是元素个数**。

当你写 `p + n` 时，编译器实际执行的是：

```
p 的新地址 = p 的当前地址 + n × sizeof(*p)
```

这个自动乘以 `sizeof(*p)` 的过程叫做**缩放**（scaling）。它让你不用关心每种类型占几个字节，只需要按"第几个元素"来思考。

下面用 ASCII 图展示不同类型的指针 +1 后地址的变化：

```
char *cp 指向 0x1000:
  cp:    0x1000                cp+1:  0x1001（+1 字节）
         +------+------+------+------+
         | 'A'  | 'B'  | 'C'  | 'D'  |
         +------+------+------+------+
         0x1000 0x1001 0x1002 0x1003
         ^      ^
         cp     cp+1

int *ip 指向 0x1000（假设 sizeof(int) = 4）:
  ip:    0x1000                ip+1:  0x1004（+4 字节）
         +------+------+------+------+------+------+------+------+
         |        int a = 10         |        int b = 20         |
         +------+------+------+------+------+------+------+------+
         0x1000                      0x1004
         ^                           ^
         ip                          ip+1

double *dp 指向 0x1000（假设 sizeof(double) = 8）:
  dp:    0x1000                dp+1:  0x1008（+8 字节）
         +------+------+------+------+------+------+------+------+...
         |                 double x = 3.14                       |...
         +------+------+------+------+------+------+------+------+...
         0x1000                                                  0x1008
         ^                                                       ^
         dp                                                      dp+1
```

同样的 `+1`，char 指针移动 1 字节，int 指针移动 4 字节，double 指针移动 8 字节。这就是缩放的效果——**让 `p + 1` 永远指向"下一个元素"，不管元素有多大**。

减法同理：`p - 1` 向前移动一个元素的大小。

#### 为什么重要

缩放是 C 指针设计的核心。没有缩放，你每次操作指针都要手动计算字节偏移，既繁琐又容易出错。有了缩放，你可以用 `p++` 遍历任何类型的数组（array），编译器自动处理字节偏移。

这也是 `arr[i]` 能工作的底层原因——`arr[i]` 等价于 `*(arr + i)`，而 `arr + i` 就依赖缩放跳到第 i 个元素的位置。（数组与指针的详细关系在 module-03 展开。）

#### 代码演示

```c
/* ptr_scaling.c — 展示不同类型指针 +1 后地址的变化 */
#include <stdio.h>

int main(void) {
    char    c_arr[] = {'A', 'B', 'C'};
    int     i_arr[] = {10, 20, 30};
    double  d_arr[] = {1.1, 2.2, 3.3};

    char   *cp = c_arr;
    int    *ip = i_arr;
    double *dp = d_arr;

    printf("=== sizeof 各类型 ===\n");
    printf("sizeof(char)   = %zu\n", sizeof(char));
    printf("sizeof(int)    = %zu\n", sizeof(int));
    printf("sizeof(double) = %zu\n\n", sizeof(double));

    printf("=== 指针 +1 后地址变化 ===\n");
    printf("char*:   cp = %p, cp+1 = %p, 差 = %td 字节\n",
           (void *)cp, (void *)(cp + 1),
           (char *)(cp + 1) - (char *)cp);
    printf("int*:    ip = %p, ip+1 = %p, 差 = %td 字节\n",
           (void *)ip, (void *)(ip + 1),
           (char *)(ip + 1) - (char *)ip);
    printf("double*: dp = %p, dp+1 = %p, 差 = %td 字节\n",
           (void *)dp, (void *)(dp + 1),
           (char *)(dp + 1) - (char *)dp);

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o ptr_scaling ptr_scaling.c
./ptr_scaling
```

运行输出（地址值因运行而异，关注差值）：

```
=== sizeof 各类型 ===
sizeof(char)   = 1
sizeof(int)    = 4
sizeof(double) = 8

=== 指针 +1 后地址变化 ===
char*:   cp = 0x7ffd..., cp+1 = 0x7ffd..., 差 = 1 字节
int*:    ip = 0x7ffd..., ip+1 = 0x7ffd..., 差 = 4 字节
double*: dp = 0x7ffd..., dp+1 = 0x7ffd..., 差 = 8 字节
```

**标准限制**：指针加减整数只能用于**指向数组元素**的指针（包括 `malloc` 分配的连续内存）。对一个普通标量变量的指针做 `p + 2` 是未定义行为（undefined behavior）——编译器不会报错，但结果没有意义。

#### 代码演示 2：用指针遍历数组

指针加减整数最常见的用途是遍历数组。下面的例子用指针 `++` 把数组所有元素清零：

```c
/* ptr_traverse_array.c — 用指针遍历数组 */
#include <stdio.h>

#define N 5

int main(void) {
    float values[N] = {1.1f, 2.2f, 3.3f, 4.4f, 5.5f};
    float *vp;

    /* 用指针遍历数组清零 */
    for (vp = &values[0]; vp < &values[N]; vp++) {
        *vp = 0;
    }

    /* 验证结果 */
    printf("清零后: ");
    for (int i = 0; i < N; i++) {
        printf("%.1f ", values[i]);
    }
    printf("\n");

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o ptr_traverse_array ptr_traverse_array.c
./ptr_traverse_array
```

运行输出：

```
清零后: 0.0 0.0 0.0 0.0 0.0
```

注意循环中的 `&values[N]`：对一个有 N 个元素的数组，下标 0 到 N-1 是合法元素，`&values[N]` 指向最后一个元素之后的位置。这叫 **past-the-end 指针**——你可以获取它的地址、可以用它做比较，但**不能对它解引用（dereference）**（因为那个位置不属于数组）。

#### 易错点

❌ **以为 `p + 1` 只加 1 个字节**：

```c
/* ptr_scaling_mistake.c — 错误理解缩放 */
#include <stdio.h>

int main(void) {
    int arr[] = {100, 200, 300};
    int *p = arr;

    /* 错误想法：p+1 只移动 1 字节，取到的是 100 的部分字节 */
    /* 实际：p+1 移动 sizeof(int)=4 字节，取到的是 200 */
    printf("*p     = %d\n", *p);       /* 100 */
    printf("*(p+1) = %d\n", *(p + 1)); /* 200，不是乱码！ */
    printf("*(p+2) = %d\n", *(p + 2)); /* 300 */

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o ptr_scaling_mistake ptr_scaling_mistake.c
./ptr_scaling_mistake
```

运行输出：

```
*p     = 100
*(p+1) = 200
*(p+2) = 300
```

✅ **正确理解**：`p + n` 跳过 n 个**完整元素**，不是 n 个字节。编译器根据 `p` 的类型自动计算实际字节偏移。

#### ⭐ 深入：void * 不能做算术运算

> 以下内容为深层原理，理解它有助于加深认识，但不影响日常使用。跳过不影响后续学习。

`void *` 是"通用指针"，可以指向任何类型。但正因为它没有类型信息，编译器不知道 `sizeof(void)` 是多少，**标准不允许对 `void *` 做加减运算**：

```c
void *vp = arr;
vp + 1;   /* ❌ 标准 C 不允许：sizeof(void) 未定义 */
```

GCC 有一个**非标准扩展**：把 `void *` 的算术运算当作 `char *`（即 +1 移动 1 字节）。这在某些底层代码中会见到，但它**不可移植**。如果你需要对通用指针做字节级偏移，正确做法是先转为 `char *`：

```c
char *byte_ptr = (char *)vp;
byte_ptr + 1;  /* ✅ 标准 C，移动 1 字节 */
```

---

### 2. 指针相减

#### 是什么

两个指向**同一数组元素**的指针可以相减，结果是它们之间相隔的**元素个数**（不是字节数）。这是缩放的反向操作——字节差值会自动除以 `sizeof(*p)`。

```
指针相减的公式：
  如果 p1 = &arr[i]，p2 = &arr[j]
  则 p2 - p1 = j - i（元素个数，有符号）
```

结果的类型是 **ptrdiff_t**，定义在 `<stddef.h>` 中，是一种**有符号整数类型**。有符号意味着结果可以是负数（当 p1 在 p2 后面时）。

用 ASCII 图展示：

```
float arr[6]（假设 sizeof(float) = 4，起始地址 0x1000）:

  0x1000  0x1004  0x1008  0x100C  0x1010  0x1014
  +-------+-------+-------+-------+-------+-------+
  | [0]   | [1]   | [2]   | [3]   | [4]   | [5]   |
  +-------+-------+-------+-------+-------+-------+
    ^                       ^
    p1                      p2

  p1 = &arr[0]，地址 0x1000
  p2 = &arr[3]，地址 0x100C

  字节差值：0x100C - 0x1000 = 12 字节
  p2 - p1 = 12 / sizeof(float) = 12 / 4 = 3（元素个数）
  p1 - p2 = -3
```

#### 为什么重要

指针相减最经典的用途是**计算数组中两个位置之间的距离**。比如你正在搜索数组中的某个元素，找到后用指针相减就能知道它在第几个位置。

另一个常见场景：用指针遍历字符串后，用当前位置减去起始位置得到字符串长度。标准库的 `strlen` 就可以这样实现。

#### 代码演示

```c
/* ptr_subtract.c — 指针相减：计算距离和手写 strlen */
#include <stdio.h>
#include <stddef.h>  /* ptrdiff_t */

/* 用指针相减实现 strlen */
size_t my_strlen(const char *s) {
    const char *start = s;
    while (*s != '\0') {
        s++;
    }
    return (size_t)(s - start);  /* 指针相减得到字符个数 */
}

int main(void) {
    /* 示例 1：数组中两个位置的距离 */
    int arr[] = {10, 20, 30, 40, 50};
    int *p1 = &arr[1];
    int *p2 = &arr[4];

    ptrdiff_t dist = p2 - p1;
    printf("=== 指针相减 ===\n");
    printf("p1 指向 arr[1], p2 指向 arr[4]\n");
    printf("p2 - p1 = %td（元素个数）\n", dist);      /* 3 */
    printf("p1 - p2 = %td（负数也合法）\n\n", p1 - p2); /* -3 */

    /* 示例 2：手写 strlen */
    const char *msg = "Hello, World!";
    printf("=== 手写 strlen ===\n");
    printf("\"%s\" 的长度 = %zu\n", msg, my_strlen(msg));

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o ptr_subtract ptr_subtract.c
./ptr_subtract
```

运行输出：

```
=== 指针相减 ===
p1 指向 arr[1], p2 指向 arr[4]
p2 - p1 = 3（元素个数）
p1 - p2 = -3（负数也合法）

=== 手写 strlen ===
"Hello, World!" 的长度 = 13
```

#### 易错点

❌ **对不同数组的指针相减——未定义行为**：

```c
int a[] = {1, 2, 3};
int b[] = {4, 5, 6};
int *pa = &a[0];
int *pb = &b[0];
ptrdiff_t d = pb - pa;  /* ❌ UB：不同数组的指针相减 */
```

编译器不会报错，程序也可能输出某个数字，但这个结果**毫无意义**。原书用了一个很好的类比：就像把两所位于不同街道的房子门牌号相减，不可能得到两所房子之间的距离。程序员无法知道两个数组在内存中的相对位置。

✅ **只对同一数组（或同一 malloc 块）内的指针相减**：

```c
int arr[] = {1, 2, 3, 4, 5};
int *p1 = &arr[0];
int *p2 = &arr[4];
ptrdiff_t d = p2 - p1;  /* ✅ 同一数组，结果 = 4 */
```

#### ⭐ 深入：ptrdiff_t 与 size_t 的对比

> 以下内容为深层原理，理解它有助于加深认识，但不影响日常使用。跳过不影响后续学习。

| 特征 | ptrdiff_t | size_t |
|------|-----------|--------|
| 定义头文件 | `<stddef.h>` | `<stddef.h>` |
| 有无符号 | **有符号** | **无符号** |
| 语义 | 两个指针之间的距离 | 对象的大小（字节数） |
| printf 格式符 | `%td` | `%zu` |
| 典型用途 | `p2 - p1` | `sizeof(x)`、`strlen(s)` |
| 可以为负 | 是 | 否 |

注意 `my_strlen` 中我们把 `s - start` 的 `ptrdiff_t` 结果转为了 `size_t`。因为字符串长度不可能是负数，而标准库 `strlen` 返回 `size_t`。

打印 `ptrdiff_t` 时用 `%td`（t 代表 ptrdiff_t），打印 `size_t` 时用 `%zu`——这两个格式符在 C99 中引入。如果你用 `%d` 打印它们，在 64 位系统上可能会截断高位字节。

---

### 3. 指针关系运算

#### 是什么

指针之间可以做**关系比较**，但有严格限制：

| 操作符 | 要求 | 说明 |
|--------|------|------|
| `<` `<=` `>` `>=` | 两个指针必须指向**同一数组**中的元素 | 比较谁更靠前/靠后 |
| `==` `!=` | 可以比较**任意两个**同类型指针 | 判断是否指向同一位置 |

为什么大小比较要求同一数组？因为 `<` 和 `>` 比的是内存地址的先后顺序。如果两个指针指向不同数组，它们在内存中的相对位置是编译器/操作系统决定的，比较结果没有可靠意义。

但 `==` 和 `!=` 没有这个限制——两个指针要么指向同一个地址，要么不是，这跟它们在内存中的相对位置无关。

#### 为什么重要

指针关系运算最常见的用途是**控制数组遍历循环的终止条件**。用 `p < &arr[N]` 比用下标 `i < N` 在某些场景下更高效（module-03 会详细讨论效率差异）。理解合法边界和非法边界的区别，能让你避免一类微妙的未定义行为。

#### 代码演示

```c
/* ptr_compare.c — 指针关系运算：正向和反向遍历数组 */
#include <stdio.h>

#define N 5

int main(void) {
    int values[N] = {10, 20, 30, 40, 50};
    int *vp;

    /* 正向遍历：vp < past-the-end 指针 */
    printf("=== 正向遍历 ===\n");
    for (vp = &values[0]; vp < &values[N]; vp++) {
        printf("%d ", *vp);
    }
    printf("\n\n");

    /* 反向遍历（正确写法）：先减后用 */
    printf("=== 反向遍历（正确） ===\n");
    for (vp = &values[N]; vp > &values[0]; ) {
        --vp;       /* 先减：从 past-the-end 退到最后一个元素 */
        printf("%d ", *vp);
    }
    printf("\n\n");

    /* == 和 != 可以比较任意指针（不要求同一数组） */
    int a = 1, b = 2;
    int *pa = &a, *pb = &b, *pa2 = &a;
    printf("=== == 和 != 可比较任意指针 ===\n");
    printf("pa == pb  ? %s\n", (pa == pb) ? "是" : "否");
    printf("pa != pb  ? %s\n", (pa != pb) ? "是" : "否");
    printf("pa == pa2 ? %s（都指向 a）\n", (pa == pa2) ? "是" : "否");

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o ptr_compare ptr_compare.c
./ptr_compare
```

运行输出：

```
=== 正向遍历 ===
10 20 30 40 50

=== 反向遍历（正确） ===
50 40 30 20 10

=== == 和 != 可以比较任意指针 ===
pa == pb  ? 否
pa != pb  ? 是
pa == pa2 ? 是（都指向 a）
```

#### 易错点

❌ **反向遍历让指针越过数组首元素之前——经典陷阱**：

```
看起来更"自然"的反向遍历写法：

for (vp = &values[N-1]; vp >= &values[0]; vp--)
    *vp = 0;

问题在最后一次迭代：
  vp 指向 values[0] → *vp = 0 执行成功
  → vp-- 使 vp 指向 values[0] 之前的位置（越界！）
  → 比较 vp >= &values[0]：未定义行为！

  +-------+-------+-------+-------+-------+
  | [0]   | [1]   | [2]   | [3]   | [4]   |
  +-------+-------+-------+-------+-------+
  ^       ^                               ^
  |       &values[0]                &values[4]
  vp 减到了这里（非法！）
```

C 标准规定：
- 指向数组最后一个元素**之后一个位置**（past-the-end）是合法的
- 指向数组第一个元素**之前一个位置**是**不合法**的

这不是对称的！原因与硬件和编译器的内存模型有关：past-the-end 指针是一个常见模式（用于标记数组结尾），标准明确支持它；但"before-the-beginning"指针没有对应的实用场景，标准不保证其行为。

在绝大多数编译器上，那个错误的循环能正常运行。但"能运行"不等于"正确"——标准不保证它可行，你迟早会在某个平台上遇到诡异的 bug。

✅ **正确的反向遍历：先减后用**：

```c
/* 方法 1：vp 从 past-the-end 开始，先 -- 再解引用 */
for (vp = &values[N]; vp > &values[0]; ) {
    --vp;
    *vp = 0;
}

/* 方法 2：等价的 *--vp 写法（更紧凑） */
for (vp = &values[N]; vp > &values[0]; )
    *--vp = 0;
```

这两种写法中，`vp` 在循环体内先减再用，**永远不会越过 `&values[0]` 之前**。当 `vp` 减到指向 `values[0]` 时，循环体内的 `*vp = 0` 执行完毕，下一次比较 `vp > &values[0]` 为假，循环正常终止。

> [BEGINNER] **past-the-end 指针**是 C 中的一个重要概念：对一个有 N 个元素的数组 `arr`，`&arr[N]` 指向最后一个元素之后的位置。你**可以**获取这个地址并用它做比较（如 `p < &arr[N]`），但**不能**对它解引用（`*(&arr[N])` 是未定义行为，那个位置不属于你的数组）。它就像一个"边界哨兵"——你知道它在那里，可以用它判断"是否到头了"，但不能越过它。

---

## 概念串联

本课的三个概念构成了 C 指针运算的完整体系：

```
                    指针运算
                   /    |    \
          加减整数    相减    关系运算
           (缩放)   (反缩放)  (比较)
             |         |         |
         p ± n      p2 - p1   p1 < p2
       移动 n 个    得到 n     谁在前
        元素位置    个元素     谁在后
```

**缩放**是贯穿所有操作的核心机制：
- `p + n`：正向缩放（n × sizeof）
- `p2 - p1`：反向缩放（字节差 ÷ sizeof）
- `p1 < p2`：实质也是在比较缩放后的地址

这三个操作**都要求指针指向同一数组的元素**（`==` 和 `!=` 除外）。超出数组边界的运算是未定义行为。

**与前课的衔接**：lesson-02 讲的 `*p++` 惯用法，底层就是"取当前值 + 指针加 1"。本课解释了"加 1"到底做了什么——缩放让 `p++` 自动跳到下一个正确类型的元素。

**与后续课程的衔接**：module-03 将深入讨论数组名与指针的关系（`arr[i]` ≡ `*(arr + i)`），以及指针遍历 vs 下标遍历的效率差异。本课的缩放机制是理解那些内容的基础。

---

## 常见陷阱清单

| # | 陷阱 | 症状 | 原因 | 修复 |
|---|------|------|------|------|
| 1 | 以为 `p + 1` 只移动 1 字节 | 程序逻辑错误：跳过了整个元素却以为只跳了 1 字节 | 不了解缩放机制 | 记住 `p + n` 实际移动 `n × sizeof(*p)` 字节 |
| 2 | 对不同数组的指针做减法或比较 | 得到无意义的结果，或在某些平台崩溃 | 标准只允许同一数组内的指针参与算术运算 | 确保两个指针来自同一数组或同一 `malloc` 块 |
| 3 | 反向遍历时指针越过数组首元素之前 | 通常"恰好能运行"，但属于 UB，跨平台会出问题 | 标准允许 past-the-end 但**不允许** before-the-beginning | 使用"先减后用"模式：`*--vp` |
| 4 | 对 past-the-end 指针解引用 | 读到不属于数组的随机数据，或段错误 | past-the-end 指针合法持有但不合法解引用 | 仅用 past-the-end 做比较，不解引用 |
| 5 | 对 `void *` 做算术运算 | GCC 编译通过但不可移植，其他编译器报错 | `sizeof(void)` 在标准 C 中未定义 | 先转为 `char *` 再做字节级偏移 |

---

## 动手练习提示

### 练习 1：指针版数组求和

- 目标：写一个函数 `int sum_array(const int *begin, const int *end)`，用指针遍历 `[begin, end)` 区间并返回元素之和
- 思路提示：用 `begin < end` 做循环条件，每次 `begin++`
- 容易卡住的地方：注意是左闭右开区间，`end` 本身不参与求和

### 练习 2：指针版数组反转

- 目标：写一个函数 `void reverse(int *begin, int *end)`，原地反转数组
- 思路提示：两个指针从两端向中间靠拢，交换 `*begin` 和 `*(end-1)`
- 容易卡住的地方：循环终止条件是 `begin < end - 1` 还是 `begin < end`？想想奇数个元素的情况

### 练习 3：指针版字符串比较

- 目标：写一个 `int my_strcmp(const char *s1, const char *s2)`，返回值语义同 `strcmp`
- 思路提示：同时用 `*s1++` 和 `*s2++` 遍历，直到找到不同字符或遇到 `'\0'`
- 容易卡住的地方：两个字符串长度不同时，终止条件要同时考虑

---

## 自测题

> 不给答案，动脑想完再往下学。

1. `int arr[5]; int *p = &arr[2]; int *q = &arr[4];` —— `q - p` 的值是多少？`(char *)q - (char *)p` 的值呢？为什么这两个结果不同？

2. 为什么 C 标准允许指针指向数组最后一个元素的**下一个**位置（past-the-end），却不允许指向第一个元素的**前一个**位置？试从实际编程场景的角度思考。

3. 假设你有一个 `double arr[100]`，想从最后一个元素倒序遍历到第一个元素并打印每个值。写出**不触发未定义行为**的循环。（提示：参考本课的"先减后用"模式。）

---

## 补充资源

| 资源 | 类型 | 说明 |
|------|------|------|
| [C FAQ: Pointer Arithmetic](http://c-faq.com/ptrs/index.html) | 文档 | comp.lang.c FAQ 中关于指针运算的经典问答集 |
| [cppreference: ptrdiff_t](https://en.cppreference.com/w/c/types/ptrdiff_t) | 文档 | ptrdiff_t 类型的标准定义、取值范围和使用示例 |
| 搜索关键词：`C语言指针运算 缩放 详解` | 搜索 | 中文社区关于指针算术缩放机制的讲解 |
| 搜索关键词：`pointer arithmetic C past-the-end` | 搜索 | 英文资料：past-the-end 指针的标准规定和使用模式 |
