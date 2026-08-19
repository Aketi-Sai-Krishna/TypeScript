// let username: string | null = null;

// console.log(username);

// username = "moddakudu";

// console.log(username);


// let numbers: number[] = [10,20,30,40]; //Number string

// let strings: string[] = ["s","a","i"]; //array string

// //objects

// let user : { 
//               name : string,
//               age : number
//             } = { name : "Kris",
//                  age : 24
//             }


// //Array of objects
    
// let candidate : {
//                 id : number,
//                 company: string
//                } [] =  [
//                 {
//                  id: 1,
//                 company: "abc"
//                 },
//                 {
//                  id: 2,
//                 company: "xyz"
//                 }
//                ];

// //Normal array

// let credits : (string | number)[] = ["sai", 23];

// let credits1 : (string | number)[] = [45, "sai", "kft", 54];

// //Tuple

// let strict : [string , number] = [24, "wrg"];


// //practice day 3

// //Create a users array containing 3 users.

// const users : {
//     id: number,
//     name : string,
//     email : string,
//     age : number,
//     isActive : boolean
// }[] =  [
//             {
//                 id: 1,
//                 name : "user1",
//                 email : "email1@gmail.com",
//                 age : 1,
//                 isActive : true
//             },
//                 {
//                 id: 2,
//                 name : "user2",
//                 email : "email2@gmail.com",
//                 age : 2,
//                 isActive : true
//             },
//                 {
//                 id: 3,
//                 name : "user3",
//                 email : "email3@gmail.com",
//                 age : 3,
//                 isActive : false
//             },
//         ];


// //Create a products array containing 3 products.

// const products : {
//     id : number
//     name : string
//     price : number
//     category : string
//     inStock : boolean
// }[] =  [
//             {
//             id : 1,
//             name: "product1",
//             price : 1000,
//             category : "Grocery",
//             inStock : true
//             },
//              {
//             id : 2,
//             name: "product2",
//             price : 2000,
//             category : "Grocery2",
//             inStock : false
//             },
//              {
//             id : 3,
//             name: "product3",
//             price : 3000,
//             category : "Grocery3",
//             inStock : false
//             },
//        ];


// //where customer is a nested object and items is an array of objects.

// const order : {
//     orderId : number,
//     customer: {
//         id: number,
//         name: string
//     },
//     items: {
//          item1: string,
//          item2: string,
//          item3 : string
//     }[],
//     total : number,
//     status : boolean
// } = {
//     orderId : 1,
//     customer: {
//         id: 101,
//         name: "rasagyna"
//     },
//     items: [
//          {
//          item1: "one",
//          item2: "one",
//          item3 : "one"
//          },
//         {
//          item1: "two",
//          item2: "two",
//          item3 : "two"
//          },
//         {
//          item1: "three",
//          item2: "three",
//          item3 : "three"
//          },
//     ],
//     total : 20,
//     status : false
// };

// //tuple

// let nam :[number, string , boolean] =  [23 , "rfre", true];
// let strict1 : [string , number] = [24, "wrg"];

// //readonly

// let strings1 : readonly string[] = ["s","a","i"]; 

// strings1.push("k");






// //DAY 4

// //1
// const username = "krishna";
// const age =23;
// const email = "krishna@gmail.com";
// const isDeveloper = true;
// const city = "Hyderabad";

// //2

// let userStatus : null | string  = null;

// let userStatus = "active";
// let userStatus = "inactive";

// //3

// const product = {
//     id : 101,
//     name : "laptop",
//     price : 100000,
//     inStock : true
// }

// product.price = 200000;

// console.log(product.price);

// //4

// const skills = ["JavaScript", "React", "TypeScript", "Node JS"];

// skills.push('GASP'); //If you type number it rejects because number cannot be assigned to string array

// //5

// let phone1 : (number | string) = 987456321;
//  phone1 = "123456789";
//  //phone1 = true //not valid, because boolean cannot assigned to number or string
// const email1 : string = "Krishna@gmail.com";
// const website1 : string = "krsna.com";

// //6

// //tuples

// let coordinates : [number , number] = [17.385, 78.534];
// // ["17.385", 78.534]; Type 'string' is not assignable to type 'number'

// // [17.385, 78.534, 100]; = 'coordinates' is declared but its value is never read.ts(6133)
// // Type '[number, number, number]' is not assignable to type '[number, number]'.
// //   Source has 3 element(s) but target allows only 2.


// //7

// const EmployeeData : {
// name : string,
// age : number,
// salary : number,
// isPermanent : boolean
// } = {
// name : "krsna",
// age : 24,
// salary : 100000,
// isPermanent : true
// }


// const EmployeeData1 =  {
// name : "krsna1",
// age : 241,
// salary : 1000001,
// isPermanent : true
// }

// //8

// const calculateSalary = (basicSalary : number , bonus : number) => {
//         return basicSalary + bonus;
// }

// console.log(calculateSalary(12,8));

// //9

// let username3 = "Krishnaf";
// let age3 = 66;
// let email3 = "krishna@gmail.com";
// let phone3: string | number = 987654321099;
// let address3: string | null = "erhfb";
// let skills3 = ["React", "TypeScript", "sfb"];
// let isActive3 = true;

// // Change username to another string. works
// // Change age to another number. works
// // Change phone from number to string. works
// // Change address from null to a string. works
// // Add another skill. works
// // Try assigning a number to username. error
// // Try assigning a boolean to phone. error
// // Try assigning a number to address. error


// //10

// // Define role type explicitly
// type UserRole = "admin" | "user";

// // Define the interface for clarity
// interface LoggedInUser {
//   id: number;
//   username: string;
//   age: number;
//   email: string;
//   phone: string | number;   // union type
//   role: UserRole;           // union type
//   skills: string[];
//   address: string | null;   // nullable
//   isLoggedIn: boolean;
// }

// // Now create the object
// const loggedin: LoggedInUser = {
//   id: 1,                          // inferred as number
//   username: "wgr",                // inferred as string
//   age: 23,                        // inferred as number
//   email: "Krsna@gmail.com",       // inferred as string
//   phone: 43544563646,             // explicit union allows number
//   role: "admin",                  // explicit union restricts to "admin" | "user"
//   skills: ["one", "tei", "three"],// inferred as string[]
//   address: null,                  // union allows null
//   isLoggedIn: true                // inferred as boolean
// };

//Day 5

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









