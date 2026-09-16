#Generic Constraints in TypeScript

## Part 1: Topic Notes

## 1. What is a Generic Constraint?

A generic constraint restricts the types that can be passed to a generic.

Syntax:

```ts
<T extends Requirement>
```

It means:

> `T` can represent any type, but it must satisfy the specified requirement.

Example:

```ts
function getId<T extends { id: number }>(item: T): number {
  return item.id;
}
```

Here, `T` can represent a `User`, `Product`, `Order`, or any other object, but it must contain:

```ts
{
  id: number;
}
```

---

## 2. Why Do We Need Generic Constraints?

Consider this function:

```ts
function getId<T>(item: T): number {
  return item.id;
}
```

TypeScript produces an error:

```ts
Property 'id' does not exist on type 'T'.
```

This happens because `T` could be:

```ts
string
number
boolean
null
```

TypeScript cannot guarantee that `T` contains an `id`.

We solve this problem using a generic constraint:

```ts
function getId<T extends { id: number }>(item: T): number {
  return item.id;
}
```

Now TypeScript knows that `item` must contain `id: number`.

---

## 3. Generic + Restriction

A generic provides reusability:

```ts
<T>
```

A constraint provides a restriction:

```ts
<T extends { id: number }>
```

Therefore:

```ts
Generic constraint = Reusability + Type safety
```

---

## 4. Creating Reusable Models

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  productId: number;
  quantity: number;
  status: "pending" | "shipped" | "delivered";
};
```

All three types contain:

```ts
id: number;
```

Therefore, they can be used with this constraint:

```ts
<T extends { id: number }>
```

---

## 5. Example Data

```ts
const users: User[] = [
  {
    id: 1,
    name: "Sai Krishna",
    email: "sai@example.com",
  },
  {
    id: 2,
    name: "Arjun",
    email: "arjun@example.com",
  },
];

const products: Product[] = [
  {
    id: 101,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 102,
    name: "Mobile",
    price: 25000,
  },
];

const orders: Order[] = [
  {
    id: 1001,
    productId: 101,
    quantity: 1,
    status: "shipped",
  },
  {
    id: 1002,
    productId: 102,
    quantity: 2,
    status: "pending",
  },
];
```

---

## 6. Get an ID Using a Generic Constraint

```ts
function getId<T extends { id: number }>(item: T): number {
  return item.id;
}
```

Usage:

```ts
const userId = getId(users[0]);
const productId = getId(products[0]);
const orderId = getId(orders[0]);

console.log(userId);    // 1
console.log(productId); // 101
console.log(orderId);   // 1001
```

The function accepts all three types because they contain `id: number`.

Invalid usage:

```ts
getId({
  name: "Laptop",
  price: 50000,
});
```

Error:

```ts
Property 'id' is missing.
```

---

## 7. Find an Item by ID

```ts
function findItemById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}
```

Usage:

```ts
const foundUser = findItemById(users, 1);
// User | undefined

const foundProduct = findItemById(products, 101);
// Product | undefined

const foundOrder = findItemById(orders, 1002);
// Order | undefined
```

TypeScript preserves the correct returned type.

```ts
if (foundUser) {
  console.log(foundUser.email);
}

if (foundProduct) {
  console.log(foundProduct.price);
}

if (foundOrder) {
  console.log(foundOrder.status);
}
```

---

## 8. Remove an Item by ID

```ts
function removeItemById<T extends { id: number }>(
  items: T[],
  id: number
): T[] {
  return items.filter((item) => item.id !== id);
}
```

Usage:

```ts
const remainingUsers = removeItemById(users, 1);
// User[]

const remainingProducts = removeItemById(products, 101);
// Product[]

