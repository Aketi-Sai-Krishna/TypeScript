TypeScript Utility Types #2

Topic notes

These five built-in utility types transform existing types. They help keep React props, API helpers, configuration objects, and callbacks in sync as your code changes. They affect TypeScript checking only; they do not create, filter, or modify values at runtime.
Utility	Purpose	Result:

Record<Keys, Value>	Describe an object with specified keys	Object type

Exclude<Union, Members>	Remove matching members from a union	Smaller union

Extract<Union, Members>	Keep matching members of a union	Smaller union

ReturnType<FunctionType>	Read a function's output type	Return type

Parameters<FunctionType>	Read a function's input types	Tuple of argument types


1. Record<Keys, Value>
type CandidateStatus =
  | "new"
  | "screening"
  | "interview"
  | "hired"
  | "rejected";

const statusLabels: Record<CandidateStatus, string> = {
  new: "New",
  screening: "Screening",
  interview: "Interview",
  hired: "Hired",
  rejected: "Rejected",
};

statusLabels.interview; // "Interview"
CandidateStatus supplies the keys. string supplies the value type. Every key in the union must appear in the object. The keys are case sensitive: New is different from new.
Values can themselves be objects:
type StatusUI = { label: string; color: string };

const statusUI: Record<"new" | "hired", StatusUI> = {
  new: { label: "New", color: "blue" },
  hired: { label: "Hired", color: "green" },
};
Use Record for status labels, UI configuration, and other maps keyed by a known set of names. Record<string, T> allows arbitrary string keys; use a literal union when every key must be present.

2. Exclude<Union, Members>
type ActiveCandidateStatus = Exclude<
  CandidateStatus,
  "hired" | "rejected"
>;
// "new" | "screening" | "interview"

let active: ActiveCandidateStatus = "new";
active = "interview"; // OK
// active = "hired"; // Error
Exclude removes union members by type. Omit from Day 18 removes properties from an object type. They solve different problems.
Your hero example follows the same rule:
type Hero = "chiru" | "pawan" | "ravi";
type StarHero = Exclude<Hero, "ravi">;

let hero: StarHero = "chiru";
hero = "pawan"; // OK
// hero = "ravi"; // Error


3. Extract<Union, Members>
type FinalCandidateStatus = Extract<
  CandidateStatus,
  "hired" | "rejected"
>;
// "hired" | "rejected"
Extract keeps the union members that match. It cannot introduce a new member:
type Result = Extract<CandidateStatus, "hired" | "archived">;
// "hired" — "archived" was not in CandidateStatus


4. ReturnType<FunctionType>
function createCandidate(name: string, email: string) {
  return {
    id: Date.now(),
    name,
    email,
    status: "new" as const,
  };
}

type CreatedCandidate = ReturnType<typeof createCandidate>;
// { id: number; name: string; email: string; status: "new" }
typeof createCandidate gets the type of the function value. ReturnType gets its result type. If the function's result changes, this alias follows it.
For an async function, ReturnType is a Promise<...>; combine it with Awaited if you need the resolved value:
async function fetchCandidate() {
  return { id: 1, name: "Sai" };
}

type FetchResult = ReturnType<typeof fetchCandidate>;
// Promise<{ id: number; name: string }>

type FetchedCandidate = Awaited<FetchResult>;
// { id: number; name: string }


5. Parameters<FunctionType>
type CreateCandidateArgs = Parameters<typeof createCandidate>;
// [name: string, email: string]

const args: CreateCandidateArgs = ["Sai Krishna", "sai@example.com"];
const candidate: CreatedCandidate = createCandidate(...args);
Parameters gives you a tuple. Its first item corresponds to the first function argument, the second to the second, and so on. This is useful for wrappers:
function createCandidateWithLog(
  ...args: Parameters<typeof createCandidate>
): ReturnType<typeof createCandidate> {
  console.log("Creating candidate", args[0]);
  return createCandidate(...args);
}
