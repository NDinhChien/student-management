let stuData=[];                 // danh sách tất cả học sinh
let stuInfo=[];                 // thông tin chi tiết học sinh đang xét
let editInfo=[];                // thông tin mới học sinh đang xét 
let allowRefreshData = false;   

// Khi thêm một học sinh,vì không lấy được Mã Học Sinh nên cập nhật stuData bằng cách lấy dữ liệu từ DB
// Khi xóa hay chỉnh sửa học sinh thì làm ngay trên stuData luôn
// Hiển thị Student Table với dữ liệu stuData, thay vì yêu cầu dữ liệu từ DB để giảm workload nơi DB 

// nơi thông báo kết quả
const informResult = document.querySelector('#inform-result');

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
    gtinh.setAttribute('readonly', 'true');
    ngsinh.setAttribute('readonly', 'true');
    diachi.setAttribute('readonly', 'true');
    email.setAttribute('readonly', 'true');
    lop.setAttribute('readonly', 'true');
}
function removeReadonly() {
    mahs.removeAttribute('readonly');
    hoten.removeAttribute('readonly');
    gtinh.removeAttribute('readonly');
    ngsinh.removeAttribute('readonly');
    diachi.removeAttribute('readonly');
    email.removeAttribute('readonly');
    lop.removeAttribute('readonly');
}
function displayDetaiStuInfo(Mahs) {
    fetch('http://localhost:5000/detail-stu-info/' + Mahs)
    .then(response => response.json())
    .then(data => {
        stuInfo = data['data'][0];
        stuInfo.NgaySinh = new Date(stuInfo.NgaySinh).toISOString().substring(0, 10); // 'ngay-thang-nam'
        if (stuInfo.Lop === null) {
            stuInfo.Lop = "";
        }
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
function isFormFullfilled() {
    const elements = document.querySelectorAll("#stu-form input");
    for (let x=1; x<elements.length; x++)  {
        if (elements[x].value ==="") {
            return false;
        }
    }
    return true;
}


// Student Table
const stuTableTbody = document.querySelector('#stu-table-tbody');
// Hiển thị data trên StudentTable
function loadStuTable(data) {
    if (data.length === 0) {
        stuTableTbody.innerHTML = "<tr style:'text-align: center;'><td colspan='7'>Không dữ liệu<tr>";
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
        tableHtml += `<li><button title='Xem chi tiết' class='view-detail-btn' data-id=${MaHS} onclick="displayDetaiStuInfo(this.dataset.id);"><i class='fa fa-eye' aria-hidden='true'></i></button></li>`;
        tableHtml += `<li><button title='Xóa học sinh' class='del-stu-btn' data-id=${MaHS} onclick="deleteStu(this.dataset.id);"><i class='fa fa-trash' aria-hidden=true'></i></button></li>`;
        tableHtml += `</ul></td>`;
        
        tableHtml += "</tr>";
        STT += 1;
    });
    stuTableTbody.innerHTML = tableHtml;
}
// Cập nhật số thứ tự trên Student Table khi xóa, thêm học sinh
function updateSTT(index) {
    for (let i=index; i<stuData.length; i++) {
        stuTableTbody.rows[i].cells[0].innerHTML = i+1;
    }
}
// Xóa một học sinh trên Student Table
function deleteRowOfStuTable(mahs) {
    let i = stuData.findIndex((x) => (x.MaHS===mahs));
    if (i !== -1) {
        stuData.splice(i, 1);
        stuTableTbody.deleteRow(i);
        updateSTT(i);
    }
}
// Tìm và lấy dữ liệu học sinh trong stuData dùng mã số hoặc họ tên
function findStu(idOrName) {
    let isId=true;
    for (let i=0; i<idOrName.length; i++) {
        if (('a' <= idOrName[i] && 'z'>=idOrName[i]) || ('A' <= idOrName[i] && 'Z'>=idOrName[i])) {
            isId = false;
            break;
        }
    }
    if (isId==true) {
        return stuData.filter((x)=>(x.MaHS===idOrName));
    }
    return  stuData.filter((x)=>(x.HoTen===idOrName));
}
// cập nhật thông tin học sinh đã được chỉnh sửa trên stuData và Student Table
function updateRowOfStuTable(Mahs, data) {    
    if (!data.hasOwnProperty('HoTen') && !data.hasOwnProperty('Lop')) {
        return;
    }
    let i = stuData.findIndex((x)=> (x.MaHS===Mahs));
    if (data.hasOwnProperty('HoTen')) {
        stuData[i].HoTen = data.HoTen;
        stuInfo.HoTen = data.HoTen;
        stuTableTbody.rows[i].cells[2].innerHTML = data.HoTen;
    }
    if (data.hasOwnProperty('Lop')) {
        stuTableTbody.rows[i].cells[3].innerHTML = data.Lop;
        stuData[i].Lop = data.Lop;
        stuInfo.Lop = data.Lop;
    }
}
// DB
// Nút 'Xem': Lấy danh sách tất cả học sinh từ DB rồi hiển thị 
const allStuBtn = document.querySelector('#all-stu-btn');
allStuBtn.onclick = function () {
    if (allowRefreshData || stuData.length===0) {
        fetch('http://localhost:5000/all-stu-school')
        .then(response => response.json())
        .then(data => {
            stuData = data['data'];
            loadStuTable(stuData);
            allowRefreshData = false;
        })
    }
    else {
        loadStuTable(stuData);
    }
}

// Nút 'Tìm': Lấy dữ liệu học sinh từ DB dùng mã số  
const srchStuBtn = document.querySelector('#srch-stu-btn');
srchStuBtn.onclick = function() {
    // lấy dữ liệu input
    const id = document.querySelector('#srch-stu-input').value;
    // fetch
    if (stuData.length === 0) {
        fetch('http://localhost:5000/search-stu/' + id)
        .then(response => response.json())
        .then(data => loadStuTable(data['data']))
    }
    else {
        loadStuTable(findStu(id))
    }
}

// Thêm học sinh vào DB
addStuBtn.onclick = function(event) {
    event.preventDefault();
    if (!isFormFullfilled()) {
        informResult.innerHTML= "<p style='color:red;'>Vui lòng nhập đủ thông tin!</p>";
        return;
    } 
    // lấy dữ liệu input
    const Mahs = mahs.value;
    const Hoten = hoten.value;
    const Gtinh = gtinh.value;
    const Ngsinh = ngsinh.value;
    const Diachi = diachi.value;
    const Email = email.value;
    const data = {
        MaHS: Mahs,
        HoTen: Hoten,
        GioiTinh: Gtinh,
        NgaySinh: Ngsinh,
        DiaChi: Diachi,
        Email: Email
    }
    // fetch
    fetch('http://localhost:5000/add-stu-school', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            informResult.innerHTML = "<p style='color:red;'>add student succeeded!</p>";
            allowRefreshData = true;
            allStuBtn.click();
            resetStuBtn.click();
        }
        else {
            informResult.innerHTML = "<p style='color:red;'>add student failed!</p>";
        }
        setTimeout(function(){ informResult.innerHTML="";}, 3000);
    });
}
// Cập nhật thông tin chi tiết một học sinh cụ thể
updateStuBtn.onclick = function(event) {
    // prevent default
    event.preventDefault();
    // lấy dữ liệu input
    editInfo = {MaHS: mahs.value, HoTen:hoten.value, GioiTinh: gtinh.value, NgaySinh: ngsinh.value, DiaChi: diachi.value, Email: email.value, Lop: lop.value};
    for (let i in stuInfo) {
        if (stuInfo[i]===editInfo[i]) {
            delete editInfo[i];
        }
    }
    let Mahs = stuInfo.MaHS;
    // fetch
    fetch('http://localhost:5000/update-stu/' + Mahs, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: editInfo})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            informResult.innerHTML ="<p style='color:red;'>update student succeeded!</p>";
            
            updateStuBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
            editStuBtn.style.display = 'block';
            readonlyStuForm();

            updateRowOfStuTable(Mahs, editInfo);
        }
        else {
            informResult.innerHTML = "<p style='color:red;'>update student failed!</p>";
        }
        setTimeout(function(){ informResult.innerHTML="";}, 3000);
    });
}

// Xóa một học sinh trên DB
function deleteStu(mahs) {
    fetch('http://localhost:5000/delete-stu-school/' + mahs, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            informResult.innerHTML = "<p style='color:red;'>delete student succeeded!</p>";
            setTimeout(function(){ informResult.innerHTML="";}, 3000);
            deleteRowOfStuTable(mahs);
        }
        else {
            informResult.innerHTML = "<p style='color:red;'>delete student failed!</p>";
        }})
}
