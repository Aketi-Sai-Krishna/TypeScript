# Day 10 — TypeScript Functions

## Part 1 — Topic Notes

### 1. Parameter Types

Parameter types define what type of values a function can receive.

```ts
function greet(name: string, age: number): string {
  return `Hello ${name}, age ${age}`;
}

greet("Sai", 24); // ✅
greet("Sai", "24"); // ❌
```

Syntax:

```ts
function functionName(parameter: type) {}
```

---

### 2. Return Types

Return type defines what type of value a function must return.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Here:

```ts
a: number
b: number
): number
```

means:

```text
Input  → number, number
Output → number
```

Wrong:

```ts
function add(a: number, b: number): number {
  return "Hello"; // ❌
}
```

---

## 3. Optional Parameters `?`

Use `?` when a parameter is not required.

```ts
const createUserProfile = (
  name: string,
  email: string,
  phone?: string
): string => {
  return `Name: ${name}, Email: ${email}, Phone: ${phone ?? "N/A"}`;
};
```

Both are valid:

```ts
createUserProfile("Sai", "sai@gmail.com");

createUserProfile(
  "Sai",
  "sai@gmail.com",
  "9876543210"
);
```

`phone?: string` practically means:

```ts
string | undefined
```

Optional parameters should normally come after required parameters.

---

## 4. Default Parameters

Default parameters provide a value when the caller doesn't pass one.

```ts
function calculateFinalPrice(
  price: number,
  discount: number,
  tax: number = 18
): number {
  const discountedPrice =
    price - price * (discount / 100);

  return discountedPrice * (1 + tax / 100);
}
```

Usage:

```ts
calculateFinalPrice(1000, 10);
```

Uses:

```text
tax = 18
```

You can override it:

```ts
calculateFinalPrice(1000, 10, 5);
```

---

# 5. Arrow Functions

Arrow functions are very common in React and modern TypeScript.

```ts
const add = (
  a: number,
  b: number
): number => {
  return a + b;
};
```

Short form:

```ts
const add = (a: number, b: number): number =>
  a + b;
```

---

# 6. Function Types 🔥

A function type describes:

* what parameters a function accepts
* what type the function returns

Example:

```ts
type MathOperation = (
  a: number,
  b: number
) => number;
```

Then:

```ts
const add: MathOperation = (a, b) => {
  return a + b;
};

const subtract: MathOperation = (a, b) => {
  return a - b;
};
```

Both functions follow the same structure:

```text
number + number → number
```

---

# Object Type vs Function Type

Very important distinction.

### Object type

Describes data:

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
};
```

It answers:

> What does a Product look like?

---

### Function type

Describes a function:

```ts
type ProductFilter = (
  products: Product[]
) => Product[];
```

It answers:

> What does this function receive and return?

So:

```text
Product
→ describes DATA

ProductFilter
→ describes FUNCTION
```

---

# 7. Using a Function Type

```ts
type ProductFilter = (
  products: Product[]
) => Product[];
```

Then:

```ts
const getAvailableProducts: ProductFilter = (
  products
) => {
  return products.filter(
    (product) => product.inStock
  );
};
```

TypeScript already knows:

```text
products → Product[]
product  → Product
return   → Product[]
```

You don't need to repeat all types again.

---

# 8. Function Type Must Match Function Structure

Suppose:

```ts
type ProductFilter = (
  products: Product[]
) => Product[];
```

This function matches:

```ts
const getAvailableProducts: ProductFilter = (
  products
) => {
  return products.filter(
    (product) => product.inStock
  );
};
```

✅ Because:

```text
Input  → Product[]
Output → Product[]
```

But this does not match:

```ts
const getProductsByCategory: ProductFilter = (
  products,
  category
) => {
  // ...
};
```

❌ Because `ProductFilter` expects only one parameter.

The function actually needs:

```text
Product[]
string
→ Product[]
```

So normally you would create:

```ts
type ProductCategoryFilter = (
  products: Product[],
  category: string
) => Product[];
```

Then:

```ts
const getProductsByCategory:
  ProductCategoryFilter = (
    products,
    category
  ) => {
    return products.filter(
      (product) =>
        product.category.toLowerCase() ===
        category.toLowerCase()
    );
  };
```

---

# 9. What Does `: ProductFilter` Mean?

This is important.

Consider:

```ts
const getSomething = (): ProductFilter => {
  // ...
};
```

This means:

> `getSomething()` must return a function.

Because `ProductFilter` itself is:

```ts
type ProductFilter =
  (products: Product[]) => Product[];
```

So this is wrong:

```ts
const getProductsByCategory = (
  products: Product[],
  category: string
): ProductFilter => {
  return products.filter(
    (product) =>
      product.category === category
  );
};
```

Why?

Because:

```ts
products.filter(...)
```

returns:

```ts
Product[]
```

But you told TypeScript:

```ts
): ProductFilter
```

which means:

```text
return another function
```

---

# 10. Returning a Function — Higher-Order Function

If you really want to reuse:

```ts
type ProductFilter = (
  products: Product[]
) => Product[];
```

for category filtering, you can return a function.

```ts
const getProductsByCategory = (
  category: string
): ProductFilter => {
  return (products) => {
    return products.filter(
      (product) =>
        product.category.toLowerCase() ===
        category.toLowerCase()
    );
  };
};
```

Usage:

```ts
const electronicsFilter =
  getProductsByCategory("Electronics");

const result =
  electronicsFilter(products);
```

Execution:

```text
getProductsByCategory("Electronics")
             ↓
