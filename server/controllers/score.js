const scoreModel = require('../models/score')

const getAll = (req, res) => {
    let {className, subject , semester} = req.body;
    const result = scoreModel.getAll(subject, className, semester);
    result
    .then(data => {
        res.json({data: data});
    })
    .catch(error => {
        console.log(error);
    })
}
const update = (req, res) => {
    let {mahs, sem, sub, d15p, d1t, thihk} = req.body;
    let result = scoreModel.update(mahs, sem, sub , d15p, d1t, thihk);
    result
    .then(data => {
        res.json({success: data});
    })
    .catch(error => {
        console.log(error);
    })
}
module.exports = {
    getAll,
    update
}