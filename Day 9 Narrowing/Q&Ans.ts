
# Interview Questions and Answers

## Beginner Level

### 1. What is type narrowing in TypeScript?

Type narrowing is the process of reducing a union type into a more specific type by using runtime checks.

```ts
function print(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

### 2. Why is type narrowing required?

It allows us to safely access properties and methods that belong to a specific type within a union.

### 3. What is `typeof` narrowing?

`typeof` narrowing uses JavaScript’s `typeof` operator to identify primitive values such as strings, numbers, and booleans.

```ts
if (typeof value === "number") {
  console.log(value.toFixed(2));
}
```

### 4. What is `instanceof` narrowing?

`instanceof` checks whether an object was created from a particular class or constructor.

```ts
if (value instanceof Date) {
  console.log(value.toLocaleDateString());
}
```

### 5. What is the difference between `typeof` and `instanceof`?

`typeof` checks primitive runtime types, while `instanceof` checks whether an object belongs to a particular class or constructor.

---

## Intermediate Level

### 6. What is `in` operator narrowing?

The `in` operator checks whether a property exists inside an object and narrows the object accordingly.

```ts
if ("department" in worker) {
  console.log(worker.department);
}
```

### 7. What is equality narrowing?

Equality narrowing occurs when TypeScript uses an equality comparison to determine a more specific type.

```ts
if (status === "success") {
  console.log("Request completed");
}
```

### 8. What is truthiness narrowing?

Truthiness narrowing removes falsy values such as `null` and `undefined` when a value passes a truthiness check.

```ts
if (username) {
  console.log(username.toUpperCase());
}
```

### 9. What are the falsy values in JavaScript?

The main falsy values are:

```ts
false
0
""
null
undefined
NaN
```

### 10. Why can truthiness narrowing cause bugs?

Valid values such as `0` and an empty string are falsy and may incorrectly be treated as missing values.

```ts
if (score !== null) {
  console.log(score);
}
```

---

## Hard Level

### 11. Can `typeof` identify a custom TypeScript type?

No. TypeScript types are removed during compilation and do not exist at runtime.

```ts
type Product = {
  name: string;
};

typeof product; // "object", not "Product"
```

### 12. How can we narrow a custom object type?

We can use the `in` operator to check for a unique property.

```ts
if ("price" in input) {
  console.log(input.price);
}
```

### 13. Why should `null` be checked before object narrowing?

Because JavaScript returns `"object"` for `typeof null`.

```ts
typeof null; // "object"
```

Therefore:

```ts
if (input !== null && typeof input === "object") {
  console.log(input);
}
```

### 14. How does TypeScript narrow the final `else` branch?

TypeScript removes every previously checked type. If only one type remains, the final branch is narrowed to that type.

```ts
function process(value: string | number | Date): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    // value is Date
    console.log(value.toLocaleDateString());
  }
}
```

### 15. Does `console.log()` satisfy a `string` return type?

No. `console.log()` returns `void`. A function declared with a `string` return type must return a string from every possible branch.

---

## Question 1

Create a function accepting `string | number`. Return the uppercase string or the square of the number.

### Answer

```ts
function processValue(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value ** 2;
}
```

---

## Question 2

Create a function accepting `string | null | undefined`. Return a welcome message when the name exists; otherwise return a guest message.

### Answer

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

---

## Question 3

Use the `in` operator to distinguish an employee from a freelancer.

### Answer

```ts
type Employee = {
  name: string;
  department: string;
};

type Freelancer = {
  name: string;
  hourlyRate: number;
};

function workDetails(worker: Employee | Freelancer): void {
  if ("department" in worker) {
    console.log("Employee Department:", worker.department);
  } else {
    console.log("Hourly Rate:", worker.hourlyRate);
  }
}
```

---

## Question 4

Create a function accepting `Date | string`. Format a date or convert the string to uppercase.

### Answer

```ts
function formatValue(value: Date | string): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value.toUpperCase();
}
```

---

## Question 5

Create a function that handles `null`, `string`, `number`, `Date`, and `Product`.

### Answer

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
