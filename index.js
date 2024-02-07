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
        // after this, 'What is employee's last name?/'What is the employee's role?'/'Who is the employee's namager?
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
                    db.query("SELECT * FROM employee;", function (err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        //Used console.table not console.log to create table in terminal
                        console.table(result)
                        mainMenu();
                    })

                    break;

                case "View All Departments":
                    // function
                    db.query("SELECT * FROM department;", function (err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.table(result)
                        mainMenu();
                    })
                    break;

                case "View All Roles":
                    // function
                    db.query("SELECT * FROM role;", function (err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.table(result)
                        mainMenu();
                    })
                    break;

                case "Add Employee":
                    addEmployee();

                    mainMenu();
                    break;

                case "Update Employee Role":
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'action',
                            message: 'Which employee\'s role do you want to update?'
                        },
                        //'Which role do you want to assign the selected employee?    
                    ]);
                    //function
                    break;
                    
async function addRole() {
     // Preparing for the department choices           
    const [allDepartment] = await db.promise().query("SELECT * FROM department;");
                    
    const departmentChoices = allDepartment.map(function (department) {
                       
                            return {
                                value: department.id,
                                name: department.name
                            }
                        })
    // preparing for roll choices
                const


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
                                choices: modifiedResults
                            },


                        ])
                            .then(answers => {


                                db.query(
                                    "INSERT INTO role (title,salary, department_id) VALUES (? ,? ,?)",
                                    [answers.title, answers.salary, answers.department_id],
                                    function () {
                                        console.log("Role has been added!")
                                        mainMenu();
                                    }
                                )
                            })
        }
                    break;

                case "Add Department":
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'action',
                            message: 'What is the name of the department?',
                        },
                    ])

                        .then(answers => {

                            db.query(
                                "INSERT INTO department (name) VALUES (?)",
                                [answers.name], function () {
                                    console.log("Department has been added!")
                                    mainMenu();
                                }
                            )
                        })

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

