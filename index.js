const inquirer = require("inquirer");
const { Pool } = require("pg");
const logo = require("asciiart-logo");

console.log(
  logo({
    name: "Employee Tracker",
    font: "Big",
    lineChars: 10,
    padding: 2,
    margin: 3,
  })
    .emptyLine()
    .right("Version 1.0")
    .emptyLine()
    .render()
);

const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  database: "employee_tracker",
});

pool.connect().then(() => {
  console.log("Connected to the employee_tracker database.");
});

function promptMenu() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Update Employee Role",
          "Add Role",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      handleUserChoice(answer.action);
    });
}