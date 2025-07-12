---
outline: deep
---

# 進階 Function

`Function` 是 `Javascript` 設計上極為重要的角色，以下為本節會在討論的大綱：

- 回傳函式與立即函式
- 如何分辨各種情況下 function 中的 this 對象
- 箭頭函式與傳統函式的比較
- Closure 閉包的特性與應用

## 回傳函式與立即函式

### Callback Function 回傳函式

回傳函式就是把函式當作參數丟進另一個函式

陣列高階方法的範例
```javascript
const array = [1, 2, 3, 4, 5]
array.forEach(item => {
    const result = item - 2
    console.log(result)
})
```

### Callback Hell 回傳地獄

如果過度使用回傳函式，容易導致程式碼難以閱讀，關於這點我們可以藉由一些非同步手法來解決，這將於後面的章節解釋，以下為 **Callback Hell*- 的例子

```javascript
function add(n, fn){
    console.log(n)
    fn(n)
}

add(10, function add2(w){ // 10
    let x = w + 10 
    add(x, function add3(y){ // 20
        let z = y + 10
        add(z, function add4(end){ // 30
            console.log(end +10) // 40
        })
    })
})
```

這一段程式的呼叫過程：

1. `add` 把 10 打印出來，接著代入 `add` 的 `callback function`
2. `add2` 把 20 打印出來，接著代入 `add2` 的 `callback function`
3. `add3` 把 30 打印出來，接著代入 `add3` 的 `callback function`
4. `add4` 把 40 打印出來

也就如此持續下去會很容易不知道參數傳到哪裡，而其中如果出問題，會很難去 debug

更誇張的可以長這樣

<figure><img src="https://cythilya.github.io/assets/ydkjs/callback-hell.png" alt="" width="563"><figcaption></figcaption></figure>

### Immediately Invoked Function Expression 立即函式（IIFE）

如同字面意思，就是會立刻執行的函式

```javascript
// ；是用來防止被之前的程式干擾
;(function hello(){
    console.log("Hello World")
})()

const x = (function num(){
    let n = 10
    return n - 100
})() 

console.log(x) // 1000
```

箭頭函式的表示方式

```javascript
(() => {
    console.log("Hi")
})()

const x = (num => {
    let n = 10
    return n - 100 
})()

console.log(x)
```

#### 立即函式的好處

1. 避免使用被汙染的全域變數

```javascript
for(var i=0; i<5; i++){
    (function(num){
        setTimeout(function(){
            console.log(num)}
        ,1000)
    })(i) // 0, 1, 2, 3, 4
}
```

2. 避免大量宣告函式，占用記憶體空間，避免命名衝突

當我們宣告一個函式時，會使這個函式成為 `window` 的屬性，但同時也會佔據記憶體的空間，拖慢瀏覽器的運算。所以我們如果使用立即函式，就不會變成 `window` 的屬性，並且使用後就會被釋放，提升整體效率

## this 的種類

由於在 `JavaScript` 中 `this` 的對象取決於 `Function` 的使用情況，使得要判別 `this` 的對象不是很直觀。以下將 `this` 的使用情況分為 5 種。

- 預設繫結
- 隱含繫結
- 明確繫結
- `new` 繫結
- 語彙繫結

### **預設繫結（Default Binding）**

預設為全域對象，也就是 window 這個根物件

```javascript
var number = 123
;(function function1(){
  console.log(this.number === window.number) // true
})()
```

::: tip
在非嚴格模式下，`this` 對象為 `window` 根物件

在嚴格模式下，`this` 對象為 `undefind`
:::

### **隱含繫結（Implicit binding）**

當 `function` 被當作物件的方法執行時，`this` 的對象就是這個物件

```javascript
var numbers = {
  methods: function1,
  num1: 100
}
function function1(){
  console.log(this.num1 === numbers.num1)  // true
}
numbers.methods()
```

