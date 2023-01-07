let stuData=[];                 // danh sách tất cả học sinh
let subData=[];
let stuInfo=[];                 // thông tin chi tiết học sinh đang xét
let editInfo=[];
let age = [];                
let allowRefreshData = true;
let loadingSubData = false;
const inform = document.querySelector('#inform');


const todayis = document.querySelector('#todayis');
const user = document.querySelector('#username');
user.innerHTML = localStorage.getItem('username');
todayis.innerHTML = new Date().toISOString().substring(0, 10);


// các nút trên Student Form: thêm,cập nhật,... 
const addStuBtn = document.querySelector('#add-stu-btn');
const updateStuBtn = document.querySelector('#update-stu-btn');
const resetStuBtn = document.querySelector('#reset-btn');
const editStuBtn = document.querySelector('#edit-stu-btn');
const cancelBtn = document.querySelector('#cancel-btn');
// các phần tử input trong Student Form
const mahs = document.querySelector('#mahs');
const hoten = document.querySelector('#hoten');
const gtinh = document.querySelector('#gtinh');
const ngsinh = document.querySelector('#ngsinh');
const diachi = document.querySelector('#diachi');
const email = document.querySelector('#email');
const lop = document.querySelector('#lop');
const idInput = document.querySelector('#idInput');
const classInput =  document.querySelector('#classInput');

// Student Form
const stuForm = document.querySelector('#stu-form');
function displayAddStuForm() {
    stuForm.reset();
    stuForm.style.display = 'block';
    
    removeReadonly();
    idInput.style.display = 'none';
    classInput.style.display = 'none';

    addStuBtn.style.display = 'block';
    resetStuBtn.style.display = 'block';
    updateStuBtn.style.display = 'none';
    editStuBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}
function readonlyStuForm() {
    mahs.setAttribute('readonly', 'true');
    hoten.setAttribute('readonly', 'true');
    gtinh.setAttribute('disabled', 'true');
    gtinh.style.backgroundColor = 'white';
    gtinh.style.color = 'black';
    ngsinh.setAttribute('readonly', 'true');
    diachi.setAttribute('readonly', 'true');
    email.setAttribute('readonly', 'true');
    lop.setAttribute('disabled', 'true');
    lop.style.backgroundColor = 'white';
    lop.style.color = 'black';

}
function removeReadonly() {
    mahs.removeAttribute('readonly');
    hoten.removeAttribute('readonly');
    gtinh.removeAttribute('disabled');
    ngsinh.removeAttribute('readonly');
    diachi.removeAttribute('readonly');
    email.removeAttribute('readonly');
    lop.removeAttribute('disabled');
}
function displayDetailStuInfo(Mahs) {
    fetch('http://localhost:5000/student/' + Mahs)
    .then(response => response.json())
    .then(data => {
        stuInfo = data.data[0];
        
        stuInfo.NgaySinh = new Date(stuInfo.NgaySinh).toISOString().substring(0, 10); // 'ngay-thang-nam'
        console.log(stuInfo);
        
        stuForm.reset();
        stuForm.style.display = 'block';
        classInput.style.display = 'block'; 
        mahs.value = stuInfo.MaHS;
        hoten.value = stuInfo.HoTen;
        gtinh.value = stuInfo.GioiTinh;
        ngsinh.value = stuInfo.NgaySinh;
        diachi.value = stuInfo.DiaChi;
        email.value = stuInfo.Email;
        lop.value = stuInfo.Lop;
    })
    readonlyStuForm();
    
    editStuBtn.style.display = 'block';
    addStuBtn.style.display = 'none';
    updateStuBtn.style.display = 'none';
    resetStuBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}
function editableStuForm(event) {
    event.preventDefault();
    removeReadonly();
    mahs.setAttribute('readonly', 'true');
    editStuBtn.style.display = 'none';
    updateStuBtn.style.display = 'block';
    cancelBtn.style.display = 'block';
}
function resetStuForm(event) {
    event.preventDefault();
    stuForm.reset();

}

// Name validated
// Tham khảo: https://regex101.com/r/rrarp6/1


function isValidName (string) {
    var re = /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm
    return re.test(string)
}

// Eail validate
// https://www.w3resource.com/javascript/form/email-validation.php

function isValidEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
        return (true)
    }
    return (false)
}

