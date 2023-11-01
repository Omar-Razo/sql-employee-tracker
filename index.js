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
                    //self join so that table shows manager name rather than just manager id
                    db.query('SELECT a.id, a.first_name, a.last_name, a.role_id, b.first_name AS manager_first_name, b.last_name AS manager_last_name FROM employee a LEFT JOIN employee b on a.manager_id = b.id;', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            console.table(results)
                            viewMenu()
                        }
                    });
                    break
                case 'View Employee by Manager':
                    // query managers EXTRA
                    // db.query('')
                    break
                case 'View Employee by Department':
                    // EXTRA
                    //db.query('')
                    break
                case 'View Department Budget Utilization':
                    // EXTRA
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
                    db.query('SELECT dept_name, id FROM department', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            const depts = results
                            inquirer.prompt([
                                {
                                type: 'input',
                                message: 'Name of new role: ',
                                name: 'newRole'
                                },
                                {
                                type: 'input',
                                message: 'Salary of new role: ',
                                name: 'newSalary'
                                },
                                {
                                type: 'list',
                                message: 'Which department does this role belong to?',
                                name: 'roleDept',
                                choices: results.map((result) => result.dept_name)
                                }
                            ])
                            .then((answer) => {
                                const deptId = depts.find((el) => el.dept_name === answer.roleDept)
                                db.query(`INSERT INTO role (title, salary, department_id)
                                    VALUES (?, ?, ?)`, [answer.newRole, answer.newSalary, deptId.id], (err, results) => {
                                        if (err) {
                                            console.log('ERROR: ', err)
                                        } else {
                                            console.log('Role created!')
                                            addMenu();
                                        }
                                    })
                            }).catch((err) => console.error(err))
                        }
                    })
                    break
                case 'Add Employee':
                    // Prompt: first, last, 
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
                    db.query('SELECT dept_name FROM department', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            const selectDept = () => {
                                inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'deleteDept',
                                    message: 'Which department would you like to delete?',
                                    choices: results.map((result) => result.dept_name)
                                },
                                {
                                    type: 'list',
                                    name: 'confirm',
                                    message: 'Confirm department you would like to delete: ',
                                    choices: results.map((result) => result.dept_name)
                                }
                                ])
                                .then((response) => {
                                    if (response.confirm === response.deleteDept) {
                                        db.query('DELETE FROM department WHERE dept_name = (?)', [response.deleteDept], (err, results) => {
                                            if (err) {
                                                console.log('ERROR: ', err)
                                            } else {
                                                console.log('Department deleted!');
                                                deleteMenu();
                                            }
                                        })
                                    } else {
                                        console.log('Department choices do not match!')
                                        selectDept();
                                    }
                                })
                                .catch((err) => console.error(err))
                            }
                            selectDept();
                        }
                    })
                    break
                case 'Delete Role':
                    db.query('SELECT title FROM role', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            const selectRole = () => {
                                inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'deleteRole',
                                    message: 'Which role would you like to delete?',
                                    choices: results.map((result) => result.title)
                                },
                                {
                                    type: 'list',
                                    name: 'confirm',
                                    message: 'Confirm role you would like to delete: ',
                                    choices: results.map((result) => result.title)
                                }
                                ])
                                .then((response) => {
                                    if (response.confirm === response.deleteRole) {
                                        db.query('DELETE FROM role WHERE title = (?)', [response.deleteRole], (err, results) => {
                                            if (err) {
                                                console.log('ERROR: ', err)
                                            } else {
                                                console.log('Role deleted!');
                                                deleteMenu();
                                            }
                                        })
                                    } else {
                                        console.log('Roles do not match!')
                                        selectRole();
                                    }
                                })
                                .catch((err) => console.error(err))
                            }
                            selectRole();
                        }
                    })
                    break
                case 'Delete Employee':
                    db.query('SELECT first_name, last_name FROM employee', (err, results) => {
                        if (err) {
                            console.log('ERROR: ', err)
                        } else {
                            const selectEmployee = () => {
                                inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'deleteEmployee',
                                    message: 'Which employee would you like to delete?',
                                    choices: results.map((result) => `${result.first_name} ${result.last_name}`)
                                },
                                {
                                    type: 'list',
                                    name: 'confirm',
                                    message: 'Confirm employee you would like to delete: ',
                                    choices: results.map((result) => `${result.first_name} ${result.last_name}`)
                                }
                                ])
                                .then((response) => {
                                    console.log(response.deleteEmployee)
                                    if (response.confirm === response.deleteEmployee) {
                                        const splitName = response.deleteEmployee.split(' ');
                                        db.query('DELETE FROM employee WHERE first_name = (?) AND last_name = (?)', [splitName[0], splitName[1]], (err, results) => {
                                            if (err) {
                                                console.log('ERROR: ', err)
                                            } else {
                                                console.log('Employee deleted!');
                                                deleteMenu();
                                            }
                                        })
                                    } else {
                                        console.log('Employees do not match!')
                                        selectEmployee();
                                    }
                                })
                                .catch((err) => console.error(err))
                            }
                            selectEmployee();
                        }
                    })
                    break
                case 'Return to main menu':
                    mainMenu();
                    break
            }
        })
        .catch((err) => console.error(err))
}

mainMenu();