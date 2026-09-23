Questions


1. What is a generic interface?

A generic interface is a reusable interface that accepts one or more type parameters.

interface ApiResponse<T> {
  data: T;
}

2. What does T mean?

T is a conventional name for a type parameter. It acts as a placeholder until a real type is supplied.

3. What is the difference between these two types?

ApiResponse<Category>
ApiResponse<Category[]>

The first response contains one category. The second contains an array of categories.

4. Why use a generic instead of any?

Generics preserve the actual data type and provide compile-time checks, autocomplete, safe refactoring, and clearer documentation. any disables those protections.

Intermediate

5. How does React's useState use generics?

useState<T> uses T as the state value type. For example, useState<Category[]>([]) ensures that the state contains only a category array.

6. Why do we write useState<Category | null>(null)?

The initial value is null, but the state will later store a Category. The union describes both valid states.

7. How does a generic custom hook preserve its result type?

The hook accepts and returns values connected to the same T:

function useApi<T>(
  request: () => Promise<ApiResponse<T>>
): UseApiResult<T>

If the request returns ApiResponse<Category[]>, the hook data becomes Category[] | null.

8. Can TypeScript infer generic types?

Yes. TypeScript can infer a generic type from function arguments or component props. An explicit type is useful when inference is impossible or unclear, such as an empty array, null, or external API response.

Hard

9. Does ApiResponse<Category[]> validate JSON at runtime?

No. TypeScript types only exist during development and are removed during compilation. Runtime validation requires a schema validator or manual type guard.

10. How would you design safer success and failure responses?

Use a discriminated union:

interface SuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

interface ErrorResponse {
  success: false;
  data: null;
  message: string;
  errorCode: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

TypeScript can narrow the response using success:

function handleResponse(response: ApiResponse<Category[]>) {
  if (response.success) {
    response.data.forEach((category) => {
      console.log(category.name);
    });
  } else {
    console.log(response.errorCode);
  }
}

11. How can a generic be restricted?

Use a generic constraint:

function findById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

This function accepts any object type as long as it has a numeric id.

12. Can an interface accept more than one generic parameter?

Yes:

interface ApiResponse<TData, TMeta> {
  data: TData;
  meta: TMeta;
  message: string;
  success: boolean;
}

Part 3 — Practical Problems

Problem 1 — Beginner

Create a User interface and an ApiResponse<User> containing one user.

Expected fields:

id
name
email

Problem 2 — Beginner

Create an ApiResponse<Category[]> containing three categories. Use map() to print every category name.

Problem 3 — Intermediate

Create this generic interface:

interface PaginatedResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

Then create:

ApiResponse<PaginatedResponse<Category>>

Problem 4 — Intermediate

Create a generic function:

function getFirstItem<T>(
  response: ApiResponse<T[]>
): T | undefined

It should return the first item from response.data.


Problem 5 — Advanced

Create a generic React component named SelectList<T>.

Requirements:

Accept an array of T.

Accept a function for obtaining each item's label.

Accept a function for obtaining each item's ID.

Accept an onSelect callback receiving T.

Use it with Category[].

Starter type:

interface SelectListProps<T> {
  items: T[];
  getLabel: (item: T) => string;
  getId: (item: T) => number;
  onSelect: (item: T) => void;
}



Quick Revision Q&A

Q: What is a generic?
A: A reusable type mechanism that works with different types while preserving type safety.

Q: What is T?
A: A placeholder for a type supplied later.

Q: What does ApiResponse<Category[]> mean?
A: The response's data property must contain an array of categories.

Q: What does useState<Category[]>([]) mean?
A: The React state must contain a category array.

Q: What does useApi<Category[]> return for data?
A: In our hook design, it returns Category[] | null.

Q: Why not use any?
A: any removes type checking; generics retain the exact type.

Q: Does a generic validate backend JSON at runtime?
A: No. Runtime validation requires a validator or type guard.

Q: When should a generic type be explicit?
A: When TypeScript cannot infer it reliably, such as empty arrays, nullable state, and external API calls.

Final Takeaway

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

The generic type travels through the entire application:

Category
→ ApiResponse<Category[]>
→ apiClient<Category[]>()
→ useApi<Category[]>()
→ useState<Category[] | null>()
→ React component
→ rendered category list

The central idea is:

A normal parameter passes a value into a function. A generic parameter passes a type through your application.