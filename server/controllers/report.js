// const { response } = require('express');
const reportModel = require('../models/report');

const getSubjectReport = (req, res) => {
    const {sub, sem } = req.query;
    // console.log(sub, sem);
    const result = reportModel.getSubjectReport(sub, sem);
    result
    .then(data => res.json({data: data}))
    .catch(error => console.log(error))
}
const getSemesterReport = (req, res) => {
    const { sem } = req.params;
    // console.log(sem);
    const result = reportModel.getSemesterReport(sem);
    result
    .then(data => res.json({data: data}))
    .catch(error => console.log(error));
}
module.exports = {
    getSubjectReport,
    getSemesterReport
}