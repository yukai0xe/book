---
outline: deep
---

# 進階 Object

## JavaScript 是 OOP 嗎？

之前提到，我們可以根據資料型態分為基本型別和物件型別，那麼 JavaScript 算是一種物件導向的語言嗎？

其實 JavaScript 可以算是一種「物件導向」的語言，只是與其他語言（如：C++、Java）相比，他的繼承規則較為特別：

- 以「prototype（原型）」作為繼承方式
- 換句話說，JavaScript 沒有 class 、extends 的繼承方式
- 因此是屬於 prototype-base 的物件導向，而非 class-base 的物件導向

### Class 的替代品

雖然 JavaScript 沒有 class 可以用來當作建構式，但我們可以用 function 來替代

```javascript
function Person( name, age, gender ){
  this.name = name;
  this.age = age;
  this.gender = gender;

  this.greeting = function(){
    console.log('Hello! My name is ' + this.name + '.');
  };
}

var kuro = new Person( 'Kuro', 32, 'male');
kuro.greeting();      // "Hello! My name is Kuro."

var John = new Person( 'John', 10, 'male');
John.greeting();      // "Hello! My name is John."
```

接著我們就可以透過**建構表達式**將這些物件建立出來，並且可以透過 `.` 的方式來訪問物件內的屬性

不過這樣有一個缺點：所有的屬性都可以**公開存取**，因此在 ES5 就對此提供了一個補強方式

### 屬性描述器 (Property descriptor)

在物件當中對屬性施加控制的，我們稱之為屬性描述器，常見如下：

- `value`: 屬性的值
- `writable`: 定義屬性是否可以改變，如果是 `false` 那就是唯讀屬性。
- `enumerable`: 定義物件內的屬性是否可以透過 `for-in` 語法來迭代。
- `configurable`: 定義屬性是否可以被刪除、或修改屬性內的 `writable`、`enumerable` 及 `configurable` 設定。
- `get`: 物件屬性的 getter function。
- `set`: 物件屬性的 setter function。

而這些「屬性描述器」必須要透過 `Object.defineProperty()` 來處理

以上面的例子來看，我們可以這麼做：

```javascript
Object.defineProperty(kuro, 'name', {
    value: 'Kuro',
    writable: false,
    enumerable: false,
    configurable: false
});
```

我將 kuro 這個物件的 name 屬性設定為 Kuro，並加上後面三條規則。所以就產生以下說明：

::: tabs
== writable
不能覆寫屬性值

```javascript
kuro.name = "Kevin"
```

TypeError: Cannot assign to read only property 'name' of object '#\<Person>'

== enumerable
不會被迭代方式訪問此屬性

```javascript
for(n in kuro.name){
    console.log(n)
}
```

**輸出結果**：\
age\
gender\
greeting

== configurable
不被刪除、或修改屬性內的 `writable`、`enumerable` 及 `configurable` 設定

```javascript
delete kuro.name
```

TypeError: Cannot delete property 'name' of '#\<Person>'

:::

至於 get 和 set 的用法如下：

```javascript
Object.defineProperty(person, 'name', {
  get: function(){
    console.log('get');
    return this._name_;
  },
  set: function(name){
    console.log('set');
    this._name_ = name;
  }
});
```

在這裡我們使用了 `_name_` 作為對 name 屬性的封裝

::: warning
如果定義了 `get` 與 `set` 方法，表示你要自行控制屬性的存取，那麼就不能再去定義 `value` 或 `writable` 的屬性描述
:::

## 基本型別包裹器

在物件型別中，我們可以在細分出幾種「建構器」：

- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `RegExp()`
- `Date()`
- `Error()`
- `Symbol()`

這些建構器都可以透過 `new` 關鍵字來產生一個對應物件

但是你可以發現其中幾種是以已經在基本型別就有出現過的，如：string、number、boolean

很特別的是，透過這樣定義的結果，卻不是基本型別而是物件型別

```javascript
var str = 'Hello';
typeof str;        // "string"

var strObj = new String('Hello');
typeof strObj;     // "object"
```

這樣將基本型別轉換成物件型別的方式，就與這此要談的基本型別包裹器有關

### 基本型別包裹器的特徵：可以訪問屬性和方法

當基本型別變成基本型別包裹器時，就可以使用內建方法，也是說，這些內建方法其實是自動變成物件型別後才能訪問的。當然這些基本型別也只在你訪問其屬性和方法時才會轉換，訪問結束後就會自動變回來，如下：

```javascript
var str = 'Hello';
typeof str;        // "string"

var strObj = new String('Hello');
typeof strObj;     // "object"

// 因為轉換成基本型別包裹器，我們可以順利的附加一個屬性
strObj.color = 'red';
str.color = 'red';

// 但當我們要打印時，卻因為沒有轉換成基本型別包裹器而有 undefined 的狀況
console.log( strObj.color );      // 'red'
console.log( str.color );         // undefined
```

### 補充 instanceof、valueof

關於這種特別的物件，我們可以使用 instanceof 來確認其基本型別是什麼

另外我們可以藉由 valueof 來取得其值

