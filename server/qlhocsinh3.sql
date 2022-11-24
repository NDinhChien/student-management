-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Oct 26, 2022 at 02:47 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

create database qlhocsinh;
use qlhocsinh;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qlhocsinh3`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DangNhap` (IN `TenTK` CHAR(20), IN `MatKhau` CHAR(50))   BEGIN
	declare message nchar(100);
	IF (SELECT COUNT(TenTK) FROM DangNhap WHERE DangNhap.TenTK = TenTK) = 0 THEN
		set @message=concat('Đăng nhập không thành công! Tài khoản "',TenTK,'" không tồn tại.');
	ELSE IF ((SELECT COUNT(TenTK) FROM DangNhap WHERE DangNhap.TenTK = TenTK) > 0 and MatKhau !=(SELECT DangNhap.MatKhau FROM DangNhap WHERE DangNhap.TenTK = TenTK)) then
        set @message='Đăng nhập không thành công! Mật khẩu sai.';
	ELSE
		set @message='Đăng nhập thành công!';
	END IF;
    END IF;
    select @message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Doitenlop` (IN `TenLopCu` CHAR(10), IN `TenLopMoi` CHAR(10))   BEGIN
	declare message nchar(100);
	declare s int;
	IF (SELECT COUNT(*) FROM LopHoc WHERE LopHoc.Lop = TenLopMoi) > 0 THEN
		set @message=concat('Đã tồn tại lớp"',TenLopMoi,'".');
	ELSE
		START TRANSACTION;
        set @s=(select LopHoc.SiSo from LopHoc where LopHoc.Lop=TenLopCu);
		insert LopHoc(Lop,SiSo) values(TenLopMoi,@s);
		update HocSinh set Hocsinh.Lop=TenLopMoi where HocSinh.Lop=TenLopCu;
        delete from LopHoc where LopHoc.Lop=TenLopCu;
		set @message='Đổi tên lớp thàng công !';
        COMMIT;
    END IF;
    select @message;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Lapdanhsachlop` (IN `Lop` CHAR(10), IN `HoTen` NVARCHAR(100), IN `GioiTinh` NVARCHAR(10), IN `NamSinh` DATE, IN `DiaChi` NVARCHAR(100))   BEGIN
	declare message nchar(100);
	IF (SELECT COUNT(*) FROM LopHoc WHERE LopHoc.Lop = Lop) = 0 THEN
		set @message=concat('Thêm học sinh vào lớp không thành công! Lớp  "',Lop,'" chưa được tạo.');
	ELSE IF ((SELECT COUNT(MaHS) FROM HocSinh h WHERE h.HoTen = HoTen and h.GioiTinh = GioiTinh and h.NgaySinh = NamSinh and h.DiaChi = DiaChi ) = 0 ) then
        set @message='Học sinh này không tồn tại trong hệ thống!';
	ELSE 
		START TRANSACTION;
		update HocSinh set HocSinh.Lop=Lop where HocSinh.HoTen = HoTen and HocSinh.GioiTinh = GioiTinh and HocSinh.NgaySinh = NamSinh and HocSinh.DiaChi = DiaChi;
        update LopHoc set SiSo=SiSo+1 where LopHoc.Lop=Lop;
		set @message='Thêm học sinh thành công!';
        COMMIT;
	END IF;
    END IF;
    select @message;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `dangnhap`
--

