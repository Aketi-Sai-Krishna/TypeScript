
# Part 2 — Interview Questions

## Beginner

### Q1. What is a union type?

**Answer:**

A union type allows a value to be one of multiple possible types.

```ts
let id: number | string;
```

Here `id` can be either a `number` or a `string`.

---

### Q2. What does `|` mean in TypeScript?

**Answer:**

`|` represents a **union**, meaning **OR**.

```ts
type ID = number | string;
```

`ID` can be a number **OR** a string.

---

### Q3. What does `&` mean in TypeScript?

**Answer:**

`&` represents an **intersection**, meaning **AND**.

```ts
type EmployeeDetails = Person & Employee;
```

`EmployeeDetails` must satisfy both `Person` and `Employee`.

---

### Q4. What is a literal union?

**Answer:**

A literal union restricts a value to a specific set of literal values.

```ts
type Status = "loading" | "success" | "error";
```

Only these three values are allowed.

---

### Q5. What is the difference between union and intersection?

**Answer:**

```text
Union        → OR
Intersection → AND
```

Union allows alternatives, while intersection combines multiple types.

---

## Intermediate

### Q6. How do you create an intersection type?

**Answer:**

Use the `&` operator.

```ts
type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type EmployeeDetails = Person & Employee;
```

---

### Q7. What properties are required in `Person & Employee`?

**Answer:**

Properties from **both** types are required.

```ts
const employee: EmployeeDetails = {
    name: "Krishna",
    employeeId: 101
};
```

---

### Q8. Why is type narrowing needed with union types?

**Answer:**

Because TypeScript doesn't initially know which member of the union is being used.

```ts
function print(value: string | number) {

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }
}
```

The `typeof` check narrows the type from `string | number` to `string`.

---

### Q9. What is a discriminated union?

**Answer:**

A discriminated union is a union of object types that share a common property used to determine which type is currently being used.

```ts
type Response =
    | { status: "loading" }
    | { status: "success"; data: string[] }
    | { status: "error"; message: string };
```

Here `status` is the discriminant.

---

### Q10. Can we combine more than two types using intersection?

**Answer:**

Yes.

```ts
type EmployeeDetails = Person & Employee & Company;
```

The resulting type contains properties from all three types.

---

## Hard / Interview Scenario

### Q11. What is the difference between these two?

```ts
type A = Person | Employee;
```

and:

```ts
type B = Person & Employee;
```

**Answer:**

`Person | Employee` means the value can satisfy **Person OR Employee**.

`Person & Employee` means the value must satisfy **Person AND Employee**.

---

### Q12. What happens if you intersect incompatible primitive types?

**Answer:**

The result can become `never` because a value cannot satisfy both types.

```ts
type Result = string & number;
```

There is no value that can simultaneously be a `string` and a `number`, so the resulting type is effectively `never`.

---

### Q13. Can union and intersection be used together?

**Answer:**

Yes.

```ts
type Employee = Person & {
    employeeId: number;
};

type User = {
    email: string;
};

type Account = Employee | User;
```

This means `Account` can be an `Employee` or a `User`.

---

# Part 3 — Quick Revision Q&A

**Q: Union means?**
A: OR.

**Q: Intersection means?**
A: AND.

**Q: Union operator?**
A: `|`

**Q: Intersection operator?**
A: `&`

**Q: Example of union?**
A: `string | number`

**Q: Example of intersection?**
A: `Person & Employee`

**Q: What is a literal union?**
A: A union containing specific literal values.

**Q: Example?**
A: `"loading" | "success" | "error"`

**Q: What is type narrowing?**
A: Reducing a union to a more specific type using checks such as `typeof`, `in`, or `switch`.

**Q: What is a discriminated union?**
A: A union of object types identified by a common discriminant property.

**Q: What is the most important memory rule?**

```text
|  → OR  → Union
&  → AND → Intersection
```