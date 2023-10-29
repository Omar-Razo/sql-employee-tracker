const inquirer = require('inquirer');

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
            'Update Employee\'s Manager',
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
                default:
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
                    // db.query('SELECT * FROM department')
                case 'View All Roles':
                    //db.query('SELECT * FROM role')
                case 'View All Employees':
                    //db.query('SELECT * FROM employee')
                case 'View Employee by Manager':
                    //db.query('')
                case 'View Employee by Department':
                    //db.query('')
                case 'View Department Budget Utilization':
                    //db.query('')
                case 'Return to main menu':
                    mainMenu();
                default:
            }
        })
}

const addMenu = () => {
    inquirer
        .prompt(addOpts)
        .then((answers) => {
            switch(answers.addOpt) {
                case 'Add Department':
                case 'Add Role':
                case 'Add Employee':
                case 'Update Employee\'s Manager':
                case 'Return to main menu':
                    mainMenu();
                default:
            }
        })
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
}

module.exports = {
    mainMenu,
    viewMenu,
    addMenu,
    deleteMenu
}