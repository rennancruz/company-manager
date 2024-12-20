# Company Manager

## Description
The **Company Manager** application is a command-line tool that allows users to manage a company's organizational structure efficiently. It enables the management of divisions, positions, and staff members with ease, providing a user-friendly interface to interact with the database.

## Demo
https://github.com/user-attachments/assets/011ffc83-2f82-494b-924f-f8fc64b4a866


## Features
- View all staff, positions, and divisions.
- Add new staff members, positions, and divisions.
- Update staff positions.
- Automatically reset and seed the database on application start.

## Technologies Used
- **Node.js**: For the server-side application logic.
- **PostgreSQL**: As the relational database management system.
- **pg**: PostgreSQL client for Node.js.
- **Inquirer.js**: For creating interactive command-line prompts.
- **asciiart-logo**: For generating an aesthetic logo in the terminal.

## Installation
1. Clone the repository:
```bash
    git clone <repository-url>
    cd company-manager
```
2. Install the dependencies:
```bash
    npm install
```
3. Ensure PostgreSQL is running on your machine.
4. Update the database credentials in index.js:
   ```javascript
    const pool = new Pool({
        user: "postgres",
        password: "YourPassword",
        host: "localhost",
        database: "company_manager",
    });
   ```

## Usage
1. Start the application:
```bash
    node index.js
```
2. Follow the prompts to interact with the application.

## Database Schema
The database consists of three tables:

- Division: Stores the organizational divisions.
- Position: Stores job roles and their associated divisions.
- Staff: Stores employee details and their hierarchical relationships.

## Schema Diagram
```mathematica
    Division
  |-- id (Primary Key)
  |-- division_name (Unique, Not Null)

Position
  |-- id (Primary Key)
  |-- name (Unique, Not Null)
  |-- pay (Not Null)
  |-- division_id (Foreign Key)

Staff
  |-- id (Primary Key)
  |-- first_name (Not Null)
  |-- last_name (Not Null)
  |-- position_id (Foreign Key)
  |-- supervisor_id (Foreign Key, Nullable)
```

## License
This project is licensed under the MIT License.
