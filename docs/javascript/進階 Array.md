---
outline: deep
---

# 進階 Array

`Array` 作為 `JavaScript` 最常見的資料類型，以下為本節要討論的大綱

- 進階陣列方法。如：`filter`、`map`、`some`、`find`
- `for` 迴圈迭代方式與 `forEach` 迭代方式有什麼差異
- `array-like` 的定義與處理
- 陣列實戰應用


## 更多陣列方法

以下為我認為根據陣列方法的功能所做的分類

::: tabs

== 搜尋類型

- **Array.prototype.indexOf()**
- Array.prototype.lastIndexOf()
- **Array.prototype.filter()**
- **Array.prototype.find()**
- **Array.prototype.findIndex()**
- **Array.prototype.every()**
- **Array.prototype.some()**
- **Array.prototype.includes()**

== 更新類型

- Array.prototype.push()
- Array.prototype.pop()
- Array.prototype.shift()
- Array.prototype.unshift()
- **Array.prototype.splice()**
- Array.prototype.copyWithin()
- Array.prototype.join()
- **Array.prototype.concat()**
- **Array.prototype.map()**
 
== 特殊類型

- **Array.prototype.slice()**
- Array.prototype.reverse()
- **Array.prototype.sort()**
- **Array.prototype.reduce()**
- Array.prototype.reduceRight()
- Array.prototype.isArray()

:::

### 1. Array.prototype.filter()

說明：用於篩選出陣列中符合條件的元素

```javascript
array.filter(用於篩選的函式);
```

- 回傳通過過濾的元素陣列
- 不會更動到原陣列

**範例一**

```javascript
const array = ["Html", "Ruby", "JavaScript", "Scss", "TyperScript"];
const array2 = array.filter(item => item.length > 5);
console.log(array2); // ["JavaScript", "TypeScript"]
```

在這個範例中，我們過濾長度超過 5 的元素，並組合成一個陣列回傳

其中的 `function` 是用箭頭函式呈現，傳統函式的寫法如下：

```javascript
const array2 = array.filter(function(item){
    return item.length > 5;
});
```

**範例二**

```javascript
const array = ["JavaScript", "Java", "Python", "Json", "ue"];
const array2 = array.filter(item => item.indexOf("Java") > -1);
console.log(array2); //["JavaScript", "Java"]
```

在這個範例中，我們進行簡單的元素比對，回傳帶有 Java 連續字串的元素

### 2. Array. prototype.map()

說明：用於更新每一個元素

```javascript
array.map(用於更新的函式);
```

- 不會修改原本的陣列
- 回傳一個更新後的陣列

**範例一**

```javascript
const array = [1, 2, 3, 4, 5];
const array2 = array.map(item => item + 100);
console.log(array2); // [101, 102, 103, 104, 105]
```

### 3. Array.prototype.reduce()

說明：陣列的累加器，會將現在的結果與之前的結果合併

```javascript
array.reduce(function(先前的結果, 陣列元素){});
```

- 回傳最後的結果
- 不會更動原陣列

**範例一**

```javascript
const array = [1, 2, 3, 4, 5];
const result = array.reduce((prev, item) => prev + item);
console.log(result); // 15
```

**範例二**

```javascript
const array = ["H", "e", "l", "l", "o", "W", "o", "r", "l", "d"];
const result = array.reduce((prev, item) => prev + item);
console.log(result); // "HelloWorld"
```

### 4. Array.prototype.every()

說明：用於檢查陣列內每一個元素是否都符合條件

```javascript
array.every(判別函式)
```

- 如果有一個元素不符合就回傳 false，反之，回傳 true

**範例一**

```javascript
const array = [1, 2, 3, 4, 5];
const result = array.every(item => item < 10);
console.log(result); // true

const result2 = array.every(item => item > 3);
console.log(result2); // false
```

### 5. Array.prototype.some()

說明：用於檢查陣列內有沒有元素符合條件

```javascript
array.some(判別函式);
```

- 如果有一個元素符合條件就回傳 true，反之，回傳 false

**範例一**

```javascript
const array = [3, 6, 9, 12, 15, 18];
const result = array.some(item => item % 5 == 0);
console.log(result); // true

const result2 = array.some(item => item % 7 == 0);
console.log(result2); // false
```

### 6. Array.prototype.includes()

說明：確認陣列內有沒有包含某個元素

```javascript
array.includes(要尋找的元素, 開始尋找的索引值);
```

- 如果包含回傳 true，反之，回傳 false

**範例一**

```javascript
const array = ["JavaScript", "Python", "Kotlen", "C#", "C++"];
const result = array.includes("Python");
console.log(result); // true

const result2 = array.includes("Python", 2);
console.log(result2); // false

const result3 = array.includes("C");
console.log(result3); // false
```

### 7. Array.prototype.find() / Array.prototype.findIndex();

說明：皆用於在陣列中查找某個元素

```js
array.find(條件函式);
```

