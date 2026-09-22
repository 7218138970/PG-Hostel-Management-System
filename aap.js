const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const methodOverride = require("method-override");

const app = express();


// ======================
// BASIC CONFIGURATION
// ======================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// ======================
// MYSQL CONNECTION
// ======================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tupi@127",
    database: "pg_hostel"
});

db.connect((err) => {

    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("MySQL Connected!");
    }

});


// ======================
// DASHBOARD
// ======================

app.get("/", (req, res) => {

    const studentQuery = "SELECT COUNT(*) AS total FROM students";
    const roomQuery = "SELECT COUNT(*) AS total FROM rooms";
    const complaintQuery = "SELECT COUNT(*) AS total FROM complaints";
    const paymentQuery = "SELECT COUNT(*) AS total FROM payments";

    db.query(studentQuery, (err, studentResult) => {

        if (err) return res.send("Database Error");

        db.query(roomQuery, (err, roomResult) => {

            if (err) return res.send("Database Error");

            db.query(complaintQuery, (err, complaintResult) => {

                if (err) return res.send("Database Error");

                db.query(paymentQuery, (err, paymentResult) => {

                    if (err) return res.send("Database Error");

                    res.render("index", {
                        totalStudents: studentResult[0].total,
                        totalRooms: roomResult[0].total,
                        totalComplaints: complaintResult[0].total,
                        totalPayments: paymentResult[0].total
                    });

                });

            });

        });

    });

});


// ==================================================
// STUDENT ROUTES
// ==================================================


// Show all students

app.get("/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, students) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("students/index", {
            students
        });

    });

});


// Add student page

app.get("/students/new", (req, res) => {

    res.render("students/new");

});


// Add student

app.post("/students", (req, res) => {

    const {
        name,
        email,
        phone,
        gender,
        college,
        course
    } = req.body;

    const sql = `
        INSERT INTO students
        (name, email, phone, gender, college, course)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone, gender, college, course],
        (err) => {

            if (err) {
                console.log(err);
                return res.send("Error adding student");
            }

            res.redirect("/students");

        }
    );

});


// Edit student page

app.get("/students/:id/edit", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM students
        WHERE student_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("students/edit", {
            student: result[0]
        });

    });

});


// Update student

app.put("/students/:id", (req, res) => {

    const { id } = req.params;

    const {
        name,
        email,
        phone,
        gender,
        college,
        course
    } = req.body;

    const sql = `
        UPDATE students
        SET
            name = ?,
            email = ?,
            phone = ?,
            gender = ?,
            college = ?,
            course = ?
        WHERE student_id = ?
    `;

    db.query(
        sql,
        [
            name,
            email,
            phone,
            gender,
            college,
            course,
            id
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send("Error updating student");
            }

            res.redirect("/students");

        }
    );

});


// Delete student

app.delete("/students/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM students
        WHERE student_id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            console.log(err);
            return res.send("Error deleting student");
        }

        res.redirect("/students");

    });

});


// ==================================================
// ROOM ROUTES
// ==================================================


// Show all rooms

app.get("/rooms", (req, res) => {

    const sql = "SELECT * FROM rooms";

    db.query(sql, (err, rooms) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("rooms/index", {
            rooms
        });

    });

});


// Add room page

app.get("/rooms/new", (req, res) => {

    res.render("rooms/new");

});


// Add room

app.post("/rooms", (req, res) => {

    const {
        room_number,
        floor,
        room_type,
        capacity,
        rent,
        status
    } = req.body;

    const sql = `
        INSERT INTO rooms
        (room_number, floor, room_type, capacity, rent, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            room_number,
            floor,
            room_type,
            capacity,
            rent,
            status
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send("Error adding room");
            }

            res.redirect("/rooms");

        }
    );

});


// Edit room page

app.get("/rooms/:id/edit", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM rooms
        WHERE room_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("rooms/edit", {
            room: result[0]
        });

    });

});


// Update room

app.put("/rooms/:id", (req, res) => {

    const { id } = req.params;

    const {
        room_number,
        floor,
        room_type,
        capacity,
        rent,
        status
    } = req.body;

    const sql = `
        UPDATE rooms
        SET
            room_number = ?,
            floor = ?,
            room_type = ?,
            capacity = ?,
            rent = ?,
            status = ?
        WHERE room_id = ?
    `;

    db.query(
        sql,
        [
            room_number,
            floor,
            room_type,
            capacity,
            rent,
            status,
            id
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.send("Error updating room");
            }

            res.redirect("/rooms");

        }
    );

});


// Delete room

app.delete("/rooms/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM rooms
        WHERE room_id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            console.log(err);
            return res.send("Error deleting room");
        }

        res.redirect("/rooms");

    });

});


// ======================
// SERVER
// ======================

app.listen(8080, () => {

    console.log(
        "Server running on http://localhost:8080"
    );

});