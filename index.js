const inquirer = require("inquirer");
const { Pool } = require("pg");
const logo = require("asciiart-logo");

// Display a welcome logo for the application
console.log(
  logo({
    name: "Company Manager",
    font: "Standard",
    lineChars: 8,
    padding: 2,
    margin: 2,
  })
    .emptyLine()
    .right("v2.0")
    .emptyLine()
    .render()
);

// Set up a connection pool for interacting with the database
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  database: "company_manager",
});

// Initialize the database schema and seed data
async function initializeDatabase() {
  try {
    const schema = fs.readFileSync(path.join(__dirname, "db/schema.sql"), "utf8");
    const seeds = fs.readFileSync(path.join(__dirname, "db/seeds.sql"), "utf8");

    await pool.query(schema);
    console.log("Database schema has been initialized.");

    await pool.query(seeds);
    console.log("Database has been seeded with initial data.");
  } catch (err) {
    console.error("Error initializing the database:", err);
    process.exit(1);
  }
}

// Main menu function to navigate the application
async function mainMenu() {
  const { action } = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "Choose an action:",
    choices: [
      "View All Staff",
      "View All Positions",
      "View All Divisions",
      "Add Staff",
      "Update Staff Position",
      "Add Position",
      "Add Division",
      "Exit",
    ],
  });

  // Route user to the corresponding function based on their choice
  switch (action) {
    case "View All Staff":
      return viewAllStaff();
    case "View All Positions":
      return viewAllPositions();
    case "View All Divisions":
      return viewAllDivisions();
    case "Add Staff":
      return addStaff();
    case "Update Staff Position":
      return updateStaffPosition();
    case "Add Position":
      return addPosition();
    case "Add Division":
      return addDivision();
    default:
      console.log("Goodbye!");
      process.exit();
  }
}

// Function to view all staff members along with their positions and divisions
async function viewAllStaff() {
  const { rows } = await pool.query(
    `SELECT s.id, s.first_name, s.last_name, p.name AS position, d.division_name AS division
     FROM staff s
     JOIN position p ON s.position_id = p.id
     JOIN division d ON p.division_id = d.id`
  );
  console.table(rows);
  mainMenu();
}

// Function to view all job positions along with their divisions
async function viewAllPositions() {
  const { rows } = await pool.query(
    `SELECT p.id, p.name, p.pay, d.division_name AS division
     FROM position p
     JOIN division d ON p.division_id = d.id`
  );
  console.table(rows);
  mainMenu();
}

// Function to view all company divisions
async function viewAllDivisions() {
  const { rows } = await pool.query(`SELECT * FROM division`);
  console.table(rows);
  mainMenu();
}

// Function to add a new staff member
async function addStaff() {
  const positions = await pool.query(`SELECT id, name FROM position`);
  const supervisors = await pool.query(`SELECT id, first_name || ' ' || last_name AS name FROM staff`);

  const { firstName, lastName, positionId, supervisorId } = await inquirer.prompt([
    { name: "firstName", type: "input", message: "Enter first name:" },
    { name: "lastName", type: "input", message: "Enter last name:" },
    {
      name: "positionId",
      type: "list",
      message: "Choose a position:",
      choices: positions.rows.map((p) => ({ name: p.name, value: p.id })),
    },
    {
      name: "supervisorId",
      type: "list",
      message: "Choose a supervisor:",
      choices: supervisors.rows.map((s) => ({ name: s.name, value: s.id })).concat({ name: "None", value: null }),
    },
  ]);

  await pool.query(
    `INSERT INTO staff (first_name, last_name, position_id, supervisor_id) VALUES ($1, $2, $3, $4)`,
    [firstName, lastName, positionId, supervisorId]
  );

  console.log("Staff added successfully.");
  mainMenu();
}

// Function to update a staff member's position
async function updateStaffPosition() {
  const staff = await pool.query(`SELECT id, first_name || ' ' || last_name AS name FROM staff`);
  const positions = await pool.query(`SELECT id, name FROM position`);

  const { staffId, positionId } = await inquirer.prompt([
    {
      name: "staffId",
      type: "list",
      message: "Choose a staff member:",
      choices: staff.rows.map((s) => ({ name: s.name, value: s.id })),
    },
    {
      name: "positionId",
      type: "list",
      message: "Choose a new position:",
      choices: positions.rows.map((p) => ({ name: p.name, value: p.id })),
    },
  ]);

  await pool.query(`UPDATE staff SET position_id = $1 WHERE id = $2`, [positionId, staffId]);

  console.log("Staff position updated successfully.");
  mainMenu();
}

// Function to add a new job position
async function addPosition() {
  const divisions = await pool.query(`SELECT id, division_name FROM division`);

  const { name, pay, divisionId } = await inquirer.prompt([
    { name: "name", type: "input", message: "Enter position name:" },
    { name: "pay", type: "input", message: "Enter position salary:" },
    {
      name: "divisionId",
      type: "list",
      message: "Choose a division:",
      choices: divisions.rows.map((d) => ({ name: d.division_name, value: d.id })),
    },
  ]);

  await pool.query(`INSERT INTO position (name, pay, division_id) VALUES ($1, $2, $3)`, [name, pay, divisionId]);

  console.log("Position added successfully.");
  mainMenu();
}

// Function to add a new division
async function addDivision() {
    const { name } = await inquirer.prompt({ name: "name", type: "input", message: "Enter division name:" });
    await pool.query(`INSERT INTO division (division_name) VALUES ($1)`, [name]);
    console.log("Division added successfully.");
    mainMenu();
}
  
pool.connect().then(() => {
    console.log("Connected to the database.");
    mainMenu();
});
