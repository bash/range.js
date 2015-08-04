# range-js

This library provides a ES6 - ready lazy ranges.   
Until ES6 is implemented, it is transpiled down to ES5.

## Installation

```bash
npm install range-js
```

## Usage

### Node.js
```js
var Range = require('range-js').Range;
```

### Vanilla Browser JS
Browser builds are found in **dist/browser/index.js**.    
The Range constructor is exposed as **window.IterateableRange**.

### Babelify (Browserify + Babel)
If you are using Babelify you can import the module in ES6 - Style.

```js
import { Range } from 'range-js';
```

### Basic Usage
```js
var range = new Range(1, 10); // => Range { start: 1, end: 10, step: 1 }

console.log(range.count()) // => 10
console.log(range.toArray()); // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Range objects expose @@iterator so you can use for ... of to iterate.

```js
var alphabet = new Range('a', 'z');

for (let letter of alphabet) {
    console.log(letter);
}
```

... but generally you'll be using the **forEach** method.

```js
var alphabet = new Range('a', 'z');

alphabet.forEach(function(letter, i){
    console.assert(letter === i); // Consistent to Array.prototype.forEach
    console.log(letter);
});