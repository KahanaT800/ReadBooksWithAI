---
module: "module-01-pointer-fundamentals"
lesson: "lesson-01"
title: "内存模型与指针本质"
original_chapters:
  - chapter: 6
    pages: "91-98"
prerequisites:
  - module: "module-00-c-basics"
    lesson: "lesson-02"
    reason: "需要理解左值/右值、操作符优先级"
difficulty: standard
estimated_minutes: 50
concepts: [内存和地址, 值和类型, 指针声明与初始化, 间接访问(解引用)]
status: draft
---

# 内存模型与指针本质

## 前置知识检查

> 开始前确认这几个问题你能回答，否则回头补前序课程。

1. 什么是左值和右值？`a[i]` 是左值吗？→ 见 [lesson-02-control-and-operators](../module-00-c-basics/lesson-02-control-and-operators.md)
2. `&` 操作符的优先级是多少？它是单目操作符还是双目操作符？→ 见 [lesson-02-control-and-operators](../module-00-c-basics/lesson-02-control-and-operators.md)
3. 局部变量如果不初始化，它的值是什么？→ 见 [lesson-01-program-structure](../module-00-c-basics/lesson-01-program-structure.md)

---

## 核心概念

### 1. 内存和地址

#### 是什么

计算机的内存可以想象成一排编了号的格子。每个格子是一个**字节（byte）**，存 8 个位（bit），能表示 0-255 之间的一个数。每个字节有一个唯一的编号，这就是它的**地址（address）**。

```
地址:  100    101    102    103    104    105    106    107
      +------+------+------+------+------+------+------+------+
      | 0x2A |  ... |  ... |  ... | 0x00 | 0x00 | 0x00 | 0x03 |
      +------+------+------+------+------+------+------+------+
       1 字节  1 字节  1 字节  1 字节  ←——— 一个 4 字节的 int ———→
```

单个字节能存的值太小，所以多个字节会合在一起存储更大的值。比如一个 `int` 在 64 位 Linux 上通常占 4 字节——这 4 个字节占据 4 个连续地址，但整个 `int` 变量的地址就是它**第一个字节的地址**。

关键事实：

1. 内存中的每个位置（字节）由一个**独一无二的地址**标识
2. 内存中的每个位置都**包含一个值**——即使你没有初始化，那里也有"某个值"（只是不可预测）

变量名是编译器提供的便利。你写 `int a = 42;`，编译器帮你把 `a` 映射到某个地址（比如 `0x7ffd1234`），后续所有对 `a` 的读写最终都变成对那个地址的读写。硬件只认地址，不认名字。

#### 为什么重要

指针就是地址。如果你不理解"内存是一个可以用地址编号来访问的字节数组"，就无法理解指针在做什么。本节建立的心智模型是后面所有指针操作的基础。

#### 代码演示

```c
#include <stdio.h>

int main(void) {
    int a = 42;
    char c = 'X';
    double d = 3.14;

    /* %p 打印地址，%zu 打印 sizeof 返回值 */
    printf("变量 a: 值 = %d, 地址 = %p, 大小 = %zu 字节\n",
           a, (void *)&a, sizeof(a));
    printf("变量 c: 值 = '%c', 地址 = %p, 大小 = %zu 字节\n",
           c, (void *)&c, sizeof(c));
    printf("变量 d: 值 = %.2f, 地址 = %p, 大小 = %zu 字节\n",
           d, (void *)&d, sizeof(d));

    /* 两个 int 变量的地址差距 */
    int x = 1, y = 2;
    printf("\n变量 x 地址 = %p\n", (void *)&x);
    printf("变量 y 地址 = %p\n", (void *)&y);
    printf("地址差 = %td 字节\n", (char *)&x - (char *)&y);

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o memory memory.c
./memory
```

可能的输出（地址每次运行不同）：

