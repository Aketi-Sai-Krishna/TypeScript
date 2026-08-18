"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
#;
Part;
3;
Interview;
Answers;
#;
#;
Beginner;
#;
#;
#;
1.;
What;
are;
the;
basic;
primitive;
types ?
    TypeScript : ;
commonly;
uses: `` `text
string
number
boolean
null
undefined
bigint
symbol
` ``;
-- -
    #;
#;
#;
2.;
What;
is;
annotation;
is;
explicitly;
specifying;
the;
variable.
 `` `ts
const age: number = 25;
` ``;
Here `number`;
is;
the;
-- -
    #;
#;
#;
3.;
What;
is;
inference;
is;
when;
TypeScript;
automatically;
determines;
the;
the;
assigned;
value.
 `` `ts
const age = 25;
` ``;
TypeScript;
infers: `` `text
age → number
` ``;
-- -
    #;
#;
#;
4.;
What;
is;
the;
difference;
between `null`;
and `undefined` ?
    `null` : ;
generally;
represents;
an;
intentional;
absence;
of;
a;
value, ;
while (`undefined`)
    generally;
means;
a;
value;
hasn;
't been assigned or is missing. `` `ts
let address: string | null = null;

let phone: string | undefined;
` ``;
-- -
    #;
#;
#;
5.;
What;
is;
a;
union;
type ?
    A : ;
union;
variable;
to;
have;
more;
than;
one;
possible;
type.
 `` `ts
let id: string | number;
` ``;
It;
can;
contain;
either;
a;
string;
or;
a;
number.
;
-- -
    #;
Intermediate;
#;
#;
#;
6.;
Why;
doesn;
't TypeScript require annotations everywhere?;
Because;
TypeScript;
can;
use ** type;
inference ** to;
automatically;
determine;
types.
 `` `ts
const age = 25;
` ``;
TypeScript;
already;
knows;
that `age`;
is;
a;
number.
;
-- -
    #;
#;
#;
7.;
What;
here ?
    `` `ts
const age = 25;
` ``
    :
;
Answer: `` `text
age → number
` ``;
-- -
    #;
#;
#;
8.;
What;
happens;
here ?
    `` `ts
const age = 25;

age = "25";
` ``
    :
;
TypeScript;
produces;
an;
error;
because: `` `text
age  → number
"25" → string
` ``;
A;
string;
cannot;
be;
assigned;
to;
a;
number.
;
-- -
    #;
#;
#;
9.;
How;
do
    you;
while (allow);
a;
string;
or `null` ?
    `` `ts
let address: string | null = null;
` ``
    :
;
Now;
both;
are;
valid: `` `ts
address = null;
address = "Hyderabad";
` ``;
-- -
    #;
#;
#;
10. `number`;
vs `bigint` `number`;
is;
used;
for (normal; numeric; values)
    : `` `ts
const age: number = 25;
` `` `bigint`;
is;
used;
for (very; large; integers)
    : `` `ts
const value: bigint = 12345678901234567890n;
` ``;
-- -
    #;
Advanced / Practical;
#;
#;
#;
11.;
What;
types;
are;
inferred ?
    `` `ts
const user = {
    name: "Krishna",
    age: 25,
    active: true
};
` ``
    :
;
TypeScript;
infers: `` `text
name   → string
age    → number
active → boolean
` ``;
-- -
    #;
#;
#;
12.;
Why;
does;
this;
produce;
an;
error ?
    `` `ts
const user = {
    age: 25
};

user.age = "25";
` ``
    :
;
Because;
TypeScript;
inferred: `` `text
user.age → number
` ``;
but `"25"`;
is;
a;
string.
    Therefore;
`` `text
❌ string cannot be assigned to number
` ``;
-- -
    #;
#;
#;
13.;
Number;
or;
string ?
    Use : ;
a;
union;
type: `` `ts
let id: number | string;
` ``;
Both;
are;
valid: `` `ts
id = 101;
id = "101";
` ``;
-- -
    #;
#;
#;
14.;
Benefit;
of;
reduces;
unnecessary;
still;
providing;
Instead;
of: `` `ts
const name: string = "Krishna";
const age: number = 25;
` ``;
you;
can;
often;
write: `` `ts
const name = "Krishna";
const age = 25;
` ``;
TypeScript;
knows;
the;
types;
automatically.
;
-- -
    #;
#;
#;
15.;
When;
should;
you;
explicitly;
use;
annotations ?
    Annotations : ;
are;
particularly;
useful;
when;
the;
For;
example: `` `ts
let address: string | null = null;
` ``;
or;
`ts
function greet(name: string) {
    return `;
Hello;
$;
{
    name;
}
`;
}
` ``;
They;
are;
also;
heavily;
used;
with ( ** interfaces, API)
    responses, React;
props, state, and;
reusable;
components ** .
;
-- -
;
