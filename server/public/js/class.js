let currentClass='';
const viewClassBtn = document.querySelector('#view-class-btn');
const classInput = document.querySelector('#class-input');
const dispStuListBtn = document.querySelector('#disp-stu-list-btn');
const stuClassContent = document.querySelector('#stu-class-content');
const stuListContent = document.querySelector('#stu-list-content');
const stuTable = document.querySelector('#stu-table');
const className = document.querySelector('#class-name');
const number = document.querySelector('#number');

const todayis = document.querySelector('#todayis');
const user = document.querySelector('#username');
user.innerHTML = localStorage.getItem('username');
todayis.innerHTML = new Date().toISOString().substring(0, 10);


viewClassBtn.onclick = viewStuClass;
function viewStuClass() {
    if (currentClass === classInput.value) {
        return;
    }
    fetch('http://localhost:5000/class/' + classInput.value)
    .then(response => response.json())
    .then(data => {
        className.innerHTML = classInput.value;
        currentClass= classInput.value;
        number.innerHTML = data.data.length;
        loadClassTable(data.data);
    })
    .catch(err => console.log(err));
}
function loadClassTable(data) { //STT MaHS HoTen GioiTinh NamSinh DiaChi TacVu
    if (data.length === 0) {
        stuClassContent.innerHTML = `<tr style='text-align:center;'><td colspan=7>Không dữ liệu</td><tr>`;
        return;
    } 
    let stt = 1;
    let tableHtml = "";
    data.forEach((item) => {
        tableHtml += "<tr>";
        tableHtml += `<td>${stt}</td>`;
        tableHtml += `<td>${item.MaHS}</td>`;
        tableHtml += `<td>${item.HoTen}</td>`;
        tableHtml += `<td>${item.GioiTinh}</td>`;
        tableHtml += `<td>${new Date(item.NgaySinh).getFullYear()}</td>`;
        tableHtml += `<td>${item.DiaChi}</td>`;
        tableHtml += `<td><ul class='action'>`;
        tableHtml += `<li><button title='Xem chi tiết' data-id=${item.MaHS} onclick="dispDetailInfo(this);"><i class='fa fa-eye' aria-hidden='true'></i></button></li>`;
        tableHtml += `<li><button title='Xóa học sinh' data-id=${item.MaHS} onclick="removeOffClass(this);"><i class='fa fa-trash' aria-hidden=true'></i></button></li>`;
        tableHtml += `</ul></td>`;
        
        tableHtml += "</tr>";
        stt += 1;
    });
    stuClassContent.innerHTML = tableHtml;
}
function getButton(row) {
    return row.cells[6].childNodes[0].childNodes[1].childNodes[0];
}
function getRow(element) {
    return element.parentNode.parentNode.parentNode.parentNode;
}
function addStuClass(element) { //STT MaHS HoTen GioiTinh NamSinh DiaChi TacVu
    try {
        if (stuClassContent.rows.length > 0 && stuClassContent.rows[0].cells.length <=1) {
            stuClassContent.deleteRow(0);
        }
    } catch(error) {
        console.log('error in deleteRow()');
    }
    let mahs = element.dataset.id;
    let gtinh = element.dataset.gt;
    let index = element.dataset.index; // stuListContent
    let Cells = stuListContent.rows[index].cells; //MaHS HoTen NamSinh DiaChi ADD
    let hoten = Cells[1].innerHTML;
    let nsinh = Cells[2].innerHTML;
    let diachi = Cells[3].innerHTML;
    let stt = parseInt(number.innerHTML, 10) +1;
    number.innerHTML = stt;
    
    let row = stuClassContent.insertRow(stuClassContent.rows.length);
    for (let i=0; i<7; i++) {
        row.insertCell(i);
    }
    row.cells[0].innerHTML = stt;
    row.cells[1].innerHTML = mahs;
    row.cells[2].innerHTML = hoten;
    row.cells[3].innerHTML = gtinh;
    row.cells[4].innerHTML = nsinh;
    row.cells[5].innerHTML = diachi;
    row.cells[6].innerHTML = `<td><ul class='action'>` + 
    `<li><button title='Xem chi tiết' data-id=${mahs} onclick="dispDetaiInfo(this);"><i class='fa fa-eye' aria-hidden='true'></i></button></li>` +
    `<li><button title='Xóa học sinh' data-id=${mahs} onclick="removeOffClass(this);"><i class='fa fa-trash' aria-hidden=true'></i></button></li>` +
    `</ul></td>`;
}

