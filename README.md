# Login with JWT and Refresh Tokens using NestJS

## Description

This repository implements a complete **authentication system** using **NestJS**, **JWT** (JSON Web Tokens), and **MongoDB**. The system allows users to **sign up**, **log in**, **refresh tokens**, and **log out** securely with access and refresh tokens.

### Features:
- **User Registration**: Allows users to register with email, password, and name.
- **User Login**: Authenticates users and issues access and refresh tokens.
- **JWT-based Authentication**: Access tokens are used to authenticate requests. They expire after a set period (1 hour).
- **Refresh Tokens**: When the access token expires, users can refresh their session without logging in again using a refresh token (valid for 7 days).
- **Logout**: A simple logout endpoint to invalidate user sessions on the client side.

### Technologies Used:
- **NestJS**: A framework for building efficient and scalable server-side applications.
- **MongoDB**: A NoSQL database for storing user information.
- **bcryptjs**: A library for securely hashing passwords.
- **jsonwebtoken**: A library to create and verify JSON Web Tokens.
- **ConfigService**: Loads environment variables for JWT secret management.

## Installation Guide

### Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) (either locally or use a cloud provider like MongoDB Atlas)

### Step 1: Clone the repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/sohit-mishra/nestjsLogin.git

```


### Step 2:  Install dependencies
Navigate to the project directory and install the required dependencies:

```
npm install

```


### Step 3:  Running the Application
After completing the setup, you can run the application using the following command:

```
npm run start:dev
```
