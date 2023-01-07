const classInput = document.querySelector('#class-input');
const classInput2 = document.querySelector('#class-input2');

const lowerAge = document.querySelector('#lower-age');
const upperAge = document.querySelector('#upper-age');

const agebut = document.querySelector('#age');


// div inform
const ageInfor = document.querySelector('#age');


const multiClassInput = document.querySelector('.select-class');


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

// cập nhật giới hạn tuổi
agebut.onclick = updateLimitAge;

function updateLimitAge(event){
    // prevent default
    event.preventDefault();

    if(upperAge.value < lowerAge.value ){

    } 
}