```
变量 a: 值 = 42, 地址 = 0x7ffd5a3b1c4c, 大小 = 4 字节
变量 c: 值 = 'X', 地址 = 0x7ffd5a3b1c4b, 大小 = 1 字节
变量 d: 值 = 3.14, 地址 = 0x7ffd5a3b1c40, 大小 = 8 字节

变量 x 地址 = 0x7ffd5a3b1c3c
变量 y 地址 = 0x7ffd5a3b1c38
地址差 = 4 字节
```

注意：`x` 和 `y` 的地址差不一定恰好是 4 字节。编译器可能出于对齐或优化原因重排变量在栈上的位置。

#### 易错点

❌ **错误：以为相邻声明的变量在内存中一定相邻**

```c
#include <stdio.h>

int main(void) {
    int a = 1;
    int b = 2;
    int c = 3;

    /* 打印地址 */
    printf("a 的地址: %p\n", (void *)&a);
    printf("b 的地址: %p\n", (void *)&b);
    printf("c 的地址: %p\n", (void *)&c);

    /* 错误假设：&b == &a + 1 */
    if (&b == &a + 1) {
        printf("b 紧挨着 a\n");
    } else {
        printf("b 不一定紧挨着 a\n");  /* 很可能走这里 */
    }

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o adjacent adjacent.c
./adjacent
```

✅ **正确认知：只有数组元素才保证在内存中连续排列。** 独立声明的变量之间，编译器可以自由安排顺序和间距。

---

### 2. 值和类型

#### 是什么

内存里存的都是位模式（bit pattern）——一串 0 和 1，本身没有"类型"。**是类型告诉编译器如何解释这些位。**

同一个 4 字节位模式 `0x42280000`，如果当作 `int` 来读就是一个整数（`1109917696`），当作 `float` 来读就是浮点数（`42.0`）。不是值本身决定了类型，而是你怎么用它决定了类型。

原书用一个 Motorola 68000 处理器上的 32 位值做例子来说明这一点。我们用一段可以直接跑的 C 代码来替代：

#### 为什么重要

理解了这一点，"指针的值是地址"就很自然了。指针变量存的也只是一个数字（某个内存地址），`int *` 类型告诉编译器："这个数字应该被当作一个地址来用，而且那个地址处存的是 `int`"。

#### 代码演示

📝 **解释增强**：原书 §6.2 用 Motorola 68000 的例子说明同一位模式可以有不同解释。以下用现代 C 代码直接演示：

```c
#include <stdio.h>
#include <string.h>  /* memcpy */

int main(void) {
    /* 用 float 存一个值 */
    float f = 42.0f;

    /* 把 float 的位模式原样拷贝到一个 unsigned int 中 */
    unsigned int bits;
    memcpy(&bits, &f, sizeof(bits));

    printf("float 值:         %f\n", f);
    printf("同一位模式当 int:  %u\n", bits);
    printf("十六进制:          0x%08X\n", bits);
    printf("大小都是:          %zu 字节\n", sizeof(f));

    /* 反向：从整数位模式还原 float */
    unsigned int raw = 0x42280000;
    float restored;
    memcpy(&restored, &raw, sizeof(restored));
    printf("\n0x42280000 当 float: %f\n", restored);  /* 42.0 */

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o bitpattern bitpattern.c
./bitpattern
```

输出：

```
float 值:         42.000000
同一位模式当 int:  1109917696
十六进制:          0x42280000
大小都是:          4 字节

0x42280000 当 float: 42.000000
```

同一个 4 字节 `0x42280000`，作为 `float` 是 42.0，作为 `unsigned int` 是 1109917696。**类型决定解释方式。**

这和指针有什么关系？看下面这段代码：

