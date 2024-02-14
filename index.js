// Install required packages 
const inquirer = require('inquirer');
const mysql = require("mysql2");
require("console.table");

// Establish mysql connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker"
})

db.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    }
})

async function updateEmployee() {
    const [allEmployees] = await db.promise().query("SELECT * FROM employee;");

    const employeeChoices = allEmployees.map(function (employee) {
        return {
            value: employee.id,
            name: employee.first_name + " " + employee.last_name
        }
    })

    const [allRoles] = await db.promise().query("SELECT * FROM role;");

    const roleChoices = allRoles.map(function (role) {
        return {
            value: role.id,
            name: role.title
        }
    })

    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee do you want to update?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Which role do you want to assign?',
            choices: roleChoices
        },
        //'Which role do you want to assign the selected employee?    
    ])
        .then(answers => {
            // make the query for the updating the role_id of the employee
            // "UPDATE employee SET role_id = ? WHERE id = ?; "

            db.query(
                "UPDATE employee set role_id = ? WHERE id = ?",
                [answers.role_id, answers.id],
                function () {
                    console.log("Employee role updated successfully!")
                    mainMenu()
                }
            )
        })

}

function viewAllRoles() {
    // function
    db.query("SELECT * FROM role;", function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.table(result)
        mainMenu();
    })
}

function viewAllEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.first_name AS m_fist_name, manager.last_name AS m_last_name FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;", function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        //Used console.table not console.log to create table in terminal
        console.table(result)
        mainMenu();
    })
}


function viewAllDepartment() {
  // function
  db.query("SELECT * FROM department;", function (err, result) {
    if (err) {
        console.log(err);
        return;
    }
    console.table(result)
    mainMenu();
})
}

function addRole() {
    db.query(`SELECT * FROM department`, function (err, results) {
        const departmentChoices = results.map(function(department) {
            return {
                value: department.id,
                name: department.name
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
    
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary?'
    
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does this role belong to?',
                choices: departmentChoices
            },
    
    
        ]) .then(answers => {


            db.query(
                "INSERT INTO role (title, salary, department_id) VALUES (? ,? ,?)",
                [answers.title, answers.salary, answers.department_id],
                function () {
                    console.log("Role has been added!")
                    mainMenu();
                }
            )
        })
    })
}


function addDepartment() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?',
        },
    ]) .then(function(data){
        db.query(`INSERT INTO department (name) VALUES ("${data.department_name}")`, function () {
            console.log("Department has been added!")
            
            mainMenu();
        })
    })


        // .then(answers => {

        //     db.query(
        //         "INSERT INTO department (name) VALUES (?)",
        //         [answers.name], function () {
        //             console.log("Department has been added!")
        //             mainMenu();
        //         }
        //     )
        // })

}


async function addEmployee() {

    // preparing for the role choices
    const [allRoles] = await db.promise().query("SELECT * FROM role;");

    const roleChoices = allRoles.map(function (role) {
        return {
            value: role.id,
            name: role.title
        }
    })

    // preparing for employee choices
    const [allEmployees] = await db.promise().query("SELECT * FROM employee;");

    const employeeChoices = allEmployees.map(function (employee) {
        return {
            value: employee.id,
            name: employee.first_name + " " + employee.last_name
        }
    })
    // start asking questions
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is employee\'s first name??'

        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is employee\'s last name??'

        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is employee\'s role??',
            choices: roleChoices

        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'What is employee\'s manager?',
            choices: employeeChoices

        },
       
    ])
        .then(answers => {

            db.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (? ,? ,? ,?)",
                [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
                function () {
                    console.log("Employee has been added!")
                    mainMenu()
                }
            )

        })
}

// Utilize inquirer prompt to create questions and choices 
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Exit'
            ]
        },
    ])
        .then((answers) => {
            switch (answers.action) {
                case "View All Employees":
                    // function
                    viewAllEmployees()

                    break;

                case "View All Departments":
                    viewAllDepartment();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":
                    addEmployee();

                    break;

                case "Update Employee Role":
                    updateEmployee();
                    break;


                case "Add Role":
                    addRole();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                default:
                    console.log("None")
            }


        })
        .catch(err => {
            console.log("There has been an error!")
            console.log(err)
            mainMenu();
        })
}

mainMenu()