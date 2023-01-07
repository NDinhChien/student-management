const pool = require('../utils/getPool');
//STT MaHS HoTen GioiTinh NamSinh DiaChi TacVu
const getAll = async (name) => {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT MaHS, HoTen, GioiTinh, NgaySinh, DiaChi FROM hocsinh WHERE Lop = ?;"
            pool.query(query,[name], (error, results) => {
                if (error) reject(error);
                resolve(results);
            })
        });
        return response;
    } catch(err) {
        console.log(err);
        return [];
    }
}
//MaHS HoTen NamSinh Dia Chi
const stuList = async() => {
    try {

        const response = await new Promise((resolve, reject)=> {
            const query = "SELECT MaHS, HoTen, GioiTinh, NgaySinh, DiaChi FROM hocsinh WHERE Lop IS NULL;"
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            })
        })
        return response;
    } catch(err) {
        console.log(err);
        return [];
    }
}
const updateClassInfo = async(id, className) => {
    try {
        let query = "UPDATE hocsinh SET Lop=? WHERE MaHS=? AND Lop IS NULL;"; // thêm học sinh chưa có lớp vào lớp
        if (className==='null') { // xóa học sinh khỏi lớp
            className = null;
            query = "UPDATE hocsinh SET Lop=? WHERE MaHS=?;"
        }
        const response = await new Promise((resolve, reject)=> {   
            pool.query(query, [className, id], (error, result)=>{
                if (error) reject(error);
                resolve(result.affectedRows);
            })
        })
        return response===1 ? true: false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getName = async () => {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM lophoc ;"
            pool.query(query,[], (error, results) => {
                if (error) reject(error);
                resolve(results);
            })
        });
        return response;
    } catch(err) {
        console.log(err);
        return [];
    }
}

module.exports = {
    getAll,
    stuList,
    updateClassInfo,
    getName
}