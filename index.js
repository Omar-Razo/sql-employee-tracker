const mysql = require('mysql2');
require('dotenv').config()
const inquirer = require('inquirer')
//sqlCommands intended to import an array of question objects for inquirer
const interface = require('./interface')


// const db = mysql.createConnection(
//     {
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME
//     },
//     console.log(`Connected to the ${process.env.DB_NAME} database.`)
// );




interface.mainMenu()