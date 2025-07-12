---
outline: deep
---

# 進階 Array

# 進階陣列方法

### 方法類型分類

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

### 1. Array.prototype.filter ()

說明：用於篩選出陣列中符合條件的元素

```javascript
array.filter(用於篩選的函式)
```

* 回傳通過過濾的元素陣列
* 不會更動到原陣列

#### 範例一

```javascript
const array = ["Html", "Ruby", "JavaScript", "Scss", "TyperScript"]
const array2 = array.filter(item => item.length > 5)
console.log(array2) // ["JavaScript", "TypeScript"]
```

在這個範例中，我們過濾長度超過 5 的元素，並組合成一個陣列回傳

其中的 function 是用箭頭函式呈現，傳統函式的寫法如下：

```javascript
const array2 = array.filter(function(item){
    return item.length > 5
})
```

#### 範例二

```javascript
const array = ["JavaScript", "Java", "Python", Json", "ue"]
const array2 = array.filter(item => item.indexOf("Java") > -1)
console.log(array2) //["JavaScript", "Java"]
```

在這個範例中，我們進行簡單的元素比對，回傳帶有 Java 連續字串的元素

### 2. Array. prototype.map ()

說明：用於更新每一個元素

```javascript
array.map(用於更新的函式)
```

* 不會修改原本的陣列
* 回傳一個更新後的陣列

#### 範例一

```javascript
const array = [1, 2, 3, 4, 5]
const array2 = array.map(item => item + 100)
console.log(array2) // [101, 102, 103, 104, 105]
```

### 3. Array.prototype.reduce ()

說明：陣列的累加器，會將現在的結果與之前的結果合併

```javascript
array.reduce(function(先前的結果, 陣列元素){})
```

* 回傳最後的結果
* 不會更動原陣列

#### 範例一

```javascript
const array = [1, 2, 3, 4, 5]
const result = array.reduce((prev, item) => prev + item)
console.log(result) // 15
```

#### 範例二

```javascript
const array = ["H", "e", "l", "l", "o", "W", "o", "r", "l", "d"]
const result = array.reduce((prev, item) => prev + item)
console.log(result) // "HelloWorld"
```

### 4. Array.prototype.every ()

說明：用於檢查陣列內每一個元素是否都符合條件

```javascript
array.every(判別函式)
```

* 如果有一個元素不符合就回傳 false，反之，回傳 true

#### 範例一

```javascript
const array = [1, 2, 3, 4, 5]
const result = array.every(item => item < 10)
console.log(result) // true

const result2 = array.every(item => item > 3)
console.log(result2) // false
```

### 5. Array.prototype.some ()&#x20;

說明：用於檢查陣列內有沒有元素符合條件

```javascript
array.some(判別函式)
```

* 如果有一個元素符合條件就回傳 true，反之，回傳 false

#### 範例一

```javascript
const array = [3, 6, 9, 12, 15, 18]
const result = array.some(item => item % 5 == 0)
console.log(result) // true

const result2 = array.some(item => item % 7 == 0)
console.log(result2) // false
```

### 6. Array.prototype.includes ()

說明：確認陣列內有沒有包含某個元素

```javascript
array.includes(要尋找的元素, 開始尋找的索引值)
```

* 如果包含回傳 true，反之，回傳 false

#### 範例一

```javascript
const array = ["JavaScript", "Python", "Kotlen", "C#", "C++"]
const result = array.includes("Python")
console.log(result) // true

const result2 = array.includes("Python", 2)
console.log(result2) // false

const result3 = array.includes("C")
console.log(result3) // false
```

### 7. Array.prototype.find () / Array.prototype.findIndex ()&#x20;

說明：皆用於在陣列中查找某個元素

```javascript
array.find(條件函式)
```

* 回傳第一個符合條件的元素，否則回傳 -1

```javascript
array.findIndex(條件函式)
```

* 回傳第一個找到符合該元素的索引值，否則回傳 -1

#### 範例一

```javascript
const array = [11, 23, 32, 47, 500]
const result = array.find(item => item > 30)
console.log(result) // 32

const result2 = array.findIndex(item => item > 80)
console.log(result2) // 4
```