const USERNAME="dchien";
const PASSWORD="dchien172229";
const DATABASE="qlhocsinh3";
const DB_PORT=3307;
const HOST="localhost";

const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    port: DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async allStuSchool() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT hocsinh.MaHS, hocsinh.HoTen, hocsinh.Lop, diemtbhk.TBHK1, diemtbhk.TBHK2 FROM hocsinh INNER JOIN diemtbhk ON hocsinh.MaHS = diemtbhk.MaHS;";
                connection.query(query, (error, results) => {
                    if (error) reject(new Error(error.message));
                    resolve(results);
                })
            });
            return response;
        } catch(error) {
            console.log(error);
        }
    }
    async addStuSchool(data) {
        try {
            const {HoTen, GioiTinh, NgaySinh, DiaChi, Email} = data;
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO hocsinh (HoTen, GioiTinh, NgaySinh, DiaChi, Email) VALUES (?, ?, ?, ?, ?);";
                connection.query(query, [HoTen, GioiTinh, NgaySinh, DiaChi, Email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true: false;
        } catch(error) {
            console.log(error);
            return false;
        }
    }
    async updateStuInfo(mahs, data) {
        try {
            let setstr="";
            for (let x in data) {
                if (data[x]!=="") {
                    setstr += x + "='" + data[x] + "',";
                }
            }
            if (setstr==="") {
                return true;
            }
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE hocsinh SET " + setstr.slice(0, -1) + " WHERE MaHS = "+`${mahs};`;
                connection.query(query,(err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch(error) {
            console.log(error);
            return false;
        }
    }
    async searchStuById(mahs) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT hs.MaHS, hs.HoTen, hs.Lop, tbhk.TBHK1, tbhk.TBHK2 " + 
                "FROM hocsinh AS hs INNER JOIN diemtbhk AS tbhk ON hs.MaHS = ? AND tbhk.MaHS = ?;";
                connection.query(query,[mahs, mahs], (error, result) => {
                    if (error) reject(new Error(error.message));
                    resolve(result);
                })
            });
            return response;
        } catch(error) {
            console.log(error);
        }
    }
    async deleteStuSchool(mahs) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM hocsinh WHERE MaHS = ?;";
                connection.query(query,[mahs], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response===1 ? true: false;
        } catch(error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;