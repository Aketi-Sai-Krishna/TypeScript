Interview Answers

1. What is a generic in TypeScript?

A generic is a type placeholder that lets reusable code work with multiple types while maintaining type safety.

2. Why are generics safer than any?

any disables type checking and loses type information. A generic accepts different types while preserving the exact type supplied.

3. What does T represent in identity<T>()?

T is a generic type parameter. TypeScript replaces it with the actual inferred or explicitly supplied type.

4. What is the difference between T[] and Array<T>?

There is no functional difference. Both represent an array whose elements have type T.

5. Is the comma required in <T,>?

It is generally optional in .ts files. It is preferred for generic arrow functions in .tsx files so the parser does not mistake <T> for JSX.

6. How does TypeScript infer a generic type?

It examines the argument supplied to the generic function. For example, in identity("Hello"), TypeScript infers T as string.

7. What is a generic type alias?

It is a type alias containing one or more type parameters, such as ApiResponse<T>, allowing part of its structure to change while the rest remains reusable.

8. What is a generic interface?

It is an interface parameterized by a type, such as PaginatedData<T>, which can represent paginated employees, products, users, or other values.

9. What is the difference between a union and a generic?

A union restricts a value to specified alternative types. A generic works with varying types and preserves relationships between inputs and outputs.

10. Why does getLastElement<T>() return T | undefined?

An empty array has no last element, so the function may return undefined.

11. What happens if we use PaginatedData<Employee[]> when items is T[]?

T becomes Employee[], which makes items an Employee[][]. The correct usage is PaginatedData<Employee>.

12. What is a generic constraint?

A generic constraint limits which types a generic can accept by requiring specific properties or behavior.

13. Why is T extends { id: number } required in findItemById()?

It guarantees that every item has a numeric id, allowing TypeScript to safely permit access to item.id.

14. How do generics preserve parameter and return relationships?

By using the same type parameter in both positions. In (value: T): T, the return type must match the inferred input type.

15. How would you create a reusable generic React list component?

Declare props such as items: T[] and renderItem: (item: T) => ReactNode, then define the component with the same T. TypeScript infers each rendered item's type.

16. When should generics not be used?

Do not use a generic if the operation only makes sense for one concrete type or if the generic does not create a useful relationship between types.

Part 4: Practice Problems and Correct Solutions

Problem 1: Return a value

function returnValue<T>(value: T): T {
  return value;
}

Arrow-function version for .tsx:

const returnValue = <T,>(value: T): T => {
  return value;
};

Problem 2: Return the last element

function getLastElement<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

Problem 3: Generic API response

type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};

const userResponse: ApiResponse<User> = {
  data: {
    id: 1,
    name: "Sai Krishna",
    email: "sai@example.com",
  },
  success: true,
  message: "User fetched successfully",
};

const productResponse: ApiResponse<Product[]> = {
  data: [{ id: 101, name: "Laptop", price: 50000 }],
  success: true,
  message: "Products fetched successfully",
};

Problem 4: Paginated employees

interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

const employees: PaginatedData<Employee> = {
  items: [
    {
      id: 1,
      name: "Sai Krishna",
      department: "Frontend",
      salary: 1200000,
    },
  ],
  total: 1,
  page: 1,
  limit: 10,
};

Problem 5: Find an item by ID

function findItemById<T extends { id: number }>(
  items: T[],
  requiredId: number
): T | undefined {
  return items.find((item) => item.id === requiredId);
}

const selectedUser = findItemById(users, 1);
// User | undefined

const selectedProduct = findItemById(products, 101);
// Product | undefined

Final revision shortcut

<T> declares a generic type parameter.

T preserves the exact supplied type.

T[] means an array of T values.

<T,> is preferred for arrow functions in .tsx files.

T extends SomeShape applies a constraint.

Use generics when types vary but their relationship must remain intact.

Use unions when values must be restricted to known alternatives.