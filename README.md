<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">ĐỒ ÁN QUẢN LÝ HỌC SINH</h3>

<div align="center">

<!-- [![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE) -->

</div>

---

<p align="center"> Ứng dụng quản trị cơ sở dữ liệu trường học xây dựng trên nền tảng web. Đáp ứng các yêu cầu nghiệp vụ cần thiết của người quản trị. Nổi bật với giao diện đơn giản, dễ dàng sử dụng, bảo mật và hiệu suất cao.
    <br> 
</p>

## 📝 Table of Contents

- [Thông tin chung](#about)
- [Môi trường thực thi](#enviroment)
- [Công cụ xây dựng](#built_using)
- [Cấu hình chạy local](#local-run)
- [Deployment](#deployment)
- [Video Demo](#demo)
- [Trạng thái hiện tại](#status)
- [Công việc cần làm](#future)
- [Thành viên trong nhóm](#authors)

## 🧐 Thông tin chung <a name = "about"></a>

Khách hàng là người quản trị cơ sở dữ liệu của một trường cấp 3. Trong công việc của mình, anh cảm thấy những ứng dụng phổ biến trên thị trường khá phức tạp, mất thời gian để làm quen, chi phí đắt đỏ và nhiều chức năng không cần thiết so với yêu cầu thực tế trong công việc hàng ngày
Nên anh muốn một ứng dụng:
-	Chi phí thấp, giao diện trực quan, dễ sử dụng
-	Giúp thực hiện công việc một cách dễ dàng và nhanh chóng
-	Đảm bảo bảo mật

## 🏁 Môi trường thực thi <a name = "enviroment"></a>

- Windown 11
- Database: MySQL 8
- Dev Tools: VS Code, Laragon


## ⛏️ Công cụ xây dựng <a name = "built_using"></a>

- [MySQL](https://www.mysql.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment



## 🔧 Cấu hình chạy local <a name = "local-run"></a>
1. Cài đặt Laragon với MySQL 8.0 trở lên
> Tham khảo: https://www.youtube.com/watch?v=WgXVXIhbDR8&t=413s&ab_channel=SUNTECHVI%E1%BB%86TNAM
2. Mở ứng dụng Laragon và nhấp <kbd>Database</kbd>
3. Trang phpMyAdmin được mở, đăng nhập nếu cần
4. Nhấp vào biểu tượng `Import`
5. Chọn File `qlhocsinh.sql` trong thư mục `server` và chọn `Go`
6. Mở thư mục Project trong `VS Code`
7. Mở `Terminal` và chuyển đường dẫn vào thư mục `Server`:  ``cd server``
8. Mở `Terminal` và nhập: ```npm i```
9. Mở file `dbConfig.js` trong thư mục `server/config`
10. Đổi các thông tin về MySQL Database tương ứng với Database trên máy
11. Mở `Terminal` và nhập: ```npm start```



## 🚀 Deployment <a name = "deployment"></a>
Nhóm đã tìm kiếm nhưng không tìm thấy có trang web nào hỗ trợ deploy miễn phí ứng dụng web bởi Express.




## 🎈 Video Demo <a name="demo"></a>





## 🎉 Trạng thái hiện tại <a name = "status"></a>

- Ngoài chức năng thay đổi quy định về môn học và điểm đạt chuẩn môn học chưa hoàn thiện thì Các chức năng chính của đồ án đã hoàn thành. Tuy nhiên vẫn còn một số lỗi nhỏ và giao diện chưa được chỉnh chu.


## 🔮 Công việc cần làm <a name = "future"></a>
- Hoàn thành chức năng thay đổi quy định cho môn học và điểm đạt chuẩn.
- Chỉnh sửa lại giao diện.
- Fix các lỗi.




## ✍️ Thành viên trong nhóm <a name = "authors"></a>

- Nguyễn Đình Chiến – 20120441
- Phan Xuân Hoài – 20120481
- Nguyễn Vũ Hiếu – 20120478
- Đào Duy Anh – 20120426
- Đặng Đức Ba – 20120430
