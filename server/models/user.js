const pool = require('../utils/getPool');

const login = async (username, password) => {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT COUNT(*) FROM dangnhap WHERE TenTK=? AND MatKhau=?;";
            pool.query(query,[username, password], (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result[0]['COUNT(*)']);
            })
        });
        return response===1 ? true: false;
    } catch(error) {
        console.log(error);
        return false;
    }
}
module.exports = {
    login
}