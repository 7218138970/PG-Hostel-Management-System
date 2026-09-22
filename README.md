# 🏠 Smart PG & Hostel Management System

A database-driven **PG & Hostel Management System** developed using **Node.js, Express.js, EJS and MySQL**. The system helps manage students, rooms, beds, allocations, visitors and staff through a simple web-based interface.

## 📌 Project Overview

Managing PG and hostel records manually can be time-consuming and difficult to maintain. This project provides a centralized system to store and manage hostel-related information using a relational database.

The system provides CRUD operations and connects the web application with a MySQL database.

## 🎯 Objectives

* Manage student information efficiently
* Manage hostel rooms and room details
* Maintain bed information
* Manage student room/bed allocations
* Maintain visitor records
* Manage hostel staff information
* Reduce manual record keeping
* Demonstrate DBMS concepts using a real-world application

## 🛠️ Technologies Used

| Technology   | Purpose                   |
| ------------ | ------------------------- |
| Node.js      | Backend runtime           |
| Express.js   | Web application framework |
| EJS          | Dynamic web pages         |
| MySQL        | Relational database       |
| HTML         | Page structure            |
| CSS          | User interface styling    |
| JavaScript   | Application functionality |
| Git & GitHub | Version control           |

## 🗄️ Database

The project uses **MySQL** as the relational database.

### Main Database Tables

* `students`
* `rooms`
* `beds`
* `allocations`
* `visitors`
* `staff`

The database uses:

* Primary Keys
* Foreign Keys
* Unique Constraints
* NOT NULL Constraints
* Relationships between tables
* SQL JOIN operations

## ✨ Features

### 👨‍🎓 Student Management

* Add student
* View students
* Edit student details
* Delete student records

### 🏠 Room Management

* Add rooms
* View rooms
* Edit room details
* Delete rooms
* Track room status

### 🛏️ Bed Management

* Manage beds associated with rooms
* Track bed availability
* Allocate beds to students

### 👥 Visitor Management

* Store visitor details
* Maintain visit date and time
* Associate visitors with students

### 👤 Staff Management

* Store staff information
* Manage staff roles, phone numbers and salary details

## 📂 Project Structure

```text
PG-Hostel-Management-System/
│
├── app.js
├── package.json
├── package-lock.json
├── README.md
│
├── database/
│   └── database.sql
│
├── public/
│   └── style.css
│
└── views/
    ├── index.ejs
    │
    ├── students/
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── edit.ejs
    │
    └── rooms/
        ├── index.ejs
        ├── new.ejs

Author :
Trupti Yerne
