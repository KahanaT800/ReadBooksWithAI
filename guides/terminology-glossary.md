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

<!-- 由 /write-lesson skill 在写课过程中自动填充 -->
