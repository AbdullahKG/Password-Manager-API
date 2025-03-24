## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [API Documentation](#api-documentation)
6. [Database Design](#database-design)
7. [Usage](#usage)

---

## Introduction

This is a **NestJS** API for managing Password Manager Extension. and it is a self-hosted, secure, and encrypted password manager API. This API allows users to store, retrieve, and manage passwords securely while ensuring encryption and authentication.

---

## Features

- Secure Password Storage using encryption (encryption will be done in the extension).
- RESTful APIs for managing Users and Passwords.
- Authentication & Authorization (JWT-based security).
- Password Management (store, retrieve, update, delete).

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **NestJS**: Modular and scalable backend framework.
- **TypeScript**: for strong typing
- **MySql**: Database for storing Users and encrypted Passwords
- **TypeORM**: ORM for interacting with SQL databases like MySQL for storing structured data.

---

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS recommended)
- **MySQL** : installed and running

1. Clone the repository:

```bash
git clone https://github.com/AbdullahKG/Password-Manager-API.git
cd Password-Manager-API
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables: Create a .env file with the following variables:

- **Note** : Database schema should be created in MySql

```plaintext
 HOST = 127.0.0.1 or localhost
DB_PORT = your-db-port
USERNAME = your-db-username
PASSWORD = your-db-password
DATABASE = password_manager or any name you want

JWT_SECRET = your-jwt-secret
```

4. Run the Server:

```bash
npm run start
```

or run with development for hot reload if anything changed in the server code

```bash
npm run start:dev
```

---

## API Documentation

A link for the API docs in postman:
https://documenter.getpostman.com/view/37754419/2sAYkKGHQk

---

## Database Design

A link for the DB design in lucid chart website :
https://lucid.app/lucidchart/beaa2c3a-d1db-42c4-b55c-ec9b829f6648/edit?invitationId=inv_cd39f9bb-b7dd-4141-a4af-636e750cb5c5#?page=0_0

---

## Usage

- This API will handle Authentication, Authorization, CRUD operations for Passwords
- **Important**: this will also be needed so make sure to read the README file of it :
- https://github.com/AbdullahKG/Password-Manager-UI-extension

---
