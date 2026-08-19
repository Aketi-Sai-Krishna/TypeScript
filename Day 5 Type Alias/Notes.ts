You're right. For your **GitHub Notes** format, the **questions and answers should match exactly in topic and order**. I’ll keep the answer directly under the corresponding question so nothing gets mismatched.

# Day 5 — Type Aliases

## Part 1 — Concept Notes

### 1. What is a `type` alias?

A `type` alias allows us to create a custom name for a TypeScript type.

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};
```

Now we can reuse `User`:

```ts
const user: User = {
  id: 1,
  name: "Krishna"
};
```

---

### 2. Why use `type` aliases?

`type` aliases make complex types:

* Reusable
* Easier to read
* Easier to maintain
* Useful for objects, arrays, functions, unions, and nested structures

---

### 3. Reusing types

A type can be reused in multiple places.

```ts
type Address = {
  city: string;
  state: string;
};

type User = {
  name: string;
  address: Address;
};
```

Here, `User` reuses `Address`.

---

### 4. Nested types

One custom type can contain another custom type.

```ts
type Address = {
  city: string;
  pincode: number;
};

type User = {
  name: string;
  address: Address;
};
```

This is called a nested/custom composed type.

---

### 5. Optional properties

The `?` makes a property optional.

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};
```

Both are valid:

```ts
const user1: User = {
  id: 1,
  name: "Krishna"
};
```

```ts
const user2: User = {
  id: 2,
  name: "Sai",
  email: "sai@gmail.com"
};
```

---

### 6. Readonly properties

`readonly` prevents a property from being changed after initialization.

```ts
type User = {
  readonly id: number;
  name: string;
};
```

```ts
const user: User = {
  id: 101,
  name: "Krishna"
};

user.name = "Sai"; // ✅
user.id = 102;     // ❌
```

---

### 7. Arrays with custom types

A custom type can be used to create an array.

```ts
type User = {
  id: number;
  name: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Krishna"
  },
  {
    id: 2,
    name: "Sai"
  }
];
```

---

### 8. Union types inside custom types

A property can accept specific values using a union.

```ts
type User = {
  id: number;
  role: "admin" | "customer";
};
```

Now:

```ts
role: "admin"     // ✅
role: "customer"  // ✅
role: "seller"    // ❌
```

---

### 9. Real-world type composition

In real applications, types are often combined.

```ts
type Address = {
  city: string;
  pincode: number;
};

type Company = {
  id: number;
  name: string;
  address: Address;
};

type User = {
  id: number;
  name: string;
  company?: Company;
};
```

This avoids duplicating the same structure.

---

### 10. Order and OrderItem

When an order contains multiple products, create a separate type for each order item.

```ts
type OrderItem = {
  product: Product;
  quantity: number;
  priceAtTimeOfPurchase: number;
};

type Order = {
  readonly id: number;
  customer: User;
  orderItems: OrderItem[];
};
```

This keeps the relationship between:

```text
Product
Quantity
Purchase Price
```

together.

---

### 11. API response and the Generics problem

A common API structure is:

```ts
{
  success: true,
  message: "Success",
  data: ...
}
```

The `data` can be a `User`, `Product`, `Order`, etc.

Conceptually:

```text
APIResponse<User>
APIResponse<Product>
APIResponse<Order>
```

Creating separate types like:

```text
APIResponse1
APIResponse2
APIResponse3
```

is not ideal.

A reusable solution will be learned with **Generics**.

---