```c
#include <stdio.h>

int main(void) {
    int a = 112;
    float c = 3.14f;
    int *d = &a;       /* d 存的是 a 的地址 */
    float *e = &c;     /* e 存的是 c 的地址 */

    printf("a 的值: %d\n", a);           /* 112 */
    printf("d 的值: %p\n", (void *)d);   /* a 的地址，比如 0x7ffd...4c */
    printf("e 的值: %p\n", (void *)e);   /* c 的地址，比如 0x7ffd...40 */

    /* d 和 e 的值都是"数字"（地址），但类型不同 */
    printf("\nd 本身的大小: %zu 字节\n", sizeof(d));  /* 8 (64位) */
    printf("e 本身的大小: %zu 字节\n", sizeof(e));    /* 8 (64位) */

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o types types.c
./types
```

`d` 的值不是 112（那是 `a` 的值），而是 `a` 的地址——一个看起来像 `0x7ffd...` 的大数字。这是原书 §6.3 节反复强调的关键区别。

#### 易错点

❌ **错误：以为指针的值就是它所指向变量的值**

```c
#include <stdio.h>

int main(void) {
    int a = 112;
    int *d = &a;

    /* 错误理解："d 的值是 112" */
    printf("d 的值是 %p (不是 %d！)\n", (void *)d, a);

    /* d 的值是 a 的地址 */
    /* *d 才是 a 的值 */
    printf("*d 的值是 %d (通过 d 间接访问 a)\n", *d);

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o ptrval ptrval.c
./ptrval
```

✅ **正确理解**：**变量的值就是分配给它的那块内存中存储的数值。** 指针变量也不例外——它的内存里存的是一个地址。要获取指针所指向的值，必须用 `*`（解引用）操作符。

#### ⭐ 深入：字节序（大端与小端）

> 以下内容为深层原理，理解它有助于加深认识，但不影响日常使用。跳过不影响后续学习。

多字节值（如 4 字节的 `int`）在内存中的存放顺序有两种约定：

- **小端序（little-endian）**：最低有效字节在最低地址。x86/x86-64 架构使用小端序
- **大端序（big-endian）**：最高有效字节在最低地址。网络协议常用大端序

```c
#include <stdio.h>

int main(void) {
    unsigned int value = 0x01020304;
    unsigned char *bytes = (unsigned char *)&value;

    printf("值: 0x%08X\n", value);
    printf("内存中的字节顺序（从低地址到高地址）:\n");
    for (int i = 0; i < 4; i++) {
        printf("  地址 +%d: 0x%02X\n", i, bytes[i]);
    }

    /* 判断字节序 */
    if (bytes[0] == 0x04) {
        printf("本机是小端序 (little-endian)\n");
    } else {
        printf("本机是大端序 (big-endian)\n");
    }

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o endian endian.c
./endian
```

在你的 WSL2 (x86-64) 上，输出是：

```
值: 0x01020304
内存中的字节顺序（从低地址到高地址）:
  地址 +0: 0x04
  地址 +1: 0x03
  地址 +2: 0x02
  地址 +3: 0x01
本机是小端序 (little-endian)
```

`0x04`（最低有效字节）在最低地址——这就是小端序。日常写 C 代码时不需要关心字节序，但在网络编程和跨平台二进制数据交换时会遇到。

---

### 3. 指针声明与初始化

#### 是什么

**指针变量**是一种特殊的变量，它存储的不是普通数据，而是另一个变量的**地址**。

声明语法：

```c
int *p;    /* 声明：p 是一个指针，指向 int 类型 */
```

这里的 `*` 不是操作符，而是声明语法的一部分，意思是"p 是一个指针"。`int` 说明 p 指向的目标是 `int` 类型。

初始化：用 `&`（取地址）操作符获取某个变量的地址，赋给指针：

```c
int a = 42;
int *p = &a;   /* p 现在存储着 a 的地址 */
```

在内存中：

```
变量名    地址         值
+-----+ 0x1000   +---------+
|  a  |          |   42    |  ← int, 占 4 字节
+-----+          +---------+

+-----+ 0x1008   +---------+
|  p  |          | 0x1000  |  ← int *, 占 8 字节 (64 位系统)
+-----+          +---------+
                     |
                     +------→ 指向 a 的地址
```