- 回傳第一個符合條件的元素，否則回傳 -1

```js
array.findIndex(條件函式);
```

- 回傳第一個找到符合該元素的索引值，否則回傳 -1

**範例一**

```js
const array = [11, 23, 32, 47, 500];
const result = array.find(item => item > 30);
console.log(result); // 32

const result2 = array.findIndex(item => item > 80);
console.log(result2); // 4
```

## for 與 forEach 的使用

`forEach` 是 Array 的一種迭代方法，用法如下

```javascript
const array = [1, 2, 3, 4, 5];

for(let i = 0; i < array.length; i++){
    console.log(array[i]);
}

array.forEach(item => console.log(item));
```

這兩種迭代方式的結果是一樣的，但 `for` 和 `forEach` 的用法差在哪裡，有什麼細節需要注意的？

### 中斷方式

`for` 迴圈可以藉由 `break` 來停止迴圈繼續迭代，但是 `forEach` 就難以做到這件事

```javascript
const array = [1, 2, 3, 4, 5];
for(let i = 0; i < array.lengt; i++){
    if(array[i] == 3){
        break;
    }else{
        console.log(array[i]);
    }
}
// 1, 2
```

**補充**：神奇的 `forEach` 中斷寫法

至於要如何中斷 `forEach`，目前有兩種解法。

- `try.. catch` 的例外處理
- 切斷陣列


在第二個解法中，我們可以對原陣列重新賦予被切斷的部分來保證陣列不變

至於原理，我認為是因為 JavaScript 中 `forEach` 是屬於同步執行的，所以當發現沒有下一個值可以迭代時，就會中斷下一次的迭代

**範例一**

```javascript
var array = [1, 2, 3, 4, 5];
array.forEach(function(item, index) {
    if (item === 2) {
        array = array.splice(0);
    }
    console.log(item); // 1, 2
})
```

以這個範例而言

1. array.splice(0) 刪除陣列內元素
2. forEach 發現沒有下一個元素可以迭代，終止下一次的迭代
3. array = array.splice(0)。array 被賦予回傳值，也就是被刪除的元素
4. 繼續完成這一次的迭代過程

**範例二**

```javascript
var array = [1, 2, 3, 4, 5]
array.forEach(function(item, index) {
    if (item === 2) {
        array = array.concat(array.splice(index, array.length - index));
    }
    console.log(item); // 1, 2
})
```

| 語法      | 效率   | 代碼長度 | 能否被中斷 | 是否支援 await |
|-----------|--------|----------|-------------|-----------------|
| for       | 較好   | 較長     | 可以        | 能              |
| forEach   | 較差   | 較短     | 不能        | 不能            |


因此 `for` 迴圈的程式變化較多元，可以適應較多種情況的寫法。但 `forEach` 的代碼較為優雅，可以省下較冗長的程式量

## array-like 類陣列

類陣列就是那些看起來很像陣列，但實際上無法使用和陣列一樣的功能，屬於一種物件類型

### 陣列能做到的事

- `length` 屬性能根據元素多寡變化
- 當把 `length` 修改小於原長度，陣列會被截短
- 能夠使用內建方法，如：`indexOf`, `forEach`
- `class` 屬性為 `Array`

### 類陣列只能做的事

- 訪問 `length` 屬性

### 類陣列的例子：`document.querySelectorAll()`

```javascript
const arrayLike = document.querySelectorAll('.array-like')
arrayLike.length = 5
console.log(arrayLike) // [div.array-Like, div.array-Like, div.array-Like] 
```

### 類陣列的例子：`function` 參數

```javascript
function func(){
    arguments.length = 2
    console.log(arguments) //  [1, 2, 3, 4]
    arguments.forEach(item => console.log(item)) 
    //Uncaught TypeError: arguments.forEach is not a function
}
func(1, 2, 3, 4)
```

從上面的例子可以得出，修改 length 屬性不會有影響，也不能呼叫陣列內建方法

::: tip

要確認是不是類陣列，還有一個更簡單的方法：**`Array.isArray()`**

```javascript
function func(){
    console.log(Array.isArray(arguments)) // false
}
func(1, 2, 3, 4)
```
:::

### 如何將類陣列轉化成陣列

1. **展開運算子**

```javascript
function func(){
    const array = [...arguments]
    console.log(array) // [1, 2, 3, 4]
}
func(1, 2, 3, 4)
```

2. **`for` 迴圈迭代**

```javascript
function func(){
    const array = []
    for(let i = 0; i < arguments.length; i++){
        array[i] = arguments[i]
    }
    console.log(array) // [1, 2, 3, 4]
}
func(1, 2, 3, 4)
```

3. **`Array.from()`**

```javascript
function func(){
    const array = Array.from(arguments)
    console.log(array) // [1, 2, 3, 4]
}
func(1, 2, 3, 4)
```

將類陣列轉化為陣列之後，就能使用內建函式，所以要注意陣列的類型，否則容易吃鱉
