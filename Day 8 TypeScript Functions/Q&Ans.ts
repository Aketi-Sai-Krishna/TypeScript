
# Part 3 — Interview Questions & Answers

## Beginner

### Q1. What are parameter types?

Parameter types specify what type of arguments a function accepts.

```ts
function greet(name: string) {}
```

`name` must be a string.

---

### Q2. What is a return type?

A return type defines what type of value a function returns.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

---

### Q3. What is an optional parameter?

An optional parameter doesn't need to be provided.

```ts
function greet(
  name: string,
  age?: number
) {}
```

---

### Q4. What is a default parameter?

A default parameter provides a fallback value.

```ts
function calculateTax(
  price: number,
  tax: number = 18
) {}
```

---

### Q5. What is a function type?

A function type describes the parameters and return type of a function.

```ts
type MathOperation =
  (a: number, b: number) => number;
```

---

### Q6. Object type vs function type?

An object type describes data.

```ts
type Product = {
  name: string;
};
```

A function type describes function input and output.

```ts
type ProductFilter =
  (products: Product[]) => Product[];
```

---

## Intermediate

### Q7. What is a callback?

A callback is a function passed into another function.

```ts
function calculate(
  a: number,
  b: number,
  callback: (a: number, b: number) => number
) {
  return callback(a, b);
}
```

---

### Q8. Difference between `map`, `filter`, and `reduce`?

```text
map
→ transforms items

filter
→ selects items

reduce
→ combines items into one result
```

---

### Q9. What does this mean?

```ts
type ProductFilter =
  (products: Product[]) => Product[];
```

It means a function must:

```text
receive Product[]
return Product[]
```

---

### Q10. What does `: Product[]` mean?

```ts
const getProducts = (): Product[] => {}
```

It means the function returns an array of products.

---

### Q11. What does `: ProductFilter` mean?

```ts
const createFilter =
  (): ProductFilter => {}
```

It means the function returns another function matching `ProductFilter`.

---

### Q12. Why was this incorrect?

```ts
const getProductsByCategory = (
  products,
  category
): ProductFilter => {
  return products.filter(...);
};
```

Because `products.filter()` returns:

```ts
Product[]
```

while `ProductFilter` represents a function.

---

## Hard / Practical

### Q13. What is a higher-order function?

A higher-order function is a function that receives another function or returns another function.

```ts
const getProductsByCategory = (
  category: string
): ProductFilter => {
  return (products) =>
    products.filter(
      (product) =>
        product.category === category
    );
};
```

---

### Q14. Why use reusable function types?

They create consistency between functions with the same structure.

```ts
type ProductFilter =
  (products: Product[]) => Product[];
```

Multiple filters can follow the same contract.

---

### Q15. How do you calculate cart total?

```ts
const total = cart.reduce(
  (acc, cur) =>
    acc + cur.price * cur.quantity,
  0
);
```

---

### Q16. How do you perform case-insensitive search?

```ts
products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
```

---

### Q17. How do you type a React input handler?

```tsx
const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>
): void => {
  console.log(event.target.value);
};
```

---

# Day 10 Cheat Sheet

```ts
// Parameters + return
const add = (
  a: number,
  b: number
): number => a + b;
```

```ts
// Optional
const greet = (
  name: string,
  age?: number
): string => name;
```

```ts
// Default
const price = (
  amount: number,
  tax: number = 18
): number =>
  amount + amount * (tax / 100);
```

```ts
// Function type
type Operation =
  (a: number, b: number) => number;
```

```ts
// Product filter type
type ProductFilter =
  (products: Product[]) => Product[];
```

```ts
// Filter
products.filter(
  (product) => product.inStock
);
```

```ts
// Map
products.map(
  (product) => product.name
);
```

```ts
// Reduce
products.reduce(
  (total, product) =>
    total + product.price,
  0
);
```

```ts
// Search
products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
```

### One-line memory rule

> **Object type describes data. Function type describes input → output. `Product[]` means return an array; `ProductFilter` means a function matching that contract.**