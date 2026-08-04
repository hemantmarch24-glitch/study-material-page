const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/register", (req, res) => {

    const student = req.body;

    let students = [];

    if(fs.existsSync("students.json")){
        students = JSON.parse(fs.readFileSync("students.json"));
    }

    students.push(student);

    fs.writeFileSync(
        "students.json",
        JSON.stringify(students,null,2)
    );

    res.json({
        message:"Saved successfully"
    });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});