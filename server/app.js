// server sẽ chạy ở port này
const PORT=5000;
// khai báo express js app
const express = require('express');
const app = express();
// cors cho phép kết nối DB dễ dàng hơn
const cors = require('cors');
app.use(cors());
// cho phép nhận xử lý dữ liệu Json và x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// dbService giống như DAL còn app.js giống như BUS  
const dbService = require('./dbService');
//
app.get('/', (req, res) => {
    res.status(200).send('<p>Welcome to our server!</p>')
})
// Lấy danh sách tất cả học sinh gửi cho client
app.get('/all-stu-school', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.allStuSchool();

    result
    .then(data =>response.json({data: data}))
    .catch(error => console.log(error));
})
// Lấy thông tin chi tiết một học sinh cụ thể rồi gửi cho client
app.get('/detail-stu-info/:id', (request, response) => {
    const {id} = request.params;
    
    const db = dbService.getDbServiceInstance();
    const result = db.detailStuInfo(id);
    result
    .then(data => {
        response.json({data: data})
    })
    .catch(error => console.log(error));
})
// tìm một học sinh với mã số rồi gửi dữ liệu cho client
app.get('/search-stu/:mahs', (request, response)=> {
    const { mahs } = request.params;
    
    const db = dbService.getDbServiceInstance();
    const result = db.searchStuById(mahs);
    result
    .then(data => response.json({data: data}))
    .catch(error => console.log(error));
})
// Thêm một học sinh vào DB rồi gửi kết quả cho client
app.post('/add-stu-school', (request, response) => {
    const {data} = request.body;

    const db = dbService.getDbServiceInstance();
    const result = db.addStuSchool(data)
    result
    .then(data => response.json({success: data}))
    .catch(error => console.log(error));
})
// Cập nhật thông tin chi tiết học sinh
app.patch('/update-stu/:mahs', (request, response) => {
    const { mahs } = request.params;
    const { data } = request.body;

    const db = dbService.getDbServiceInstance();
    const result = db.updateStuInfo(mahs, data);
    result
    .then(data => response.json({success: data}))
    .catch(error => console.log(error));
})

// Xóa một học sinh khỏi DB
app.delete('/delete-stu-school/:mahs', (request, response) => {
    const {mahs} = request.params;

    const db = dbService.getDbServiceInstance();
    const result = db.deleteStuSchool(mahs);

    result
    .then(data => response.json({success: data}))
    .catch(error => console.log(error));
})

// Chạy server
app.listen(PORT, () => console.log('app is running'));