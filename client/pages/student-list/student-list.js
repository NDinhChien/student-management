const informResult = document.querySelector('#inform-result');
const stuForm = document.querySelector('#stu-form');

function displayAddStuForm() {
    stuForm.style.display = 'block';
    stuForm.reset();
    
    document.querySelector('#mahs').removeAttribute('readonly');
    document.querySelector('#idInput').style.display = 'none';
    document.querySelector('#lopInput').style.display = 'none';

    document.querySelector('#add-stu-btn').style.display = 'block';
    document.querySelector('#update-stu-btn').style.display = 'none';    
}
function displayEditStuForm(rowIndex) {
    stuForm.reset();
    stuForm.style.display = 'block';
    document.querySelector('#lopInput').style.display = 'block';
    //
    const MaHS = stuTableTbody.rows[rowIndex].cells[1].innerHTML;
    const HoTen = stuTableTbody.rows[rowIndex].cells[2].innerHTML;
    const Lop = stuTableTbody.rows[rowIndex].cells[3].innerHTML;
    //
    document.querySelector('#mahs').style.display = 'block';
    document.querySelector('#mahs').value = MaHS;
    document.querySelector('#mahs').setAttribute('readonly', 'true');
    document.querySelector('#hoten').value = HoTen;
    document.querySelector('#lop').value = Lop;

    document.querySelector('#add-stu-btn').style.display = 'none';
    document.querySelector('#update-stu-btn').style.display = 'block';
}

const stuTableTbody = document.querySelector('#stu-table-tbody');
function loadStuTable(data) {
    if (data.length === 0) {
        stuTableTbody.innerHTML = "<tr style:'text-align: center;'><td colspan='7'>Không dữ liệu<tr>";
        return;
    }
    let Stt = 1;
    let tableHtml = "";
    data.forEach(({MaHS, HoTen, Lop, TBHK1, TBHK2}) => {
        tableHtml += "<tr>";
        tableHtml += `<td>${Stt}</td>`;
        tableHtml += `<td>${MaHS}</td>`;
        tableHtml += `<td>${HoTen}</td>`;
        tableHtml += `<td>${Lop}</td>`;
        tableHtml += `<td>${TBHK1}</td>`;
        tableHtml += `<td>${TBHK2}</td>`;
        
        tableHtml += `<td><ul class='action'>`;
        tableHtml += `<li><button class='edit-stu-btn' data-id=${Stt-1} onclick="displayEditStuForm(this.dataset.id);"><i class='fa fa-pencil' aria-hidden='true'></i></button></li>`;
        tableHtml += `<li><button class='del-stu-btn' data-id=${Stt-1} onclick="deleteStu(this.dataset.id);"><i class='fa fa-trash' aria-hidden=true'></i></button></li>`;
        tableHtml += `</ul></td>`;
        
        tableHtml += "</tr>";
        Stt += 1;
    });
    stuTableTbody.innerHTML = tableHtml;
}

// make request and get all student of school
const allStuBtn = document.querySelector('#all-stu-btn');
allStuBtn.onclick = function () {
    fetch('http://localhost:5000/all-stu-school')
    .then(response => response.json())
    .then(data => loadStuTable(data['data']))
}

// search a student with id
const srchStuBtn = document.querySelector('#srch-stu-btn');
srchStuBtn.onclick = function() {
    // take data
    const mahs = document.querySelector('#srch-stu-input').value;
    // fetch
    fetch('http://localhost:5000/search-stu/' + mahs)
    .then(response => response.json())
    .then(data => loadStuTable(data['data']))
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

// add a student
const addStuBtn = document.querySelector('#add-stu-btn');
addStuBtn.onclick = function(event) {
    event.preventDefault();
    if (!isFormFullfilled()) {
        informResult.innerHTML= "<p style='color:red;'>Vui lòng nhập đủ thông tin!</p>";
        return;
    } 
    // take data
    const mahs = document.querySelector('#mahs').value;
    const hoten = document.querySelector('#hoten').value;
    const gtinh = document.querySelector('#gtinh').value;
    const ngsinh = document.querySelector('#ngsinh').value;
    const diachi = document.querySelector('#diachi').value;
    const email = document.querySelector('#email').value;
    const data = {
        MaHS: mahs,
        HoTen: hoten,
        GioiTinh: gtinh,
        NgaySinh: ngsinh,
        DiaChi: diachi,
        Email: email
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
            informResult.innerHTML = 'add student succeeded!';
            allStuBtn.click()
        }
        else {
            informResult.innerHTML = 'add student failed!';
        }
    });
}
// update a student info
const updateStuBtn = document.querySelector('#update-stu-btn');
updateStuBtn.onclick = function(event) {
    // prevent default
    event.preventDefault();
    // take data
    const mahs = document.querySelector('#mahs').value;
    const hoten = document.querySelector('#hoten').value;
    const gtinh = document.querySelector('#gtinh').value;
    const ngsinh = document.querySelector('#ngsinh').value;
    const diachi = document.querySelector('#diachi').value;
    const email = document.querySelector('#email').value;
    const lop = document.querySelector('#lop').value;
    const data = {
        HoTen: hoten,
        GioiTinh: gtinh,
        NgaySinh: ngsinh,
        DiaChi: diachi,
        Email: email,
        Lop: lop
    }
    // fetch
    fetch('http://localhost:5000/update-stu/' + mahs, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            informResult.innerHTML ='update student succeeded!';
            allStuBtn.click();
        }
        else {
            informResult.innerHTML = 'update student failed!';
        }
    });
}
// delete a student
function deleteStu(stt) {
    const mahs = stuTableTbody.rows[stt].cells[1].innerHTML;
    fetch('http://localhost:5000/delete-stu-school/' + mahs, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            informResult.innerHTML = 'delete student succeeded!';
            allStuBtn.click();
        }
        else {
            informResult.innerHTML = 'delete student failed!';
        }
    })
}