returns a function
             ↓
(products: Product[]) => Product[]
             ↓
electronicsFilter(products)
             ↓
filtered Product[]
```

This is called a **higher-order function**.

---

# 11. Callback Types 🔥

A callback is a function passed into another function.

```ts
type Operation = (
  a: number,
  b: number
) => number;

function calculate(
  a: number,
  b: number,
  callback: Operation
): number {
  return callback(a, b);
}
```

Usage:

```ts
calculate(10, 5, (a, b) => {
  return a + b;
});
```

Here:

```text
(a, b) => a + b
```

is the callback.

Callbacks are used heavily in:

```text
map()
filter()
reduce()
event handlers
API handlers
React props
form submissions
modal actions
```

---

# 12. `map()`

`map()` transforms every item and returns a new array.

```ts
const numbers: number[] = [
  1, 2, 3, 4, 5
];

const doubled = numbers.map(
  (num) => num * 2
);
```

Result:

```ts
[2, 4, 6, 8, 10]
```

Real application example:

API:

```ts
type Product = {
  id: number;
  title: string;
  price: number;
};
```

Convert API products into dropdown options:

```ts
type DropdownOption = {
  value: number;
  label: string;
};

const formatProductsForDropdown = (
  products: Product[]
): DropdownOption[] => {
  return products.map(({ id, title }) => ({
    value: id,
    label: title
  }));
};
```

Typical use:

```text
API data
→ map()
→ UI-friendly data
```

---

# 13. `filter()`

`filter()` returns items matching a condition.

```ts
const getAvailableProducts = (
  products: Product[]
): Product[] => {
  return products.filter(
    (product) => product.inStock
  );
};
```

Instead of:

```ts
product.inStock === true
```

you can simply use:

```ts
product.inStock
```

because `inStock` is already boolean.

Real applications:

```text
Search
Category filtering
Available products
Active users
Completed orders
Role filtering
```

---

# 14. `reduce()`

`reduce()` converts an array into one final accumulated value.

```ts
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
```

```ts
function calculateCartTotal(
  cart: CartItem[]
): number {
  return cart.reduce(
    (acc, cur) =>
      acc + cur.price * cur.quantity,
    0
  );
}
```

Example:

```text
Laptop     50000 × 1
Mouse       1000 × 2
Keyboard    2000 × 1

Total → 54000
```

Used for:

```text
Cart totals
Total salary
Total revenue
Total inventory value
Dashboard metrics
Order totals
```

---

# 15. Important `reduce()` Concept

If the function needs to calculate totals from the complete cart:

Wrong idea:

```ts
function calculateCartTotal(
  price: number,
  quantity: number
) {}
```

Better:

```ts
function calculateCartTotal(
  cart: CartItem[]
): number {}
```

Because `reduce()` itself accesses:

```ts
cur.price
cur.quantity
```

for every item.

---

# 16. Search Using `filter()`

```ts
const searchProducts = (
  products: Product[],
  searchTerm: string
): Product[] => {
  return products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
};
```

Real-world usage:

```text
Search bars
Data tables
Product pages
Admin dashboards
User lists
```

---

# 17. React Event Handlers

### Button Click

```tsx
const handleClick = (
  event: React.MouseEvent<HTMLButtonElement>
): void => {
  console.log("Clicked");
};
```

```tsx
<button onClick={handleClick}>
  Click
</button>
```

---

### Input Change

```tsx
const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>
): void => {
  console.log(event.target.value);
};
```

```tsx
<input onChange={handleChange} />
```

`void` means the function doesn't return a useful value.

---

# Important Rules to Remember 🔥

```ts
// Parameter type
function greet(name: string) {}
```

```ts
// Return type
function add(a: number, b: number): number {}
```

```ts
// Optional parameter
phone?: string
```

```ts
// Default parameter
tax: number = 18
```

```ts
// Function type
type Operation =
  (a: number, b: number) => number;
```

```ts
// Array → Array
type ProductFilter =
  (products: Product[]) => Product[];
```

```ts
// : Product[]
// means return an ARRAY
```

```ts
// : ProductFilter
// means return a FUNCTION
```

---

# Part 2 — Interview Questions

## Beginner

1. What are parameter types in TypeScript?
2. What is a function return type?
3. What does `?` mean in a function parameter?
4. What is a default parameter?
5. What is an arrow function?
6. What does `void` mean?
7. What is a function type?
8. What is the difference between object types and function types?
9. What does `Product[]` mean?
10. Why can TypeScript infer callback parameter types in `map()`?

## Intermediate

1. What is a callback function?
2. How do you type a callback?
3. What is the difference between `map`, `filter`, and `reduce`?
4. Why does `filter()` return an array?
5. Why can `reduce()` return a number even when the input is an array?
6. What happens if a function type expects one parameter but the function needs two?
7. What does `(): ProductFilter` mean?
8. What is the difference between returning `Product[]` and returning `ProductFilter`?
9. How would you create a reusable function type for filtering products?
10. How do you type React input and click event handlers?

## Hard / Practical

1. What is a higher-order function?
2. How can a function return another function?
3. Why would you return a `ProductFilter` instead of a `Product[]`?
4. How would you create reusable filters for category, price, and availability?
5. How would you type a function passed as a React component prop?
6. How would you type a callback that receives a transaction ID and returns nothing?
7. How would you transform API data into dropdown data using TypeScript?
8. How would you calculate cart totals using `reduce()`?
9. How would you implement case-insensitive search?
10. How does TypeScript detect when a function doesn't match a function type?

---
