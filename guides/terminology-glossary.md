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

<!-- 由 /write-lesson skill 在写课过程中自动填充 -->
