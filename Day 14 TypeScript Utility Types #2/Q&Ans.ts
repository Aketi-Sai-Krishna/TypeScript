
Interview questions and practice


1. In Record<"draft" | "live", string>, which part defines keys and which part defines values?

2. What is the resulting type of Exclude<"a" | "b" | "c", "b">?

3. What is the resulting type of Extract<"a" | "b" | "c", "a" | "z">?

4. Why do we write ReturnType<typeof createCandidate> rather than ReturnType<createCandidate>?

5. How is Exclude<UserStatus, "inactive"> different from Omit<User, "status">?

6. What does Parameters<(name: string, age: number) => boolean> produce?

7. What type does ReturnType<typeof fetchCandidate> produce if fetchCandidate is async and returns a candidate object?


8. Create a Record that maps every CandidateStatus to { label: string; color: string }.

9. Define a wrapper for createCandidate using Parameters and ReturnType, without repeating string in its signature.

10. Given type Action = "view" | "edit" | "delete" | "export", create ReadAction containing only "view" and "export", and SafeAction excluding "delete".


### Concise Q&A

Q1. Which part of Record<"draft" | "live", string> defines keys?
A. "draft" | "live" defines the required keys; string defines each value's type.

Q2. What is Exclude<"a" | "b" | "c", "b">?
A. "a" | "c".

Q3. What is Extract<"a" | "b" | "c", "a" | "z">?
A. "a". "z" is not in the original union.

Q4. Why typeof with a named function?
A. The function name refers to a value; typeof obtains its function type for ReturnType or Parameters.

Q5. How do Exclude and Omit differ?
A. Exclude filters union members. Omit removes named properties from an object type.

Q6. What does Parameters<(name: string, age: number) => boolean> give?
A. [name: string, age: number].

Q7. What happens with an async function?
A. ReturnType<typeof fetchCandidate> gives Promise<Candidate> (or the inferred promise type). Awaited<ReturnType<typeof fetchCandidate>> gives the resolved candidate type.

Q8. How do you map each status to UI data?
A. Record<CandidateStatus, { label: string; color: string }>; provide an entry for each status.

Q9. How do you type the wrapper?
A. function wrapped(...args: Parameters<typeof createCandidate>): ReturnType<typeof createCandidate> { return createCandidate(...args); }

Q10. How do you select and remove actions?
A. type ReadAction = Extract<Action, "view" | "export">; and type SafeAction = Exclude<Action, "delete">;.