指针变量本身也是变量，也占内存。在 64 位系统上，**所有类型的指针**（`int *`、`char *`、`double *`）大小都是 **8 字节**，因为它们存的都是 64 位地址。

> [BEGINNER] 代码中经常出现 `0x7ffd...` 这样的地址。`0x` 前缀表示十六进制（hexadecimal）记数法，用 0-9 和 a-f 共 16 个数字表示值。十六进制比十进制更方便表示内存地址，因为每一位恰好对应 4 个二进制位，`0xFF` = 二进制 `11111111` = 十进制 `255`。

#### 为什么重要

不正确的指针声明和初始化是 C 程序 bug 最大的来源之一。搞清楚 `*` 在声明中的含义、指针变量的大小、以及为什么必须初始化后再使用，是安全使用指针的第一步。

#### 代码演示

```c
#include <stdio.h>

int main(void) {
    int a = 42;
    int *p = &a;    /* p 指向 a */

    printf("=== 变量 a ===\n");
    printf("a 的值:     %d\n", a);
    printf("a 的地址:   %p\n", (void *)&a);
    printf("a 的大小:   %zu 字节\n", sizeof(a));

    printf("\n=== 指针 p ===\n");
    printf("p 的值:     %p  (就是 a 的地址)\n", (void *)p);
    printf("p 的地址:   %p  (p 自己也有地址)\n", (void *)&p);
    printf("p 的大小:   %zu 字节\n", sizeof(p));
    printf("p 指向的值: %d  (就是 a 的值)\n", *p);

    /* 不同类型的指针大小相同 */
    char *cp = NULL;
    double *dp = NULL;
    printf("\n=== 指针大小（64 位系统）===\n");
    printf("int *:    %zu 字节\n", sizeof(p));
    printf("char *:   %zu 字节\n", sizeof(cp));
    printf("double *: %zu 字节\n", sizeof(dp));

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o pointer pointer.c
./pointer
```

输出：

```
=== 变量 a ===
a 的值:     42
a 的地址:   0x7ffd1a2b3c4c
a 的大小:   4 字节

=== 指针 p ===
p 的值:     0x7ffd1a2b3c4c  (就是 a 的地址)
p 的地址:   0x7ffd1a2b3c40  (p 自己也有地址)
p 的大小:   8 字节
p 指向的值: 42  (就是 a 的值)

=== 指针大小（64 位系统）===
int *:    8 字节
char *:   8 字节
double *: 8 字节
```

三点关键观察：
1. `p` 的值就是 `a` 的地址——指针存储地址
2. `p` 自己也有地址——指针变量也是变量
3. 所有指针大小都是 8 字节——因为地址都是 64 位的

#### 易错点

❌ **错误：`int *a, b;` 以为 a 和 b 都是指针**

```c
#include <stdio.h>

int main(void) {
    int *a, b;   /* a 是 int *，但 b 只是 int！ */

    printf("a 的大小: %zu 字节\n", sizeof(a));  /* 8 */
    printf("b 的大小: %zu 字节\n", sizeof(b));  /* 4 */

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o decl_trap decl_trap.c
./decl_trap
```

输出：

```
a 的大小: 8 字节
b 的大小: 4 字节
```

C 的声明语法中，`*` 是跟着变量名走的，不是跟着类型走的。`int *a, b;` 意思是 `a` 是 `int *`（指针），`b` 只是 `int`（普通整数）。

✅ **正确：每个指针变量都写一个 `*`，或者用 typedef**

```c
#include <stdio.h>

typedef int *IntPtr;

int main(void) {
    /* 方式 1：每个变量都写 * */
    int *a, *b;

    /* 方式 2：用 typedef（回忆 lesson-02） */
    IntPtr c, d;   /* c 和 d 都是 int * */

    printf("a: %zu, b: %zu\n", sizeof(a), sizeof(b));  /* 8, 8 */
    printf("c: %zu, d: %zu\n", sizeof(c), sizeof(d));  /* 8, 8 */

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o decl_correct decl_correct.c
./decl_correct
```

