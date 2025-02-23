# Express.js CRUD API with TypeScript & MongoDB

## 🚀 Project Overview

This project is a backend service built with **Express.js** and **TypeScript**, providing a CRUD API for managing resources. Data is stored in **MongoDB** using Mongoose for object modeling.

## 📌 Features

- Create a resource
- List resources with basic filters (`type`, `createDate`,`name`)
- Get details of a resource
- Update a resource
- Delete a resource

## 🛠 Installation

0. cd Proplem\ 5
1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Set up environment variables**
   Create a `.env` file and add your MongoDB connection string:
   ```env
   URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/resource
   PORT=3000
   ```
   Or you can use mine

## Running the Server

### Development Mode (using `ts-node`):

```sh
npx ts-node src/app.ts
```

## 📡 API Endpoints

### 1️⃣ Create a Resource

**POST** `api/resource/create`

#### Request Body:

```json
{
  "name": "Example Name",
  "description": "facebook",
  "type": "social",
  "url": "ex.png"
}
```

#### Response:

```json
{
  "_id": "65dbf3b6e1d123456789abcd",
  "name": "Example Name",
  "description": "facebook",
  "type": "social",
  "url": "ex.png",
  "createdAt": "2025-02-24T12:00:00.000Z",
  "updatedAt": "2025-02-24T12:00:00.000Z"
}
```

### 2️⃣ List Resources (with Filters)

**GET** `api/resource/list`

#### Query Parameters:

- `name`: Filter by name (e.g., `?name=example`)
- `type`: Filter by resource type (e.g., `?type=example`)
- `createDate`: Filter by creation date (format `YYYY-MM-DD`, e.g., `?createDate=2025-02-24`)

**GET** `api/resource/list?sortBy=createdAt&order=desc`
**GET** `api/resource/list?sortBy=name&order=asc`
**GET** `api/resource/list?type=example`
**GET** `api/resource/list?name=example`

### 3️⃣ Get a Resource by ID

**GET** `api/resource/detail/:id`

### 4️⃣ Update a Resource

**PUT** `api/resource/update/:id`

#### Request Body:

```json
{
  "name": "Updated Name",
  "description": "Updated des ",
  "type": "updated-type",
  "url": "Updated url"
}
```

### 5️⃣ Delete a Resource

**DELETE** `api/resources/delete/:id`

## 🛠 Technologies Used

- **Node.js** & **Express.js**
- **TypeScript**
- **MongoDB** & **Mongoose**
- **dotenv** for environment variables
- **cors** for cross-origin requests

## Testing with Postman

You can test the API by using **Postman** with the provided endpoints.

---
