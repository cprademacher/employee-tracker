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
    choices: [1, 2, 3, 4, 5],
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
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    name: "employeeRole",
  },
  {
    type: "list",
    message: "Who is the employee's manager? ",
    choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    name: "employeeManager",
  },
];

const updateEmployeeRoleQuestions = [
  {
    type: "list",
    message: "Which employee would you like to update? ",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    name: "employee_id",
  },
  {
    type: "list",
    message: "Which role would you like to choose? ",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    name: "role_id",
  },
];

function getAnswers() {
  return inquirer.prompt(firstQuestion).then((answers) => {
    if (answers.options === "View all departments") {
      db.query("SELECT * FROM departments", function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.table(results);
        }
        return getAnswers();
      });
    } else if (answers.options === "View all roles") {
      db.query(
        "SELECT title, salary, name FROM roles JOIN departments ON roles.department = departments.id;",
        function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
          }
          return getAnswers();
        }
      );
    } else if (answers.options === "View all employees") {
      db.query(
        "SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name, r.title AS employee_title, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employees AS e JOIN roles AS r ON e.role_id = r.id LEFT JOIN employees AS m ON e.manager_id = m.id;",
        function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
          }
          return getAnswers();
        }
      );
    } else if (answers.options === "Add a department") {
      inquirer.prompt(addDepartmentQuestion).then((departmentAnswers) => {
        const newDept = departmentAnswers.departmentName;

        db.query(
          `INSERT INTO departments (name) VALUES ("${newDept}")`,
          function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
            }
            return getAnswers();
          }
        );
      });
    } else if (answers.options === "Add a role") {
      inquirer.prompt(addRoleQuestions).then((roleAnswers) => {
        const newRoleTitle = roleAnswers.roleTitle;
        const newRoleSalary = roleAnswers.roleSalary;
        const newRoleDepartment = roleAnswers.roleDepartment;
        console.log(newRoleTitle);
        console.log(newRoleSalary);
        console.log(newRoleDepartment);

        db.query(
          `INSERT INTO roles (title, salary, department) VALUES ("${newRoleTitle}", ${newRoleSalary}, ${newRoleDepartment})`,
          function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
            }
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
          `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
          [
            newEmployeeFirstName,
            newEmployeeLastName,
            newEmployeeRole,
            newEmployeeManager,
          ],
          function (err, results) {
            if (err) {
              console.log(err);
            } else {
              console.table(results);
            }
            return getAnswers();
          }
        );
      });
    } else if (answers.options === "Update an employee role") {
      inquirer.prompt(updateEmployeeRoleQuestions).then((updateRoleAnswers) => {
        const updatedRole = updateRoleAnswers.role_id;
        const employeeId = updateRoleAnswers.employee_id;

        db.query(
          `UPDATE employees SET role_id = ${updatedRole} WHERE id = ${employeeId};`,
          function (err, results) {
            console.table(results);
            return getAnswers();
          }
        );
      });
    } else if (answers.options === "Quit") {
      process.exit();
    }
  });
}

getAnswers();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

// Older issues fixed, need to still add manager's name when querying employees
// also need to fix the UPDATE statement.  It is currently updating the selected
// person and updating their role, but also udpated their id for some reason.
