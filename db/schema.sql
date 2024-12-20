DROP DATABASE IF EXISTS company_manager;
CREATE DATABASE company_manager;

\c company_manager;

CREATE TABLE division (
    id SERIAL PRIMARY KEY,
    division_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE position (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    pay DECIMAL NOT NULL,
    division_id INTEGER NOT NULL,
    FOREIGN KEY (division_id) REFERENCES division(id)
);

CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position_id INTEGER NOT NULL,
    supervisor_id INTEGER,
    FOREIGN KEY (position_id) REFERENCES position(id),
    FOREIGN KEY (supervisor_id) REFERENCES staff(id)
);