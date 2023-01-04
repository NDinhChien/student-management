const student = require('../models/student');
// Lấy danh sách tất cả học sinh gửi cho client
const getAll = (req, res) => {
    const result = student.getAll();
    result
    .then(data =>res.json({data: data}))
    .catch(error => console.log(error));
}

// Lấy thông tin chi tiết một học sinh cụ thể rồi gửi cho client
const getOne = (req, res) => {
    const {id} = req.params;
    
    const result = student.getOne(id);
    result
    .then(data => {
        res.json({data: data})
    })
    .catch(error => console.log(error));
}
// Thêm một học sinh vào DB rồi gửi kết quả cho client
const insert = (req, res) => {
    const {data} = req.body;
    console.log(data);
    const result = student.insert(data)
    result
    .then(data => res.json({success: data}))
    .catch(error => console.log(error));
}
// Cập nhật thông tin chi tiết học sinh
const update = (req, res) => {
    const { mahs } = req.params;
    const { data } = req.body;

    const result = student.update(mahs, data);
    result
    .then(data => res.json({success: data}))
    .catch(error => console.log(error));
}

// Xóa một học sinh khỏi DB
const remove = (req, res) => {
    const {mahs} = req.params;

    const result = student.remove(mahs);
    result
    .then(data => res.json({success: data}))
    .catch(error => console.log(error));
}
module.exports =  {
    getAll,
    getOne,
    insert,
    update,
    remove
};