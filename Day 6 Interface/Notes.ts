#Interfaces in TypeScript

### 1. What is an Interface?

An `interface` defines the **structure/contract of an object**.

```ts
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 101,
  name: "Krishna"
};
```

If an object is assigned to `User`, it must follow the structure defined by the interface.

---

### 2. Optional Properties

Use `?` when a property is not required.

```ts
interface User {
  id: number;
  name: string;
  phone?: string;
}
```

Both are valid:

```ts
const user1: User = {
  id: 101,
  name: "Krishna"
};

const user2: User = {
  id: 102,
  name: "Sai",
  phone: "9876543210"
};
```

`phone?: string` means the property can exist or be absent.

---

### 3. Readonly Properties

`readonly` prevents reassignment of a property after initialization.

```ts
interface User {
  readonly id: number;
  name: string;
}

const user: User = {
  id: 101,
  name: "Krishna"
};

user.name = "Sai"; // ✅

user.id = 102; // ❌ Error
```

---

### 4. Nested Interfaces

An interface can use another interface as the type of a property.

```ts
interface Address {
  city: string;
  state: string;
  country: string;
}

interface User {
  id: number;
  name: string;
  address: Address;
}
```

Example:

```ts
const user: User = {
  id: 101,
  name: "Krishna",
  address: {
    city: "Hyderabad",
    state: "Telangana",
    country: "India"
  }
};
```

This is very common when modeling API responses.

---

### 5. Extending Interfaces

An interface can inherit properties from another interface using `extends`.

```ts
interface Employee {
  id: number;
  name: string;
}

interface Manager extends Employee {
  teamSize: number;
}
```

`Manager` now contains:

```text
id
name
teamSize
```

Example:

```ts
const manager: Manager = {
  id: 101,
  name: "Krishna",
  teamSize: 10
};
```

Multiple interfaces can also be extended:

```ts
interface User {
  id: number;
}

interface Employee {
  company: string;
}

interface Developer extends User, Employee {
  skills: string[];
}
```

---

# Part 2 — `type` vs `interface`

Both `type` and `interface` can describe object structures.

### Using `interface`

```ts
interface User {
  id: number;
  name: string;
}
```

### Using `type`

```ts
type User = {
  id: number;
  name: string;
};
```

Both are valid.

### Main Practical Difference

`interface` is mainly used for **object structures/contracts** and works naturally with `extends`.

```ts
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: string;
}
```

`type` is more flexible and can represent unions, intersections, tuples, primitives, and objects.

```ts
type ID = string | number;

type Status = "active" | "inactive";

type Coordinates = [number, number];

type User = {
  id: number;
  name: string;
};
```

### Important

Don't memorize:

```text
interface = object
type = union
```

That's incorrect.

Instead remember:

> **Both can describe objects. `interface` is especially useful for object contracts and extension, while `type` is more flexible for composing different kinds of types.**

---

# Part 3 — Practical User Management Model

```ts
interface Address {
  city: string;
  state: string;
  country: string;
}

interface User {
  readonly id: number;
  name: string;
  email: string;
  phone?: string;
  address: Address;
}

interface Admin extends User {
  role: string;
  permissions: string[];
}
```

Example:

```ts
const user: User = {
  id: 101,
  name: "Krishna",
  email: "krishna@gmail.com",

  address: {
    city: "Hyderabad",
    state: "Telangana",
    country: "India"
  }
};
```

Example of `Admin`:

```ts
const admin: Admin = {
  id: 102,
  name: "Sai",
  email: "sai@gmail.com",
  phone: "9876543210",

  address: {
    city: "Hyderabad",
    state: "Telangana",
    country: "India"
  },

  role: "admin",
  permissions: ["create", "read", "update", "delete"]
};
```

#Quick Revision

```text
interface
    ↓
Object structure / contract

? 
    ↓
Optional property

readonly
    ↓
Cannot reassign property

Nested interface
    ↓
Interface inside another interface

extends
    ↓
Inheritance between interfaces

type
    ↓
Flexible type composition
    ↓
Union | Intersection | Tuple | Primitive | Object
```

### One-line memory trick

> **Interface → Object contract + extension**
> **Type → Flexible type composition**
