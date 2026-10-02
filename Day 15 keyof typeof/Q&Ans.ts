# TypeScript `keyof` + `typeof`
##Interview Questions & Answers

---

### 1. What is `keyof` in TypeScript?

**Answer:**

`keyof` creates a union type containing all the property keys of an object type.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;
```

The resulting type is:

```ts
"id" | "name" | "email"
```

So `keyof` is useful when we want to restrict a variable or function parameter to valid property names.

---

### 2. What is `typeof` in TypeScript?

**Answer:**

In a type context, `typeof` allows us to create a TypeScript type from an existing value.

```ts
const user = {
  id: 1,
  name: "Sai",
  email: "sai@gmail.com"
};

type User = typeof user;
```

TypeScript derives:

```ts
type User = {
  id: number;
  name: string;
  email: string;
};
```

This avoids manually writing the same type again.

---

### 3. What is the difference between `keyof` and `typeof`?

**Answer:**

`keyof` extracts the **keys from a type**, while TypeScript's `typeof` in a type position extracts the **type of a value**.

```ts
interface User {
  id: number;
  name: string;
}

type UserKeys = keyof User;
// "id" | "name"
```

Whereas:

```ts
const user = {
  id: 1,
  name: "Sai"
};

type UserType = typeof user;
// {
//   id: number;
//   name: string;
// }
```

So:

```text
keyof  → gets keys
typeof → gets type
```

---

### 4. What does `keyof typeof` mean?

**Answer:**

`keyof typeof` combines both operations.

First, `typeof` gets the type of an existing object, and then `keyof` gets the keys from that type.

```ts
const user = {
  id: 1,
  name: "Sai",
  email: "sai@gmail.com"
};

type UserKeys = keyof typeof user;
```

The result is:

```ts
"id" | "name" | "email"
```

It's particularly useful when we already have an object and don't want to manually create an interface just to get its keys.

---

### 5. Why would you use `keyof` instead of `string`?

**Answer:**

`keyof` provides type safety.

For example:

```ts
function getValue(
  user: User,
  key: string
) {
  return user[key];
}
```

Here, any string can be passed.

Instead:

```ts
function getValue(
  user: User,
  key: keyof User
) {
  return user[key];
}
```

Now TypeScript only allows valid keys:

```ts
getValue(user, "name");   // ✅
getValue(user, "email");  // ✅
getValue(user, "age");    // ❌
```

So `keyof` prevents invalid property access.

---

### 6. How would you create a type-safe sorting function?

**Answer:**

We can use `keyof` to restrict the sorting key to properties that actually exist on the object.

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

function sortProducts(
  products: Product[],
  key: keyof Product
) {
  return [...products].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;

    return 0;
  });
}
```

Now:

```ts
sortProducts(products, "name");  // ✅
sortProducts(products, "price"); // ✅
sortProducts(products, "id");    // ✅

sortProducts(products, "email"); // ❌
```

This is useful for reusable React data tables.

---

### 7. How can `keyof typeof` be used with a form?

**Answer:**

Suppose we have:

```ts
const initialForm = {
  name: "",
  email: "",
  age: 0
};
```

We can create:

```ts
type FormValues = typeof initialForm;

type FormField = keyof typeof initialForm;
```

Now:

```ts
type FormField = "name" | "email" | "age";
```

We can use this in a function:

```ts
function updateField(
  field: FormField,
  value: string | number
) {
  console.log(field, value);
}
```

This allows:

```ts
updateField("name", "Sai");   // ✅
updateField("email", "x@y.com"); // ✅
updateField("phone", "9999"); // ❌
```

This pattern is useful for dynamic React forms.

---

### 8. How would you create type-safe table columns?

**Answer:**

We can use `keyof` to ensure that table columns correspond to actual properties of the data.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserColumn = keyof User;

const columns: UserColumn[] = [
  "id",
  "name",
  "email"
];
```

If we write:

```ts
const columns: UserColumn[] = [
  "id",
  "name",
  "salary"
];
```

TypeScript gives an error because `salary` doesn't exist in `User`.

This is useful when building reusable React table components.

---

### 9. What happens when you use `keyof` with an object that has an index signature?

**Answer:**

Consider:

```ts
interface User {
  [key: string]: string;
}
```

Here:

```ts
type UserKeys = keyof User;
```

The resulting key type includes:

```ts
string | number
```

This happens because JavaScript object keys can be accessed using strings or numbers.

A simpler example is:

```ts
interface Dictionary {
  [key: string]: string;
}

type Keys = keyof Dictionary;
// string | number
```

This is useful when working with dictionaries or dynamically keyed objects.

---

### 10. How are `keyof`, `typeof`, and `as const` commonly used together?

**Answer:**

This is a very common TypeScript pattern.

```ts
const statuses = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending"
} as const;
```

We can get the keys:

```ts
type Status = keyof typeof statuses;
```

Result:

```ts
"active" | "inactive" | "pending"
```

We can also get the values:

```ts
type StatusLabel =
  typeof statuses[Status];
```

Result:

```ts
"Active" | "Inactive" | "Pending"
```

This pattern is useful for:

- Dropdown options
- Status configurations
- Permissions
- Routes
- API mappings
- React configuration objects

---

# 🔥 Quick Interview Revision

| Concept | Meaning |
|---|---|
| `keyof User` | Gets keys from the `User` type |
| `typeof user` | Gets the type of the `user` value |
| `keyof typeof user` | Gets keys from the `user` object |
| `as const` | Preserves literal values and makes the object deeply readonly |
| `user[key]` | Dynamic property access |
| `keyof` | Provides type-safe property names |

### Remember this:

```ts
const user = {
  id: 1,
  name: "Sai"
};
```

```ts
typeof user
```

means:

```text
"What is the type of user?"
```

```ts
keyof typeof user
```

means:

```text
"What are the keys of user?"
```

Result:

```ts
"id" | "name"
```

---

# 🎯 Most Important Interview Question

If the interviewer asks:

> **"Explain `keyof typeof` with a practical example."**

A strong answer is:

> "`keyof typeof` is used when I have an existing object and want a type representing its keys. `typeof` first derives the object's type, and `keyof` then extracts its property names. For example, `const user = { id: 1, name: 'Sai' }`; `type UserKey = keyof typeof user` produces `'id' | 'name'`. I can then use that type to make dynamic operations like table sorting, filtering, or form field updates type-safe."

That is a good **interview-level explanation** because it explains both the concept and a real-world use case.