::: warning
若在物件屬性的部分，將箭頭函式當作值，其中的 `this` 對象會是 `window`，這裡的物件實字並沒有分隔作用域的功能，所以 `this` 會往上一層找。這一點跟待會的語彙繫結很像
:::
::: tabs

== Example 1

```javascript
var numbers = {
  methods: () => console.log(this), // window
  num1: 100
}
numbers.methods()
```

== Example 2

```javascript
var numbers = {
    methods: function1,
    num1: 100
}
function function1(){
    var numbers2 = {
        methods: () => console.log(this), // numbers
        num2: 100
    }
    numbers2.methods()
    console.log(this)  // numbers
}
numbers.methods()
```
:::

### **明確繫結（Explicit Binding）**

當使用 `function` 內建函式 `call`、`apply` 呼叫函式時，`this` 對象就是其第一個參數。

共同點：可以明確指定 `this`

::: tabs
== call

- 語法：fn.call(this, arg1, arg2..., argn)
- 說明：呼叫函式。第一個參數可以指定 this，後續參數依序丟入函式
```javascript
const obj = {};
function add(a, b) {
    console.log(this);
    return a + b;
};
console.log(add(1, 2)); // window, 3
console.log(add.call(obj, 1, 2)); // obj, 3
```

== apply

- 語法：fn.apply(this, \[arg1, arg2..., argn])
- 說明：呼叫函式。第一個參數可以指定 this，後續參數依序丟入函數
- 特點：若不知道有多少參數，就可以採用這樣的方式傳入
```javascript
var list = [1, 5, 8]
function add() {
    return Array.from(arguments).reduce(function(sum, num) {
    return sum + num
    })
}
console.log(add.call(null, 1, 2)) // 3
console.log(add.apply(null, list)) // 14
```

== bind

- 語法：fn.bind(this, arg1, arg2..., argn)
- 說明：回傳一個包裹函式，當我們執行這個函式時，同時也會將帶入 bind 的 arguments 一起帶進 Function 中
```javascript
function add(a, b) {  
    return a + b
}
var add1 = add.bind(null, 1)
console.log(add1(2))			// 3
console.log(add1(4))			// 5
```
:::

### **new 繫結（New Binding）**

由於是透過 `new` 創建的新物件，所以 `this` 對象就是這個新物件。

```javascript
function function1(){
  this.nums = 123
}
var myObj = new function1();
console.log(myObj.nums) // 123
```

::: tip
`this` 內容不會是 `Function` 本身，而是這整個新物件
:::

### **語彙繫結（Lexical Binding）**

使用箭頭函式時，`this` 的對象與包裹他的 `Function` 相同。換句話說，箭頭函式的 `this` 對象會往外層找，找到的第一個物件，就是他的 `this` 對象，但這個物件不包含 `function`

```javascript
var myString = 'hello global'
const obj = {}
function outer() {
  console.log(this)
  this.myString = 'hello outer'
  return () => {
        console.log(this)
  	this.myString = 'hello arrow function'
  }
}

var arrowFn = outer.call(obj) // obj
console.log(obj.myString) // "hello outer"
arrowFn() // obj
console.log(window.myString) // "hello global"
console.log(obj.myString) // "hello arrow function"
```

::: tip
當程式情況較複雜時，`this` 的對象優先順序如下：

**語彙繫結 > new繫結 > 明確繫結 > 隱含繫結 > 預設繫結**
:::

## 箭頭函式 vs. 傳統函式

1. **參數的獲取方式**

在傳統函式，可以藉由 `arguments` 物件將傳入函式的參數以類陣列的形式取出。但箭頭函式則沒有 `arguments` 物件可使用，儘管如此，我們還是可以用展開運算子宣告一個自訂義變數，藉此變數將參數取出。

```javascript
function func1(){
    console.log(arguments)
}

const func2 = (...args) => {
    console.log(args) // 注意此時的 args 屬於陣列，而非類陣列
}

func1(1, 2, 3)
func2(1, 2, 3)
```

