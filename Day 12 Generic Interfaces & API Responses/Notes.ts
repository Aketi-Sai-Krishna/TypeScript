Generic Interfaces & API Responses in React

Generic interfaces let us define a reusable structure once and supply the exact data type when we use it. This is especially useful for API responses, reusable hooks, React state, and shared components.

Part 1 — Topic Notes

1. The problem generics solve

Most backend responses have a common structure:

{
  data: ...,
  message: "Request completed successfully",
  success: true
}

Only the type inside data changes:

A categories endpoint returns Category[].

A users endpoint returns User[].

A product-details endpoint returns one Product.

A delete endpoint might return null.

Without generics, we would need to create a separate response interface for every endpoint. A generic interface lets us reuse one response structure while preserving type safety.

2. Creating a generic API response

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

T is a type parameter. It is a placeholder that receives a real type when the interface is used.

ApiResponse<Category[]>

In this usage:

T = Category[]

TypeScript therefore treats the result like this:

interface CategoryApiResponse {
  data: Category[];
  message: string;
  success: boolean;
}

We do not need to write CategoryApiResponse ourselves. The generic interface creates that relationship for us.

3. Corrected category response

interface Category {
  id: number;
  name: string;
  price: number;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

const categoryResponse: ApiResponse<Category[]> = {
  data: [
    {
      id: 1,
      name: "Tiles",
      price: 100,
    },
    {
      id: 2,
      name: "Paints",
      price: 250,
    },
  ],
  message: "Categories fetched successfully",
  success: true,
};

Why the original syntax needed correction

An array of objects requires square brackets for the array and curly braces for each object:

data: [
  {
    id: 1,
    name: "Tiles",
    price: 100,
  },
]

String values must be placed inside quotes:

name: "Tiles"
message: "Success"

A typed constant still requires the assignment operator:

const categoryResponse: ApiResponse<Category[]> = {
  // response object
};

Use PascalCase for interface and type names:

interface Category {}

4. One item versus multiple items

One category

const singleCategoryResponse: ApiResponse<Category> = {
  data: {
    id: 1,
    name: "Tiles",
    price: 100,
  },
  message: "Category fetched successfully",
  success: true,
};

Here:

T = Category

Therefore:

singleCategoryResponse.data; // Category

Multiple categories

const categoriesResponse: ApiResponse<Category[]> = {
  data: [
    { id: 1, name: "Tiles", price: 100 },
    { id: 2, name: "Paints", price: 250 },
  ],
  message: "Categories fetched successfully",
  success: true,
};

Here:

T = Category[]

Therefore:

categoriesResponse.data;    // Category[]
categoriesResponse.data[0]; // Category

5. A realistic React application structure

src/
├── api/
│   ├── apiClient.ts
│   └── categoryApi.ts
├── components/
│   ├── CategoryList.tsx
│   └── DataTable.tsx
├── hooks/
│   └── useApi.ts
├── types/
│   ├── api.types.ts
│   └── category.types.ts
└── App.tsx

This separates:

Data models

Shared API types

Network requests

Reusable hooks

UI components

6. Define the models

types/category.types.ts

export interface Category {
  id: number;
  name: string;
  price: number;
}

export type CreateCategoryInput = Omit<Category, "id">;

CreateCategoryInput contains:

{
  name: string;
  price: number;
}

The frontend does not send an id while creating a category because the backend normally generates it.

types/api.types.ts

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

7. Build a generic API client

api/apiClient.ts

import type { ApiResponse } from "../types/api.types";

const API_URL = "https://api.example.com";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body:
      options.body !== undefined
        ? JSON.stringify(options.body)
        : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
}

The generic parameter travels into the return type:

apiClient<Category[]>("/categories");

For this call:

T = Category[]

The return type becomes:

Promise<ApiResponse<Category[]>>

Important: TypeScript checks the expected response during development, but it does not validate external JSON at runtime. A production application may use Zod or a custom type guard for runtime validation.

8. Create category API functions

api/categoryApi.ts

import { apiClient } from "./apiClient";
import type {
  Category,
  CreateCategoryInput,
} from "../types/category.types";

export function getCategories() {
  return apiClient<Category[]>("/categories");
}

export function getCategoryById(id: number) {
  return apiClient<Category>(`/categories/${id}`);
}

export function createCategory(input: CreateCategoryInput) {
  return apiClient<Category>("/categories", {
    method: "POST",
    body: input,
  });
}

export function deleteCategory(id: number) {
  return apiClient<null>(`/categories/${id}`, {
    method: "DELETE",
  });
}

The response data type is different for each operation:

Operation

Generic argument

Response data

Get categories

Category[]

Multiple categories

Get by ID

Category

One category

Create category

Category

Created category

Delete category

null

No returned record

9. React state uses generic parameters

A simplified version of React's useState type looks like this:

function useState<T>(initialValue: T): [T, SetStateFunction<T>];

When we write:

const [categories, setCategories] = useState<Category[]>([]);

we are passing this generic type:

T = Category[]

TypeScript now knows:

categories;    // Category[]
setCategories; // accepts Category[] or an updater function

Nullable state

const [selectedCategory, setSelectedCategory] =
  useState<Category | null>(null);

We explicitly provide Category | null because the initial value alone only tells TypeScript that the state is null.

Loading and error state

const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);

For obvious initial values, TypeScript can infer the types, so these are also valid:

const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

10. Build a reusable generic API hook

hooks/useApi.ts

