

---

# Attack Capital Blog Post

## Description
This project is a **Blog Post** application built using **Next.js** for the frontend and **Express.js** for the backend. It includes features such as form validation using **Zod**, form handling with **React Hook Form**, and protected routes using **middleware** to ensure authenticated access.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Running the Application](#running-the-application)
- [Protected Routes](#protected-routes)
- [Commands](#commands)

---

## Setup Instructions

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (version >= 16.x)
- **npm** (or **yarn** if preferred)

### Steps to get started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file** at the root of the project. Example:

   ```bash
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-secret-key>
   ```

4. **Run the application in development mode:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application should now be running at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

Here is a brief overview of the project structure:

## Frontend Structure

```
.
├── app/                    # Next.js application directory
│   ├── layout.tsx           # Global layout for the app
│   ├── page.tsx             # Main page for the app
│   ├── login/               # Login page
|   ├── signup/              # Signup page
│   ├── dashboard/           # Dashboard page
│   ├── createPost/          # Create Post page
│   └── middleware.ts        # Middleware for protected routes
├── components/              # Reusable UI components (e.g., Sidebar)
├── pages/                   # Next.js page routes
├── utils/                   # Utility functions (e.g., API calls)
│   ├──api.ts /              # Axios API client configuration
│   └── validators.ts        # validators
├── node_modules/            # Installed dependencies (should be ignored by git)
├── .gitignore               # Git ignore file
└── package.json             # Project dependencies and scripts
```

## Backend Structure

```
.
├── config/                     # Configuration files
│   └── db.js                   # MongoDB connection
├── controllers/                # Controller logic
│   └── authController.js       # Example controller for authentication
│   └── postControlle.js        # Example controller for posts
├── middlewares/                # Middleware files
│   └── authMiddleware.js       # Authentication middleware
├── models/                     # Mongoose models
│   └── auth.js                 # User schema
│   └── post.js                 # Post schema
├── routes/                     # Route definitions
│   └── authRoutes.js           # Routes for post-related APIs
│   └── postRoutes.js           # Routes for authentication-related APIs
├── utils/                      # Utility functions
│   └── validators.js           # Zod validation utility
├── .env                        # Environment variables
├── .gitignore                  # Files to ignore in Git
├── package.json                # Project dependencies and scripts
├── server.js                   # Entry point for the server
```

### Development Choices

- **Next.js**: The frontend is built using Next.js, providing server-side rendering (SSR), static site generation (SSG), and API routes.
- **Express.js**: The backend API is built with Express.js.
- **Zod**: Zod is used for type-safe validation of data in forms and API routes.
- **React Hook Form**: Used for form handling to improve performance and simplify validation.
- **Middleware**: Custom middleware is implemented in Next.js to protect routes and require authentication using tokens stored in cookies.
- **Styling**: ShadcnUI and Tailwind CSS is used for styling.
- **jsonwebtoken**: For working with JWTs for authentication and authorization.
---

## Dependencies

- **React Hook Form**: For handling forms and validation.
- **Zod**: For schema validation with full TypeScript support.
- **Axios**: HTTP client for making requests to the backend API.
- **jsonwebtoken**: For working with JWTs for authentication and authorization.
- **Express.js**: Web framework for building the backend API.
- **dotenv**: For loading environment variables from a `.env` file.
- **bcrypt**: For hashing password.
- **mongoose**: For mongoDB library.

---

## Running the Application

1. **Backend (Express.js)**:
   - The backend should be running on port `4000`. Ensure that your backend is set up and the `.env` file is properly configured to handle requests from the frontend.
   - You can run the backend using the following command:
     
     ```bash
     node server.js
     ```

2. **Frontend (Next.js)**:
   - Once the backend is up and running, you can start the Next.js frontend:
     
     ```bash
     npm run dev
     ```

   - This will launch the frontend on [http://localhost:3000](http://localhost:3000).

---

## Protected Routes

To protect certain routes, middleware is implemented in the `app/middleware.ts` file. This middleware checks for an authentication token stored in cookies and redirects the user to the login page if the token is not present.

For example, the following code ensures that only authenticated users can access the dashboard:


### How it works:
- If the user tries to access a protected route (e.g., `/dashboard`, `/createPost`,`/`) without a valid token, they will be redirected to the `/login` page.
- The token is expected to be stored in cookies, and the middleware checks for its presence before allowing access to the protected pages.

---

## Commands

- **Development**:
  - Run the application in development mode:
  
    ```bash
    npm run dev
    # or
    yarn dev
    ```

- **Production Build**:
  - Build the application for production:
  
    ```bash
    npm run build
    # or
    yarn build
    ```

- **Start the Production Server**:
  
    ```bash
    npm start
    # or
    yarn start
    ```

- **Run Tests** (if any):
  
    ```bash
    npm run test
    # or
    yarn test
    ```

---

## Conclusion

This project demonstrates the use of Next.js for building full-stack applications with frontend and backend integrated. It includes middleware for protecting routes, form validation using Zod, and efficient form handling with React Hook Form. 

Let me know if you have any questions or need further assistance with the project!

--- 

