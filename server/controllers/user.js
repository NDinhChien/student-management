const user = require('../models/user');

const login = (req, res) => {
    const { username, password } = req.body;
    const result = user.login(username, password);
    result
    .then(data => {
        if (data) {
            req.session.isAuth = true;
            req.session.user = username;
        }
        res.json({success: data});  
    })
    .catch(error => console.log(error));
}
module.exports = {
    login
}