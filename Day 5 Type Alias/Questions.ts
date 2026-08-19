
// Real-World Advanced Practical

// Scenario: E-Commerce + Order Management System

// You are building the frontend for an e-commerce application.

// The backend provides information about users, companies, addresses, products, orders, and API responses.

// Your job is to create TypeScript type aliases for all of them.

// 1️⃣ Address

// A user can have an address.

// The address must contain:

// Unique address ID — cannot be changed
// House/flat number
// Street
// City
// State
// Country
// Pincode
// Landmark — optional
// Whether this is the user's default address
// Requirement

// A user may have multiple addresses.

// 2️⃣ Company

// A company can sell products on your platform.

// The company must contain:

// Unique company ID — cannot be changed
// Company name
// Email
// Phone number
// Website — optional
// Industry
// Number of employees
// Company address
// Whether the company is verified
// Important

// The company address should reuse your Address type.

// Don't create the address structure again.

// 3️⃣ User

// A user must contain:

// Unique user ID — cannot be changed
// First name
// Last name
// Email
// Phone number
// Age
// Account active/inactive status
// User role
// Profile image — optional
// Company — optional
// Multiple addresses
// Default address
// Account creation date
// Important

// The user should reuse:

// Address
// Company
// 4️⃣ Product

// Each product contains:

// Unique product ID — cannot be changed
// Product name
// Description
// Price
// Discount price — optional
// Category
// Brand
// Stock quantity
// Whether it is currently in stock
// Product images — multiple images
// Seller/company information
// Product dimensions:
// height
// width
// depth
// Product weight
// SKU — cannot be changed
// Important

// The seller should reuse your Company type.

// 5️⃣ Order

// This is where things become more interesting.

// An order contains:

// Unique order ID — cannot be changed
// Customer who placed the order
// Products purchased
// Quantity of each product
// Price at the time of purchase
// Shipping address
// Billing address
// Total product price
// Discount amount — optional
// Shipping charge
// Final amount
// Payment status
// Order status
// Order creation date
// Delivery date — optional
// Tracking number — optional
// Important

// The order should reuse:

// User
// Product
// Address
// 6️⃣ APIResponse

// Now imagine your backend sends this response:

// {
//     success: true,
//     message: "Order fetched successfully",
//     data: {...},
//     error: null
// }

// Your APIResponse should support:

// Whether API request succeeded
// Message
// Actual response data
// Error information — optional
// Important

// The response should be reusable.

// For example, you should conceptually be able to have:

// APIResponse<User>
// APIResponse<Product>
// APIResponse<Order>

// Don't worry if you haven't learned the TypeScript feature needed to write that exact syntax yet. Identify the requirement and try your best.