---

### 4. 间接访问（解引用）

#### 是什么

有了指针之后，怎么通过它访问指向的数据？用 `*` 操作符——这叫做**间接访问（indirection）**，也叫**解引用（dereference）**。

```c
int a = 42;
int *p = &a;

printf("%d\n", *p);   /* 通过 p 间接访问 a 的值，输出 42 */
*p = 100;             /* 通过 p 间接修改 a 的值 */
printf("%d\n", a);    /* a 变成了 100 */
```

`*p` 的含义：去 `p` 存储的那个地址处，读取（或写入）那里的值。

`&`（取地址）和 `*`（解引用）是**互逆操作**：

```mermaid
graph LR
    A["变量 a"] -- "&a (取地址)" --> B["地址 (指针值)"]
    B -- "*p (解引用)" --> A
```

- `&a` → 从变量得到它的地址
- `*p` → 从地址得到那里的值（或位置）
- 因此：`*(&a)` 就是 `a` 本身，`&(*p)` 就是 `p` 本身

注意声明中的 `*` 和表达式中的 `*` 含义不同：

| 上下文 | 写法 | 含义 |
|--------|------|------|
| 声明 | `int *p;` | 声明 p 是指向 int 的指针 |
| 表达式 | `*p` | 对 p 解引用，访问 p 指向的值 |
| 表达式 | `*p = 10;` | 对 p 解引用，修改 p 指向的值 |

#### 为什么重要

间接访问是指针**存在的理由**。后面你会学到的所有指针应用——函数传指针修改外部变量（module-02）、通过指针遍历数组（module-03）、动态内存管理（module-06）、链表节点的连接（module-07）——全都依赖解引用。

一个最常见的场景：C 的函数参数是**值传递**，如果你想在函数内修改调用者的变量，必须传指针：

```c
void swap(int *a, int *b) {
    int temp = *a;  /* 解引用：读取 a 指向的值 */
    *a = *b;        /* 解引用：写入 a 指向的位置 */
    *b = temp;
}
```

这段代码在 module-02 会详细展开，这里先建立直觉。

#### 代码演示

```c
#include <stdio.h>

int main(void) {
    int a = 42;
    int *p = &a;

    /* 1. 通过指针读取值 */
    printf("a 的值: %d\n", a);
    printf("*p 的值: %d  (通过指针间接读取)\n", *p);

    /* 2. 通过指针修改值 */
    *p = 100;
    printf("\n执行 *p = 100 后:\n");
    printf("a 的值: %d  (a 被间接修改了！)\n", a);
    printf("*p 的值: %d\n", *p);

    /* 3. & 和 * 的互逆关系 */
    printf("\n=== & 和 * 互逆 ===\n");
    printf("  &a  = %p\n", (void *)&a);
    printf("   p  = %p  (与 &a 相同)\n", (void *)p);
    printf(" *&a  = %d  (先取地址再解引用 = a)\n", *&a);
    printf("  &*p = %p  (先解引用再取地址 = p)\n", (void *)&*p);

    /* 4. 修改 a 后通过 p 能看到变化 */
    a = 999;
    printf("\n执行 a = 999 后:\n");
    printf("*p = %d  (p 指向 a，所以自动看到新值)\n", *p);

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o deref deref.c
./deref
```

输出：

```
a 的值: 42
*p 的值: 42  (通过指针间接读取)

执行 *p = 100 后:
a 的值: 100  (a 被间接修改了！)
*p 的值: 100

=== & 和 * 互逆 ===
  &a  = 0x7ffd1a2b3c4c
   p  = 0x7ffd1a2b3c4c  (与 &a 相同)
 *&a  = 100  (先取地址再解引用 = a)
  &*p = 0x7ffd1a2b3c4c  (先解引用再取地址 = p)

执行 a = 999 后:
*p = 999  (p 指向 a，所以自动看到新值)
```