import { useCallback, useEffect, useState } from "react";
import type { ApiResponse } from "../types/api.types";

interface UseApiResult<T> {
  data: T | null;
  message: string;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  request: () => Promise<ApiResponse<T>>
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await request();

      if (!response.success) {
        throw new Error(response.message);
      }

      setData(response.data);
      setMessage(response.message);
    } catch (error: unknown) {
      setData(null);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    void execute();
  }, [execute]);

  return {
    data,
    message,
    loading,
    error,
    refetch: execute,
  };
}

When a component uses:

useApi<Category[]>(getCategories)

the hook receives:

T = Category[]

Therefore its data becomes:

Category[] | null

The same hook could later use User[], Product, or any other model without using any.

11. Use the generic hook in React

components/CategoryList.tsx

import { useCallback } from "react";
import { getCategories } from "../api/categoryApi";
import { useApi } from "../hooks/useApi";
import type { Category } from "../types/category.types";

export function CategoryList() {
  const requestCategories = useCallback(
    () => getCategories(),
    []
  );

  const {
    data: categories,
    message,
    loading,
    error,
    refetch,
  } = useApi<Category[]>(requestCategories);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return (
      <section>
        <p role="alert">{error}</p>
        <button type="button" onClick={() => void refetch()}>
          Try again
        </button>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return <p>No categories found.</p>;
  }

  return (
    <section>
      <h1>Categories</h1>
      <p>{message}</p>

      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} — ₹{category.price}
          </li>
        ))}
      </ul>
    </section>
  );
}

TypeScript automatically knows:

categories; // Category[] | null
category;   // Category inside map()
category.id;    // number
category.name;  // string
category.price; // number

12. Generic React table component

Generics are also useful when one component should display different data models.

components/DataTable.tsx

import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => string | number;
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={getRowKey(item)}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Use the table for categories

import { DataTable } from "./DataTable";
import type { Column } from "./DataTable";
import type { Category } from "../types/category.types";

const categoryColumns: Column<Category>[] = [
  {
    key: "name",
    header: "Category",
    render: (category) => category.name,
  },
  {
    key: "price",
    header: "Price",
    render: (category) => `₹${category.price}`,
  },
];

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({
  categories,
}: CategoryTableProps) {
  return (
    <DataTable<Category>
      data={categories}
      columns={categoryColumns}
      getRowKey={(category) => category.id}
    />
  );
}

Because the component receives Category as its generic argument, TypeScript knows that every row is a Category.

getRowKey={(category) => category.userId}

The example above produces an error because userId does not exist on Category.

13. React event generics

React event types also accept generic parameters.

Input event

function handleNameChange(
  event: React.ChangeEvent<HTMLInputElement>
) {
  console.log(event.target.value);
}

Here:

T = HTMLInputElement

This tells TypeScript that the event came from an input element.

Form event

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();
}

Select event

function handleCategoryChange(
  event: React.ChangeEvent<HTMLSelectElement>
) {
  console.log(event.target.value);
}

14. React ref generics

import { useEffect, useRef } from "react";

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} type="search" />;
}

The generic type tells React which DOM element the ref will contain:

useRef<HTMLInputElement | null>(null)

TypeScript consequently understands methods such as:

inputRef.current?.focus();
inputRef.current?.select();

15. Complete type flow

Category
   ↓
Category[]
   ↓
ApiResponse<Category[]>
   ↓
Promise<ApiResponse<Category[]>>
   ↓
useApi<Category[]>
   ↓
data: Category[] | null
   ↓
CategoryList receives Category[]
   ↓
map() gives each item the Category type
   ↓
The UI safely renders id, name, and price

This is the main idea of real application typing: the data model travels consistently from the API layer to the UI.

16. Generic parameter versus function parameter

Generic type parameter

function identity<T>(value: T): T {
  return value;
}

In this call:

identity<Category>(category);

Category is a generic type argument.

category is a runtime function argument.

T becomes Category during type checking.

Generic types are removed when TypeScript is compiled to JavaScript. Runtime values remain.

17. When to explicitly provide the generic type

Let TypeScript infer obvious values:

const [name, setName] = useState("Sai");

TypeScript correctly infers string.

Provide the generic type for an empty array:

const [categories, setCategories] =
  useState<Category[]>([]);

Provide it for nullable state:

const [category, setCategory] =
  useState<Category | null>(null);

Provide it when the API response cannot be inferred from the URL:

apiClient<Category[]>("/categories");

18. Common mistakes

Mistake 1 — Using any

interface ApiResponse {
  data: any;
}

This removes type safety. Prefer:

interface ApiResponse<T> {
  data: T;
}

Mistake 2 — Confusing one object with an array

ApiResponse<Category>   // One category
ApiResponse<Category[]> // Multiple categories

Mistake 3 — Missing object braces inside an array

Incorrect:

data: [id: 1, name: "Tiles"]

Correct:

data: [{ id: 1, name: "Tiles", price: 100 }]

Mistake 4 — Storing an array in response-object state

Incorrect:

const [response, setResponse] =
  useState<ApiResponse<Category[]>>([]);

Correct—store the complete response:

const [response, setResponse] =
  useState<ApiResponse<Category[]> | null>(null);

Or store only the returned categories:

const [categories, setCategories] =
  useState<Category[]>([]);

Mistake 5 — Believing TypeScript validates server JSON

apiClient<Category[]>("/categories")

This describes the expected response to TypeScript. It does not prove that the server returned the correct fields at runtime.

