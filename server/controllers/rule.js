const rule = require('../models/rule');


// Lấy thông tin chi tiết một 1 quy định cụ thể rồi gửi cho client
const getOne = (req, res) => {
    const {stt} = req.params;
    
    const result = rule.getOne(stt);
    result
    .then(data => {
        res.json({data: data})
    })
    .catch(error => console.log(error));
}

// Cập nhật quy định
const update = (req, res) => {
    const { stt } = req.params;
    const { data } = req.body;

    const result = rule.update(stt, data);
    result
    .then(data => res.json({success: data}))
    .catch(error => console.log(error));
}


module.exports =  {
    getOne,
    update
};