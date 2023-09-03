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
    "Quit",
  ],
  name: "options",
};

const addDepartmentQuestion = {
  type: "input",
  message: "Which department do you want to add? ",
  name: "departmentName",
};

const addRoleQuestions = [
  {
    type: "input",
    message: "Which role do you want to add? ",
    name: "roleTitle",
  },
  {
    type: "input",
    message: "What is the salary for this role? ",
    name: "roleSalary",
  },
  {
    type: "list",
    message: "Which department is this role a part of? ",
    options: [1, 2, 3, 4, 5],
    name: "roleDepartment",
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employee's first name? ",
    name: "employeeFirstName",
  },
  {
    type: "input",
    message: "What is the employee's last name? ",
    name: "employeeLastName",
  },
  {
    type: "list",
    message: "What will this employee's role be? ",
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    name: "employeeRole",
  },
  {
    type: "list",
    message: "Who is the employee's manager? ",
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    name: "employeeManager",
  },
];

function getAnswers() {
  return inquirer.prompt(firstQuestion).then((answers) => {
    if (answers.options === "View all departments") {
      db.query("SELECT * FROM departments", function (err, results) {
        console.log(results);
        return getAnswers();
      });
    } else if (answers.options === "View all roles") {
      db.query("SELECT * FROM roles", function (err, results) {
        console.log(results);
        return getAnswers();
      });
    } else if (answers.options === "View all employees") {
      db.query("SELECT * FROM employees", function (err, results) {
        console.log(results);
        return getAnswers();
      });
    } else if (answers.options === "Add a department") {
      inquirer.prompt(addDepartmentQuestion).then((departmentAnswers) => {
        const newDept = departmentAnswers.departmentName;

        db.query(
          `INSERT INTO departments (name) VALUES ("${newDept}")`,
          function (err, results) {
            console.log(results);
            return getAnswers();
          }
        );
      });
    } else if (answers.options === "Add a role") {
      inquirer.prompt(addRoleQuestions).then((roleAnswers) => {
        const newRoleTitle = roleAnswers.roleTitle;
        const newRoleSalary = roleAnswers.roleSalary;
        const newRoleDepartment = roleAnswers.roleDepartment;

        db.query(
          `INSERT INTO roles (title, salary, department) VALUES ("${newRoleTitle}"), (${newRoleSalary}), (${newRoleDepartment})`,
          function (err, results) {
            console.log(results);
            return getAnswers();
          }
        );
      });
    } else if (answers.options === "Add an employee") {
      inquirer.prompt(addEmployeeQuestions).then((employeeAnswers) => {
        const newEmployeeFirstName = employeeAnswers.employeeFirstName;
        const newEmployeeLastName = employeeAnswers.employeeLastName;
        const newEmployeeRole = employeeAnswers.employeeRole;
        const newEmployeeManager = employeeAnswers.employeeManager;

        db.query(
          `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${newEmployeeFirstName}"), ("${newEmployeeLastName}"), (${newEmployeeRole}), (${newEmployeeManager})`,
          function (err, results) {
            console.log(results);
            return getAnswers();
          }
        );
      });
    } else if (answers.options === "Update an employee role") {
      console.log("Update an employee");
    } else if (answers.options === "Quit") {
      process.exit();
    }
  });
}

getAnswers();

app.use((req, res) => {
  res.stats(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});


// Issues still existing.  Follow up questions on adding role and employee are
// throwing errors.  Initial question when prompted is loading the questions over
// and over again instead of once each.