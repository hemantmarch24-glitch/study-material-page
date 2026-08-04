const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register route
app.post("/register", (req, res) => {

    const student = req.body;

    let students = [];

    if (fs.existsSync("students.json")) {
        students = JSON.parse(fs.readFileSync("students.json", "utf8"));
    }

    students.push(student);

    fs.writeFileSync(
        "students.json",
        JSON.stringify(students, null, 2)
    );

    res.json({
        message: "Saved successfully"
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