function isValidBirthDay(birth)
{
    fetch('http://localhost:5000/rule/1')
        .then(response => response.json())
        .then(data => {
            age = data['data'];
        })
    const day = new Date();
    let year = day.getFullYear();
    let yearOfBirth = parseInt(ngsinh.value.split('-')[0]);

    if(year- yearOfBirth < age[0]['sobe'] || year - yearOfBirth > age[0]['solon'])
    {
        return false
    }
    return true
}
function FormValidated() {
    const elements = document.querySelectorAll("#stu-form input");
    for (let x=1; x<elements.length; x++)  {
        if (elements[x].value ==="") {
            inform.innerHTML= "<p style='color:red;'>Vui lòng nhập đủ thông tin!</p>";
            return false;
        }
    }
    if (!isValidName(hoten.value)){

        inform.innerHTML= "<p style='color:red;'>Tên không hợp lệ! Họ và tên cần viết hoa chữ cái đầu và không chứa kỹ tự đặc biệt!</p>";
        return false;
    }

    if(!isValidEmail(email.value))
    {
        inform.innerHTML= "<p style='color:red;'>Địa chỉ email không hợp lệ!</p>";
        return false;
    }

    if(!isValidBirthDay(ngsinh.value))
    {
        inform.innerHTML= "<p style='color:red;'>Tuổi của học sinh phải nằm trong khoảng từ 15 đến 20!</p>";
        return false;
    }

    return true;
}

// Student Table
const stuTableContent = document.querySelector('#stu-table-content');
// Hiển thị data trên StudentTable
function loadStuTable(data) {
    if (data.length === 0) {
        stuTableContent.innerHTML = "<tr style:'text-align: center;'><td colspan='7'>Không dữ liệu<tr>";
        return;
    }
    let STT = 1;
    let tableHtml = "";
    data.forEach(({MaHS, HoTen, Lop, TBHK1, TBHK2}) => {
        tableHtml += "<tr>";
        tableHtml += `<td>${STT}</td>`;
        tableHtml += `<td>${MaHS}</td>`;
        tableHtml += `<td>${HoTen}</td>`;
        tableHtml += `<td>${Lop}</td>`;
        tableHtml += `<td>${TBHK1}</td>`;
        tableHtml += `<td>${TBHK2}</td>`;
        
        tableHtml += `<td><ul class='action'>`;
        tableHtml += `<li><button title='Xem chi tiết' class='view-detail-btn' data-id=${MaHS} onclick="displayDetailStuInfo(this.dataset.id);"><i class='fa fa-eye' aria-hidden='true'></i></button></li>`;
        tableHtml += `<li><button title='Xóa học sinh' class='del-stu-btn' data-id=${MaHS} onclick="remove(this.dataset.id);"><i class='fa fa-trash' aria-hidden=true'></i></button></li>`;
        tableHtml += `</ul></td>`;
        
        tableHtml += "</tr>";
        STT += 1;
    });
    stuTableContent.innerHTML = tableHtml;
}
// Cập nhật số thứ tự trên Student Table khi xóa, thêm học sinh
function updateSTT(index, data) {
    for (let i=index; i<data.length; i++) {
        stuTableContent.rows[i].cells[0].innerHTML = i+1;
    }
}
// Xóa một học sinh trên Student Table
function deleteRowStuTable(mahs, data) {
    let i = data.findIndex((x) => (x.MaHS===mahs));
    if (i !== -1) {
        data.splice(i, 1);
        stuTableContent.deleteRow(i);
        updateSTT(i, subData);
        if(loadingSubData) {
            stuData.splice(stuData.findIndex((x) => (x.MaHS===mahs)), 1);
        }
    }
}
// Tìm và lấy dữ liệu học sinh trong stuData dùng mã số hoặc họ tên
function find(idOrName) {
    let isId=true;
    for (let i=0; i<idOrName.length; i++) {
        if (('a' <= idOrName[i] && 'z'>=idOrName[i]) || ('A' <= idOrName[i] && 'Z'>=idOrName[i])) {
            isId = false;
            break;
        }
    }
    if (isId==true) {
        subData = stuData.filter((x)=>(x.MaHS === parseInt(idOrName)));
    } else{
        subData = stuData.filter((x)=>(x.HoTen.toLowerCase().includes(idOrName.toLowerCase())));
    }
}
// cập nhật thông tin học sinh đã được chỉnh sửa trên stuData và Student Table
function updateRowStuTable(Mahs, data, nData) {    
    if (!data.hasOwnProperty('HoTen') && !data.hasOwnProperty('Lop')) {
        return;
    }
    
    let i = nData.findIndex((x)=> (x.MaHS===Mahs));
    if (data.hasOwnProperty('HoTen')) {
        nData[i].HoTen = data.HoTen;
        stuInfo.HoTen = data.HoTen;
        stuTableContent.rows[i].cells[2].innerHTML = data.HoTen;
    }
    if (data.hasOwnProperty('Lop')) {
        stuTableContent.rows[i].cells[3].innerHTML = data.Lop;
        nData[i].Lop = data.Lop;
        stuInfo.Lop = data.Lop;
    }
    if (loadingSubData) {
        let i = stuData.findIndex((x)=> (x.MaHS===Mahs));
        if (data.hasOwnProperty('HoTen')) {
            stuData[i].HoTen = data.HoTen;
        }
        if (data.hasOwnProperty('Lop')) {
            stuData[i].Lop = data.Lop;
        }
    }
}

