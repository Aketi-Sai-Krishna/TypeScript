"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
#;
Day;
3;
Arrays, Objects & Tuples;
#;
#;
Part;
1;
Concise;
Notes;
#;
#;
#;
1.;
Typed;
Arrays;
TypeScript;
allows;
us;
to;
specify;
the;
an;
array;
can;
contain.
 `` `ts
let numbers: number[] = [10, 20, 30];

let names: string[] = ["Sai", "Krishna"];

let statuses: boolean[] = [true, false];
` ``;
Invalid: `` `ts
let numbers: number[] = [10, 20, "30"]; // ❌
` ``;
Alternative;
syntax: `` `ts
let numbers: Array<number> = [10, 20, 30];
` `` `number[]`;
is;
more;
commonly;
used.
;
-- -
    #;
#;
#;
2.;
Typed;
Objects;
We;
can;
define;
the;
property in an;
object.
 `` `ts
let user: {
  name: string;
  age: number;
} = {
  name: "Krishna",
  age: 25
};
` ``;
Now;
TypeScript;
knows: `` `ts
user.name // string
user.age  // number
` ``;
Invalid: `` `ts
user.age = "25"; // ❌
` ``;
-- -
    #;
#;
#;
3.;
Optional;
Properties;
Use `?`;
when;
a;
property;
may;
or;
may;
not;
exist.
 `` `ts
let user: {
  name: string;
  age: number;
  phone?: string;
} = {
  name: "Krishna",
  age: 25
};
` `` `phone?: string`;
means: 
    > `phone`;
is;
optional, but;
if (provided, it)
    must;
be;
a;
string.
;
-- -
    #;
#;
#;
4.;
Nested;
Objects;
Objects;
can;
contain;
other;
objects.
 `` `ts
let user: {
  name: string;
  address: {
    city: string;
    pincode: number;
  };
} = {
  name: "Krishna",
  address: {
    city: "Hyderabad",
    pincode: 500001
  }
};
` ``;
Access: `` `ts
user.address.city;
user.address.pincode;
` ``;
Nested;
objects;
are;
extremely;
common in API;
responses.
;
-- -
    #;
#;
#;
5.;
Array;
of;
Objects;
Very;
important;
for (React; and; API)
    data.
     `` `ts
let users: {
  name: string;
  age: number;
}[] = [
  {
    name: "Sai",
    age: 25
  },
  {
    name: "Rahul",
    age: 28
  }
];
` ``;
Meaning: 
    > `users`;
is;
an;
array, and;
every;
element;
must;
be;
an;
object;
containing `name: string`;
and `age: number`.
;
-- -
    #;
#;
#;
6.;
Union;
Array `` `ts
let values: (string | number)[] = [
  "Sai",
  25,
  "Krishna",
  30
];
` ``;
Each;
element;
can;
be;
either: `` `text
string OR number
` ``;
The;
order;
is;
flexible.
 `` `ts
let values: (string | number)[] = [25, "Sai"]; // ✅
` ``;
-- -
    #;
#;
#;
7.;
Tuple;
A;
tuple;
defines;
a ** fixed;
number;
of;
elements;
with (fixed)
    types;
and;
positions ** .
 `` `ts
let user: [string, number] = ["Krishna", 25];
` ``;
Meaning: `` `text
index 0 → string
index 1 → number
` ``;
Correct: `` `ts
let user: [string, number] = ["Krishna", 25]; // ✅
` ``;
Incorrect: `` `ts
let user: [string, number] = [25, "Krishna"]; // ❌
` ``;
You;
intentionally;
tested;
this in your;
practice: `` `ts
let strict: [string, number] = [24, "wrg"]; // ❌
` ``;
TypeScript;
correctly;
reports;
an;
error;
because;
the;
types;
are in the;
wrong;
positions.
;
-- -
    #;
#;
#;
8.;
Tuple;
vs;
Union;
Array;
#;
#;
#;
#;
Tuple `` `ts
let user: [string, number] = ["Krishna", 25];
` `` `` `text
position is fixed
0 → string
1 → number
` ``;
#;
#;
#;
#;
Union;
array `` `ts
let user: (string | number)[] = ["Krishna", 25];
` `` `` `text
position is flexible
each element → string OR number
` ``;
This;
is;
an;
important;
distinction.
;
-- -
    #;
#;
#;
9.;
Readonly;
Arrays;
A;
array;
can;
be;
read;
but;
cannot;
be;
modified.
 `` `ts
let names: readonly string[] = [
  "Sai",
  "Krishna"
];
` ``;
Reading;
is;
allowed: `` `ts
console.log(names[0]); // ✅
` ``;
Modification;
is;
not;
allowed: `` `ts
names.push("Rahul"); // ❌
names[0] = "Test";   // ❌
` ``;
Alternative;
syntax: `` `ts
let names: ReadonlyArray<string> = [
  "Sai",
  "Krishna"
];
` ``;
-- -
    #;
#;
Real - World;
Example;
A;
realistic;
order;
can;
combine;
multiple;
concepts: `` `ts
const order: {
  orderId: number;
  customer: {
    id: number;
    name: string;
  };
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: string;
} = {
  orderId: 1,

  customer: {
    id: 101,
    name: "Sai"
  },

  items: [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      quantity: 1
    },
    {
      id: 2,
      name: "Mouse",
      price: 1000,
      quantity: 2
    }
  ],

  total: 52000,
  status: "Delivered"
};
` ``;
This;
represents: `` `text
Order
 ├── orderId → number
 ├── customer → object
 │    ├── id → number
 │    └── name → string
 ├── items → array
 │    └── objects
 ├── total → number
 └── status → string
` ``;
-- - ;
