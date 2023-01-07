const pool = require('../utils/getPool')

const getAll = async (sub, cla, sem) => {
    try {
        let response = await new Promise((resolve, reject)=> { 
            let query = "SELECT ds.MaHS, TB1.HoTen, ds.Diem15P, ds.Diem1T, ds.ThiCK FROM diemso AS ds INNER JOIN (SELECT MaHS, HoTen FROM hocsinh WHERE Lop = ?) AS TB1 ON ds.MaHS = TB1.MaHS WHERE ds.Mon=? AND ds.HocKi=?;"
            pool.query(query,[cla, sub, parseInt(sem)], (error, results)=> {
                if (error) reject(error);
                resolve(results);
            })
        })
        return response;
    } catch(error) {
        console.log(error);
    }
} 
const update = async (mahs, sem, sub, d15p, d1t, thihk)  => {
    try {
        let response = await new Promise((resolve, reject) => {
            let query = "UPDATE diemso SET Diem15P=?, Diem1T=?, ThiCK=? WHERE MaHS=? AND Mon=? AND HocKi=?;";
            pool.query(query, [d15p, d1t, thihk, mahs, sub, sem], (error, result)=> {
                if (error) reject(error);
                resolve(result.affectedRows);
            })
        })
        return response===1? true : false;
    } catch(error) {
        console.log(error);
    }
}
module.exports = {
    getAll,
    update
}