function loadStuList(data) { //MaHS HoTen GioiTinh NamSinh Dia Chi ADD
    if (data.length === 0) {
        stuListContent.innerHTML = `<tr style='text-align:center;'><td colspan=5>Không dữ liệu</td><tr>`;
        return;
    } 
    let tableHtml = "";
    let stt=0;
    data.forEach((item) => {
        tableHtml += "<tr>";
        tableHtml += `<td>${item.MaHS}</td>`;
        tableHtml += `<td>${item.HoTen}</td>`;
        tableHtml += `<td>${new Date(item.NgaySinh).getFullYear()}</td>`;
        tableHtml += `<td>${item.DiaChi}</td>`;
        tableHtml += `<td><ul class='action'>`;
        tableHtml += `<li><button title='Thêm' data-gt=${item.GioiTinh} data-index=${stt} data-id=${item.MaHS} onclick="updateClassInfo(this); "><i class='fa fa-add' aria-hidden='true'></i></button></li>`;
        tableHtml += `</ul></td>`;
        tableHtml += "</tr>";
        stt += 1;
    });
    stuListContent.innerHTML = tableHtml;
}
function addStuList(element) { //MaHS HoTen NamSinh DiaChi ADD
    try {
        if (stuListContent.rows.length > 0 && stuListContent.rows[0].cells.length <= 1) {  // fix
            stuListContent.deleteRow(0);
        }
    } catch(error) {
        console.log('error in deleteRow()');
    }
    let mahs = element.dataset.id;
    // stuClassContent //STT MaHS HoTen GioiTinh NamSinh DiaChi TacVu
    let Cells = getRow(element).cells; 
    let hoten = Cells[2].innerHTML;
    let gtinh = Cells[3].innerHTML;
    let nsinh = Cells[4].innerHTML;
    let diachi = Cells[5].innerHTML;
    let stt = stuListContent.rows.length;
    let row = stuListContent.insertRow(stt);
    for (let i=0; i<5; i++) {
        row.insertCell(i);
    }
    row.cells[0].innerHTML = mahs;
    row.cells[1].innerHTML = hoten;
    row.cells[2].innerHTML = nsinh;
    row.cells[3].innerHTML = diachi;
    row.cells[4].innerHTML = `<td><ul class='action'>` +
    `<li><button title='Thêm' data-gt=${gtinh} data-index=${stt} data-id=${mahs} onclick="updateClassInfo(this); "><i class='fa fa-add' aria-hidden='true'></i></button></li>` +
    `</ul></td>`;
}
function updateClassInfo(element) { // stuListContent
    const mahs = element.dataset.id;
    const index = element.dataset.index;
    fetch('http://localhost:5000/class/' + mahs +'&'+ classInput.value, {
        method: 'PATCH'
    })
    .then (response => response.json())
    .then (data => {
        if (data.success) {
            stuListContent.rows[index].style.display = 'none';
            addStuClass(element);
        }
        else {
            console.log('failed to add student into class!');
        }
    })
}
const container = document.querySelector('.container');
const formBox = document.querySelector('#form-box');
const ms = document.querySelector('#ms');
const ht = document.querySelector('#ht');
const gt = document.querySelector('#gt');
const ns = document.querySelector('#ns');
const dc = document.querySelector('#dc');
const em = document.querySelector('#em');
function dispDetailInfo(element) {
    let mahs = element.dataset.id;
    //MaHS, HoTen, GioiTinh, NgaySinh, DiaChi, Email
    fetch('http://localhost:5000/student/' + mahs) 
    .then(response => response.json())
    .then(data => {
        if (data.data.length > 0) {
            let stuData = data.data[0];
            ms.value = stuData.MaHS;
            ht.value = stuData.HoTen;
            gt.value = stuData.GioiTinh;
            ns.value = new Date(stuData.NgaySinh).toISOString().substring(0, 10); // 01-01-2001
            dc.value = stuData.DiaChi;
            em.value = stuData.Email;
            container.style.opacity = 0.8;
            formBox.style.display = 'block';    
        }
    }) 
    .catch(error => console.log(error));
}
function closeDetailInfo() {
    container.style.opacity = 1;
    formBox.style.display = 'none';   
} 
function updateSTT(index) {
    let l = stuClassContent.rows.length;
    for (let i=index; i<l;i++) {
        stuClassContent.rows[i].cells[0].innerHTML = parseInt(i, 10)+1;
    }
}
function removeOffClass(element) {  // stuClassContent
    let mahs = element.dataset.id;
    let index = getRow(element).rowIndex-2;
    console.log(index);
    fetch('http://localhost:5000/class/' + mahs +'&null', {
        method: 'PATCH'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            addStuList(element);
            stuClassContent.deleteRow(index);
            updateSTT(index);
            number.innerHTML = parseInt(number.innerHTML, 10) - 1;
        }
        else {
            console.log('failed to remove student out of class!');
        }
    })
    .catch(error => {
        console.log(error);
    })
}
dispStuListBtn.onclick = dispStuList;
function dispStuList() {
    fetch('http://localhost:5000/class/stuList')
    .then(response => response.json())
    .then(data => {
        stuTable.style.display = 'block';
        loadStuList(data.data);
        dispStuListBtn.innerHTML = 'Làm mới';
    })
    .catch(error => console.log(error));
}
