// Import external tools
require("dotenv").config();
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// Import internal tools

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "Mustangs1!",
    database: "company_db",
  },
  console.log("Connected to the company_db database.")
);

const firstQuestion = {
  type: "list",
  message: "What would you like to do? ",
  choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
  ],
  name: "options",
};

inquirer.prompt(firstQuestion).then((answers) => {
  if (answers.options === "View all departments") {
    db.query("SELECT * FROM departments", function (err, results) {
      console.log(results);
    });
  } else if (answers.options === "View all roles") {
    db.query("SELECT * FROM roles", function (err, results) {
      console.log(results);
    });
  } else if (answers.options === "View all employees") {
    db.query("SELECT * FROM employees", function (err, results) {
      console.log(results);
    });
  } else if (answers.options === "Add a department") {
    console.log("Add a department");
  } else if (answers.options === "Add a role") {
    console.log("Add a role");
  } else if (answers.options === "Add an employee") {
    console.log("Add an employee");
  } else if (answers.options === "Update an employee role") {
    console.log("Update an employee");
  }
});
// Got it to successfully know when I am choosing a certain answer, need to then make it
// run a command with mysql2 to pull info from the database.

app.use((req, res) => {
  res.stats(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