// Nút 'Xem': Lấy danh sách tất cả học sinh từ DB rồi hiển thị 
const allStuBtn = document.querySelector('#all-stu-btn');
allStuBtn.onclick = getAll;
function getAll() {
    if (allowRefreshData) {
        fetch('http://localhost:5000/student/getAll')
        .then(response => response.json())
        .then(data => {
            stuData = data['data'];
            loadStuTable(stuData);
            allowRefreshData = false;
        })
    }
    loadStuTable(stuData);
    loadingSubData = false;
}

// Nút 'Tìm': Lấy dữ liệu học sinh từ DB dùng mã số  
const searchStuBtn = document.querySelector('#srch-stu-btn');
searchStuBtn.onclick = search; 
function search() {
    // lấy dữ liệu input
    const stu_input = document.querySelector('#srch-stu-input').value; 
    // fetch
     
    if (stuData.length === 0) {
        allStuBtn.click();     
        setTimeout(function(){ 
            find(stu_input);
            loadStuTable(subData);
            loadingSubData = true;
        }, 1000);

    }
    else{
        find(stu_input);
        loadStuTable(subData);
        loadingSubData = true;
    }
}

// Thêm học sinh vào DB
addStuBtn.onclick = insert;
function insert(event) {
    event.preventDefault();
    if (!FormValidated()) {
        setTimeout(function(){ inform.innerHTML="";}, 3000);
        return;
    } 
    const data = {
        HoTen: hoten.value,
        GioiTinh: gtinh.value,
        NgaySinh: ngsinh.value,
        DiaChi: diachi.value,
        Email: email.value
    }
    // fetch
    fetch('http://localhost:5000/student', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            inform.innerHTML = "<p style='color:red;'>add student succeeded!</p>";
            allowRefreshData = true;
            allStuBtn.click();
            resetStuBtn.click();
        }
        else {
            inform.innerHTML = "<p style='color:red;'>add student failed!</p>";
        }
        setTimeout(function(){ inform.innerHTML="";}, 3000);
    });
}
// Cập nhật thông tin chi tiết một học sinh cụ thể
updateStuBtn.onclick = update;
function update(event) {
    // prevent default
    event.preventDefault();
    // lấy dữ liệu input
    editInfo = {MaHS: mahs.value, HoTen:hoten.value, GioiTinh: gtinh.value, NgaySinh: ngsinh.value, DiaChi: diachi.value, Email: email.value, Lop: lop.value};
    
    if (!FormValidated()) {
        setTimeout(function(){ inform.innerHTML="";}, 3000);
        return;
    }
    

    
    for (let i in stuInfo) {
        if (stuInfo[i]===editInfo[i]) {
            delete editInfo[i];
        }
    }
    console.log(editInfo);
    let Mahs = stuInfo.MaHS;
    // fetch
    fetch('http://localhost:5000/student/' + Mahs, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: editInfo})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            inform.innerHTML ="<p style='color:red;'>update student succeeded!</p>";
            updateStuBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
            editStuBtn.style.display = 'block';
            readonlyStuForm();
            if (loadingSubData) {
                updateRowStuTable(Mahs, editInfo, subData);
            }
            else updateRowStuTable(Mahs, editInfo, stuData);
        }
        else {
            inform.innerHTML = "<p style='color:red;'>update student failed!</p>";
        }
        setTimeout(function(){ inform.innerHTML="";}, 3000);
    });
}
// Xóa một học sinh trên DB
function remove(mahs) {
    fetch('http://localhost:5000/student/' + mahs, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            inform.innerHTML = "<p style='color:red;'>delete student succeeded!</p>";
            if (loadingSubData) {
                deleteRowStuTable(parseInt(mahs), subData);
            }
            else deleteRowStuTable(parseInt(mahs), stuData);
        }
        else {
            inform.innerHTML = "<p style='color:red;'>delete student failed!</p>";
        }
        setTimeout(function(){ inform.innerHTML="";}, 3000);
    })
}



let selectHtml = ""

fetch('http://localhost:5000/class/listClass')
.then(response => response.json())
.then(data => {
    data['data'].forEach(({Lop, SiSo}) => {            
        selectHtml += `<option value=${Lop}>${Lop}</option>`;
    });

    lop.innerHTML = selectHtml;
})