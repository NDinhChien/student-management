const mysql = require('mysql');

// thông tin TK và DB: server sẽ kết nối với DB dùng TK này
const dbConfig = require('../config/dbConfig');
const options = {
    host: dbConfig.HOST,
    user: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
    port: dbConfig.DB_PORT,
    connectionLimit: 25
}
const pool = mysql.createPool(options);
module.exports = pool;