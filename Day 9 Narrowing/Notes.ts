# Day 12 — Type Narrowing in TypeScript

## Part 1 — Topic Notes

## 1. What is Type Narrowing?

Type narrowing means reducing a variable from multiple possible types to one specific type after performing a check.

```ts
function printValue(value: string | number): void {
  // value: string | number

  if (typeof value === "string") {
    // value: string
    console.log(value.toUpperCase());
  } else {
    // value: number
    console.log(value.toFixed(2));
  }
}
```

Before checking:

```ts
value: string | number
```

After checking:

```ts
typeof value === "string"
```

TypeScript understands that `value` is a `string` inside that block.

---

## 2. Why Do We Need Type Narrowing?

Consider this function:

```ts
function printValue(value: string | number): void {
  console.log(value.toUpperCase());
}
```

TypeScript produces an error because `toUpperCase()` exists on `string`, but not on `number`.

We must first narrow the type:

```ts
function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

Type narrowing allows us to safely access type-specific properties and methods.

---

# 3. `typeof` Narrowing

Use `typeof` mainly for primitive values.

```ts
typeof "Krishna";  // "string"
typeof 25;         // "number"
typeof true;       // "boolean"
typeof undefined;  // "undefined"
typeof 10n;        // "bigint"
typeof Symbol();   // "symbol"
typeof function() {}; // "function"
```

Example:

```ts
function processValue(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value ** 2;
}
```

```ts
console.log(processValue("typescript")); // TYPESCRIPT
console.log(processValue(5));            // 25
```

### Important syntax

Correct:

```ts
typeof value === "string"
```

Incorrect:

```ts
typeof value === string
```

The result returned by `typeof` is a string, so `"string"` must be written inside quotes.

### `typeof null` problem

JavaScript considers `null` to be an object:

```ts
console.log(typeof null); // "object"
```

Therefore, check `null` explicitly:

```ts
function processData(data: object | null): void {
  if (data === null) {
    console.log("No data");
  } else {
    console.log(data);
  }
}
```

---

# 4. `instanceof` Narrowing

Use `instanceof` to check whether an object was created from a particular class or constructor.

```ts
function formatValue(value: Date | string): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value.toUpperCase();
}
```

```ts
console.log(formatValue(new Date()));
console.log(formatValue("typescript")); // TYPESCRIPT
```

Inside this condition:

```ts
value instanceof Date
```

TypeScript understands that `value` is a `Date`.

Inside the remaining branch, TypeScript understands that `value` is a `string`.

### Class example

```ts
class Developer {
  constructor(public language: string) {}

  writeCode(): void {
    console.log(`Writing ${this.language} code`);
  }
}

class Designer {
  constructor(public tool: string) {}

  createDesign(): void {
    console.log(`Creating a design using ${this.tool}`);
  }
}

function startWork(worker: Developer | Designer): void {
  if (worker instanceof Developer) {
    worker.writeCode();
  } else {
    worker.createDesign();
  }
}
```

### `typeof` vs `instanceof`

| Feature             | `typeof`                    | `instanceof`                           |
| ------------------- | --------------------------- | -------------------------------------- |
| Checks              | Value’s basic runtime type  | Object’s constructor/class             |
| Used for            | Primitive types             | Classes and constructed objects        |
| Example             | `typeof value === "string"` | `value instanceof Date`                |
| Returns             | Boolean                     | Boolean                                |
| Custom type aliases | Cannot identify them        | Only works if there is a runtime class |

```ts
typeof "Krishna" === "string";
new Date() instanceof Date;
```

---

# 5. `in` Operator Narrowing

The `in` operator checks whether a property exists inside an object.

```ts
type Employee = {
  name: string;
  department: string;
};

type Freelancer = {
  name: string;
  hourlyRate: number;
};
```

```ts
function workDetails(worker: Employee | Freelancer): void {
  if ("department" in worker) {
    console.log("Employee Department:", worker.department);
  } else {
    console.log("Hourly Rate:", worker.hourlyRate);
  }
}
```

Example calls:

```ts
workDetails({
  name: "Krishna",
  department: "Frontend Development",
});

workDetails({
  name: "Sai",
  hourlyRate: 1000,
});
```

When TypeScript sees:

```ts
"department" in worker
```

it understands that `worker` is an `Employee`.

Otherwise, it understands that `worker` is a `Freelancer`.

### Using `else if`

```ts
function workDetails(worker: Employee | Freelancer): void {
  if ("department" in worker) {
    console.log("Employee Department:", worker.department);
  } else if ("hourlyRate" in worker) {
    console.log("Hourly Rate:", worker.hourlyRate);
  }
}
```

Because only two types are possible, a normal `else` is sufficient.

---

# 6. Equality Narrowing

Equality narrowing happens when TypeScript narrows a type after an equality check.

```ts
function compareValues(
  first: string | number,
  second: string | boolean
): void {
  if (first === second) {
    console.log(first.toUpperCase());
    console.log(second.toUpperCase());
  }
}
```

The only common type between these unions is `string`:

```ts
first: string | number
second: string | boolean
```

When both values are equal, TypeScript understands that both must be strings.

### Literal equality narrowing

```ts
type Status = "loading" | "success" | "error";