const remainingOrders = removeItemById(orders, 1002);
// Order[]
```

---

## 9. Update an Item by ID

```ts
function updateItemById<T extends { id: number }>(
  items: T[],
  id: number,
  updates: Partial<T>
): T[] {
  return items.map((item) =>
    item.id === id
      ? { ...item, ...updates }
      : item
  );
}
```

Update a user:

```ts
const updatedUsers = updateItemById(users, 1, {
  name: "Aketi Sai Krishna",
});
```

Update a product:

```ts
const updatedProducts = updateItemById(products, 101, {
  price: 45000,
});
```

Update an order:

```ts
const updatedOrders = updateItemById(orders, 1002, {
  status: "shipped",
});
```

TypeScript rejects invalid properties:

```ts
updateItemById(products, 101, {
  email: "product@example.com",
});
```

Error:

```ts
'email' does not exist in type 'Partial<Product>'.
```

---

## 10. Prevent the ID from Being Updated

The previous function allows the caller to provide a new `id`.

```ts
updateItemById(products, 101, {
  id: 999,
});
```

We can prevent this with `Omit`.

```ts
function updateItemById<T extends { id: number }>(
  items: T[],
  id: number,
  updates: Partial<Omit<T, "id">>
): T[] {
  return items.map((item) =>
    item.id === id
      ? { ...item, ...updates }
      : item
  );
}
```

Valid:

```ts
updateItemById(products, 101, {
  price: 48000,
});
```

Invalid:

```ts
updateItemById(products, 101, {
  id: 999,
});
```

`Omit<T, "id">` removes `id` from the allowed update properties.

`Partial` makes the remaining properties optional.

---

## 11. Reusable Constraint Type

Instead of repeating this:

```ts
T extends { id: number }
```

We can create a reusable type:

```ts
type Identifiable = {
  id: number;
};
```

Use it as a generic constraint:

```ts
function findById<T extends Identifiable>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}
```

These two constraints mean the same thing:

```ts
T extends { id: number }
```

```ts
T extends Identifiable
```

---

## 12. Multiple Property Constraints

A generic constraint can require multiple properties.

```ts
function displayItem<
  T extends {
    id: number;
    name: string;
  }
>(item: T): string {
  return `${item.id} - ${item.name}`;
}
```

Valid:

```ts
displayItem({
  id: 101,
  name: "Laptop",
  price: 50000,
});
```

Invalid:

```ts
displayItem({
  id: 101,
  price: 50000,
});
```

The second object does not contain `name`.

---

## 13. Generic Constraints with `keyof`

We can restrict one generic using another generic.

```ts
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

Explanation:

```ts
T
```

Represents the object type.

```ts
keyof T
```

Creates a union of all keys of `T`.

```ts
K extends keyof T
```

Restricts `K` to valid keys of `T`.

```ts
T[K]
```

Represents the value type of the selected property.

Usage:

```ts
const user: User = {
  id: 1,
  name: "Sai Krishna",
  email: "sai@example.com",
};

const userName = getProperty(user, "name");
// string

const userId = getProperty(user, "id");
// number
```

Invalid key:

```ts
getProperty(user, "price");
```

Error:

```ts
Argument of type '"price"' is not assignable to keyof User.
```

---

## 14. Generic Constraint with `string | number`

Sometimes IDs may be numbers or strings.

```ts
type HasId = {
  id: string | number;
};

function getFlexibleId<T extends HasId>(
  item: T
): string | number {
  return item.id;
}
```

Usage:

```ts
getFlexibleId({
  id: 101,
  name: "Laptop",
});

getFlexibleId({
  id: "USER-101",
  name: "Sai",
});
```

For stronger return-type inference, make the ID type generic too:

```ts
function getFlexibleId<
  ID extends string | number,
  T extends { id: ID }
>(item: T): ID {
  return item.id;
}
```

Now TypeScript preserves whether the returned ID is a `string` or `number`.

---

## 15. Common Mistakes

### Mistake 1: Using an unrestricted generic

Incorrect:

```ts
function getId<T>(item: T): number {
  return item.id;
}
```

Correct:

```ts
function getId<T extends { id: number }>(
  item: T
): number {
  return item.id;
}
```

### Mistake 2: Forgetting the array type

Incorrect:

```ts
function findById<T extends { id: number }>(
  items: T,
  id: number
) {
  return items.find((item) => item.id === id);
}
```

Correct:

```ts
function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}
```

### Mistake 3: Returning only `T`

Incorrect:

```ts
function findById<T extends { id: number }>(
  items: T[],
  id: number
): T {
  return items.find((item) => item.id === id);
}
```

`find()` can return `undefined`.

Correct:

```ts
function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}
```

### Mistake 4: Using `any`

Avoid:

```ts
function getId(item: any): any {
  return item.id;
}
```

