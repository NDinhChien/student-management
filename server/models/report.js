const pool = require('../utils/getPool')

const getSubjectReport = async (sub, sem) => {
    try {
        let response = await new Promise((resolve, reject)=>{ // Lop SoLuongDat SiSo
            let query = 'call getSubjectReport(?, ?);';
            pool.query(query, [sub, parseInt(sem)], (error, results) => {
                if (error) reject(error);
                // console.log(results);
                resolve(results);
            })
        })
        return response;
    } catch (error) {
        console.log(error);
    }
   
}
const getSemesterReport = async (sem) => {
    try {
        let response = await new Promise((resolve, reject)=>{ // Lop SoLuongDat SiSo
            let query = 'call getSemesterReport(?);';
            pool.query(query, [parseInt(sem)], (error, results) => {
                if (error) reject(error);
                // console.log(results);
                resolve(results);
            })
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getSemesterReport,
    getSubjectReport
}