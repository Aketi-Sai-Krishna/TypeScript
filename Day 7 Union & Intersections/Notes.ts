# TypeScript — Union & Intersection Types

##Notes

### 1. Union Types

A **union type** allows a value to be **one of multiple possible types**.

Syntax:

```ts
let id: number | string;
```

Here `|` means **OR**.

So `id` can be:

```ts
id = 101;       // ✅
id = "USR101";  // ✅
id = true;      // ❌
```

### Remember

> **Union = OR**

```text
number OR string
```

---

## 2. Union Types with Type Aliases

Union types are commonly combined with type aliases.

```ts
type ID = number | string;

let userId: ID;

userId = 101;       // ✅
userId = "USR101";  // ✅
```

This avoids repeating the union type.

---

## 3. Literal Unions

A union can contain specific literal values.

```ts
type ApiStatus = "loading" | "success" | "error";
```

Only these values are allowed:

```ts
let status: ApiStatus;

status = "loading";  // ✅
status = "success";  // ✅
status = "error";    // ✅

status = "pending";  // ❌
```

Literal unions are very common for:

* API status
* User roles
* Order status
* Payment status
* Button variants
* Theme values

Example:

```ts
type UserRole = "admin" | "user" | "manager" | "guest";
```

---

## 4. Type Narrowing

When a variable has a union type, TypeScript needs to determine which type it currently contains.

This is called **type narrowing**.

```ts
function printId(id: number | string) {

    if (typeof id === "number") {
        console.log(id.toFixed(2));
    }

    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }
}
```

Here:

```ts
typeof id === "number"
```

narrows:

```text
number | string
      ↓
    number
```

And:

```ts
typeof id === "string"
```

narrows it to:

```text
number | string
      ↓
    string
```

Common narrowing techniques:

```ts
typeof
```

```ts
in
```

```ts
instanceof
```

```ts
switch
```

---

# 5. Discriminated Unions

A **discriminated union** is a union of object types that share a common property used to identify which object type they are.

Example:

```ts
type ApiResponse =
    | {
        status: "loading";
      }
    | {
        status: "success";
        data: string[];
      }
    | {
        status: "error";
        message: string;
      };
```

Here:

```ts
status
```

is the **discriminant**.

We can use it with `switch`:

```ts
function handleResponse(response: ApiResponse) {

    switch (response.status) {

        case "loading":
            console.log("Loading...");
            break;

        case "success":
            console.log(response.data);
            break;

        case "error":
            console.log(response.message);
            break;
    }
}
```

TypeScript automatically narrows the object based on `status`.

---

# 6. Intersection Types

An **intersection type** combines multiple types into **one type containing all their properties**.

Syntax:

```ts
type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type EmployeeDetails = Person & Employee;
```

Here `&` means **AND**.

Therefore `EmployeeDetails` must contain:

```ts
name
AND
employeeId
```

Example:

```ts
const employee: EmployeeDetails = {
    name: "Krishna",
    employeeId: 101
};
```

Both properties are required.

---

# 7. Union vs Intersection

This is one of the most important things to remember.

### Union

```ts
type A = string | number;
```

Means:

```text
string OR number
```

### Intersection

```ts
type A = Type1 & Type2;
```

Means:

```text
Type1 AND Type2
```

### Easy memory trick

```text
|  → OR

&  → AND
```

Think:

```text
Union       → choose one
Intersection → combine all
```

---

# 8. Union Example

```ts
type Admin = {
    name: string;
    permissions: string[];
};

type User = {
    name: string;
    email: string;
};

type Person = Admin | User;
```

A `Person` can be either an `Admin` or a `User`.

But TypeScript can only safely access properties common to both until narrowing is performed.

```ts
person.name; // ✅
```

For properties specific to one type, narrow first.

---

# 9. Intersection Example

```ts
type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type EmployeeDetails = Person & Employee;
```

Now:

```ts
const employee: EmployeeDetails = {
    name: "Krishna",
    employeeId: 101
};
```

The object must satisfy **both** types.

---

# 10. Intersection with More Than Two Types

You can combine multiple types.

```ts
type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type Company = {
    companyName: string;
};

type EmployeeDetails = Person & Employee & Company;
```

Now:

```ts
const employee: EmployeeDetails = {
    name: "Krishna",
    employeeId: 101,
    companyName: "OVA"
};
```

The object needs properties from **all three types**.

---

# 11. Union + Intersection Together

In real projects, you can use both.

For example:

```ts
type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type Admin = {
    permissions: string[];
};

type EmployeeDetails = Person & Employee;

type AdminEmployee = EmployeeDetails & Admin;
```

Now `AdminEmployee` contains:

```text
Person
   +
Employee
   +
Admin
```

Therefore:

```ts
const admin: AdminEmployee = {
    name: "Krishna",
    employeeId: 101,
    permissions: ["read", "write"]
};
```

---

# 12. Real-World API Example

Suppose your API returns a product.

Basic product:

```ts
type Product = {
    id: number;
    name: string;
    price: number;
};
```

Product metadata:

```ts
type ProductMetadata = {
    createdAt: string;
    updatedAt: string;
};
```

We can combine them:

```ts
type ProductDetails = Product & ProductMetadata;
```

Now:

```ts
const product: ProductDetails = {
    id: 101,
    name: "Laptop",
    price: 100000,
    createdAt: "2026-08-21",
    updatedAt: "2026-08-21"
};
```

This is a practical use of **intersection types**.

---

# 13. Union vs Intersection — Quick Comparison

| Feature            | Union `\|`                  | Intersection `&`            |
| ------------------ | --------------------------- | --------------------------- |
| Meaning            | OR                          | AND                         |
| Purpose            | Allow alternatives          | Combine types               |
| Example            | `string \| number`          | `Person & Employee`         |
| Value must satisfy | One option                  | All types                   |
| Common use         | API states, roles, variants | Combining object structures |
| Narrowing          | Often required              | Usually not required        |

---


### ⭐ 20/80 Takeaway

For your TypeScript learning goal, make these four patterns automatic:

```ts
type ID = string | number;
```

```ts
type Status = "loading" | "success" | "error";
```

```ts
type EmployeeDetails = Person & Employee;
```

```ts
type ApiResponse =
    | { status: "loading" }
    | { status: "success"; data: Product[] }
    | { status: "error"; message: string };
```
