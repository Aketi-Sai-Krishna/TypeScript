
Part 3 — Interview Questions and Answers

Beginner
Q1. What are utility types in TypeScript?
Answer: Utility types are built-in generic types that transform existing types into new types without duplicating their definitions.
Q2. What does Partial<T> do?
Answer: It makes every property in T optional.
type ProductUpdate = Partial<Product>;
Q3. What does Required<T> do?
Answer: It makes every property in T required, including properties originally marked with ?.
Q4. What does Readonly<T> do?
Answer: It prevents the top-level properties in T from being reassigned.
Q5. What does Pick<T, K> do?
Answer: It creates a new type containing only the properties specified in K.
Q6. What does Omit<T, K> do?
Answer: It creates a new type containing all properties from T except the properties specified in K.
Intermediate
Q7. What is the difference between Pick and Omit?
Answer: Pick keeps selected properties, whereas Omit removes selected properties.
Q8. When should you use Partial<T> in an API?
Answer: It is commonly used for PATCH or update request payloads where the client sends only changed fields.
Q9. Why might Omit<Product, "id"> be used for a create request?
Answer: The server or database usually generates the id, so the frontend should not be required to send it.
Q10. Can utility types be combined?
Answer: Yes. They can be nested to perform multiple transformations.
type UpdateProductRequest = Partial<
  Omit<Product, "id" | "inStock">
>;

Q11. In what order are nested utility types evaluated?
Answer: TypeScript evaluates the inner type first and then applies the outer utility type.

Q12. Is Readonly<T> deeply readonly?
Answer: No. It is shallow and protects only the top-level properties. Nested objects require a custom deep-readonly type if all nested properties must be protected.

Q13. Does Partial<T> validate runtime API data?
Answer: No. TypeScript types exist only during development and are removed during compilation. Runtime validation requires tools such as Zod, Valibot, or custom validation functions.

Q14. Does Omit<User, "password"> remove a password from an existing runtime object?
Answer: No. It changes only the compile-time type. You must explicitly remove the password when constructing the runtime object.

const { password, ...safeUser } = user;
Q15. Why should utility types be based on one main domain model?
Answer: When the original model changes, derived types update automatically. This reduces duplicated types and prevents models from becoming inconsistent.

Part 4 — Practical CRUD Example
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// POST /products
type CreateProductRequest = Omit<Product, "id">;

// PATCH /products/:id
type UpdateProductRequest = Partial<
  Omit<Product, "id">
>;

// Product card component
type ProductCardProps = Pick<
  Product,
  "id" | "name" | "price"
>;

// Protected application data
type ReadonlyProduct = Readonly<Product>;


### Quick Revision

Utility type	Transformation	Common use
Partial<T>	Makes every property optional	Update forms and PATCH requests
Required<T>	Makes every property required	Completed forms and validated configuration
Readonly<T>	Prevents top-level reassignment	React state and immutable data
Pick<T, K>	Keeps selected properties	Component props and summary models
Omit<T, K>	Removes selected properties	Create requests and safe API responses


Final corrected answers
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

type ProductUpdate = Partial<Product>;

interface Profile {
  name?: string;
  email?: string;
  phone?: string;
}

type CompleteProfile = Required<Profile>;

type ProductCardProps = Pick<
  Product,
  "id" | "name" | "price"
>;

type CreateProductRequest = Omit<Product, "id">;

type UpdateProductRequest = Partial<
  Omit<Product, "id" | "inStock">
>;
