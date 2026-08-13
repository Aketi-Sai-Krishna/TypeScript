
# Part 3 — Interview Answers

### 1. How do you define an array of numbers?

```ts
let numbers: number[] = [10, 20, 30];
```

It means every element must be a number.

---

### 2. How do you define an object's property types?

```ts
let user: {
  name: string;
  age: number;
} = {
  name: "Sai",
  age: 25
};
```

Each property has a specified type.

---

### 3. What does `?` mean?

It makes an object property optional.

```ts
type User = {
  name: string;
  phone?: string;
};
```

`phone` may be absent.

---

### 4. What is a tuple?

A tuple is an array with a fixed structure where the **number, order, and types of elements are defined**.

```ts
let user: [string, number] = ["Sai", 25];
```

---

### 5. What is a readonly array?

A readonly array cannot be modified after creation.

```ts
let numbers: readonly number[] = [1, 2, 3];

numbers.push(4); // ❌
```

---

### 6. Difference between `string[]` and `(string | number)[]`?

```ts
string[]
```

allows only strings.

```ts
(string | number)[]
```

allows both strings and numbers.

---

### 7. Tuple vs normal array?

A tuple has **fixed positions and types**.

```ts
[string, number]
```

A normal array generally has a variable number of elements.

```ts
string[]
```

---

### 8. How do you define an array of objects?

```ts
let users: {
  id: number;
  name: string;
}[] = [];
```

The `[]` applies to the object type.

---

### 9. How do you define a nested object?

```ts
let user: {
  name: string;
  address: {
    city: string;
  };
} = {
  name: "Sai",
  address: {
    city: "Hyderabad"
  }
};
```

---

### 10. `readonly string[]` vs `string[]`?

```ts
string[]
```

can be modified.

```ts
readonly string[]
```

can be read but cannot be modified.

---

### 11. When would you use a tuple?

Use a tuple when the **position and type of each value have a specific meaning**.

Example:

```ts
let coordinates: [number, number] = [17.38, 78.48];
```

The first value represents one coordinate and the second represents another.

---

### 12. How would you type a nested API response?

Define the complete structure:

```ts
const response: {
  users: {
    id: number;
    name: string;
  }[];
} = {
  users: [
    {
      id: 1,
      name: "Sai"
    }
  ]
};
```

In real projects, this becomes easier to maintain using `type` or `interface`, which you'll learn shortly.

---

### 13. What happens when tuple values are in the wrong order?

TypeScript produces a compile-time error.

```ts
let user: [string, number] = [25, "Sai"]; // ❌
```

Because index `0` must be a string and index `1` must be a number.

---

### 14. Can a tuple contain optional elements?

Yes.

```ts
let user: [string, number?] = ["Sai"];
```

The second element is optional.

Both are valid:

```ts
["Sai"]
["Sai", 25]
```

---

### 15. Can an array contain multiple types without using a tuple?

Yes, using a union type:

```ts
let values: (string | number)[] = [
  "Sai",
  25,
  "Krishna",
  30
];
```

Unlike a tuple, the order isn't fixed.

---