# TypeScript — Day 2: Basic Types

## Part 1 — Topic Notes

### 1. TypeScript Basic Types

The most commonly used primitive types are:

```ts
string
number
boolean
null
undefined
bigint
symbol
```

### `string`

Used for text.

```ts
const name: string = "Krishna";
```

### `number`

Used for integers and decimal numbers.

```ts
const age: number = 25;
const price: number = 99.99;
```

TypeScript uses `number` for both integers and decimals.

### `boolean`

Used for `true` or `false`.

```ts
const isDeveloper: boolean = true;
```

### `null`

Represents an **intentional absence of a value**.

```ts
let address: string | null = null;
```

The variable can later contain a string:

```ts
address = "Hyderabad";
```

### `undefined`

Generally means a value hasn't been assigned or is missing.

```ts
let phone: string | undefined;
```

### `bigint`

Used for integers larger than JavaScript's safe `number` range.

```ts
const bigNumber: bigint = 12345678901234567890n;
```

The `n` indicates a `bigint`.

### `symbol`

Creates a unique value.

```ts
const id: symbol = Symbol("id");
```

`bigint` and `symbol` are much less common in typical React applications.

---

# 2. Type Annotation

**Type annotation** means explicitly specifying the type.

```ts
const name: string = "Krishna";
const age: number = 25;
const isDeveloper: boolean = true;
```

Syntax:

```ts
const variableName: type = value;
```

Example:

```ts
const age: number = 25;
```

Here:

```text
age    → variable
number → type annotation
25     → value
```

---

# 3. Type Inference

**Type inference** means TypeScript automatically determines the type from the assigned value.

```ts
const name = "Krishna";
const age = 25;
const isDeveloper = true;
```

TypeScript automatically infers:

```text
name        → string
age         → number
isDeveloper → boolean
```

Therefore, explicit annotation isn't always necessary.

### Example

```ts
const age = 25;

age = "26"; // ❌ Error
```

TypeScript inferred:

```text
age → number
```

But `"26"` is:

```text
"26" → string
```

Therefore:

```text
❌ string cannot be assigned to number
```

---

# 4. Annotation vs Inference

### Type Annotation

```ts
const age: number = 25;
```

**You tell TypeScript the type.**

### Type Inference

```ts
const age = 25;
```

**TypeScript determines the type.**

### Easy way to remember

```text
Annotation → Developer tells TypeScript
Inference  → TypeScript tells itself
```

---

# 5. `null` vs `undefined`

### `null`

Represents an **intentional absence of a value**.

```ts
let address: string | null = null;
```

Meaning:

```text
address can be:
    string
    OR
    null
```

Example:

```ts
let address: string | null = null;

address = "Hyderabad"; // ✅
address = null;        // ✅
address = 25;          // ❌
```

### `undefined`

Generally means the value hasn't been assigned or is missing.

```ts
let phone: string | undefined;
```

Initially:

```text
phone → undefined
```

Later:

```ts
phone = "9876543210";
```

---

# 6. Union Type

The `|` operator allows a variable to have multiple possible types.

```ts
let phone: string | null = null;
```

This means:

```text
phone → string OR null
```

Another example:

```ts
let id: number | string;

id = 101;       // ✅
id = "101";     // ✅
id = true;      // ❌
```

Union types are extremely common in real TypeScript and React applications.

---

# 7. Object Type Inference

TypeScript can automatically infer the types of object properties.

```ts
const user = {
    name: "Krishna",
    age: 25,
    isDeveloper: true,
    email: "krishna@example.com",
    phone: null,
    lastLogin: undefined
};
```

TypeScript infers:

```text
name        → string
age         → number
isDeveloper → boolean
email       → string
phone       → null
lastLogin   → undefined
```

You don't need an interface just to get this basic type checking.

For example:

```ts
const user = {
    age: 25
};

user.age = 26;    // ✅
user.age = "26";  // ❌
```

---

# 8. Practical Example

```ts
const user = {
    name: "Krishna",
    age: 25,
    isDeveloper: true,
    email: "krishna@example.com",
    phone: null,
    lastLogin: undefined
};

console.log(user.name);
console.log(user.age);
console.log(user.isDeveloper);
console.log(user.email);
console.log(user.phone);
console.log(user.lastLogin);
```

Output:

```text
Krishna
25
true
krishna@example.com
null
undefined
```

---
