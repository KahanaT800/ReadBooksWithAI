# 跨课术语一致性表

> 确保同一概念在所有课程中用词一致。每个术语在首次出现的课程中定义，后续课程引用时使用相同的中文译名。
>
> 本表由 `/write-lesson` skill 在写课过程中自动维护。

---

## 使用规则

1. 写课前查阅本表，确认已有术语的标准译名
2. 新术语首次出现时在课程正文中给出定义（中文 + 英文）
3. 定义后追加到本表
4. 同一概念禁止在不同课程中使用不同译名

---

## 术语表

| 中文 | 英文 | 首次出现 | 定义 |
|------|------|---------|------|
| 预处理指令 | preprocessor directive | module-00 lesson-01 | 以 `#` 开头的指令，在编译前由预处理器处理（如 `#include`、`#define`） |
| 函数原型 | function prototype | module-00 lesson-01 | 在函数调用前声明函数的返回类型、名称和参数类型，让编译器做类型检查 |
| 作用域 | scope | module-00 lesson-01 | 标识符在源代码中可以被访问的区域范围 |
| 链接属性 | linkage | module-00 lesson-01 | 决定不同文件中同名标识符是否指向同一实体：external/internal/none |
| 存储类型 | storage class | module-00 lesson-01 | 决定变量存储在哪里（静态内存/栈/寄存器）以及生命周期 |
| 未定义行为 | undefined behavior (UB) | module-00 lesson-01 | C 标准未规定结果的操作，编译器可以做任何事，程序行为不可预测 |
| 隐式声明 | implicit declaration | module-00 lesson-01 | 调用未声明的函数时编译器自动假设的声明（C99 起不合法） |
| 表达式语句 | expression statement | module-00 lesson-02 | 一个表达式后面加上分号 `;` 构成的语句，C 中赋值就是表达式语句 |
| 副作用 | side effect | module-00 lesson-02 | 表达式求值过程中对程序状态产生的改变（如赋值修改变量、printf 输出字符） |
| 短路求值 | short-circuit evaluation | module-00 lesson-02 | `&&` 和 `||` 从左到右求值，一旦结果确定就停止计算右侧操作数 |
| 优先级 | precedence | module-00 lesson-02 | 决定多个操作符混合时如何分组（哪些操作数属于哪个操作符） |
| 结合性 | associativity | module-00 lesson-02 | 决定同优先级操作符的分组方向（左结合从左到右，右结合从右到左） |
| 左值 | lvalue | module-00 lesson-02 | 标识一个内存位置的表达式，可以出现在赋值号左边（如变量名、`*p`、`a[i]`） |
| 右值 | rvalue | module-00 lesson-02 | 只代表一个值的表达式，不能出现在赋值号左边（如字面量、`a + b`） |
| 类型别名 | typedef | module-00 lesson-02 | 用 `typedef` 为已有类型创建新名字，语法与变量声明相同只是前面加 typedef |
| 地址 | address | module-01 lesson-01 | 内存中每个字节的唯一编号，用于定位数据在内存中的位置 |
| 指针 | pointer | module-01 lesson-01 | 存储另一个变量地址的变量，通过地址间接访问目标数据 |
| 解引用 | dereference | module-01 lesson-01 | 用 `*` 操作符通过指针访问它所指向地址处的值，也叫间接访问（indirection） |
| 间接访问 | indirection | module-01 lesson-01 | 通过指针所存储的地址访问目标数据的过程，与解引用同义 |
| 位模式 | bit pattern | module-01 lesson-01 | 内存中存储的一串 0 和 1，同一位模式可根据类型被解释为不同的值 |
| 字节序 | byte order / endianness | module-01 lesson-01 | 多字节值在内存中的存放顺序，分小端序（little-endian）和大端序（big-endian） |
| NULL 指针 | null pointer | module-01 lesson-02 | 值为 `NULL`（通常是 `((void *)0)`）的指针，表示"当前不指向任何有效数据" |
| 未初始化指针 | uninitialized pointer | module-01 lesson-02 | 声明后未赋值的指针，含垃圾地址，解引用是未定义行为 |
| 二级指针 | pointer to pointer / double pointer | module-01 lesson-02 | 指向另一个指针的指针，声明为 `int **c`，每加一层 `*` 跟随一层间接访问 |
| 段错误 | segmentation fault (SIGSEGV) | module-01 lesson-02 | 程序访问了不允许访问的内存地址时，操作系统发送的信号，导致程序终止 |
| 指针运算 | pointer arithmetic | module-01 lesson-03 | 对指针进行加减整数、指针相减、关系比较等算术操作的统称 |
| 缩放 | scaling | module-01 lesson-03 | 指针加减整数时，整数自动乘以所指类型的 `sizeof` 大小，使指针按元素而非字节移动 |
| ptrdiff_t | ptrdiff_t | module-01 lesson-03 | 两个指针相减的结果类型，定义在 `<stddef.h>` 中，是有符号整数类型，打印用 `%td` |
| past-the-end 指针 | past-the-end pointer | module-01 lesson-03 | 指向数组最后一个元素之后一个位置的指针，可以持有和比较但不能解引用 |
| 函数定义 | function definition | module-02 lesson-01 | 函数的实现，包含返回类型、函数名、形参列表和函数体 |
| 函数原型 | function prototype | module-02 lesson-01 | 函数的声明，告诉编译器函数的名字、返回类型和参数类型，不包含函数体 |
| 形式参数 | formal parameter | module-02 lesson-01 | 函数定义中声明的参数变量，接收调用时传入的实参值的副本 |
| 实参 | actual argument | module-02 lesson-01 | 调用函数时传入的表达式或变量，其值被复制给形参 |
| 传值调用 | pass by value | module-02 lesson-01 | C 唯一的参数传递机制：函数接收实参值的副本，修改形参不影响实参 |
| 递归 | recursion | module-02 lesson-02 | 函数在执行过程中直接或间接调用自身的编程技巧，需要终止条件和逐步逼近 |
| 尾递归 | tail recursion | module-02 lesson-02 | 递归调用是函数执行的最后一个操作的特殊递归形式，编译器可优化为循环 |
| 抽象数据类型 | Abstract Data Type (ADT) | module-02 lesson-02 | 只暴露操作接口、隐藏内部实现的数据类型设计方式，也称黑盒设计 |
| 可变参数 | variadic | module-02 lesson-02 | 函数接受不确定数量参数的机制，通过 `<stdarg.h>` 中的 va_list/va_start/va_arg/va_end 实现 |
| 记忆化 | memoization | module-02 lesson-02 | 用缓存（如数组）保存已计算的递归结果，避免重复计算，将指数级复杂度降为线性 |
| 隐式类型转换 | implicit type conversion | module-00 lesson-02 | 混合类型运算时 C 自动进行的类型转换，包括整型提升和寻常算术转换 |
| 整型提升 | integral promotion | module-00 lesson-02 | 比 int 窄的类型（char、short）在运算前自动提升为 int 或 unsigned int |
| 寻常算术转换 | usual arithmetic conversion | module-00 lesson-02 | 二元操作符两侧类型不同时，较窄类型自动转换为较宽类型的规则 |
| 边界对齐 | boundary alignment | module-01 lesson-01 | 多字节类型的起始地址必须是其大小的倍数（如 int 地址为 4 的倍数），硬件要求 |
| 退化 | decay | module-03 lesson-01 | 数组名在表达式中自动转换为指向首元素的指针常量，两个例外：sizeof 和 & |
| 下标引用 | subscript | module-03 lesson-01 | 用 `[]` 运算符访问数组元素，`a[i]` 等价于 `*(a + i)` |
| 指针常量 | pointer constant | module-03 lesson-01 | 数组名退化后产生的指针值，不可修改（不能赋值、不能自增），区别于指针变量 |
| 行主序 | row-major order | module-03 lesson-02 | C 多维数组的存储顺序，最右下标率先变化，元素按行连续排列在内存中 |
| 指向数组的指针 | pointer to array | module-03 lesson-02 | 声明为 `int (*p)[N]` 的指针，指向含 N 个元素的数组，`p+1` 跳过整个数组 |
| 指针数组 | array of pointers | module-03 lesson-03 | 元素是指针的数组，声明为 `int *p[N]`，`[]` 优先级高于 `*` 所以先解数组 |
| 字符串字面量 | string literal | module-03 lesson-03 | 用双引号括起的字符串常量（如 `"hello"`），存储在只读数据段，不可修改 |
| 哨兵 | sentinel | module-03 lesson-03 | 放在数据结构末尾用于标记结束的特殊值，如指针数组末尾的 NULL |
| NUL 终止符 | NUL terminator | module-04 lesson-01 | 值为 `'\0'`（整数 0）的字符，标记 C 字符串的结束位置，区别于 NULL 指针 |
| 缓冲区溢出 | buffer overflow | module-04 lesson-01 | 写入数据超过目标缓冲区容量，覆盖相邻内存，是最常见的安全漏洞之一 |
| 不受限字符串函数 | unrestricted string function | module-04 lesson-01 | 不检查目标缓冲区大小的字符串函数（如 `strcpy`、`strcat`），依赖调用者保证空间足够 |
| 长度受限字符串函数 | length-restricted string function | module-04 lesson-01 | 接受长度参数限制操作范围的字符串函数（如 `strncpy`、`strncat`），更安全但有各自陷阱 |
| 标记 | token | module-04 lesson-02 | 字符串按分隔符拆分后的各个独立部分，`strtok` 函数用于提取标记 |
| 不可重入 | non-reentrant | module-04 lesson-02 | 函数内部使用静态变量保存状态，不能同时被多次调用（如 `strtok`），对比可重入版本 `strtok_r` |

<!-- 由 /write-lesson skill 在写课过程中自动填充 -->
