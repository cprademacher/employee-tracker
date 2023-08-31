// Import external tools
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

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

inquirer.prompt([
  {
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
  },
]);
