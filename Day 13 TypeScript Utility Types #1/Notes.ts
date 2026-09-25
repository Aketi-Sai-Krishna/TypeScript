Day 18 — TypeScript Utility Types #1
Topics
- Partial<T>
- Required<T>
- Readonly<T>
- Pick<T, Keys>
- Omit<T, Keys>

What are utility types?
TypeScript utility types create new types by transforming existing types.
They help us:
- avoid duplicating interfaces;
- reuse existing models safely;
- create API request and response types;
- define React component props;
- represent create, update, and read operations.
We will use this model throughout the notes:
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}
1. Partial<T>
Partial<T> makes every property in T optional.
type ProductUpdate = Partial<Product>;
The resulting type behaves like this:
type ProductUpdate = {
  id?: number;
  name?: string;
  price?: number;
  inStock?: boolean;
};
Practical use
It is useful for update forms and PATCH requests because the user may update only one or two fields.
const changes: ProductUpdate = {
  name: "Gaming Laptop",
  price: 65000,
};
2. Required<T>
Required<T> makes every property in T mandatory, including properties that were originally optional.
interface Profile {
  name?: string;
  email?: string;
  phone?: string;
}

type CompleteProfile = Required<Profile>;
The resulting type behaves like this:
type CompleteProfile = {
  name: string;
  email: string;
  phone: string;
};
Practical use
It is useful when incomplete form data must become complete before final submission.
const profile: CompleteProfile = {
  name: "Sai Krishna",
  email: "sai@example.com",
  phone: "9876543210",
};
3. Readonly<T>
Readonly<T> prevents the top-level properties of a type from being reassigned.
type ReadonlyProduct = Readonly<Product>;

const product: ReadonlyProduct = {
  id: 1,
  name: "Laptop",
  price: 50000,
  inStock: true,
};
Direct mutation is not allowed:
product.price = 55000;
// Error: Cannot assign to 'price' because it is a read-only property.
Create a new object instead:
const updatedProduct: ReadonlyProduct = {
  ...product,
  price: 55000,
};
Important point
Readonly<T> is shallow. It protects top-level properties, but it does not automatically make every nested property readonly.
Practical use
- React state
- configuration objects
- API data that should not be mutated
- immutable application models
4. Pick<T, Keys>
Pick<T, Keys> creates a new type containing only the selected properties.
type ProductCardProps = Pick<Product, "id" | "name" | "price">;
The resulting type is:
type ProductCardProps = {
  id: number;
  name: string;
  price: number;
};
React example
function ProductCard({ id, name, price }: ProductCardProps) {
  return (
    <article>
      <p>Product ID: {id}</p>
      <h2>{name}</h2>
      <p>₹{price}</p>
    </article>
  );
}
Practical use
- React component props
- table rows and cards
- smaller view models
- selecting safe public fields

5. Omit<T, Keys>
Omit<T, Keys> creates a new type by removing selected properties.
type CreateProductRequest = Omit<Product, "id">;
The resulting type is:
type CreateProductRequest = {
  name: string;
  price: number;
  inStock: boolean;
};
The backend or database usually creates the id, so the frontend does not need to send it.
const newProduct: CreateProductRequest = {
  name: "Laptop",
  price: 50000,
  inStock: true,
};
Practical use
- removing server-generated properties;
- removing sensitive fields;
- creating request payload types;
- reusing most of an existing model.
Pick vs Omit
Utility type	Meaning	Best used when
Pick<T, K>	Keep only the selected properties	You need a small number of properties
Omit<T, K>	Remove the selected properties	You need most properties except a few


Combining utility types
Utility types can be nested to perform multiple transformations.
type UpdateProductRequest = Partial<
  Omit<Product, "id" | "inStock">
>;
TypeScript evaluates the inner utility type first.
Step 1 — Apply Omit
Omit<Product, "id" | "inStock">
Result:
{
  name: string;
  price: number;
}
Step 2 — Apply Partial
Partial<{
  name: string;
  price: number;
}>
Final result:
type UpdateProductRequest = {
  name?: string;
  price?: number;
};
Valid examples:
const update1: UpdateProductRequest = {
  name: "Gaming Laptop",
};

const update2: UpdateProductRequest = {
  price: 65000,
};

const update3: UpdateProductRequest = {
  name: "Gaming Laptop",
  price: 65000,
};
Invalid examples:
const update4: UpdateProductRequest = {
  id: 10, // Error: id was omitted
};

const update5: UpdateProductRequest = {
  inStock: true, // Error: inStock was omitted
};
