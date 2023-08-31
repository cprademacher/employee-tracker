// Import external tools
const express = require("express");
const inquirer = require("inquirer");

// Import internal tools

const app = express();

const promptUser = () => {
  return inquirer.prompt([
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
    }
  ]);
};
