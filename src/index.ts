let username: string | null = null;

console.log(username);

username = "moddakudu";

console.log(username);


let numbers: number[] = [10,20,30,40]; //Number string

let strings: string[] = ["s","a","i"]; //array string

//objects

let user : { 
              name : string,
              age : number
            } = { name : "Kris",
                 age : 24
            }


//Array of objects
    
let candidate : {
                id : number,
                company: string
               } [] =  [
                {
                 id: 1,
                company: "abc"
                },
                {
                 id: 2,
                company: "xyz"
                }
               ];

//Normal array

let credits : (string | number)[] = ["sai", 23];

let credits1 : (string | number)[] = [45, "sai", "kft", 54];

//Tuple

let strict : [string , number] = [24, "wrg"];


//practice day 3

//Create a users array containing 3 users.

const users : {
    id: number,
    name : string,
    email : string,
    age : number,
    isActive : boolean
}[] =  [
            {
                id: 1,
                name : "user1",
                email : "email1@gmail.com",
                age : 1,
                isActive : true
            },
                {
                id: 2,
                name : "user2",
                email : "email2@gmail.com",
                age : 2,
                isActive : true
            },
                {
                id: 3,
                name : "user3",
                email : "email3@gmail.com",
                age : 3,
                isActive : false
            },
        ];


//Create a products array containing 3 products.

const products : {
    id : number
    name : string
    price : number
    category : string
    inStock : boolean
}[] =  [
            {
            id : 1,
            name: "product1",
            price : 1000,
            category : "Grocery",
            inStock : true
            },
             {
            id : 2,
            name: "product2",
            price : 2000,
            category : "Grocery2",
            inStock : false
            },
             {
            id : 3,
            name: "product3",
            price : 3000,
            category : "Grocery3",
            inStock : false
            },
       ];


//where customer is a nested object and items is an array of objects.

const order : {
    orderId : number,
    customer: {
        id: number,
        name: string
    },
    items: {
         item1: string,
         item2: string,
         item3 : string
    }[],
    total : number,
    status : boolean
} = {
    orderId : 1,
    customer: {
        id: 101,
        name: "rasagyna"
    },
    items: [
         {
         item1: "one",
         item2: "one",
         item3 : "one"
         },
        {
         item1: "two",
         item2: "two",
         item3 : "two"
         },
        {
         item1: "three",
         item2: "three",
         item3 : "three"
         },
    ],
    total : 20,
    status : false
};

//tuple

let nam :[number, string , boolean] =  [23 , "rfre", true];
let strict1 : [string , number] = [24, "wrg"];

//readonly

let strings1 : readonly string[] = ["s","a","i"]; 

strings1.push("k");