CREATE TABLE `dangnhap` (
  `TenTK` char(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MatKhau` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `diemso`
--

CREATE TABLE `diemso` (
  `MaHS` char(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Mon` varchar(20) CHARACTER SET utf8 NOT NULL,
  `HocKi` int(11) NOT NULL,
  `Diem15P` float DEFAULT NULL,
  `Diem1T` float DEFAULT NULL,
  `ThiCK` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `diemso`
--

INSERT INTO `diemso` (`MaHS`, `Mon`, `HocKi`, `Diem15P`, `Diem1T`, `ThiCK`) VALUES
('20022039', 'Hóa', 1, NULL, NULL, NULL),
('20022039', 'Hóa', 2, NULL, NULL, NULL),
('20022039', 'Lý', 1, NULL, NULL, NULL),
('20022039', 'Lý', 2, NULL, NULL, NULL),
('20022039', 'Sinh', 1, NULL, NULL, NULL),
('20022039', 'Sinh', 2, NULL, NULL, NULL),
('20022039', 'Sử', 1, NULL, NULL, NULL),
('20022039', 'Sử', 2, NULL, NULL, NULL),
('20022039', 'Thể Dục', 1, NULL, NULL, NULL),
('20022039', 'Thể Dục', 2, NULL, NULL, NULL),
('20022039', 'Toán', 1, NULL, NULL, NULL),
('20022039', 'Toán', 2, NULL, NULL, NULL),
('20022039', 'Văn', 1, NULL, NULL, NULL),
('20022039', 'Văn', 2, NULL, NULL, NULL),
('20022039', 'Đạo Đức', 1, NULL, NULL, NULL),
('20022039', 'Đạo Đức', 2, NULL, NULL, NULL),
('20022039', 'Địa', 1, NULL, NULL, NULL),
('20022039', 'Địa', 2, NULL, NULL, NULL),
('20024406', 'Hóa', 1, NULL, NULL, NULL),
('20024406', 'Hóa', 2, NULL, NULL, NULL),
('20024406', 'Lý', 1, NULL, NULL, NULL),
('20024406', 'Lý', 2, NULL, NULL, NULL),
('20024406', 'Sinh', 1, NULL, NULL, NULL),
('20024406', 'Sinh', 2, NULL, NULL, NULL),
('20024406', 'Sử', 1, NULL, NULL, NULL),
('20024406', 'Sử', 2, NULL, NULL, NULL),
('20024406', 'Thể Dục', 1, NULL, NULL, NULL),
('20024406', 'Thể Dục', 2, NULL, NULL, NULL),
('20024406', 'Toán', 1, NULL, NULL, NULL),
('20024406', 'Toán', 2, NULL, NULL, NULL),
('20024406', 'Văn', 1, NULL, NULL, NULL),
('20024406', 'Văn', 2, NULL, NULL, NULL),
('20024406', 'Đạo Đức', 1, NULL, NULL, NULL),
('20024406', 'Đạo Đức', 2, NULL, NULL, NULL),
('20024406', 'Địa', 1, NULL, NULL, NULL),
('20024406', 'Địa', 2, NULL, NULL, NULL),
('20027885', 'Hóa', 1, NULL, NULL, NULL),
('20027885', 'Hóa', 2, NULL, NULL, NULL),
('20027885', 'Lý', 1, NULL, NULL, NULL),
('20027885', 'Lý', 2, NULL, NULL, NULL),
('20027885', 'Sinh', 1, NULL, NULL, NULL),
('20027885', 'Sinh', 2, NULL, NULL, NULL),
('20027885', 'Sử', 1, NULL, NULL, NULL),
('20027885', 'Sử', 2, NULL, NULL, NULL),
('20027885', 'Thể Dục', 1, NULL, NULL, NULL),
('20027885', 'Thể Dục', 2, NULL, NULL, NULL),
('20027885', 'Toán', 1, NULL, NULL, NULL),
('20027885', 'Toán', 2, NULL, NULL, NULL),
('20027885', 'Văn', 1, NULL, NULL, NULL),
('20027885', 'Văn', 2, NULL, NULL, NULL),
('20027885', 'Đạo Đức', 1, NULL, NULL, NULL),
('20027885', 'Đạo Đức', 2, NULL, NULL, NULL),
('20027885', 'Địa', 1, NULL, NULL, NULL),
('20027885', 'Địa', 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `diemtbhk`
--

CREATE TABLE `diemtbhk` (
  `MaHS` char(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TBHK1` float DEFAULT NULL,
  `TBHK2` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `diemtbhk`
--

INSERT INTO `diemtbhk` (`MaHS`, `TBHK1`, `TBHK2`) VALUES
('20022039', NULL, NULL),
('20024406', NULL, NULL),
('20027885', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hocsinh`
--

CREATE TABLE `hocsinh` (
  `MaHS` char(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HoTen` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GioiTinh` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `DiaChi` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` char(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Lop` char(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hocsinh`
--

INSERT INTO `hocsinh` (`MaHS`, `HoTen`, `GioiTinh`, `NgaySinh`, `DiaChi`, `Email`, `Lop`) VALUES
('20022039', 'Phan Xuân Hoài', 'Nam', '2002-02-22', 'Bình Định', 'xuanhoai@gmail.com', '12A2'),
('20024406', 'Nguyễn Vũ Hiếu', 'Nam', '2002-05-05', 'Hồ Chí Minh', 'vuhieu@gmail.com', '12A1'),
('20027885', 'Nguyễn Đình Chiến', 'Nam', '2002-01-01', 'Hồ Chí Minh', 'dinhchien25112001@gmail.com', '12A1');

--
-- Triggers `hocsinh`
--
DELIMITER $$
CREATE TRIGGER `decreaseSiSo` AFTER DELETE ON `hocsinh` FOR EACH ROW BEGIN
Update LopHoc set SiSo=SiSo-1 WHERE Lop=old.Lop;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deletediemso` BEFORE DELETE ON `hocsinh` FOR EACH ROW delete from diemso where MaHS = old.MaHS
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `deletediemtbhk` BEFORE DELETE ON `hocsinh` FOR EACH ROW delete from diemtbhk where diemtbhk.MaHS = old.MaHS
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `increaseSiSo` AFTER INSERT ON `hocsinh` FOR EACH ROW BEGIN
Update LopHoc set SiSo=SiSo+1 WHERE Lop=new.Lop;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_InsertDiemTBHK` AFTER INSERT ON `hocsinh` FOR EACH ROW begin
	insert DiemTBHK(MaHS) values(new.MaHS);
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_InsertDiemso1` AFTER INSERT ON `hocsinh` FOR EACH ROW begin
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Toán', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Toán', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Lý', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Lý', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Hóa', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Hóa', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Sinh', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Sinh', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Sử', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Sử', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Địa', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Địa', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Đạo Đức', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Đạo Đức', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Thể Dục', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Thể Dục', 2 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Văn', 1 );
insert Diemso(MaHS,Mon,HocKi) values(new.MaHS,'Văn', 2 );
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_MaHS` BEFORE INSERT ON `hocsinh` FOR EACH ROW begin 
set new.MaHS = concat(convert((year(new.ngaysinh)),char),convert(FLOOR(RAND()*(8999)+1000),char));
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateSiSo` AFTER UPDATE ON `hocsinh` FOR EACH ROW BEGIN
Update LopHoc set SiSo=SiSo-1 WHERE Lop=old.Lop;
Update LopHoc set SiSo=SiSo+1 WHERE Lop=new.Lop;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `lophoc`
--

CREATE TABLE `lophoc` (
  `Lop` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SiSo` int(11) DEFAULT 0
) ;

--
-- Dumping data for table `lophoc`
--

INSERT INTO `lophoc` (`Lop`, `SiSo`) VALUES
('10A1', 0),
('10A2', 0),
('10A3', 0),
('10A4', 0),
('11A1', 0),
('11A2', 0),
('11A3', 0),
('12A1', 2),
('12A2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `monhoc`
--

CREATE TABLE `monhoc` (
  `Mon` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `monhoc`
--

INSERT INTO `monhoc` (`Mon`) VALUES
('Hóa'),
('Lý'),
('Sinh'),
('Sử'),
('Thể Dục'),
('Toán'),
('Văn'),
('Đạo Đức'),
('Địa');

-- --------------------------------------------------------

--
-- Table structure for table `tkmonhoc`
--

CREATE TABLE `tkmonhoc` (
  `Mon` varchar(20) CHARACTER SET utf8 NOT NULL,
  `Lop` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HocKi` int(11) NOT NULL,
  `SoLuongDat` int(11) DEFAULT NULL,
  `TyLe` float DEFAULT NULL
) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dangnhap`
--
ALTER TABLE `dangnhap`
  ADD PRIMARY KEY (`TenTK`);

--
-- Indexes for table `diemso`
--
ALTER TABLE `diemso`
  ADD PRIMARY KEY (`MaHS`,`Mon`,`HocKi`),
  ADD KEY `Mon` (`Mon`);

--
-- Indexes for table `diemtbhk`
--
ALTER TABLE `diemtbhk`
  ADD PRIMARY KEY (`MaHS`);

--
-- Indexes for table `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD PRIMARY KEY (`MaHS`),
  ADD KEY `Lop` (`Lop`);

--
-- Indexes for table `lophoc`
--
ALTER TABLE `lophoc`
  ADD PRIMARY KEY (`Lop`);

--
-- Indexes for table `monhoc`
--
ALTER TABLE `monhoc`
  ADD PRIMARY KEY (`Mon`);

--
-- Indexes for table `tkmonhoc`
--
ALTER TABLE `tkmonhoc`
  ADD PRIMARY KEY (`Mon`,`HocKi`,`Lop`),
  ADD KEY `Lop` (`Lop`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diemso`
--
ALTER TABLE `diemso`
  ADD CONSTRAINT `diemso_ibfk_1` FOREIGN KEY (`MaHS`) REFERENCES `hocsinh` (`MaHS`),
  ADD CONSTRAINT `diemso_ibfk_2` FOREIGN KEY (`Mon`) REFERENCES `monhoc` (`Mon`);

--
-- Constraints for table `diemtbhk`
--
ALTER TABLE `diemtbhk`
  ADD CONSTRAINT `diemtbhk_ibfk_1` FOREIGN KEY (`MaHS`) REFERENCES `hocsinh` (`MaHS`);

--
-- Constraints for table `hocsinh`
--
ALTER TABLE `hocsinh`
  ADD CONSTRAINT `hocsinh_ibfk_1` FOREIGN KEY (`Lop`) REFERENCES `lophoc` (`Lop`);

--
-- Constraints for table `tkmonhoc`
--
ALTER TABLE `tkmonhoc`
  ADD CONSTRAINT `tkmonhoc_ibfk_1` FOREIGN KEY (`Lop`) REFERENCES `lophoc` (`Lop`),
  ADD CONSTRAINT `tkmonhoc_ibfk_2` FOREIGN KEY (`Mon`) REFERENCES `monhoc` (`Mon`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
