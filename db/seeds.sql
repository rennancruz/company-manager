-- Insert initial divisions into the division table
INSERT INTO division (division_name) VALUES
('Operations'),
('Finance'),
('IT Support'),
('HR'),
('Marketing'),
('Sales');

--Insert initial positions into the position table
INSERT INTO position (name, pay, division_id) VALUES
('Operations Manager', 5500, 1),
('Accountant', 4800, 2),
('Support Specialist', 4000, 3),
('HR Coordinator', 4200, 4),
('Marketing Lead', 5000, 5),
('Sales Representative', 4500, 6);

-- Insert initial staff members into the staff table
INSERT INTO staff (first_name, last_name, position_id, supervisor_id) VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, 1),
('Charlie', 'Brown', 3, 1),
('Diana', 'Prince', 4, 1),
('Emma', 'Davis', 5, NULL),
('Frank', 'Wilson', 6, NULL),
('Grace', 'Taylor', 6, 1),
('Hank', 'Evans', 2, 2);