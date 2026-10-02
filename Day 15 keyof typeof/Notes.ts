# TypeScript  `keyof` + `typeof`

## 📌 Topics Covered

- `keyof`
- `typeof`
- `keyof typeof`
- Creating types from existing objects
- Type-safe dynamic property access
- Practical use cases:
  - Sorting
  - Filtering
  - Table columns
  - Form fields

---

# 1. `keyof`

`keyof` creates a union of the property names of a type.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;
```

TypeScript creates:

```ts
type UserKeys = "id" | "name" | "email";
```

Example:

```ts
let key: UserKeys;

key = "id";      // ✅
key = "name";    // ✅
key = "email";   // ✅

key = "age";     // ❌
```

### Mental Model

```text
User
 ├── id
 ├── name
 └── email

keyof User
     ↓
"id" | "name" | "email"
```

---

# 2. `typeof`

TypeScript's `typeof` can be used to create a type from an existing value.

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

### Mental Model

```text
const user = {...}
       ↓
typeof user
       ↓
{
  id: number;
  name: string;
  email: string;
}
```

---

# 3. `keyof typeof`

`keyof typeof` combines both concepts.

```ts
const user = {
  id: 1,
  name: "Sai",
  email: "sai@gmail.com"
};

type UserKeys = keyof typeof user;
```

Result:

```ts
type UserKeys = "id" | "name" | "email";
```

### Process

```text
user
 ↓
typeof user
 ↓
{
  id: number;
  name: string;
  email: string;
}
 ↓
keyof
 ↓
"id" | "name" | "email"
```

---

# 4. `keyof` vs `typeof`

## `keyof`

Gets keys from a **type**.

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

type ProductKey = keyof Product;
```

Result:

```ts
"id" | "name" | "price"
```

---

## `typeof`

Gets the type of an existing **value**.

```ts
const product = {
  id: 1,
  name: "Laptop",
  price: 50000
};

type Product = typeof product;
```

Result:

```ts
{
  id: number;
  name: string;
  price: number;
}
```

---

## `keyof typeof`

Gets the keys of an existing **object**.

```ts
type ProductKey = keyof typeof product;
```

Result:

```ts
"id" | "name" | "price"
```

---

# 5. Type-Safe Dynamic Property Access

Instead of:

```ts
function getValue(user: User, key: string) {
  return user[key];
}
```

Use:

```ts
function getValue(user: User, key: keyof User) {
  return user[key];
}
```

Now only valid keys are accepted:

```ts
getValue(user, "name");   // ✅
getValue(user, "email");  // ✅
getValue(user, "age");    // ❌
```

`keyof` prevents invalid property names.

---

# 6. Practical Example — Sorting

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

Usage:

```ts
sortProducts(products, "name");   // ✅
sortProducts(products, "price");  // ✅
sortProducts(products, "id");     // ✅

sortProducts(products, "email");  // ❌
```

This is useful for type-safe table sorting.

---

# 7. Practical Example — Table Columns

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserColumn = keyof User;
```

Now:

```ts
const columns: UserColumn[] = [
  "id",
  "name",
  "email",
  "age"
];
```

Invalid:

```ts
const columns: UserColumn[] = [
  "id",
  "name",
  "salary"
];
```

`salary` doesn't exist in `User`, so TypeScript gives an error.

---

# 8. Practical Example — Form Fields

```ts
const initialForm = {
  name: "",
  email: "",
  age: 0
};
```

Create a type from the object:

```ts
type FormValues = typeof initialForm;
```

Result:

```ts
type FormValues = {
  name: string;
  email: string;
  age: number;
};
```

Create a type containing the field names:

```ts
type FormField = keyof typeof initialForm;
```

Result:

```ts
type FormField = "name" | "email" | "age";
```

Example:

```ts
function updateField(
  field: FormField,
  value: string | number
) {
  console.log(field, value);
}
```

Valid:

```ts
updateField("name", "Sai");
updateField("email", "sai@gmail.com");
updateField("age", 25);
```

Invalid:

```ts
updateField("phone", "9999999999");
// ❌
```

---

# 9. Practical Example — Filtering

```ts
interface Employee {
  id: number;
  name: string;
  department: string;
}

function filterBy(
  employees: Employee[],
  key: keyof Employee,
  value: string | number
) {
  return employees.filter(
    employee => employee[key] === value
  );
}
```

Usage:

```ts
filterBy(employees, "name", "Sai");

filterBy(employees, "department", "Engineering");

filterBy(employees, "id", 10);
```

---

# 10. React Example

```ts
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: ""
};

type FormField = keyof typeof initialForm;
```

Now:

```ts
function handleChange(
  field: FormField,
  value: string
) {
  setForm(prev => ({
    ...prev,
    [field]: value
  }));
}
```

Usage:

```tsx
<input
  value={form.firstName}
  onChange={e =>
    handleChange("firstName", e.target.value)
  }
/>
```

Invalid:

```ts
handleChange("address", "Hyderabad");
// ❌
```

This is useful for dynamic and reusable React forms.

---

# 11. `as const` + `keyof typeof`

A common TypeScript pattern:

```ts
const statuses = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending"
} as const;
```

Get the keys:

```ts
type Status = keyof typeof statuses;
```

Result:

```ts
"active" | "inactive" | "pending"
```

This pattern is commonly used for:

- Status configurations
- Constants
- Dropdown options
- Permissions
- Routes
- Configuration objects

---

# 12. Important Mental Model 🧠

### `typeof`

> What is the type of this value?

```ts
const user = {...};

type User = typeof user;
```

---

### `keyof`

> What are the keys of this type?

```ts
type UserKeys = keyof User;
```

---

### `keyof typeof`

> What are the keys of this existing object?

```ts
const user = {...};

type UserKeys = keyof typeof user;
```

---

# 13. Quick Revision

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;
// "id" | "name" | "email"
```

```ts
const user = {
  id: 1,
  name: "Sai",
  email: "sai@gmail.com"
};

type UserType = typeof user;
// {
//   id: number;
//   name: string;
//   email: string;
// }
```

```ts
type UserKeys = keyof typeof user;
// "id" | "name" | "email"
```

---

#Key Takeaways

- `keyof` extracts keys from a type.
- `typeof` creates a type from an existing value.
- `keyof typeof` extracts keys from an existing object.
- `keyof` is useful for type-safe dynamic property access.
- `typeof` avoids manually duplicating object types.
- `keyof typeof` is very useful for React forms, tables, filters, sorting, and configuration objects.
- These concepts help create reusable and type-safe components.

### Most important pattern

```ts
const obj = {
  name: "Sai",
  age: 25
};

type ObjType = typeof obj;
// { name: string; age: number }

type ObjKeys = keyof typeof obj;
// "name" | "age"
```

---