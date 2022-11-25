const pool = require('../utils/getPool');

const getAll = async ()=> {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT hocsinh.MaHS, hocsinh.HoTen, hocsinh.Lop, diemtbhk.TBHK1, diemtbhk.TBHK2 FROM hocsinh INNER JOIN diemtbhk ON hocsinh.MaHS = diemtbhk.MaHS;";
            pool.query(query, (error, results) => {
                if (error) reject(new Error(error.message));
                resolve(results);
            })
        });
        return response;
    } catch(error) {
        console.log(error);
    }
}
const getOne = async (mahs) => {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM hocsinh WHERE MaHS=?;';
            pool.query(query, [mahs], (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result);
            })
        })
        return response;
    } catch(error) {
        console.log(error);
    }
}
const insert = async (data) => {
    try {
        const {HoTen, GioiTinh, NgaySinh, DiaChi, Email} = data;
        const response = await new Promise((resolve, reject) => {
            const query = "INSERT INTO hocsinh (HoTen, GioiTinh, NgaySinh, DiaChi, Email) VALUES (?, ?, ?, ?, ?);";
            pool.query(query, [HoTen, GioiTinh, NgaySinh, DiaChi, Email], (err, result) => {
                if (err) reject(new Error(err.message));
                //console.log(result.insertId);
                resolve(result.affectedRows);
            })
        });
        return response === 1 ? true: false;
    } catch(error) {
        console.log(error);
        return false;
    }
}
const update = async (mahs, data) => {
    try {
        let setstr="";
        for (let x in data) {
            if (data[x]==='null') {
                setstr += x + "=" + data[x] + ",";
            }
            else setstr += x + "='" + data[x] + "',";
        }
        if (setstr==="") {
            return true;
        }
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE hocsinh SET " + setstr.slice(0, -1) + " WHERE MaHS = "+`${mahs};`;
            pool.query(query,(err, result) => {
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
const remove = async (mahs) => {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "DELETE FROM hocsinh WHERE MaHS = ?;";
            pool.query(query,[mahs], (err, result) => {
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

module.exports = {
    getAll,
    getOne,
    insert,
    remove,
    update
};
