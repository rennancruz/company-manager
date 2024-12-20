-- Seed the department table
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Inventory'),
    ('Technician Area'),
    ('Cleaners');

-- Seed the role table
INSERT INTO role (title, salary, department_id) VALUES
    ('Salesperson', 4000, 1),
    ('Inventory Manager', 4500, 2),
    ('Technician', 4870, 3),
    ('Janitor', 2000, 4);

-- Seed the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Alexander', 'Morales', 1, NULL),
    ('Javier', 'Lopez', 2, NULL),
    ('Henry', 'Alias', 3, NULL),
    ('Iris', 'Gomez', 4, NULL);
