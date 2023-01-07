const pool = require('../utils/getPool');


const getOne = async (stt) => {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM quydinh WHERE stt=?;';
            pool.query(query, [stt], (err, result) => {
                if (err) reject(new Error(err.message));
                // console.log(result);
                resolve(result);
            })
        })
        return response;
    } catch(error) {
        console.log(error);
    }
}

const update = async (stt, data) => {
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
        // console.log(setstr);
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE quydinh SET " + setstr.slice(0, -1) + " WHERE stt = "+`${stt};`;
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


module.exports = {
    getOne,
    update
};