function displayStatus(status: Status): string {
  if (status === "loading") {
    return "Loading data...";
  } else if (status === "success") {
    return "Data loaded successfully";
  } else {
    return "Something went wrong";
  }
}
```

Prefer strict equality:

```ts
value === "success"
```

Avoid loose equality:

```ts
value == "success"
```

---

# 7. Truthiness Narrowing

Truthiness narrowing checks whether a value is truthy or falsy.

Falsy values include:

```ts
false
0
""
null
undefined
NaN
```

All other values are generally truthy.

Example:

```ts
function welcomeUser(
  name: string | null | undefined
): string {
  if (name) {
    return `Welcome, ${name}`;
  }

  return "Welcome, Guest User";
}
```

Inside `if (name)`, TypeScript removes `null` and `undefined`.

### Important truthiness problem

```ts
function displayScore(score: number | null): string {
  if (score) {
    return `Score: ${score}`;
  }

  return "No score";
}
```

This has a logical problem:

```ts
displayScore(0); // "No score"
```

Zero is a valid number, but it is falsy.

Use an explicit check:

```ts
function displayScore(score: number | null): string {
  if (score !== null) {
    return `Score: ${score}`;
  }

  return "No score";
}
```

Use truthiness only when values such as `0` and `""` should also be treated as missing.

---

# 8. `return` vs `console.log()`

## Using `return`

```ts
function getName(): string {
  return "Krishna";
}

const name = getName();

console.log(name); // Krishna
```

`return` sends the result back to the function caller.

## Using `console.log()`

```ts
function printName(): void {
  console.log("Krishna");
}
```

`console.log()` only displays the value.

It does not return the displayed value.

```ts
const result = printName();

console.log(result); // undefined
```

### Correct return types

If the function returns a string:

```ts
function getMessage(): string {
  return "Welcome";
}
```

If the function only prints something:

```ts
function printMessage(): void {
  console.log("Welcome");
}
```

In real projects, prefer returning calculated or formatted data so that it can be reused elsewhere.

---

# 9. Practical Example — Combining Type Narrowing

```ts
type Product = {
  id: number;
  name: string;
  price: number;
};

type Input = string | number | Product | Date | null;

function handleInput(input: Input): string {
  if (input === null) {
    return "No input provided";
  } else if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input.toFixed(2);
  } else if (input instanceof Date) {
    return input.toLocaleDateString();
  } else {
    return `Product: ${input.name}, Price: ₹${input.price}`;
  }
}
```

Testing:

```ts
console.log(handleInput(null));
// No input provided

console.log(handleInput("typescript"));
// TYPESCRIPT

console.log(handleInput(500));
// 500.00

console.log(handleInput(new Date()));
// Formatted date

console.log(
  handleInput({
    id: 1,
    name: "Laptop",
    price: 50000,
  })
);
// Product: Laptop, Price: ₹50000
```

### Narrowing order

```ts
input === null
```

Removes `null`.

```ts
typeof input === "string"
```

Narrows to `string`.

```ts
typeof input === "number"
```

Narrows to `number`.

```ts
input instanceof Date
```

Narrows to `Date`.

The only type remaining in the final `else` is `Product`.

---

# 10. Why `typeof input === "Product"` Does Not Work

This is incorrect:

```ts
typeof input === "Product"
```

A TypeScript type alias does not exist when JavaScript runs.

```ts
type Product = {
  id: number;
  name: string;
};
```

For a product object:

```ts
const product: Product = {
  id: 1,
  name: "Laptop",
};

console.log(typeof product); // "object"
```

Use the `in` operator to identify the object:

```ts
function showProduct(input: Product | string): void {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else if ("price" in input) {
    console.log(input.price);
  }
}
```

---

# 11. Common Mistakes

## Mistake 1: Missing quotes with `typeof`

Incorrect:

```ts
typeof value === string
```

Correct:

```ts
typeof value === "string"
```

## Mistake 2: Incorrect method capitalization

Incorrect:

```ts
value.touppercase();
```

Correct:

```ts
value.toUpperCase();
```

JavaScript and TypeScript are case-sensitive.

## Mistake 3: Invalid `else` condition

Incorrect:

```ts
else ("hourlyRate" in worker) {
}
```

Correct:

```ts
else if ("hourlyRate" in worker) {
}
```

Or:

```ts
else {
}
```

## Mistake 4: Accessing a property without the object

Incorrect:

```ts
console.log(department);
```

Correct:

```ts
console.log(worker.department);
```

## Mistake 5: Using a colon inside `console.log()`

Incorrect:

```ts
console.log("Department": worker.department);
```

Correct:

```ts
console.log("Department:", worker.department);
```

## Mistake 6: Declaring `string` but returning nothing

Incorrect:

```ts
function processValue(value: string): string {
  console.log(value);
}
```

Correct with `return`:

```ts
function processValue(value: string): string {
  return value;
}
```

Correct with `console.log()`:

```ts
function processValue(value: string): void {
  console.log(value);
}
```

## Mistake 7: Reversed null check

Incorrect:

```ts
if (input !== null) {
  return "No input provided";
}
```

Correct:

```ts
if (input === null) {
  return "No input provided";
}
```

---

# Quick Revision

| Narrowing technique | Used for                    | Example                     |
| ------------------- | --------------------------- | --------------------------- |
| `typeof`            | Primitive types             | `typeof value === "string"` |
| `instanceof`        | Classes and constructors    | `value instanceof Date`     |
| `in`                | Object properties           | `"price" in product`        |
| Equality            | Matching exact values/types | `status === "success"`      |
| Truthiness          | Removing falsy values       | `if (username)`             |

## Final Definition

> Type narrowing is the process of checking a union value at runtime so TypeScript can reduce it to a specific type and allow safe access to its properties and methods.
