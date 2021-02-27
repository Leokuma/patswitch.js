# PatswitchJS

PatswitchJS is a tiny implementation of object pattern matching in JavaScript. It is inspired by Prolog's and Rust's pattern matching.

The primary goal of the design is to allow a usage that feels like it is a native JavaScript feature.


## Examples


### Full match

```js
import Patswitch from 'patswitch.js';

const obj = {a: 1, b: '2', c: 'c'};

const pattern = new Patswitch(obj);

switch (pattern) {
  case pattern({a: 1, b: 2, c: 'c'}): // false because 'b' has a different type
  case pattern({a: 2, b: '2'}): // false
  case pattern({a: 1, b: '2', c: 'c', d: 4}): // false
  case pattern({a: 1, b: '2', c: 'c'}): // true
}
```

### Partial match

```js
import Patswitch from 'patswitch.js';

const obj = {a: 1, b: 2, c: 3};

const pattern = new Patswitch(obj);

switch (pattern) {
  case pattern({a: 1}): // true
  case pattern({b: 2}): // true
  case pattern({b: 2, c: 3}): // true
  case pattern({c: 3, a: 1, b: 2}): // true
  case pattern({a: 1, b: 2, c: 3, d: 4}): // false
}
```

### Arrays

```js
import Patswitch from 'patswitch.js';

const arr = [1, 2, 3];

const pattern = new Patswitch(arr);

switch (pattern) {
  case pattern([1]): // true
  case pattern([2]): // false
  case pattern([1, ]): // true
  case pattern([ , 1, ]): // false
  case pattern([ , 2, ]): // true
  case pattern([ , 2]): // true
  case pattern([2, ]): // false
  case pattern([ , , , , , ]): // true
  case pattern([3, 2, 1]): // false
  case pattern([1, 2, 3, 4]): // false
  case pattern([1, 2, 3]): // true
  case pattern([1, 2, 3, , ]): // true
}
```

### Property existence

You can create a pattern to check only whether a property exists, no matter the value it holds.

You do that by assigning `undefined` to the property on the pattern.

```js
import Patswitch from 'patswitch.js';

const obj = {a: 1, b: 2, c: 3};

const pattern = new Patswitch(obj);

switch (pattern) {
  case pattern({a: undefined}): // true. This only enforces that the 'a' prop exists, no matter its value
  case pattern({a: undefined, b: undefined}): // true because the props 'a' and 'b' exist
  case pattern({a: 1, b: undefined, c: 3}): // true
  case pattern({a: 1, b: 2, c: 3, d: undefined}): // false because the prop 'd' does not exist
}
```

### Nested objects

```js
const obj = {a: 'a', b: 'b', c: 'c',
  d: {
    da: 4,
    db: [5, 6]
  },
  e: [
    {ea: 7},
    {ea: 8}
  ]
};

const pattern = new Patswitch(obj);

switch (pattern) {
  case pattern({d: {da: 4, db: 5}}): // false
  case pattern({d: {da: 4, db: [5, 40]}}): // false
  case pattern({d: {da: 4, db: [5, 6]}}): // true
  case pattern({d: {da: 4, db: [ , 6]}}): // true
  case pattern({d: {da: 4, db: []}}): // true
  case pattern({d: {da: 4}}): // true
  case pattern({d: undefined}): // true
  case pattern({e: [{ea: 7}]}): // true
  case pattern({e: [ , {ea: 7}]}): // false
  case pattern({e: [ , {ea: undefined}]}): // true
  case pattern({a: 'a', b: 'b', c: 'c', d: {db: [ , 6]}, e: [{ea: 7}, {ea: 8}]}): // true
}
```