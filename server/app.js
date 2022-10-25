const PORT=5000;

const express = require('express');
const app = express();
const cors = require('cors');

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
// default
app.get('/', (req, res) => {
    res.status(200).send('<p>Welcome to our server!</p>')
})
// get all student
app.get('/all-stu-school', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.allStuSchool();

    result
    .then(data =>response.json({data: data}))
    .catch(error => console.log(error));
})
// search a student by id
app.get('/search-stu/:mahs', (request, response)=> {
    const { mahs } = request.params;
    
    const db = dbService.getDbServiceInstance();
    const result = db.searchStuById(mahs);
    result
    .then(data => response.json({data: data}))
    .catch(error => console.log(error));
})
// add a student
app.post('/add-stu-school', (request, response) => {
    const {data} = request.body;

    const db = dbService.getDbServiceInstance();
    const result = db.addStuSchool(data)
    result
    .then(data => response.json({success: data}))
    .catch(error => console.log(error));
})
// update a student info
app.patch('/update-stu/:mahs', (request, response) => {
    const { mahs } = request.params;
    const { data } = request.body;

    const db = dbService.getDbServiceInstance();
    const result = db.updateStuInfo(mahs, data);
    
    result
    .then(data => response.json({success: data}))
    .catch(error => console.log(error));
})

// delete a student
app.delete('/delete-stu-school/:mahs', (request, response) => {
    const {mahs} = request.params;

    const db = dbService.getDbServiceInstance();
    const result = db.deleteStuSchool(mahs);

    result
    .then(data => response.json({success: data}))
    .catch(error => console.log(error));
})

//
app.listen(PORT, () => console.log('app is running'));