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

// Utilize inquirer prompt to create questions and choices
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
            'Add Department'
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
                })
                break;

            case "Add Employee":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'action',
                        message: 'What is employee\'s first name??'
                        
                    },
                    // after this, 'What is employee's last name?/'What is the employee's role?'/'Who is the employee's namager?
                ]);
            
                // function
                db.query("INSERT INTO * FROM ")
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

            case "Add Role":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'action',
                        message: 'What is the name of the role?'
                    },
                    // after this, "What is the name of the role?"/"What is the salary of the role?"/"Whcih department does the role belong to?"
                ]);    
            // function
                db.query(`INSERT INTO department (id, name) VALUES (1, "Sales")`, function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.table(result)
                })
                break;

            case "Add Department":
                //  ask question first using inquirer prompt
                // SA
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'action',
                        message: 'What is the name of the department?'
                        
                    },
                ]);
                // function
                // db.query('INSERT INTO (')

              


                break;

            default:
                console.log("None")
        }


    })