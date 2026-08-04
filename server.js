const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

// Serve static files from the project folder
app.use(express.static(__dirname));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// Register route
app.post("/register", (req, res) => {

    const student = req.body;

    let students = [];

    if (fs.existsSync("students.json")) {
        students = JSON.parse(
            fs.readFileSync("students.json", "utf8")
        );
    }

    students.push(student);

    fs.writeFileSync(
        "students.json",
        JSON.stringify(students, null, 2)
    );


    // Temporary check in Railway logs
    console.log("New Student Saved:", student);


    res.json({
        message: "Saved successfully"
    });

});


// Login route
app.post("/login", (req, res) => {

    const { email, pass } = req.body;

    let students = [];

    if (fs.existsSync("students.json")) {
        students = JSON.parse(
            fs.readFileSync("students.json", "utf8")
        );
    }

    const student = students.find(
        s => s.email === email && s.pass === pass
    );

    if (student) {

        res.json({
            message: "Login successful"
        });

    } else {

        res.status(401).json({
            message: "Invalid email or password"
        });

    }

});


// View all registered students (temporary)
app.get("/students", (req, res) => {

    if (fs.existsSync("students.json")) {

        const students = JSON.parse(
            fs.readFileSync("students.json", "utf8")
        );

        res.json(students);

    } else {

        res.json({
            message: "No students registered yet"
        });

    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
