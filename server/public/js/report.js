const todayis = document.querySelector('#todayis');
const user = document.querySelector('#username');
user.innerHTML = localStorage.getItem('username');
todayis.innerHTML = new Date().toISOString().substring(0, 10);

const inform = document.querySelector('#inform');

const subSelection = document.querySelector('#sub-selection');
const semSelection = document.querySelector('#sem-selection');
const reportTHead = document.querySelector('#report-t-head');
const reportTBody = document.querySelector('#report-t-body');
const reportTable = document.querySelector('#report-table');
const subInput = document.querySelector('#subject-input');
const semInput = document.querySelector('#semester-input');

const reportType = document.querySelector('#report-type');
function changeReportType(element) {
    if (element.value == "0") { //Tổng kết môn học
        subSelection.style.display = 'block';
        
    } else {  // tổng kết học kì
        subSelection.style.display = 'none';
    }
}
function viewReport() {
    let report_type = reportType.value;
    if (report_type == "0") { //Tổng kết môn học
        let url = encodeURI('http://localhost:5000/report/subReport?'+ 'sub='+ subInput.value + '&sem='+ semInput.value);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.data[0].length!=1) {
                loadReport(data.data[0]);
                document.querySelector('#hocki').innerHTML = semInput.value;
                document.querySelector('#mon').innerHTML = subInput.value;
            } else {
                inform.innerHTML = "Vui long nhap day du bang diem truoc khi xem bao cao!";
                setTimeout(()=> {inform.innerHTML="";}, 2500);
            }
        })
        .catch(error => console.log(error));
    }
    else {
        let url = encodeURI('http://localhost:5000/report/' + semInput.value);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            
            if (data.data[0].length!=1) {
                loadReport(data.data[0]);
                document.querySelector('#hocki').innerHTML = semInput.value;
            } else {
                inform.innerHTML = "Vui long nhap day du bang diem truoc khi xem bao cao!";
                setTimeout(()=> {inform.innerHTML="";}, 2500);
            }
        })
        .catch(error => console.log(error));
    }
}
const subHtml = `<tr><th style="text-align:left;height:30px;" colspan="3"> Môn:<span id='mon'></span></th>` +
    `<th style="text-align:left;height:30px;" colspan="2"> Học kì:<span id='hocki'></span></th></tr>` +
    `<tr><th>STT</th><th>Lớp</th><th>Số Lượng Đạt</th><th>Sĩ Số</th><th>Tỷ Lệ</th></tr>`;
const semHtml = `<tr><th style="text-align:left;height:30px;" colspan="5"> Học kì<span id='hocki'></span></th></tr>` +
    `<tr><th>STT</th><th>Lớp</th><th>Số Lượng Đạt</th><th>Sĩ Số</th><th>Tỷ Lệ</th></tr>`; 
function loadReport(data) {
    if (reportType.value=="0") {
        reportTHead.innerHTML = subHtml;
    }
    else {
        reportTHead.innerHTML = semHtml;
    }
    let tableHtml = "";     
    let stt = 1;  
    data.forEach(({Lop, SoLuongDat, SiSo}) => {
        tableHtml += '<tr>';
        tableHtml += `<td>${stt}</td>`;
        tableHtml += `<td>${Lop}</td>`;
        tableHtml += `<td>${SoLuongDat}</td>`;
        tableHtml += `<td>${SiSo}</td>`;
        tableHtml += `<td>${Math.round(SoLuongDat/SiSo*100)/100}</td>`;
        tableHtml += '</tr>';
        stt += 1;
    })
    reportTBody.innerHTML = tableHtml;
    reportTable.style.display = 'block';
}