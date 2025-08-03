## Student Management System (Node.js)

This is a simple Student Management System built using **Node.js only** without any frameworks.  
It allows you to **Get**, **Add**, **Update**, and **Delete** student records stored in a local `data.json` file.

### 🚀 Features

- Get all students
- Add a new student
- Update a student (by email)
- Delete a student (by email)

### 📁 Project Structure

- `app.js`: Main server file
- `data.json`: Stores all student data in JSON format

### 🧠 How It Works

Each request updates the `data.json` file directly. The server handles routing manually using the built-in `http` module in Node.js.

### 🔗 Available Routes

| Method | Route                                | Description                          |
|--------|--------------------------------------|--------------------------------------|
| GET    | `/getstudent`                        | Get all students                     |
| POST   | `/setstudent`                        | Add a new student                    |
| PUT    | `/updatestudent/:email`              | Update student by email             |
| DELETE | `/deletestudent/:email`              | Delete student by email             |

