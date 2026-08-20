
# Part 4 — Interview Questions & Answers

## Beginner

### 1. What is an interface in TypeScript?

An interface defines the **structure or contract of an object**, specifying the properties and their types.

---

### 2. How do you create an interface?

```ts
interface User {
  id: number;
  name: string;
}
```

---

### 3. How do you make an interface property optional?

Use `?`.

```ts
interface User {
  id: number;
  phone?: string;
}
```

---

### 4. What does `readonly` do in an interface?

It prevents a property from being reassigned after the object is initialized.

```ts
interface User {
  readonly id: number;
}
```

---

### 5. Can an interface contain another interface?

Yes.

```ts
interface Address {
  city: string;
}

interface User {
  name: string;
  address: Address;
}
```

---

## Intermediate

### 6. How can one interface inherit another interface?

Using `extends`.

```ts
interface User {
  id: number;
}

interface Admin extends User {
  role: string;
}
```

---

### 7. Can an interface extend multiple interfaces?

Yes.

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

### 8. Can `type` and `interface` both define objects?

Yes.

```ts
type User = {
  id: number;
};
```

```ts
interface User {
  id: number;
}
```

Both are valid.

---

### 9. What is one major advantage of `type` over `interface`?

`type` can represent more kinds of types, including unions, intersections, tuples, primitives, and object types.

```ts
type ID = string | number;

type Coordinates = [number, number];
```

---

### 10. What is one major advantage of `interface`?

Interfaces are well suited for defining object contracts and can be extended using `extends`.

```ts
interface User {
  id: number;
}

interface Admin extends User {
  role: string;
}
```

---

## Hard / Conceptual

### 11. Can an interface represent a union type?

Not directly in the same way a `type` alias can.

```ts
type Status = "active" | "inactive";
```

This is a common use case for `type`.

---

### 12. Can an interface be redeclared?

Yes. TypeScript supports **declaration merging**.

```ts
interface User {
  id: number;
}

interface User {
  name: string;
}
```

The resulting `User` contains both:

```ts
id
name
```

---

### 13. Can a type alias be redeclared?

No.

```ts
type User = {
  id: number;
};

// ❌ Duplicate identifier
type User = {
  name: string;
};
```

---

### 14. Which should you use: `type` or `interface`?

There is no universal rule.

A practical approach is:

* Use `interface` when modeling object contracts and inheritance/extension is important.
* Use `type` when you need unions, intersections, tuples, or other type compositions.
* Both are valid for object structures.

---