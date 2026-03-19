const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abhinav",
    database: "abhinav"
});

db.connect(err => {
   if(err){
    console.log("MYSQL ERROR:", err);
   } else {
    console.log("Connected to MySQL");
   }
});

app.post("/addUser", (req, res) => {

    console.log(req.body); // 🔍 debug

    const { username, age, date, address, gender } = req.body;

    const sql = "INSERT INTO form (username, age, date, address, gender) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [username, age, date, address, gender], (err, result) => {
        if(err){
            console.log("MYSQL ERROR:", err);
            res.send(err.sqlMessage);
        } else {
            res.send("Data inserted successfully");
        }
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});