This removes type safety.

Prefer:

```ts
function getId<T extends { id: number }>(
  item: T
): number {
  return item.id;
}
```

---

# Part 2: Interview Questions

## Beginner Level

### 1. What is a generic constraint?

A generic constraint limits the types that can be passed to a generic while preserving reusability and type inference.

```ts
function getId<T extends { id: number }>(item: T) {
  return item.id;
}
```

### 2. What does `extends` mean in a generic constraint?

It means the generic type must satisfy or be assignable to the specified requirement.

```ts
T extends { id: number }
```

`T` must contain an `id` property of type `number`.

### 3. Why is a generic constraint needed?

Without a constraint, TypeScript does not know which properties exist on a generic type.

```ts
function getId<T>(item: T) {
  return item.id;
}
```

This fails because `T` could be any type.

### 4. Does `extends` always mean class inheritance?

No. In generic constraints, it means the supplied type must satisfy the required structure.

### 5. Can an object contain additional properties beyond the constraint?

Yes. The constraint defines only the minimum required structure.

```ts
getId({
  id: 1,
  name: "Sai",
  email: "sai@example.com",
});
```

---

## Intermediate Level

### 6. What is the return type of `find()` in a generic function?

It is:

```ts
T | undefined
```

The item might not exist.

### 7. What is the difference between a normal object parameter and a constrained generic?

Normal object parameter:

```ts
function returnItem(
  item: { id: number }
): { id: number } {
  return item;
}
```

This return type only guarantees `id`.

Constrained generic:

```ts
function returnItem<T extends { id: number }>(
  item: T
): T {
  return item;
}
```

This preserves the complete object type.

### 8. Can an interface or type alias be used as a generic constraint?

Yes.

```ts
interface Identifiable {
  id: number;
}

function getItem<T extends Identifiable>(item: T): T {
  return item;
}
```

### 9. What does `K extends keyof T` mean?

It means `K` must be one of the valid property keys of `T`.

```ts
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

### 10. Why use `Partial<Omit<T, "id">>` for updates?

* `Omit<T, "id">` removes `id`.
* `Partial` makes all remaining properties optional.

It permits partial updates while preventing the ID from being changed.

---

## Hard Level

### 11. How can a function support both string and number IDs?

```ts
function getId<
  ID extends string | number,
  T extends { id: ID }
>(item: T): ID {
  return item.id;
}
```

The `ID` generic is restricted to `string | number`.

### 12. How do generic constraints preserve type inference?

TypeScript infers `T` from the supplied value and checks whether it satisfies the constraint. The complete inferred type remains available inside the return type.

```ts
const product = findById(products, 101);
```

The result is inferred as:

```ts
Product | undefined
```

### 13. What is the difference between `keyof T` and `K extends keyof T`?

`keyof T` creates a union of valid keys.

For a `User`:

```ts
type UserKeys = keyof User;
```

The result is:

```ts
"id" | "name" | "email"
```

`K extends keyof T` creates a generic type that is restricted to those valid keys.

### 14. Can one generic constrain another generic?

Yes.

```ts
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

`K` is constrained by the keys of `T`.

### 15. Why are generic constraints better than `any`?

Generic constraints provide reusability while preserving compile-time type checking, property validation, autocomplete, and correct return-type inference. `any` disables these protections.

---

## Practical Interview Questions

### 16. Create a reusable function that finds a user, product, or order by ID.

```ts
function findItemById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}
```

### 17. Create a function that removes an item by ID.

```ts
function removeItemById<T extends { id: number }>(
  items: T[],
  id: number
): T[] {
  return items.filter((item) => item.id !== id);
}
```

### 18. Create a function that accepts only objects containing `id` and `name`.

```ts
function displayItem<
  T extends {
    id: number;
    name: string;
  }
>(item: T): string {
  return `${item.id} - ${item.name}`;
}
```

### 19. Create a function that safely gets an object property.

```ts
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}
```

### 20. Create an update function that prevents changing the ID.

```ts
function updateItemById<T extends { id: number }>(
  items: T[],
  id: number,
  updates: Partial<Omit<T, "id">>
): T[] {
  return items.map((item) =>
    item.id === id
      ? { ...item, ...updates }
      : item
  );
}
```
