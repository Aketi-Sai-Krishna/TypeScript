
# Part 2 — Interview Questions

## Beginner

### 1. What are the basic primitive types in TypeScript?

### 2. What is type annotation?

### 3. What is type inference?

### 4. What is the difference between `null` and `undefined`?

### 5. What is a union type?

---

## Intermediate

### 6. Why doesn't TypeScript require explicit type annotations everywhere?

### 7. What type does TypeScript infer for `const age = 25`?

### 8. What happens when you assign a string to a number-inferred variable?

### 9. How do you create a variable that accepts either a string or `null`?

### 10. What is the difference between `number` and `bigint`?

---

## Advanced / Practical

### 11. What type will TypeScript infer for each property?

```ts
const user = {
    name: "Krishna",
    age: 25,
    active: true
};
```

### 12. Why does this produce an error?

```ts
const user = {
    age: 25
};

user.age = "25";
```

### 13. How would you define a variable that can contain either a number or string?

### 14. What is the benefit of type inference in large TypeScript projects?

### 15. When would you explicitly use type annotations instead of relying on inference?

---
