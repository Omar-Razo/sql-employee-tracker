const mysql = require('mysql2');
require('dotenv').config()
const inquirer = require('inquirer');

const db = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    },
);

const firstSet = [
    {
        type: 'list',
        name: 'crud',
        message: 'Welcome. What would you like to do?',
        choices: [
            'View',
            'Add/Update',
            'Delete',
            new inquirer.Separator(),
            'Exit program',
            new inquirer.Separator(),
        ]
    }
]

const addOpts = [
    {
        type: 'list',
        name: 'addOpt',
        message: 'What would you like to add/update?',
        choices: [
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee\'s Role',
            new inquirer.Separator(),
            'Return to main menu',
            new inquirer.Separator(),
        ]
    }
]

const deleteOpts = [
    {
        type: 'list',
        name: 'deleteOpt',
        message: 'What would you like to delete?',
        choices: [
            'Delete Department',
            'Delete Role',
            'Delete Employee',
            new inquirer.Separator(),
            'Return to main menu',
            new inquirer.Separator(),
        ]
    }
]

const viewOpts = [
    {
        type: 'list',
        name: 'viewOpt',
        message: 'What would you like to view?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'View Employee by Manager',
            'View Employee by Department',
            'View Department Budget Utilization',
            new inquirer.Separator(),
            'Return to main menu',
            new inquirer.Separator(),
        ]
    }
]

const mainMenu = () => {
    inquirer
        .prompt(firstSet)
        .then((answers) => {
            switch(answers.crud) {
                case 'View':
                    viewMenu();
                    break
                case 'Add/Update':
                    addMenu();
                    break
                case 'Delete':
                    deleteMenu();
                    break
                case 'Exit program':
                    process.exit();
            }
        })
        .catch((err) => console.error(err))
}

const viewMenu = () => {
    inquirer
        .prompt(viewOpts)
        .then((answers) => {
            switch(answers.viewOpt) {
                case 'View All Departments':
                    db.query('SELECT * FROM department', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            console.table(results)
                            viewMenu()
                        }
                    });
                    break
                case 'View All Roles':
                    db.query('SELECT * FROM role', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            console.table(results)
                            viewMenu()
                        }
                    });
                    break
                case 'View All Employees':
                    db.query('SELECT * FROM employee', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            console.table(results)
                            viewMenu()
                        }
                    });
                    break
                case 'View Employee by Manager':
                    // query managers
                    db.query('')
                    break
                case 'View Employee by Department':
                    //db.query('')
                    break
                case 'View Department Budget Utilization':
                    //db.query('')
                    break
                case 'Return to main menu':
                    mainMenu();
                    break
            };
        })
        .catch((err) => console.error(err))
}

const addMenu = () => {
    inquirer
        .prompt(addOpts)
        .then((answers) => {
            switch(answers.addOpt) {
                case 'Add Department':
                    inquirer.prompt({
                        type: 'input',
                        message: 'Name of new department: ',
                        name: 'newDept'
                    }).then((answer) => {
                        const newDept = answer.newDept
                        db.query(`INSERT INTO department (dept_name)
                            VALUES (?)`, [newDept], (err, results) => {
                                if (err) {
                                    console.log('ERROR: ', err)
                                } else {
                                    console.log('Department created!')
                                    addMenu();
                                }
                            })
                    }).catch((err) => console.error(err))
                    break
                case 'Add Role':
                    inquirer.prompt({
                        type: 'input',
                        message: 'Name of new role: ',
                        name: 'newRole'
                    }).then((answer) => {
                        const newRole = answer.newRole
                        db.query(`INSERT INTO role (title)
                            VALUES (?)`, [newRole], (err, results) => {
                                if (err) {
                                    console.log('ERROR: ', err)
                                } else {
                                    console.log('Role created!')
                                    addMenu();
                                }
                            })
                    }).catch((err) => console.error(err))
                    break
                case 'Add Employee':

                    break
                case 'Update Employee\'s Role':
                    break
                case 'Return to main menu':
                    mainMenu();
                    break
            }
        })
        .catch((err) => console.error(err))
}

const deleteMenu = () => {
    inquirer
        .prompt(deleteOpts)
        .then((answers) => {
            switch(answers.deleteOpt) {
                case 'Delete Department':
                case 'Delete Role':
                case 'Delete Employee':
                case 'Return to main menu':
                    mainMenu();
                default:
            }
        })
        .catch((err) => console.error(err))
}

mainMenu();