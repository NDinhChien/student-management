let stuData=[];                 // danh sách tất cả học sinh
let subData=[];
let stuInfo=[];                 // thông tin chi tiết học sinh đang xét
let editInfo=[];                
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
