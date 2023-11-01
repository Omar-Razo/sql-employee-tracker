# Module Twelve Challenge: SQL Employee Tracker

## Description
We are tasked with creating a CLI CMS **command line interface content management system** using Node.js, Inquirer, MySQL, and mysql2(allow node to connect and query our sql database). It should be noted that the dotenv npm package was also used to keep our environment variables hidden.

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input:

WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Bonus Criteria

The following are additional functionality that could be(and was) added on top of the minimum requirements: 

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.

## Mock-Up

The following is a link to a video showcasing the app in action:

https://youtu.be/1tmETEDVG_Q

## Installation

1) `npm i` or `npm install` to download dependencies.
2) A .envEXAMPLE is provided. From it you can create your own .env file to store the relevant variables needed to connect to the database.
3) `npm run db` is a script that will run the dbInitSeed.js file. This will create the sample database and seed it.
4) `npm start` is a script to run the app.

## Credits

Inquirer Documentation:

https://www.npmjs.com/package/inquirer

W3 Schools for SQL:

https://www.w3schools.com/sql/default.asp

MySQL2 Documentation:

https://www.npmjs.com/package/mysql2

Phind for debugging:

https://www.phind.com/
