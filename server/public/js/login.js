const lognbtn = document.querySelector('#login');
const informbtn = document.querySelector('#inform');
const lognform = document.querySelector('#form-login');

function submitForm() {
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    if (!username || !password) {
        informbtn.innerHTML = "<p style='color: red;'>Vui lòng nhập đủ thông tin!<p>";
        setTimeout(()=> informbtn.innerHTML='', 3000);
    }
    else {
        let data = {
            username: username,
            password: password
        }
        fetch('http://localhost:5000/user/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success===false) {
                informbtn.innerHTML = "<p style='color: red;'>Tài khoản hoặc mật khẩu không đúng<p>";
                lognform.reset();
                setTimeout(()=> informbtn.innerHTML='', 2000);
            }
            else {    
                informbtn.innerHTML = "<p style='color: red;'>Đăng nhập thành công<p>";
                localStorage.setItem('username', username);
                setTimeout(()=> {informbtn.innerHTML=''; location.replace("http://localhost:5000/")}, 1000);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}