```javascript
var nameStr = new String("Kuro");
typeof nameStr;                          // "object"
nameStr instanceof String;               // true
nameStr.valueOf();                       // "Kuro"

var num = new Number(100);
typeof num;                             // "object"
num instanceof Number;                  // true
num.valueOf();                          // 100s
```

::: tip
不過這也不代表使用 `new` 來定義這些資料會比較好，因為在計算效率上，基本型別會更勝於物件型別
:::

## Prototype（原型）

接著要來探討什麼是 Prototype。我們先回來看一下被當作 `class` 來使用的 `function` 其中的屬性。

```javascript
function Person(name, age, gender){
    this.name = name,
    this.age = age,
    this.gender = gender
}
const kevin = new Person("Kevin", 20, "male")
console.dir(Person)
console.log(kevin)
```

### 函式建構子與原型

<div align="center" data-full-width="true"><figure><img src="https://438588319-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FUjvVqAFwl8Le12TKceXa%2Fuploads%2FGjvimmK7rqBkRhp65duG%2Fimage.png?alt=media&#x26;token=473a7923-1075-45f9-a98b-dc1c753fb050" alt=""><figcaption><p>console.dir(Person) 的結果</p></figcaption></figure></div>

我們可以看到在 Person 的函式建構子中有一個 `prototype` 屬性，而 `prototype` 內又有 `constructor` 和 另一個 `Prototype` 物件

* `constroctor` 屬性：就是指回自己這個函式建構子的本身
* 而這個 `Prototype` 物件就是函式所繼承的對象，也因此函式才會也是屬於物件

**因此我們可以用函式建構子來建構出一個原型**

### 實體化的物件

<figure><img src="https://438588319-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FUjvVqAFwl8Le12TKceXa%2Fuploads%2F53U9pYfATP5SknF9p7cR%2Fimage.png?alt=media&#x26;token=a449b5c5-6b1c-4f9b-9579-29bd25de3a12" alt=""><figcaption><p>console.dir(kevin) 的結果</p></figcaption></figure>

我們可以發現在 kevin 這個物件中除了自身的屬性外，與函式建構子不同的是他沒有 prototype 屬性，而是出現了 \[\[Prototype]] 原型物件，其實這個原型物件就是繼承函式建構子的 prototype，我們可用 `__proto__` 來表示

在這裡 kevin 的 Prototype 是屬於 Person 的 prototype，我們可以藉此證明：

```javascript
Person.prototype === kevin.__proto__ //true
```

而這樣透過原型繼承的概念，我們稱之為原型鏈

<figure><img src="https://438588319-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FUjvVqAFwl8Le12TKceXa%2Fuploads%2F2eSwhi0ZF7afU5Rm8jC7%2Fimage.png?alt=media&#x26;token=86d5f33c-287c-45b7-b81f-9f885d6db433" alt="" width="563"><figcaption><p>原型鏈</p></figcaption></figure>

### 原型鏈的特點

* 可以在原型鏈的上層新增一個方法，使得繼承此原型的物件能夠呼叫此方法
* 當物件內沒有定義每個屬性或方法時，會往原型鏈的上一層尋找

#### 範例

```javascript
const kevin = new Person("Kevin", 20, "male")
const kuro = new Person("Kuro", 17, "male")

Person.prototype.sayHello = function(){
    console.log("Hello", this.name)
}

kuro.sayHello() // Hello Kuro
```

我們在 Person 的 prototype 中加上 sayHello 的方法，由於在 Person 建構子中沒有這個方法，所以會往上尋找才能成功呼叫

若我們在 Person 建構子中有新建一個方法，如下：

```javascript
function Person(name, age, gender){
    this.name = name,
    this.age = age,
    this.gender = gender,
    this.sayHello = function(){
        console.log(`This is Person ${this.name} speaking`)
    }
}
```

結果就會變成：This is Person Kuro speaking

### 補充

* 如果希望能查詢原型鏈上有每有某個屬性或方法，可以使用 `in`
* 如果要檢查該屬性或方法是否為物件本身所持有，可以用 `hasOwnProperty()`

```javascript
console.log("sayHello" in kuro)
console.log(kuro.hasOwnProperty("name"))
```

* 如果要將兩個物件做繼承關係，可以使用 `Object.setPrototypeOf()`來表示其原型關係

### 總結

* 我們能透過 function constructor 的方式定義一個原型
* 當原型被物件繼承時，會形成原型鏈
* 原型鏈上，方法或屬性被呼叫時，優先尋找物件本身，接著才會往上個繼承對象尋找
* 能透過在被繼承的原型中加入方法，作為共用方法給所有物件使用

## class 語法糖

在 ES6 版本中，JavaScript 加入了 class 這個語法糖，用來代替以 function 和 prototype 所編成的 prototype-based OOP。

### class 用法

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}
```

在這裡我們用 `class` 用來代替宣告 `function`，而 `constructor` 的內容就對應 `function` 裡面的屬性，其他的就是指定給 `User.prototype`

基本上主要的用法就和 `Java` 的物件導向很像，所以可以照著 `Java` 的寫法來寫不太會有問題

詳細用法如下：[class 語法糖](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes)