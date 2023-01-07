let age = [];
let count = [];
const classInput = document.querySelector('#class-input');
const classInput2 = document.querySelector('#class-input2');
const newClassName = document.querySelector('#rename-class');
const score = document.querySelector('#score');
const lowerAge = document.querySelector('#lower-age');
const upperAge = document.querySelector('#upper-age');
const addClassValue = document.querySelector('#add-class');


const countStu = document.querySelector('#count-stu');


const agebut = document.querySelector('#age');
const countbut = document.querySelector('#count');
const deletebut = document.querySelector('#delete-class-btn');
const renameClassbut = document.querySelector('#rename-class-btn');
const scorebut = document.querySelector('#score-btn');
const addClassbut = document.querySelector('#add-class-btn');



// div inform
const informAge = document.querySelector('#inform-age');
const informClass = document.querySelector('#inform-class');



const multiClassInput = document.querySelector('.select-class');


const todayis = document.querySelector('#todayis');
const user = document.querySelector('#username');
user.innerHTML = localStorage.getItem('username');
todayis.innerHTML = new Date().toISOString().substring(0, 10);

// set value for age
async function getAge(){
    await fetch('http://localhost:5000/rule/1')
            .then(response => response.json())
            .then(data => {
                age = data['data'];
                lowerAge.value = age[0]['sobe'];
                upperAge.value = age[0]['solon'];
            })
}
getAge();


// Đặt sĩ số cho ô giới hạn sĩ số
fetch('http://localhost:5000/rule/2')
.then(response => response.json())
.then(data => {
    count = data['data'];
    countStu.value = count[0]['sobe'];
    // upperAge.value = age[0]['solon'];
})

//lấy danh sách lớp
function sertValueClassSelector()
{
    let selectHtml = ""
    fetch('http://localhost:5000/class/listClass')
    .then(response => response.json())
    .then(data => {
        data['data'].forEach(({Lop, SiSo}) => {            
            selectHtml += `<option value=${Lop}>${Lop}</option>`;
        });
    
        classInput.innerHTML = selectHtml;
        classInput2.innerHTML = selectHtml;
    })
}
sertValueClassSelector();

// cập nhật giới hạn tuổi
agebut.onclick = updateLimitAge;

function updateLimitAge(){
    // prevent default
    // event.preventDefault();
    if(upperAge.value < lowerAge.value || lowerAge.value < 1 ){
        informAge.innerHTML = "<p style='color:red;'> Vui lòng nhập số tuổi hợp lệ!</p>";
        setTimeout(function(){ informAge.innerHTML="";}, 3000);
        return false;
    } 

    editInfo = {sobe: lowerAge.value, solon: upperAge.value};

    fetch('http://localhost:5000/rule/1' , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: editInfo})
        })
        .then (response => response.json())
        .then (data => {
            if (data.success) {
                informAge.innerHTML = "<p style='color:red;'> Thay đổi quy định thành công!</p>";
                setTimeout(function(){ informAge.innerHTML="";}, 3000);
            }
            else {
                informAge.innerHTML = "<p style='color:red;'> Thay đổi quy định không thành công!</p>";
                setTimeout(function(){ informAge.innerHTML="";}, 3000);
            }
        })

}


// cập nhật giới hạn số học sinh
countbut.onclick = updateLimitStudent;

function updateLimitStudent(){
    // prevent default
    // event.preventDefault();
    if(countStu < 1){
        informAge.innerHTML = "<p style='color:red;'> Vui lòng nhập số học sinh hợp lệ!</p>";
        setTimeout(function(){ informAge.innerHTML="";}, 3000);
        return false;
    } 

    editInfo = {sobe: countStu.value, solon: 0};

    fetch('http://localhost:5000/rule/2' , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: editInfo})
        })
        .then (response => response.json())
        .then (data => {
            if (data.success) {
                informClass.innerHTML = "<p style='color:red;'> Thay đổi quy định thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
            else {
                informClass.innerHTML = "<p style='color:red;'> Thay đổi quy định không thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
        })

}

// xóa lớp
deletebut.onclick = deleteClass;

function deleteClass(){
    // prevent default
    // event.preventDefault();
    
    console.log('http://localhost:5000/rule/class/' + classInput.value );
    fetch('http://localhost:5000/rule/class/'  , {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({data: classInput.value})
        })
        .then (response => response.json())
        .then (data => {
            if (data.success) {
                sertValueClassSelector();
                informClass.innerHTML = "<p style='color:red;'> Xóa lớp thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
            else {
                informClass.innerHTML = "<p style='color:red;'> Xóa lớp không thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
        })

}


// đổi tên
renameClassbut.onclick = renameClass;

function renameClass(){
    // prevent default
    // event.preventDefault();
    let editInfo = {oldname: classInput.value, newname: newClassName.value}
    fetch('http://localhost:5000/rule/renameclass/'  , {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({data: editInfo})
        })
        .then (response => response.json())
        .then (data => {
            if (data.success) {
                newClassName.value='';
                sertValueClassSelector();
                informClass.innerHTML = "<p style='color:red;'> Đổi tên lớp thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
            else {
                informClass.innerHTML = "<p style='color:red;'> Đổi tên lớp không thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
        })

}


// thêm lớp
addClassbut.onclick = addClass;

function addClass(){
    console.log(addClassValue.value);
    fetch('http://localhost:5000/rule/addclass/' , {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({data: addClassValue.value})
        })
        .then (response => response.json())
        .then (data => {
            if (data.success) {
                sertValueClassSelector();
                informClass.innerHTML = "<p style='color:red;'> Thêm lớp thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
            else {
                informClass.innerHTML = "<p style='color:red;'> Thêm lớp không thành công!</p>";
                setTimeout(function(){ informClass.innerHTML="";}, 3000);
            }
        })

}

