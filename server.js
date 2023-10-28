const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});