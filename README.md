Progress1:

User Authentication
User Registration (/api/auth/register)
User Login (/api/auth/login)
JWT-based authentication
Auth middleware to protect private routes
Expense Management (CRUD)
Create new expense (POST /api/expenses/create)
Get all expenses of logged-in user (POST /api/expenses/fetch)
Update an existing expense (PUT /api/expenses/:id)
Delete an expense (DELETE /api/expenses/:id)
MongoDB Atlas Integration
connected using Mongoose
User and Expense models created
Default date assigned using Date.now
API Testing
All routes tested via Postman with token-based authentication