::: tip
透過展開運算子自訂義變數來取出所有參數的方式，在傳統函式上也可以使用
:::

2. **this 的對象定義**

- 傳統函式的預設 `this` 對象是 `window` 物件，其餘規則請見 [this 的種類](broken-reference)
- 箭頭函式的 `this` 對象一律跟隨外層的第一個物件，換句話說，就是繼承上一層的 `this` 對象

範例一

```javascript

const person = (function(){
    const num1 = function(){
        return () => console.log(this)
    }
    const num2 = {
        methods: num1,
    }
    const result = num1()
    const result2 = num2.methods()
    result() // window
    result2() // num2
})()
```

在這個例子中，呼叫 `num1` 的 `this` 外層沒有其他物件包覆，所以回傳預設的 `window` 物件。而在 `nums2` 物件呼叫 `num1`，這個 `this` 的外層就是 `num2` 物件，所以回傳 `num2`;

範例二

```javascript
const person = {
    name: "Kevin",
    methods(){
        console.log(this)
    }
}
person.methods() // person

const person2 = {
    name: "Brain",
    methods(){
        return () => console.log(this)
    }
}
const result = person2.methods() 
result() // person
```

在這個例子中，即使函式被縮寫，但其結果還是等同於被當作 `value` 時一樣

### 箭頭函式的特殊情況

1. `apply`, `call`, `bind` 等明確繫結方式對於箭頭函式是無效的

```javascript
const obj = {
    number: 10
}

function func1(){
    console.log(this)
}

const func2 = () => {
    console.log(this)
}

func1.call(obj) // obj
func2.call(obj) // window
```

2. 建構式無法使用箭頭函式

```javascript
const person = (name, age) =>  {
    this.name = name
    this.age = age
}

const p1 = new person("Kevin", 30)
//Uncaught TypeError: person is not a constructor
```

## Closure 閉包

`Closure` 是只當一個函式的內部函式調用了外部變數時，就會產生閉包，如下

```javascript
const func1 = function(){
    let num = 0
    function innerFunc(){
        console.log(num) // 內部函式調用了外部變數
    }
    innerFunc()// 0
}
```

### 閉包的好處

- **避免變數被汙染**：閉包能防止內部變數被外部請求，避免變數被意外修改

```javascript
const func1 = function(){
    var num = 0 // 即使宣告成全域變數，也不會被修改
    function innerFunc(){
        console.log(num)
    }
}

console.log(num)
// Uncaught ReferenceError: num is not defined
```

- **保存環境狀態**：一個函數返回閉包時，閉包會記錄該函數在創建時所處的環境狀態，包括其內部變數和引用。這使得即使該函數已經執行完畢，閉包仍然可以訪問和操作這些環境變數，從而保留了函數執行時的上下文和狀態

```javascript
function count(){
    let counts = 0
    return function add(){
        return ++counts
    }
}

const cnt = count()
console.log(cnt()) // 1
console.log(cnt()) // 2
console.log(cnt()) // 3
```

- **延長函數生命週期**：由於閉包保存了函數的環境狀態，使得函數的生命週期得以延長。閉包可以被傳遞、存儲或返回，並在需要時再次調用，從而使得函數在不同的時間和地點被使用，具有更大的靈活性和重用性
- **函數工廠**：閉包允許在函數內部動態創建和返回其他函數，這種機制被稱為函數工廠。通過閉包，可以根據不同的需求和參數生成具有不同行為的函數，增加了程式設計的彈性和可擴展性

```javascript
function calculate(money, interest){
    let price = money ?? 100
    return function(){
        price += interest
        return price
    }
}

const p1 = calculate(0, 90)
const p2 = calculate(100, -30)
const p3 = calculate(200, 10)

console.log(p1()) // 90
console.log(p2()) // 70
console.log(p3()) // 210

console.log(p1()) // 180
console.log(p2()) // 40
console.log(p3()) // 220
```