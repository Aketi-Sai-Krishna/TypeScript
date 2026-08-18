# Day 4 — Type Inference

## Part 1 — Notes

### 1. Type Inference

**Type inference** means TypeScript automatically determines the type based on the assigned value.

```ts
const username = "Krishna";
const age = 25;
const isDeveloper = true;
```

TypeScript infers:

```text
username → string
age → number
isDeveloper → boolean
```

You don't need to write:

```ts
const username: string = "Krishna";
```

when TypeScript can already determine it.

---

### 2. Explicit Typing

**Explicit typing** means we manually specify the type.

```ts
let phone: string | number = 9876543210;
let address: string | null = null;
let coordinates: [number, number] = [17.385, 78.486];
```

Use explicit types when you need to define a specific rule or TypeScript cannot determine the intended type.

---

### 3. TypeScript Can Infer Arrays

TypeScript can also infer array types.

```ts
const skills = ["JavaScript", "React", "TypeScript"];
```

Inferred as:

```ts
string[]
```

Therefore:

```ts
skills.push("Node.js"); // ✅
skills.push(100);       // ❌
```

Similarly:

```ts
const numbers = [10, 20, 30];
```

is inferred as:

```ts
number[]
```

---

### 4. TypeScript Can Infer Objects

```ts
const user = {
  name: "Krishna",
  age: 25,
  isDeveloper: true
};
```

TypeScript infers:

```text
name → string
age → number
isDeveloper → boolean
```

No explicit type is required when the structure is obvious.

---

### 5. Explicit Typing + Inference Together

Function parameters generally need explicit types:

```ts
const calculateSalary = (basicSalary: number, bonus: number) => {
  return basicSalary + bonus;
};
```

But TypeScript can infer the return type:

```text
return → number
```

So there is no need to write:

```ts
const calculateSalary = (
  basicSalary: number,
  bonus: number
): number => {
  return basicSalary + bonus;
};
```

unless explicitly defining a return contract is useful.

---

### 6. Union Types

A union allows a variable to have multiple possible types.

```ts
let phone: string | number = 9876543210;

phone = "9876543210"; // ✅
phone = 9876543210;   // ✅
phone = true;         // ❌
```

Another common example:

```ts
let address: string | null = null;

address = "Hyderabad"; // ✅
```

---

### 7. Tuples

A tuple defines the **number, order, and types** of elements.

```ts
let coordinates: [number, number] = [17.385, 78.486];
```

Valid:

```ts
[17.385, 78.486]
```

Invalid:

```ts
["17.385", 78.486]       // ❌ wrong type
[17.385, 78.486, 100]    // ❌ extra element
```

Difference:

```ts
number[]
```

means:

> Any number of numbers.

```ts
[number, number]
```

means:

> Exactly two numbers in this order.

---

### 8. `null` and Explicit Types

If a variable starts with `null` but should later contain another type:

```ts
let userStatus: string | null = null;

userStatus = "active";
userStatus = "inactive";
```

This explicitly tells TypeScript the future possible types.

---

### 9. `let` vs `const`

`const` prevents reassignment of the variable:

```ts
const name = "Krishna";

// name = "Sai"; // ❌
```

But an object's properties can still be changed:

```ts
const user = {
  name: "Krishna"
};

user.name = "Sai"; // ✅
```

`const` prevents reassignment of the reference; it does not automatically make the object immutable.

---

## ⭐ Golden Rule

> **Let TypeScript infer the type whenever the type is obvious.**

### Prefer:

```ts
const username = "Krishna";
const age = 25;
const skills = ["React", "TypeScript"];
```

### Instead of unnecessarily writing:

```ts
const username: string = "Krishna";
const age: number = 25;
const skills: string[] = ["React", "TypeScript"];
```

But use explicit typing when you need to define a special rule:

```ts
let phone: string | number = 9876543210;

let address: string | null = null;

let coordinates: [number, number] = [17.385, 78.486];
```

---
