-- Drop the database if it already exists to ensure a clean slate for setup
DROP DATABASE IF EXISTS company_manager;

-- Create the company_manager database
CREATE DATABASE company_manager;

-- Connect to the newly created database
\c company_manager;

-- Create the division table to store company divisions
CREATE TABLE division (
    id SERIAL PRIMARY KEY,
    division_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create the position table to store job positions and their relationships to divisions
CREATE TABLE position (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    pay DECIMAL NOT NULL,
    division_id INTEGER NOT NULL,
    FOREIGN KEY (division_id) REFERENCES division(id)
);

-- Create the staff table to store employee information, including hierarchical relationships
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position_id INTEGER NOT NULL,
    supervisor_id INTEGER,
    FOREIGN KEY (position_id) REFERENCES position(id),
    FOREIGN KEY (supervisor_id) REFERENCES staff(id)
);