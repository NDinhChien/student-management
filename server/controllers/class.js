const classModel = require('../models/class');
// class/:name
const getAll = (req, res) => {
    const { name } = req.params;
    let result = classModel.getAll(name);
    result
    .then(data => {
        res.json({data: data})
    })
    .catch(error => console.log(error));
}
// class/stuList
const stuList = (req, res) => {
    let result = classModel.stuList();
    result
    .then(data => {
        res.json({data: data});
    })
    .catch(error => {
        console.log(error);
    })
}
const updateClassInfo = (req, res) => {
    let {id, className } = req.params;
    const result = classModel.updateClassInfo(id, className);
    result
    .then(data => res.json({success: data}))
    .catch(error => console.log(error));
}
module.exports = {
    getAll,
    stuList,
    updateClassInfo
}
