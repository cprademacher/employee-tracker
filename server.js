// Import external tools
require("dotenv").config();
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// Import internal tools

const app = express();

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
  if (answers.options === "View all employees") {
    console.log("success!");
  } else {
    console.log("failure");
  }
});
// Got it to successfully know when I am choosing a certain answer, need to then make it
// run a command with mysql2 to pull info from the database.
