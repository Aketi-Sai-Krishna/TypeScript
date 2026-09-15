TypeScript Generics

1. What are generics?
Generics let us write reusable code that works with different types while preserving type safety.

function identity<T>(value: T): T {
  return value;
}

const username = identity("Sai Krishna"); // string
const age = identity(24);                 // number
const active = identity(true);            // boolean
T is a type parameter—a placeholder for the actual type supplied when the function is called.

identity("Sai"): T becomes string.

identity(24): T becomes number.

identity(true): T becomes boolean.

2. Why do generics exist?
Without generics, we might duplicate the same function for different types:

function returnString(value: string): string {
  return value;
}

function returnNumber(value: number): number {
  return value;
}
Using any removes duplication but also removes type safety:

function returnValue(value: any): any {
  return value;
}

const result = returnValue("TypeScript");
result.toFixed(2); // Allowed by TypeScript, but fails at runtime
A generic gives us both reusability and type safety:

function returnValue<T>(value: T): T {
  return value;
}

const result = returnValue("TypeScript");
// result is string
Generics are useful when the input type and output type are related.

3. Understanding the syntax
function identity<T>(value: T): T {
  return value;
}
Syntax	Meaning
<T>	Declares the generic type parameter
value: T	The parameter uses that type
: T	The function returns the same type
T is a convention, not a keyword. A descriptive name can also be used:

function identity<ValueType>(value: ValueType): ValueType {
  return value;
}
Common generic names:

Name	Common meaning
T	Type
U	Second type
K	Key
V	Value
E	Element
R	Result or return type
4. Generic function declarations
function getLastElement<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

const lastNumber = getLastElement([10, 20, 30]);
// number | undefined

const lastSkill = getLastElement(["React", "TypeScript"]);
// string | undefined
The return type includes undefined because the array may be empty.

5. Generic arrow functions
In a .ts file, the comma is optional:

const returnValue = <T>(value: T): T => {
  return value;
};
In a React .tsx file, prefer <T,>:

const returnValue = <T,>(value: T): T => {
  return value;
};
The comma tells the parser that <T,> declares a generic rather than a JSX element.

Normal function declarations do not need the comma:

function returnValue<T>(value: T): T {
  return value;
}
6. Type inference and explicit generic arguments
TypeScript can usually infer the generic type:

const value1 = identity("Hello"); // T is string
const value2 = identity(100);     // T is number
We can also supply it explicitly:

const value1 = identity<string>("Hello");
const value2 = identity<number>(100);
Prefer inference when the type is already clear.

7. Multiple generic parameters
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair1 = createPair("Sai", 24);
// [string, number]

const pair2 = createPair(101, true);
// [number, boolean]
T remembers the first argument's type, while U remembers the second argument's type.

8. Generic type aliases
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
The response structure stays the same, while the type of data can change.

type User = {
  id: number;
  name: string;
  email: string;
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
For an array:

type Product = {
  id: number;
  name: string;
  price: number;
};

const productResponse: ApiResponse<Product[]> = {
  data: [
    { id: 101, name: "Laptop", price: 50000 },
    { id: 102, name: "Mobile", price: 25000 },
  ],
  success: true,
  message: "Products fetched successfully",
};
9. Generic interfaces
interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
Usage:

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const employeeData: PaginatedData<Employee> = {
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
Because the interface already declares items: T[], use PaginatedData<Employee>, not PaginatedData<Employee[]>. The latter would make items an Employee[][].

10. Generic arrays
These declarations are equivalent:

const numbers1: number[] = [10, 20, 30];
const numbers2: Array<number> = [10, 20, 30];
Array<T> is a built-in generic type.

Other built-in generic types include:

Promise<User>
Map<string, number>
Set<number>
11. Generic constraints
A completely unrestricted T does not guarantee that a property exists:

function findItemById<T>(items: T[], requiredId: number): T | undefined {
  return items.find((item) => item.id === requiredId);
  // Error: Property 'id' does not exist on type 'T'
}
Add a constraint:

function findItemById<T extends { id: number }>(
  items: T[],
  requiredId: number
): T | undefined {
  return items.find((item) => item.id === requiredId);
}
T extends { id: number } means that T may be any object type, but it must contain a numeric id property.

const users: User[] = [
  { id: 1, name: "Sai Krishna", email: "sai@example.com" },
];

const selectedUser = findItemById(users, 1);
// User | undefined

const products: Product[] = [
  { id: 101, name: "Laptop", price: 50000 },
];

const selectedProduct = findItemById(products, 101);
// Product | undefined
The function preserves the specific object type passed to it.

12. Generics versus unions
A union permits one of several predefined types:

function display(value: string | number): string | number {
  return value;
}

const result = display("Hello");
// string | number
A generic preserves the exact relationship between input and output:

function display<T>(value: T): T {
  return value;
}

const result = display("Hello");
// string
Use a union when only particular types are valid. Use a generic when code must work with many types and preserve their relationships.

13. Real React example
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}

<List
  items={[
    { id: 1, name: "Sai Krishna" },
    { id: 2, name: "Arjun" },
  ]}
  renderItem={(user) => <p key={user.id}>{user.name}</p>}
/>;
TypeScript infers the type of user from the items array.

14. When should we use generics?
Use generics when:

The same logic should work with multiple types.

The output type depends on the input type.

Creating reusable React components or custom hooks.

Typing API responses, pagination, tables, forms, and dropdowns.

Type safety is required without duplicating code.

Do not add generics when the function works with only one meaningful type:

function calculateTax(price: number): number {
  return price * 0.18;
}
Key takeaway
function identity<T>(value: T): T {
  return value;
}
This means: “Give me a value of some type, and I will return that same type.”

Generics provide:

Reusability

Type safety

Preservation of type information