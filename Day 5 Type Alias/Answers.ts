
//Interview Questions & Answers

// #Practical Answer

type Address = {
   readonly id : number,
   houseNumber : number,
   street : string,
   city : string,
   state : string,
   country : string,
   pincode : number,
   landMark ?: string,
   defaultAddress : boolean
}

type Company = {
   readonly companyId : number,
   companyName : string,
   email : string,
   phoneNumber : string,
   website ?: string,
   industry : string,
   numberofEmployees : number,
   companyAddress : Address,
   companyStatus : "verified" | "NotVerified"
}


type User = {
  readonly id : number,
  firstName : string,
  lastName : string,
  email : string,
  phoneNumber : string,
  age : number,
  accountStatus : boolean,
  userRole : "admin" | "customer",
  profileImage ?: string,
  company ?: Company,      
  multipleAddress : Address[],  
  defaultAddress : Address,
  accountCreationDate : number
}

type ProductDimensions = {
  height : number,
  width : number,
  depth : number
}


type Product = {
  readonly id : number,
  productName : string,
  description : string,
  price : number,
  discountPrice ?: number,
  category : string,
  brand: string,
  stockquantity : number,
  inStock : boolean,
  images : string[],
  company : Company,
  productDimensions: ProductDimensions,
  Productweight : number,
  readonly SKU : string
}

type OrderItem = {
  product: Product;
  quantity: number;
  priceAtTimeOfPurchase: number;
};


type Order = {
    readonly id : number,
    customer : User,
    orderItem : OrderItem[],
    shippingAddress : Address,
    billingAddress : Address,
    totalProductPrice : number,
    discountAmount ?: number,
    shippingCharge : number,
    finalAmount : number,
    paymentStatus : "Done" | "Pending",
    orderStatus : "Delivered" | "NotDelivered",
    OrderCreationData : string,
    deliveryDate ?: string,
    trackingNumber ?: number
}


type APIResponse1<User> = {
   success : boolean,
   message : string,
   data : User[],
   error ?: null | boolean
}

type APIResponse2<Product> = {
   success : boolean,
   message : string,
   data : Product[],
   error ?: null | boolean
}

type APIResponse3<Order> = {
   success : boolean,
   message : string,
   data : Order[],
   error ?: null | boolean
}



// ## 🟢 Beginner

// ### Q1. What is a `type` alias in TypeScript?

// **Answer:** A `type` alias allows us to create a custom name for a TypeScript type and reuse it throughout the application.

// ---

// ### Q2. How do you create a custom object type?

// **Answer:** We use the `type` keyword followed by the type name and define the object's properties inside `{}`.

// ```ts
// type User = {
//   id: number;
//   name: string;
// };
// ```

// ---

// ### Q3. How do you reuse a custom type?

// **Answer:** We use the custom type wherever we need the same structure.

// ```ts
// type User = {
//   id: number;
//   name: string;
// };

// const user: User = {
//   id: 1,
//   name: "Krishna"
// };
// ```

// ---

// ### Q4. What does `?` mean in a TypeScript object type?

// **Answer:** `?` makes a property optional, meaning the property can be omitted when creating the object.

// ```ts
// type User = {
//   id: number;
//   email?: string;
// };
// ```

// ---

// ### Q5. What does `readonly` mean in TypeScript?

// **Answer:** `readonly` prevents a property from being modified after the object has been initialized.

// ```ts
// type User = {
//   readonly id: number;
// };
// ```

// ---

// ## 🟡 Intermediate

// ### Q6. Can one `type` be used inside another `type`?

// **Answer:** Yes. This is commonly used to create nested and reusable types.

// ```ts
// type Address = {
//   city: string;
// };

// type User = {
//   name: string;
//   address: Address;
// };
// ```

// ---

// ### Q7. How do you create an array of custom types?

// **Answer:** We use the custom type followed by `[]`.

// ```ts
// type User = {
//   id: number;
//   name: string;
// };

// const users: User[] = [];
// ```

// ---

// ### Q8. Why is reusing types better than duplicating object structures?

// **Answer:** Reusing types reduces duplicate code, improves consistency, and makes the application easier to maintain when the data structure changes.

// ---

// ### Q9. Can a type contain a union type?

// **Answer:** Yes. A property inside a type can use a union type to restrict it to specific values.

// ```ts
// type User = {
//   role: "admin" | "customer";
// };
// ```

// ---

// ### Q10. What is type composition?

// **Answer:** Type composition means building a larger type by combining or reusing smaller types.

// ```ts
// type Address = {
//   city: string;
// };

// type User = {
//   name: string;
//   address: Address;
// };
// ```

// ---

// ## 🔴 Hard

// ### Q11. Why would you create an `OrderItem` type instead of putting `Product[]`, `quantity`, and `price` directly inside `Order`?

// **Answer:** Because quantity and purchase price belong to each individual product. `OrderItem` keeps the product, quantity, and price together and allows an order to contain multiple items correctly.

// ```ts
// type OrderItem = {
//   product: Product;
//   quantity: number;
//   priceAtTimeOfPurchase: number;
// };

// type Order = {
//   orderItems: OrderItem[];
// };
// ```

// ---

// ### Q12. Why should an order store `priceAtTimeOfPurchase` instead of only using `Product.price`?

// **Answer:** Because a product's current price can change after the order is placed. The order must preserve the exact price the customer paid.

// ---

// ### Q13. What is wrong with using `string` for a property such as `userRole`?

// **Answer:** Using `string` allows any string value. If only specific roles are valid, a union type provides better type safety.

// ```ts
// role: "admin" | "customer";
// ```

// ---

// ### Q14. Why is `Product[]` not enough to represent products inside an order?

// **Answer:** `Product[]` only represents multiple products. It does not associate each product with its quantity and price at the time of purchase. An `OrderItem` type solves this by grouping those properties together.

// ---

// ### Q15. Why is a single `APIResponse` type with `User[]` as its data property not reusable?

// **Answer:** Because the API may return different types of data, such as `User[]`, `Product[]`, or `Order[]`. A reusable API response needs a way to accept different data types, which is where **Generics** are used.

// ---

// # 🎯 Day 5 Key Takeaway

// The most important concept from today is:

// ```text
// type
//  ↓
// Create custom types
//  ↓
// Reuse types
//  ↓
// Nest types
//  ↓
// Use optional properties
//  ↓
// Protect properties with readonly
//  ↓
// Compose real-world data structures
// ```

// And the **big transition to remember**:

// ```text
// Day 5
// type User
// type Product
// type Order
//         ↓
// Day 6+
// How do I make these types
// even more reusable?
//         ↓
// Generics
// ```