指针不是值的拷贝——`p` 存的是 `a` 的地址，所以 `a` 变了 `*p` 也跟着变。这和赋值 `int b = a;` 完全不同，那是拷贝。

#### 易错点

❌ **错误：对未初始化的指针解引用**

```c
#include <stdio.h>

int main(void) {
    int *p;        /* 未初始化！p 里存着垃圾地址 */
    /* *p = 42; */ /* ← 解引用一个垃圾地址 → 段错误或更糟 */

    /* 即使不崩溃也是灾难：你可能悄悄修改了内存中某个无关位置的值，
       导致程序在完全不相关的地方出错，几乎无法调试 */

    printf("p 的值（垃圾地址）: %p\n", (void *)p);
    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o uninit uninit.c
./uninit
```

编译时 GCC 会给出警告：`'p' is used uninitialized`。**永远不要忽略这个警告。**

原书 §6.5 特别指出了三种可能的后果：
1. **运气好**：垃圾地址是非法地址 → 段错误（segmentation fault），程序立即崩溃，容易发现
2. **运气差**：垃圾地址恰好合法但属于其他变量 → 悄悄修改了别人的数据，程序在不相关的地方出错
3. **最糟糕**：在某些系统上"好像没问题"，但换个环境就崩溃——最难排查的 bug

✅ **正确：声明指针时立即初始化**

```c
#include <stdio.h>

int main(void) {
    int a = 42;
    int *p = &a;   /* 方式 1：立即指向一个有效变量 */
    int *q = NULL;  /* 方式 2：暂时不用就设为 NULL */

    printf("*p = %d\n", *p);  /* 安全 */

    /* 使用 q 之前检查是否为 NULL */
    if (q != NULL) {
        printf("*q = %d\n", *q);
    } else {
        printf("q 是 NULL，不能解引用\n");
    }

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o init_ptr init_ptr.c
./init_ptr
```

原则很简单：**知道指向谁就初始化为它的地址，不知道就设为 NULL。** 绝不让指针处于"未初始化"状态。

#### ⭐ 深入：`*&a = 25` vs `a = 25`

> 以下内容为深层原理，理解它有助于加深认识，但不影响日常使用。跳过不影响后续学习。

原书 §6.8 讨论了一个有趣的表达式：`*&a = 25;`

这条语句和 `a = 25;` 功能上完全相同：`&a` 取出 `a` 的地址，`*` 再对这个地址解引用，结果就是 `a` 本身。但从编译器角度，`*&a = 25` 涉及了额外的取地址和解引用操作。

实际上现代编译器（开启优化时）会把 `*&a = 25` 优化成和 `a = 25` 完全相同的机器码。所以没人会故意写 `*&a = 25`，但理解它为什么等价有助于巩固 `&` 和 `*` 的互逆关系。

```c
#include <stdio.h>

int main(void) {
    int a = 0;

    *&a = 25;      /* 等价于 a = 25 */
    printf("a = %d\n", a);  /* 25 */

    /* 验证：&a 的值 和 &(*&a) 的值相同 */
    printf("&a    = %p\n", (void *)&a);
    printf("&(*&a)= %p\n", (void *)&(*&a));

    return 0;
}
```

```bash
gcc -std=c99 -Wall -Wextra -g -o deref_addr deref_addr.c
./deref_addr
```

---

## 概念串联

本课四个概念是一条完整的理解链：

1. **内存和地址**建立了基础模型——内存是字节数组，用地址访问
2. **值和类型**解释了为什么同一个地址处的数据可以有不同含义——类型决定解释方式
3. **指针声明**把这两者连接起来——指针变量存储地址，类型说明目标数据的解释方式
4. **间接访问**让指针真正发挥作用——通过地址读写目标数据

