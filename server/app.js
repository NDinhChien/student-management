// server sẽ chạy ở port này
const PORT = 5000;
// khai báo express js app
const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');

const session = require("express-session")
const mySQLStore = require("express-mysql-session")(session);
const pool = require('./utils/getPool');
const cors = require('cors');


app.use(cors());
app.use(cookieParser());
// cho phép nhận xử lý dữ liệu json và x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = require('./config/dbConfig');
// const { send } = require('process');
const options = {
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    port: dbConfig.DB_PORT,
    connectionLimit: 5
}

const storeOptions = {
    expiration: 1000*60*15,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessiontb',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}
let sessionStore = new mySQLStore(storeOptions, mysql.createPool(options));

app.use(session({
    secret: 'xsowlneln323or3no2jrewojwslwenrs',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

const reportRoutes = require('./routes/report')
const homeRoutes = require('./routes/home');
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/user');
const classRoutes = require('./routes/class');
const scoreRoutes = require('./routes/score');

app.use(reportRoutes);
app.use(scoreRoutes);
app.use(homeRoutes);
app.use(userRoutes);
app.use(studentRoutes);
app.use(classRoutes);

// Chạy server
app.listen(PORT, () => console.log('app is running'));
