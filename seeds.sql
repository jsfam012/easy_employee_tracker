-- Copied from workbench

-- Departments
USE employee_tracker;

INSERT INTO department (name) VALUES 
	("Sales"),
    ("Engineering"),
	("Finance"),
    ("Legal");


-- Role information
USE employee_tracker;

INSERT INTO role (title, salary, department_id) VALUES
    ("Sales_Lead", 100000, 1),
    ("Salespeson", 80000, 1),
    ("Lead_Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 100000, 3),
    ("Accountant", 120000, 3),
    ("Legal_Team_Lead", 100000, 4),
    ("Lawyer", 190000, 4);



-- Employee information
USE employee_tracker;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
	("John", "Doe", 1, null),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, null),
    ("Kevin", "Tupik", 4, 3),
    ("Kunal", "Singh", 5, null),
    ("Malia", "Brown", 6, 5),
    ("Sarah", "Lourd", 7, null),
    ("Tom", "Allen", 8, 7);
