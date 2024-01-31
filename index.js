// Install required packages 
const inquirer = require('inquirer');
const mysql = require("mysql2");
require("console.table");

// Create mysql connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker"
})

db.connect(function(err) {
    if(err) {
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
.then ((answers) => {


    switch(answers.action) {
        case "View All Employees":
            // function
            db.query("SELECT * FROM employee;", function(err, result){
                if(err) {
                    console.log(err);
                    return;
                }
                console.table(result)
            })
            break;

        case "View All Departments":
             // function
            db.query("SELECT * FROM department;", function(err, result){
                if(err) {
                    console.log(err);
                    return;
                }
                console.table(result)
            })
            break;

        case "View All Roles":
            // function
            db.query("SELECT * FROM role;", function(err, result){
                if(err) {
                    console.log(err);
                    return;
                }
                console.table(result)
            })
            break;

        case "Add Employee":
            // function
            db.query("INSERT INTO * FROM ")
            break;
        
        case "Update Employee Role":
            //function
            break;
        
        case "Add Role":
            // function
            db.query(`INSERT INTO department (id, name) VALUES (1, "Sales")`, function(err, result){
                if(err) {
                    console.log(err);
                    return;
                }
                console.table(result)
            })
            break;
    
        case "Add Department":
            // function
            //  ask question first using inquirer prompt
            // 
            
            // db.query(`INSERT INTO department (id, name) VALUES 
            // (1, "Sales")`, function(err, result){
            //     if(err) {
            //         console.log(err);
            //         return;
            //     }
            //     console.table(result)
            // })


            break;

        default:
            console.log("None")
    }


})