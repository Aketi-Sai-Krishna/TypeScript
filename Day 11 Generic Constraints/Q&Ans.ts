### Questions and Answers

### Q1. What is a generic constraint?

**Answer:** A generic constraint restricts the types accepted by a generic while keeping the code reusable.

### Q2. What is the syntax of a generic constraint?

**Answer:**

```ts
<T extends Requirement>
```

### Q3. What does this mean?

```ts
<T extends { id: number }>
```

**Answer:** `T` can represent any type, but that type must contain `id: number`.

### Q4. Why can we not access `item.id` on an unrestricted `T`?

**Answer:** Because `T` could represent a string, number, boolean, or an object without an `id`.

### Q5. Does the object have to contain only the properties defined by the constraint?

**Answer:** No. It can contain additional properties, but it must contain all required constraint properties.

### Q6. Can `User`, `Product`, and `Order` use the same generic function?

**Answer:** Yes, if all three types satisfy the function’s generic constraint.

### Q7. What should a generic `findById()` function return?

**Answer:**

```ts
T | undefined
```

It returns `undefined` when an item is not found.

### Q8. What is `keyof T`?

**Answer:** It produces a union of all valid property keys of `T`.

### Q9. What does `K extends keyof T` do?

**Answer:** It restricts `K` to the valid property names of `T`.

### Q10. What does `T[K]` represent?

**Answer:** It represents the type of the property selected by key `K` from object type `T`.

### Q11. What does `Partial<T>` do?

**Answer:** It makes every property of `T` optional.

### Q12. What does `Omit<T, "id">` do?

**Answer:** It creates a new type containing all properties of `T` except `id`.

### Q13. Why use `Partial<Omit<T, "id">>`?

**Answer:** It allows selected properties to be updated while preventing the ID from being changed.

### Q14. Can a type alias be used as a generic constraint?

**Answer:** Yes.

```ts
type Identifiable = {
  id: number;
};

function getItem<T extends Identifiable>(item: T): T {
  return item;
}
```

### Q15. Is a generic constraint better than `any`?

**Answer:** Yes. Generic constraints preserve type safety, autocomplete, property checking, and correct return-type inference.

---

# Final Revision

```ts
<T>
```

Means:

> Accept any type.

```ts
<T extends { id: number }>
```

Means:

> Accept any type that contains `id: number`.

```ts
<T, K extends keyof T>
```

Means:

> Accept an object and restrict the key to the valid properties of that object.

## Key Formula

```ts
Generic = Reusability
Constraint = Restriction
Generic Constraint = Reusability + Type Safety
```
