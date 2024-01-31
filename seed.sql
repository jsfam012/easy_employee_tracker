-- Copied from workbench

-- Departments
USE employee_tracker;

INSERT INTO department (id, name) VALUES 
	(1, "Sales"),
    (2, "Engineering"),
	(3, "Finance"),
    (4, "Legal");

-- Employee information
USE employee_tracker;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
	(1, "John", "Doe", "Sales_Lead", null)
    (2, "Mike", "Chan", "Salesperson", "John_Doe"),
    (3, "Ashley", "Rodriguez", "Lead Engineer", null),
    (4, "Kevin", "Tupik", "Software Engineer", "Ashely Rodriguez"),
    (5, "Kunal", "Singh", "Finance", "null"),
    (6, "Malia", "Brown", "Accountant", "Kunal Singh"),
    (7, "Sarah", "Lourd", "Legal_Team_Lead", "null"),
    (8, "Tom", "Allen", "Lawyer", "Sarah Lourd");


-- Role information
USE employee_tracker;

INSERT INTO role (id, title, salary, department_id) VALUES
	(1, "Sales_Lead", "100000", "Sales"),
    (2, "Salespeson", "80000", "Sales"),
    (3, "Lead_Engineer", "Engineering", "150000"),
    (4, "Software Engineer", "Engineering", "120000"),
    (5, "Account Manager", "Finance", "160000"),
    (6, "Accountant", "Finance", "125000"),
    (7, "Legal_Team_Lead", "Legal", "250000"),
    (8, "Lawyer", "Legal", "190000");