下一课（lesson-02）会讲指针的常见陷阱：未初始化指针的危害（本课已初步涉及）、NULL 指针的完整讨论、指针的指针、以及各种指针表达式的求值。在那里你会把本课学到的基础知识运用到更复杂的场景中。

---

## 常见陷阱清单

| # | 陷阱 | 症状 | 原因 | 修复 |
|---|------|------|------|------|
| 1 | 以为相邻声明的变量地址连续 | 基于地址差做运算得到错误结果 | 编译器可能重排栈上变量的位置 | 只有数组元素才保证连续；不要假设独立变量的地址关系 |
| 2 | `int *a, b;` 以为都是指针 | `b` 当指针用时编译报错或类型不匹配 | `*` 只修饰紧跟其后的变量名 | 每个指针单独写 `*`，或用 `typedef` |
| 3 | 混淆指针的值与所指变量的值 | 打印指针期望看到数据，实际看到地址 | 指针存的是地址，不是目标值 | 要目标值用 `*p`，要地址用 `p` |
| 4 | 对未初始化指针解引用 | 段错误，或悄悄破坏其他数据 | 指针中存着垃圾地址 | 声明时立即初始化为有效地址或 `NULL` |
| 5 | 忘写 `*` 直接对指针做算术 | 计算结果不符预期 | `p + 1` 是指针运算（加一个元素大小），不是数值加 1 | 要操作数据用 `*p + 1`，指针运算见 lesson-03 |
| 6 | 混淆 `*p = x` 与 `p = &x` | 修改了指向还是修改了数据搞不清 | `*p = x` 改的是 p 指向位置的值；`p = &x` 改的是 p 本身指向谁 | 画图区分：改箭头（指向）还是改目标（内容） |

---

## 动手练习提示

### 练习 1：地址探索器

写一个程序，声明 `char`、`short`、`int`、`long`、`double`、`char *` 各一个变量，打印每个变量的地址和大小。观察：

- 不同类型的大小分别是多少？
- 相邻声明的变量地址差和 `sizeof` 返回值有什么关系？（提示：不一定相等）
- 所有指针的大小是否相同？

**容易卡住的地方**：打印地址时要把指针转为 `(void *)` 传给 `%p`，否则某些编译器会警告。

### 练习 2：交换器（预热）

写一个函数 `void swap(int *a, int *b)`，通过指针交换两个整数的值。在 `main` 中调用并验证。

**思路提示**：你需要一个临时变量 `temp` 保存 `*a` 的值，然后 `*a = *b`，最后 `*b = temp`。

**容易卡住的地方**：调用时要传 `&x` 和 `&y`，不是 `x` 和 `y`。

---

## 自测题

> 不给答案，动脑想完再往下学。

1. 如果 `int a = 42; int *p = &a;`，那么 `&*p` 的值是什么？`*&a` 呢？它们和 `p`、`a` 分别是什么关系？

2. 为什么说"指针的值是一个数字"，但你不能把一个整数直接赋给指针变量（如 `int *p = 100;`）？编译器会怎样反应？

3. `int *a, b;` 和 `typedef int *IntPtr; IntPtr a, b;` 的结果有什么不同？为什么？（提示：回忆 lesson-02 的 typedef）

---

## 补充资源

| 资源 | 类型 | 说明 |
|------|------|------|
| [C Pointers (Programiz)](https://www.programiz.com/c-programming/c-pointers) | 文章 | 指针声明和解引用的交互式教程，有在线编译器可直接验证 |
| [Memory Layout of C Programs (GeeksforGeeks)](https://www.geeksforgeeks.org/c/memory-layout-of-c-program/) | 文章 | C 程序内存四大段（代码段、数据段、堆、栈）的详细讲解 |
| [C Dereference Pointer (TutorialsPoint)](https://www.tutorialspoint.com/cprogramming/c_dereference_pointer.htm) | 文章 | 解引用操作符的工作原理和多种示例 |
