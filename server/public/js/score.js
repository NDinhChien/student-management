const user = document.querySelector('#username');
user.innerHTML = localStorage.getItem('username');
const todayis = document.querySelector('#todayis');
todayis.innerHTML = new Date().toISOString().substring(0, 10);

let loadedTableName = "";
let myCells;

const subjectInput = document.querySelector('#subject-input');
const classInput = document.querySelector('#class-input');
const semesterInput = document.querySelector('#semester-input');

const Class = document.querySelector("#Class");
const Subject = document.querySelector("#Subject");
const Semester = document.querySelector("#Semester");

const updateScoreBtn = document.querySelector('#update-score-btn');
const resetBtn = document.querySelector('#reset-btn');
const editModeBtn = document.querySelector('#edit-mode-btn');

const scoreTable = document.querySelector('#score-table');
const scoreTableContent = document.querySelector("#score-table-content");

const stuScoreForm = document.querySelector("#stu-score-form");
const mahs = document.querySelector("#mahs");
const hoten = document.querySelector("#hoten");
const d15p = document.querySelector("#d15p");
const d1t = document.querySelector("#d1t");
const thihk = document.querySelector("#thihk");


function openEditForm(element) {
    let index = element.parentNode.parentNode.parentNode.rowIndex - 3;
    
    let Cells = scoreTableContent.rows[index].cells;
    myCells = Cells;
    mahs.value = Cells[1].innerHTML;
    hoten.value = Cells[2].innerHTML;
    d15p.value = Cells[3].innerHTML;
    d1t.value = Cells[4].innerHTML;
    thihk.value = Cells[5].innerHTML;

    openEditMode();
    
}

function viewScoreTable() {
    if (classInput.value + subjectInput.value + semesterInput.value === loadedTableName)
        return;
    fetch('http://localhost:5000/score/getAll', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            className:classInput.value,
            subject: subjectInput.value,
            semester: semesterInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        Class.innerHTML = classInput.value;
        Subject.innerHTML = subjectInput.value;
        Semester.innerHTML = semesterInput.value;
        loadScoreTable(data.data);
        loadedTableName = classInput.value + subjectInput.value + semesterInput.value;
        stuScoreForm.style.display = 'none';
    })
}

function loadScoreTable(data) { //STT MaHS Diem15P Diem1T ThiCK
    if (data.length===0) {
        scoreTableContent.innerHTML = `<tr style='text-align: center;'><td colspan=7>Không dữ liệu</td></tr>`;
        return;
    }
    let tablehtml = "";
    let stt = 1;
    data.forEach(({MaHS,HoTen, Diem15P, Diem1T, ThiCK}) => {
        tablehtml += `<tr>`;
        tablehtml += `<td>${stt}</td>`;
        tablehtml += `<td>${MaHS}</td>`;
        tablehtml += `<td>${HoTen}</td>`;
        tablehtml += `<td>${Diem15P}</td>`;
        tablehtml += `<td>${Diem1T}</td>`;
        tablehtml += `<td>${ThiCK}</td>`;
        tablehtml += `<td><ul class='action'>`;
        tablehtml += `<li onclick='openEditForm(this)'><a title='Sửa' class='edit'><i class='fa fa-pencil' aria-hidden='true'></i></a></li>`;
        tablehtml += `</ul></td>`;
        tablehtml += `</tr>`;
        stt += 1;
    })
    scoreTableContent.innerHTML = tablehtml;
    scoreTable.style.display = 'block';
}

function updateStuScore() {
    console.log(semesterInput.value, subjectInput.value);
    fetch('http://localhost:5000/score', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            mahs: mahs.value,
            sem: semesterInput.value,
            sub: subjectInput.value,
            d15p: d15p.value,
            d1t: d1t.value,
            thihk: thihk.value
        })
    })
    .then(response => response.json())
    .then(data=> {
        if (data.success === true) {
            myCells[3].innerHTML = d15p.value;
            myCells[4].innerHTML = d1t.value;
            myCells[5].innerHTML = thihk.value;
            openReadonlyMode();
            console.log('succeeded to update student score!');
            
        }
        else {
            console.log('failed to update student score!');
        }
    })
}

function resetForm() {
    d15p.value = "";
    d1t.value = "";
    thihk.value = "";
}
function openReadonlyMode() {
    mahs.setAttribute('readonly', true);
    hoten.setAttribute('readonly', true);
    d15p.setAttribute('readonly', true);
    d1t.setAttribute('readonly', true);
    thihk.setAttribute('readonly', true);
    updateScoreBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    editModeBtn.style.display = 'block';
}
function openEditMode() {
    stuScoreForm.style.display = 'block';
    
    editModeBtn.style.display = 'none';
    updateScoreBtn.style.display = 'block';
    resetBtn.style.display = 'block';
    
    mahs.setAttribute('readonly', true);
    hoten.setAttribute('readonly', true);

    d15p.removeAttribute('readonly');
    d1t.removeAttribute('readonly');
    thihk.removeAttribute('readonly');
}

let selectHtml = ""

fetch('http://localhost:5000/class/listClass')
.then(response => response.json())
.then(data => {
    data['data'].forEach(({Lop, SiSo}) => {            
        selectHtml += `<option value=${Lop}>${Lop}</option>`;
    });

    classInput.innerHTML = selectHtml;
})