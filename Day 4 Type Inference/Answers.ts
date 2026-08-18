
# Part 3 — Interview Questions + Answers

### 1. What is type inference?

**Answer:** Type inference is TypeScript's ability to automatically determine a variable's type from its value.

```ts
const age = 25;
```

TypeScript infers:

```text
age → number
```

---

### 2. Type inference vs type annotation?

**Answer:**

**Inference:** TypeScript determines the type automatically.

```ts
const name = "Krishna";
```

**Annotation:** We explicitly specify the type.

```ts
const name: string = "Krishna";
```

---

### 3. Can TypeScript infer array types?

**Answer:** Yes.

```ts
const numbers = [10, 20, 30];
```

TypeScript infers:

```text
number[]
```

Similarly:

```ts
const skills = ["React", "TypeScript"];
```

is inferred as:

```text
string[]
```

---

### 4. When should you use explicit typing?

**Answer:** Use explicit typing when TypeScript cannot determine the intended type or when you need to enforce a specific rule.

```ts
let phone: string | number = 9876543210;

let address: string | null = null;

let coordinates: [number, number] = [17.3, 78.4];
```

---

### 5. Can TypeScript infer function return types?

**Answer:** Yes.

```ts
function add(a: number, b: number) {
  return a + b;
}
```

TypeScript infers the return type as:

```text
number
```

---

### 6. What is the difference between `number[]` and `[number, number]`?

**Answer:**

```ts
number[]
```

is an array containing any number of `number` elements.

```ts
[number, number]
```

is a tuple containing exactly two numbers.

---

### 7. Why use `string | null`?

**Answer:** It allows a variable to contain either a string or `null`.

```ts
let address: string | null = null;

address = "Hyderabad"; // ✅
```

This is common when data may initially be unavailable.

---

### 8. What happens when you declare `let value;`?

**Answer:** Without an initial value, TypeScript doesn't have a value from which to infer a useful specific type. In common TypeScript configurations, this can result in `any`-like behavior for the variable.

If the intended type is known, explicitly declare it:

```ts
let username: string;

username = "Krishna";
```

---

### 9. Why shouldn't we annotate everything?

**Answer:** TypeScript already provides inference for obvious types. Unnecessary annotations make code more verbose without providing additional useful information.

Prefer:

```ts
const age = 25;
```

over:

```ts
const age: number = 25;
```

when no special typing requirement exists.

---

### 10. What is the most important rule about type inference?

**Answer:**

> **Let TypeScript infer types when it has enough information. Use explicit types when you need to communicate or enforce a specific type requirement.**

This is one of the most important TypeScript habits to develop for real-world projects.

