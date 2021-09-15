-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2021 at 01:25 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fpc`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_checked`
--

CREATE TABLE `tb_checked` (
  `Std_No` int(5) NOT NULL,
  `Schedule_ID` int(5) DEFAULT NULL,
  `Class_ID` int(5) NOT NULL,
  `Composite_ID` int(5) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `Time` datetime NOT NULL DEFAULT current_timestamp(),
  `Date` date GENERATED ALWAYS AS (cast(`Time` as date)) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_checked`
--

INSERT INTO `tb_checked` (`Std_No`, `Schedule_ID`, `Class_ID`, `Composite_ID`, `Status`, `Time`) VALUES
(3, 18, 1, 0, 'ปกติ', '2021-09-01 01:57:47'),
(3, 18, 1, 0, 'สาย', '2021-09-02 16:35:47'),
(3, 18, 1, 0, 'ปกติ', '2021-09-05 19:02:13'),
(3, 20, 2, 0, 'สาย', '2021-09-07 18:35:39'),
(3, 18, 1, 0, 'สาย', '2021-09-07 18:44:53'),
(3, 18, 1, 0, 'สาย', '2021-09-08 16:38:11'),
(6, 18, 1, 0, 'สาย', '2021-09-02 16:39:27'),
(6, 18, 1, 0, 'สาย', '2021-09-03 15:30:59'),
(6, 18, 1, 0, 'สาย', '2021-09-05 19:13:59'),
(7, 18, 1, 0, 'ปกติ', '2021-09-01 15:23:25'),
(7, 18, 1, 0, 'สาย', '2021-09-02 16:33:32'),
(7, 18, 1, 0, 'สาย', '2021-09-03 15:30:52'),
(7, 18, 1, 0, 'สาย', '2021-09-08 16:38:07'),
(9, 18, 1, 0, 'สาย', '2021-09-02 16:53:56'),
(9, 18, 1, 0, 'สาย', '2021-09-03 16:41:11'),
(9, 18, 1, 0, 'สาย', '2021-09-05 19:06:27'),
(9, 18, 1, 0, 'สาย', '2021-09-07 18:50:05'),
(9, 18, 1, 0, 'สาย', '2021-09-08 16:37:59'),
(11, 18, 1, 0, 'สาย', '2021-09-02 16:37:44'),
(11, 18, 1, 0, 'สาย', '2021-09-03 15:31:38'),
(11, 18, 1, 0, 'ปกติ', '2021-09-05 19:02:28'),
(11, 18, 1, 0, 'สาย', '2021-09-08 16:38:09'),
(12, 18, 1, 0, 'สาย', '2021-09-01 13:30:02'),
(12, 18, 1, 0, 'สาย', '2021-09-02 16:33:00'),
(13, 18, 1, 0, 'สาย', '2021-09-01 14:39:20'),
(13, 18, 1, 0, 'สาย', '2021-09-02 16:33:37'),
(14, 18, 1, 0, 'ปกติ', '2021-09-01 15:17:18'),
(14, 18, 1, 0, 'สาย', '2021-09-02 16:33:26'),
(14, 18, 1, 0, 'ปกติ', '2021-09-05 19:03:02'),
(18, 18, 1, 0, 'สาย', '2021-09-02 16:33:57'),
(18, 18, 1, 0, 'สาย', '2021-09-08 16:38:58'),
(19, 18, 1, 0, 'สาย', '2021-09-05 19:34:11'),
(20, 18, 1, 0, 'สาย', '2021-09-02 16:34:00'),
(20, 18, 1, 0, 'สาย', '2021-09-03 15:31:20'),
(20, 18, 1, 0, 'สาย', '2021-09-05 19:05:06'),
(20, 18, 1, 0, 'สาย', '2021-09-08 16:38:21'),
(21, 18, 1, 0, 'สาย', '2021-09-02 16:32:58'),
(21, 18, 1, 0, 'สาย', '2021-09-03 15:31:28'),
(21, 18, 1, 0, 'สาย', '2021-09-05 19:44:43'),
(21, 18, 1, 0, 'สาย', '2021-09-08 16:38:12'),
(22, 18, 1, 0, 'สาย', '2021-09-02 16:33:16'),
(22, 18, 1, 0, 'สาย', '2021-09-03 15:31:25'),
(23, 18, 1, 0, 'สาย', '2021-09-02 16:33:30'),
(24, 18, 1, 0, 'สาย', '2021-09-03 16:40:46'),
(24, 18, 1, 0, 'สาย', '2021-09-05 19:05:11'),
(25, 18, 1, 0, 'สาย', '2021-09-02 16:34:05'),
(25, 18, 1, 0, 'สาย', '2021-09-03 16:40:43'),
(26, 18, 1, 0, 'สาย', '2021-09-02 16:38:57'),
(26, 18, 1, 0, 'สาย', '2021-09-05 19:05:08'),
(26, 18, 1, 0, 'สาย', '2021-09-07 18:50:27'),
(27, 18, 1, 0, 'สาย', '2021-09-02 16:41:46'),
(27, 18, 1, 0, 'สาย', '2021-09-03 15:30:54'),
(27, 18, 1, 0, 'สาย', '2021-09-05 19:13:53'),
(27, 18, 1, 0, 'สาย', '2021-09-08 16:39:39'),
(28, 18, 1, 0, 'สาย', '2021-09-02 16:33:28'),
(29, 18, 1, 0, 'สาย', '2021-09-02 16:32:54'),
(29, 18, 1, 0, 'สาย', '2021-09-03 16:38:41'),
(29, 18, 1, 0, 'ปกติ', '2021-09-05 19:02:20'),
(30, 18, 1, 0, 'สาย', '2021-09-02 17:41:21'),
(30, 18, 1, 0, 'สาย', '2021-09-03 11:09:23'),
(30, 18, 1, 0, 'สาย', '2021-09-05 19:05:17'),
(30, 18, 1, 0, 'สาย', '2021-09-07 18:50:37'),
(31, 18, 1, 0, 'ปกติ', '2021-09-05 19:02:45'),
(32, 18, 1, 0, 'สาย', '2021-09-02 18:07:13'),
(32, 18, 1, 0, 'ปกติ', '2021-09-05 19:02:29'),
(33, 18, 1, 0, 'สาย', '2021-09-03 15:31:02'),
(34, 18, 1, 0, 'สาย', '2021-09-05 19:05:08'),
(35, 18, 1, 0, 'สาย', '2021-09-03 11:09:28'),
(35, 18, 1, 0, 'ปกติ', '2021-09-05 19:02:51'),
(38, 18, 1, 0, 'ปกติ', '2021-09-05 19:03:19'),
(38, 18, 1, 0, 'สาย', '2021-09-07 18:51:45'),
(38, 18, 1, 0, 'สาย', '2021-09-08 16:38:44'),
(39, 18, 1, 0, 'ปกติ', '2021-09-05 19:02:42'),
(40, 18, 1, 0, 'สาย', '2021-09-05 19:05:12');

-- --------------------------------------------------------

--
-- Table structure for table `tb_class`
--

CREATE TABLE `tb_class` (
  `Class_ID` int(5) NOT NULL COMMENT 'รหัสกลุ่มเรียน',
  `Subject_PK` int(5) NOT NULL COMMENT 'รหัสวิชา',
  `Group_Study` varchar(10) NOT NULL COMMENT 'รหัสกลุ่มเรียน',
  `Pass_Group` varchar(6) NOT NULL COMMENT 'รหัสผ่านเข้ากลุ่ม',
  `Year_ID` int(5) NOT NULL COMMENT 'รหัสปีการศึกษา',
  `User_ID` int(5) NOT NULL COMMENT '	รหัสผู้ใช้งาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_class`
--

INSERT INTO `tb_class` (`Class_ID`, `Subject_PK`, `Group_Study`, `Pass_Group`, `Year_ID`, `User_ID`) VALUES
(1, 1, 'CPE.62231', '62231', 1, 2),
(2, 14, 'CPE.62231', '62231', 1, 2),
(3, 10, 'CPE.62231', '62231', 1, 2),
(4, 3, 'CPE.63231', '63231', 1, 2),
(5, 4, 'CPE.63231', '63231', 1, 2),
(6, 44, 'CPE.63231', '63231', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_image`
--

CREATE TABLE `tb_image` (
  `Img_ID` int(2) NOT NULL COMMENT 'รหัสรูปภาพ',
  `User_ID` int(5) NOT NULL COMMENT 'รหัสผู้ใช้งาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_login`
--

CREATE TABLE `tb_login` (
  `Login_ID` int(11) NOT NULL COMMENT 'รหัสการเข้าสู่ระบบ',
  `Session_ID` varchar(50) NOT NULL COMMENT 'รหัสสิทธิ์การใช้',
  `User_ID` int(5) NOT NULL COMMENT 'รหัสผู้ใช้งาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_schedule`
--

CREATE TABLE `tb_schedule` (
  `Schedule_ID` int(5) NOT NULL COMMENT 'รหัสตารางสอน',
  `Day` varchar(20) NOT NULL COMMENT 'วัน',
  `Start_Time` varchar(20) NOT NULL COMMENT 'เวลาเริ่ม',
  `End_Time` varchar(20) NOT NULL COMMENT 'เวลาสิ้นสุด',
  `Class_ID` int(5) NOT NULL COMMENT 'รหัสกลุ่มเรียน',
  `Subject_Type` varchar(50) NOT NULL COMMENT 'ประเภทวิชา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_schedule`
--

INSERT INTO `tb_schedule` (`Schedule_ID`, `Day`, `Start_Time`, `End_Time`, `Class_ID`, `Subject_Type`) VALUES
(18, '3', '11:00', '23:00', 1, 'ทฤษฎี'),
(20, '2', '16:00', '23:00', 2, 'ทฤษฎี');

-- --------------------------------------------------------

--
-- Table structure for table `tb_schedule_composate`
--

CREATE TABLE `tb_schedule_composate` (
  `Composite_ID` int(5) NOT NULL COMMENT 'รหัสการสอนชดเชย',
  `Date_Composate` varchar(20) NOT NULL COMMENT 'วันที่สอนชดเชย',
  `Date_Normal` varchar(20) NOT NULL COMMENT 'วันที่เรียนปกติ',
  `Day_Composate` varchar(20) NOT NULL COMMENT 'วัน',
  `Start_Time_Composate` varchar(20) NOT NULL COMMENT 'เวลาเริ่มต้น',
  `End_Time_Composate` varchar(20) NOT NULL COMMENT 'เวลาสิ้นสุด',
  `Schedule_ID` int(5) NOT NULL COMMENT 'รหัสตารางสอน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_status`
--

CREATE TABLE `tb_status` (
  `Status_ID` int(2) NOT NULL COMMENT 'รหัสสถานะ',
  `Status_Name` varchar(15) NOT NULL COMMENT 'ชื่อสถานะ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_status`
--

INSERT INTO `tb_status` (`Status_ID`, `Status_Name`) VALUES
(1, 'ขาด'),
(2, 'ลา'),
(3, 'สาย');

-- --------------------------------------------------------

--
-- Table structure for table `tb_student`
--

CREATE TABLE `tb_student` (
  `Std_No` int(5) NOT NULL,
  `Std_ID` varchar(13) NOT NULL COMMENT 'รหัสนักศึกษา',
  `Std_Title` varchar(20) NOT NULL,
  `Std_FirstName` varchar(255) NOT NULL COMMENT 'ชื่อนักศึกษา',
  `Std_LastName` varchar(255) NOT NULL COMMENT 'นามสกุลนักศึกษา',
  `Class_ID` int(5) NOT NULL COMMENT 'ชื่อกลุ่มเรียน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_student`
--

INSERT INTO `tb_student` (`Std_No`, `Std_ID`, `Std_Title`, `Std_FirstName`, `Std_LastName`, `Class_ID`) VALUES
(3, '60172310128-4', 'นางสาว', 'รัตติกา', 'น้อยเนาลา', 1),
(3, '60172310128-4', 'นางสาว', 'รัตติกา', 'น้อยเนาลา', 2),
(3, '60172310128-4', 'นางสาว', 'รัตติกา', 'น้อยเนาลา', 3),
(6, '60172310130-2', 'นางสาว', 'สุริวิภา', 'ปั่นสันเทียะ', 1),
(6, '60172310130-2', 'นางสาว', 'สุริวิภา', 'ปั่นสันเทียะ', 2),
(7, '60172310129-4', 'นางสาว', 'สุมิลตา', 'สิทธิ์สันเทียะ', 1),
(9, '60172310131-2', 'นาย', 'จอมพล', 'กระจ่างโพธิ์', 1),
(10, '60172310185-1', 'นาย', 'จารุกิตต์', 'บุญจันทร์', 1),
(11, '60172310006-9', 'นาย', 'ณัฐสิทธิ์', 'ผัดตุ่น', 1),
(12, '60172310311-4', 'นาย', 'เนติพงศ์', 'สุนันทิพย์', 1),
(13, '59172310204-9', 'นาย', 'กิตติภณ', 'รักษาคุณ', 1),
(14, '61172310227-1', 'นาย', 'ธนากร​', 'จีน​วงศ์', 1),
(18, '60152310034-7', 'นางสาว', 'จิราพร', 'พุดขุนทด', 1),
(19, '58172110027-3', 'นาย', 'อนันทวัฒน์', 'หึกขุนทด', 1),
(20, '61172310025-3', 'นางสาว', 'กนกอร​', 'หอย​ตะคุ​', 1),
(21, '59172310184-3', 'นาย', 'อนุชิต', 'สายศร', 1),
(22, '59172310009-1', 'นาย', 'วรพล', 'อุไรพรรณ', 1),
(23, '60172310322-2', 'นางสาว', 'วีร์นันทิยา', 'ทรัพย์มาก', 1),
(24, '61172310101-6', 'นาย', 'ธีรวุฒิ', 'ขันพันธ์', 1),
(25, '60172310133-2', 'นาย', 'วันชัย', 'รัตนรักษ์', 1),
(26, '60172310215-5', 'นาย', 'เมธา', 'ประทุมภา', 1),
(27, '61172310280-8', 'นางสาว', 'เบญจพร', 'กิตติวิเชียรชัย', 1),
(28, '61172310331-8', 'นาย', 'สถาพร', 'มณีบุญ', 1),
(29, '62172310127-0', 'นาย', 'กันต์ธร', 'วงษ์โสมะ', 1),
(30, '59172310003-1', 'นาย', 'ธีรโชฒ', 'ศรีริ', 1),
(31, '60172310022-5', 'นาย', 'ศรายุทธ', 'ไกรษร', 1),
(32, '60172310309-6', 'นาย', 'คมอิทธิเบศ', 'แมบจันทึก', 1),
(33, '62172310386-5', 'นางสาว', 'ญาณิศา', 'แต่งตั้ง', 1),
(34, '62182110010-5', 'นาย', 'วัชระ', 'ซ้ายกระโทก', 1),
(35, '60172310325-2', 'นาย', 'วันชัย', 'สีหะวงษ์', 1),
(36, '60172310305-6', 'นาย', 'นนทวัฒน์', 'ป้อมสนาม', 1),
(37, '59172310032-5', 'นาย', 'กฤษดา', 'คลายทุกข์', 1),
(38, '60172310194-9', 'นาย', 'พิชญากร', 'ศรีเนาวรัตน์', 1),
(39, '611723104249', 'นาย', 'อารันต์', 'ความสวัสดิ์', 1),
(40, '60152310180-5', 'นางสาว', 'นฤมล', 'ศรีบุรี', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_subject`
--

CREATE TABLE `tb_subject` (
  `Subject_PK` int(2) NOT NULL COMMENT 'รหัสวิชา',
  `Subject_ID` varchar(14) NOT NULL COMMENT 'รหัสวิชา',
  `Subject_NameTH` varchar(255) NOT NULL COMMENT 'ชื่อวิชาภาษาไทย',
  `Subject_NameEN` varchar(255) NOT NULL COMMENT 'ชื่อวิชาภาษาอังกฤษ',
  `Subject_Theory` int(2) NOT NULL COMMENT 'วิชาทฤษฎี',
  `Subject_Practice` int(2) NOT NULL COMMENT 'วิชาปฏิบัติ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_subject`
--

INSERT INTO `tb_subject` (`Subject_PK`, `Subject_ID`, `Subject_NameTH`, `Subject_NameEN`, `Subject_Theory`, `Subject_Practice`) VALUES
(1, '04-061-404', 'โครงงานวิศวกรรมคอมพิวเตอร์ 2', 'Computer Engineering Project 2', 3, 0),
(2, '04-060-101', 'การโปรแกรมคอมพิวเตอร์', 'Computer Programming', 3, 0),
(3, '04-061-101', 'อุปกรณ์อิเล็กทรอนิกส์สำหรับวิศวกรรมคอมพิวเตอร์', 'Electronic Devices for Computer Engineering', 2, 0),
(4, '04-061-102', 'ปฏิบัติการอุปกรณ์อิเล็กทรอนิกส์สำหรับวิศวกรรมคอมพิวเตอร์', 'Electronic Devices for Computer Engineering Laboratory', 0, 3),
(5, '04-061-204', 'ปฏิบัติการวงจรดิจิทัลและลอจิก', 'Digital and Logic Circuits Laboratory', 0, 3),
(6, '04-061-203', 'วงจรดิจิทัลและลอจิก', 'Digital and Logic Circuits', 2, 0),
(7, '04-061-201', 'สถิติสำหรับวิศวกรรมคอมพิวเตอร์', 'Statistics for Computer Engineering', 3, 0),
(9, '04-061-208', 'ปฏิบัติการวงจรอิเล็กทรอนิกส์สำหรับวิศวกรรมคอมพิวเตอร์', 'Electronic Circuits for Computer Engineering Laboratory', 0, 3),
(10, '04-061-212', 'ปฏิบัติการโครงสร้างข้อมูลและอัลกอริทึม', 'Data Structures and Algorithms Laboratory', 0, 3),
(11, '04-061-214', 'ปฏิบัติการโปรแกรมเชิงวัตถุ', 'Object-Oriented Programming Laboratory', 0, 3),
(12, '04-061-207', 'วงจรอิเล็กทรอนิกส์สำหรับวิศวกรรมคอมพิวเตอร์', 'Electronic Circuits for Computer Engineering', 2, 0),
(13, '04-061-209', 'สถาปัตยกรรมคอมพิวเตอร์และระบบ 1', 'Computer Architecture and Organization 1', 2, 0),
(14, '04-061-211', 'โครงสร้างข้อมูลและอัลกอริทึม', 'Data Structures and Algorithms', 3, 0),
(15, '04-061-213', 'การโปรแกรมเชิงวัตถุ', 'Object-Oriented Programming', 2, 0),
(16, '04-061-202', 'คณิตศาสตร์ดิสครีตสำหรับวิศวกรรม', 'Discrete Mathematics for Engineering', 3, 0),
(18, '04-061-206', 'ปฏิบัติการวัดและเครื่องมือวัดสัญญาณดิจิทัล', 'Measurement and Digital Signal Instrument Laboratory', 0, 3),
(19, '04-061-304', 'ปฏิบัติการระบบฐานข้อมูล', 'Database System Laboratory', 2, 0),
(20, '04-061-205', 'การวัดและเครื่องมือวัดสัญญาณดิจิทัล', 'Measurement and Digital Signal Instrument', 2, 0),
(21, '04-061-210', 'สถาปัตยกรรมคอมพิวเตอร์และระบบ 2', 'Computer Architecture and Organization 2', 2, 0),
(22, '04-061-303', 'ระบบฐานข้อมูล', 'Database System', 2, 0),
(23, '04-061-215', 'การสื่อสารข้อมูล', 'Data Communication', 3, 0),
(24, '04-063-407', 'เหมืองข้อมูล', 'Data Mining', 3, 0),
(25, '04-061-309', 'ระบบปฏิบัติการ', 'Operating System', 3, 0),
(26, '04-062-403', 'การออกแบบวงจรใหญ่มาก', 'VLSI Designs', 3, 0),
(27, '04-063-406', 'ปัญญาประดิษฐ์', 'Artificial Intelligence', 3, 0),
(28, '04-061-302', 'ปฏิบัติการออกแบบระบบดิจิทัล', 'Digital System Design Laboratory', 0, 3),
(29, '04-061-306', 'ปฏิบัติการเครือข่ายคอมพิวเตอร์', 'Computer Network Laboratory', 0, 3),
(30, '04-061-308', 'ปฏิบัติการไมโครคอนโทรลเลอร์', 'Microcontroller Laboratory', 0, 3),
(31, '04-061-310', 'โครงงานวิศวกรรมคอมพิวเตอร์ 1', 'Computer Engineering Project 1', 2, 0),
(32, '04-061-301', 'การออกแบบระบบดิจิทัล', 'Digital System Design', 2, 0),
(33, '04-061-305', 'เครือข่ายคอมพิวเตอร์', 'Computer Network', 2, 0),
(34, '04-061-307', 'ไมโครคอนโทรลเลอร์', 'Microcontroller', 2, 0),
(35, '04-061-401', 'วิศวกรรมซอฟต์แวร์', 'Software Engineering', 3, 0),
(36, '04-063-405', 'การรู้ภาพของคอมพิวเตอร์', 'Computer Vision', 3, 0),
(37, '04-063-402', 'ปฏิบัติการพัฒนาโปรแกรมบนเว็บ', 'Web Programming Laboratory', 0, 3),
(38, '04-064-402', 'ปฏิบัติการรักษาความปลอดภัยคอมพิวเตอร์', 'Computer Security Laboratory', 0, 3),
(39, '04-031-308', 'การเตรียมความพร้อมก่อนสหกิจศึกษาสำหรับวิศวกรรม', 'Pre-Cooperative Education for Engineering', 2, 0),
(40, '04-063-401', 'การพัฒนาโปรแกรมบนเว็บ', 'Web Programming', 2, 0),
(41, '04-064-401', 'การรักษาความปลอดภัยคอมพิวเตอร์', 'Computer Security', 2, 0),
(42, '04-063-403', 'คอมพิวเตอร์กราฟฟิก', 'Computer Graphics', 3, 0),
(44, '04-020-202', 'วงจรไฟฟ้า 1', 'Electric Circuits 1', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `User_ID` int(5) NOT NULL COMMENT 'รหัสผู้ใช้งาน',
  `Username` varchar(50) NOT NULL COMMENT 'ชื่อผู้ใช้งาน',
  `Std_ID` varchar(13) DEFAULT NULL COMMENT 'รหัสนักศึกษา',
  `Title` varchar(20) DEFAULT NULL COMMENT 'คำนำหน้าชื่อภาษาไทย',
  `FirstName` varchar(255) NOT NULL COMMENT 'ชื่อภาษาไทย',
  `LastName` varchar(255) NOT NULL COMMENT 'นามสกุลภาษาไทย',
  `Title_Eng` varchar(20) DEFAULT NULL COMMENT 'คำนำหน้าชื่อภาษาอังกฤษ',
  `FirstName_Eng` varchar(255) NOT NULL COMMENT 'ชื่อภาษาอังกฤษ',
  `LastName_Eng` varchar(255) NOT NULL COMMENT 'นามสกุลภาษาอังกฤษ',
  `Role` varchar(50) NOT NULL COMMENT 'สิทธิ์การใช้งาน',
  `User_Password` varchar(255) NOT NULL COMMENT 'รหัสผ่านผู้ใช้งาน'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`User_ID`, `Username`, `Std_ID`, `Title`, `FirstName`, `LastName`, `Title_Eng`, `FirstName_Eng`, `LastName_Eng`, `Role`, `User_Password`) VALUES
(1, 'admin', '', '', 'ผู้ดูแลระบบ', 'ผู้ดูแลระบบ', '', 'Admin', 'Admin', '0', '1234'),
(2, 'teacher', '', '', 'อาจารย์', 'อาจารย์', '', 'Teacher', 'Teacher', '1', '1234'),
(3, 'rattika.no', '60172310128-4', 'นางสาว', 'รัตติกา', 'น้อยเนาลา', 'Miss.', 'Rattika', 'Noynaola', '2', '1234'),
(6, 'surivipa.pa', '60172310130-2', 'นางสาว', 'สุริวิภา', 'ปั่นสันเทียะ', 'Miss.', 'Surivipa', 'Pansanthia', '2', '1234'),
(7, 'suminta.si', '60172310129-4', 'นางสาว', 'สุมิลตา', 'สิทธิ์สันเทียะ', 'Miss.', 'Suminta', 'Sitsanthia', '2', '1234'),
(9, 'jompon.kr', '60172310131-2', 'นาย', 'จอมพล', 'กระจ่างโพธิ์', 'Mr.', 'Jompon', 'Krajangpo', '2', '1234'),
(10, 'jarukit.bu', '60172310185-1', 'นาย', 'จารุกิตต์', 'บุญจันทร์', 'Mr.', 'Jarukit', 'Bunchan', '2', '1234'),
(11, 'nuttacit.ph', '60172310006-9', 'นาย', 'ณัฐสิทธิ์', 'ผัดตุ่น', 'Mr.', 'Nuttacit', 'Phattun', '2', '1234'),
(12, 'naetiphong.su', '60172310311-4', 'นาย', 'เนติพงศ์', 'สุนันทิพย์', 'Mr.', 'Neatiphong', 'Sunantip', '2', '1234'),
(13, 'kittiphon.ra', '59172310204-9', 'นาย', 'กิตติภณ', 'รักษาคุณ', 'Mr.', 'Kittiphon', 'Raksakhun', '2', '1234'),
(14, 'thanakorn​.je', '61172310227-1', 'นาย', 'ธนากร​', 'จีน​วงศ์', 'Mr.', 'Thanakorn​', 'Jeenwong', '2', '1234'),
(18, 'jiraporn.pu', '60152310034-7', 'นางสาว', 'จิราพร', 'พุดขุนทด', 'Miss.', 'Jiraporn', 'Pudkhunthod', '2', '1234'),
(19, 'anantawad.hu', '58172110027-3', 'นาย', 'อนันทวัฒน์', 'หึกขุนทด', '', 'Anantawad', 'Huekkhuntod', '2', '1234'),
(20, 'kanokorn.ho', '61172310025-3', 'นางสาว', 'กนกอร​', 'หอย​ตะคุ​', 'Miss.', 'Kanokorn', 'Hoitakhu​', '2', '1234'),
(21, 'anuchit.sa', '59172310184-3', 'นาย', 'อนุชิต', 'สายศร', 'Mr.', 'Anuchit', 'Saisorn', '2', '1234'),
(22, 'vorapol.ur', '59172310009-1', 'นาย', 'วรพล', 'อุไรพรรณ', 'Mr.', 'Vorapol', 'Uraipan', '2', '1234'),
(23, 'veenantiya.su', '60172310322-2', 'นางสาว', 'วีร์นันทิยา ', 'ทรัพย์มาก', 'Miss.', 'Veenantiya', 'Submak', '2', '1234'),
(24, 'thirawut.kh', '61172310101-6', 'นาย', 'ธีรวุฒิ', 'ขันพันธ์', 'Mr.', 'Thirawut', 'Khanpan', '2', '1234'),
(25, 'wanchai.ra', '60172310133-2', 'นาย', 'วันชัย', 'รัตนรักษ์', 'Mr.', 'Wanchai', 'Rattanarak', '2', '1234'),
(26, 'meta.pr', '60172310215-5', 'นาย', 'เมธา', 'ประทุมภา', 'Mr.', 'Meta', 'Pratumpa', '2', '1234'),
(27, 'benjaporn.ki', '61172310280-8', 'นางสาว', 'เบญจพร', 'กิตติวิเชียรชัย', 'Miss.', 'Benjaporn', 'Kittivichainchai', '2', '1234'),
(28, 'sathaphorn.ma', '61172310331-8', 'นาย', 'สถาพร', 'มณีบุญ', 'Mr.', 'Sathaphorn', 'Maneeboon', '2', '1234'),
(29, 'kanthorn.wo', '62172310127-0', 'นาย', 'กันต์ธร', 'วงษ์โสมะ', 'Mr.', 'Kanthorn', 'Wongsoma', '2', '1234'),
(30, 'thirachot.sr', '59172310003-1', 'นาย', 'ธีรโชฒ', 'ศรีริ', 'Mr.', 'Thirachot', 'Sriri', '2', '1234'),
(31, 'sarayuth.kr', '60172310022-5', 'นาย', 'ศรายุทธ', 'ไกรษร', 'Mr.', 'Sarayuth', 'Krisorn', '2', '1234'),
(32, 'komittibate.ma', '60172310309-6', 'นาย', 'คมอิทธิเบศ', 'แมบจันทึก', 'Mr.', 'Komittibate', 'Mabjuntuk', '2', '1234'),
(33, 'yanisa.ta', '62172310386-5', 'นางสาว', 'ญาณิศา', 'แต่งตั้ง', 'Miss.', 'Yanisa', 'Taengtang', '2', '1234'),
(34, 'watchara.sa', '62182110010-5', 'นาย', 'วัชระ', 'ซ้ายกระโทก', 'Mr.', 'Watchara', 'Saikrathok', '2', '1234'),
(35, 'wanchai.se', '60172310325-2', 'นาย', 'วันชัย', 'สีหะวงษ์', 'Mr.', 'Wanchai', 'Seehawong', '2', '1234'),
(36, 'nontawat.po', '60172310305-6', 'นาย', 'นนทวัฒน์', 'ป้อมสนาม', 'Miss.', 'Nontawat', 'Pomsanam', '2', '1234'),
(37, 'kridsada.kh', '59172310032-5', 'นาย', 'กฤษดา', 'คลายทุกข์', 'Mr.', 'Kridsada', 'Khlaithuk', '2', '1234'),
(38, 'phitchayakorn.sr', '60172310194-9', 'นาย', 'พิชญากร', 'ศรีเนาวรัตน์', 'Mr.', 'Phitchayakorn', 'Srinaowarat', '2', '1234'),
(39, 'arran.kh', '611723104249', 'นาย', 'อารันต์', 'ความสวัสดิ์', 'Mr.', 'Arran', 'Khwamsawat', '2', '1234'),
(40, 'naruemon.sr', '60152310180-5', 'นางสาว', 'นฤมล', 'ศรีบุรี', 'Miss.', 'Naruemon', 'Sriburi', '2', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `tb_year`
--

CREATE TABLE `tb_year` (
  `Year_ID` int(5) NOT NULL COMMENT 'รหัสปีการศึกษา',
  `Year` varchar(20) NOT NULL COMMENT 'ปีการศึกษา',
  `Term` varchar(20) NOT NULL COMMENT 'ภาคการเรียน',
  `Start_SchYear` varchar(20) NOT NULL COMMENT 'วันเริ่มต้นปีการศึกษา',
  `End_SchYear` varchar(20) NOT NULL COMMENT 'วันสิ้นสุดปีการศึกษา',
  `Start_Midterm` varchar(20) NOT NULL COMMENT 'เริ่มต้นวันสอบมิดเทอม',
  `End_Midterm` varchar(20) NOT NULL COMMENT 'สิ้นสุดวันสอบมิดเทอม',
  `Start_Final` varchar(20) NOT NULL COMMENT 'เริ่มต้นวันสอบไฟนอล',
  `End_Final` varchar(20) NOT NULL COMMENT 'สิ้นสุดวันสอบไฟนอล'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_year`
--

INSERT INTO `tb_year` (`Year_ID`, `Year`, `Term`, `Start_SchYear`, `End_SchYear`, `Start_Midterm`, `End_Midterm`, `Start_Final`, `End_Final`) VALUES
(1, '2564', 'ภาคเรียนที่ 1', '2021-06-21', '2021-10-19', '2021-08-14', '2021-08-20', '2021-10-09', '2021-10-18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_checked`
--
ALTER TABLE `tb_checked`
  ADD PRIMARY KEY (`Std_No`,`Time`),
  ADD UNIQUE KEY `Student_ID` (`Std_No`,`Schedule_ID`,`Composite_ID`,`Date`),
  ADD KEY `Class_ID` (`Class_ID`),
  ADD KEY `Schedule_ID` (`Schedule_ID`);

--
-- Indexes for table `tb_class`
--
ALTER TABLE `tb_class`
  ADD PRIMARY KEY (`Class_ID`),
  ADD UNIQUE KEY `Subject_PK` (`Subject_PK`,`Group_Study`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Year_ID` (`Year_ID`);

--
-- Indexes for table `tb_image`
--
ALTER TABLE `tb_image`
  ADD PRIMARY KEY (`Img_ID`,`User_ID`);

--
-- Indexes for table `tb_login`
--
ALTER TABLE `tb_login`
  ADD PRIMARY KEY (`Login_ID`);

--
-- Indexes for table `tb_schedule`
--
ALTER TABLE `tb_schedule`
  ADD PRIMARY KEY (`Schedule_ID`),
  ADD UNIQUE KEY `Day` (`Day`,`Start_Time`,`Class_ID`);

--
-- Indexes for table `tb_schedule_composate`
--
ALTER TABLE `tb_schedule_composate`
  ADD PRIMARY KEY (`Composite_ID`),
  ADD KEY `Schedule_ID` (`Schedule_ID`);

--
-- Indexes for table `tb_status`
--
ALTER TABLE `tb_status`
  ADD PRIMARY KEY (`Status_ID`);

--
-- Indexes for table `tb_student`
--
ALTER TABLE `tb_student`
  ADD PRIMARY KEY (`Std_No`,`Class_ID`),
  ADD KEY `Class_ID` (`Class_ID`);

--
-- Indexes for table `tb_subject`
--
ALTER TABLE `tb_subject`
  ADD PRIMARY KEY (`Subject_PK`),
  ADD UNIQUE KEY `Subject_ID` (`Subject_ID`,`Subject_NameTH`),
  ADD UNIQUE KEY `Subject_NameTH` (`Subject_NameTH`,`Subject_NameEN`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `tb_year`
--
ALTER TABLE `tb_year`
  ADD PRIMARY KEY (`Year_ID`),
  ADD UNIQUE KEY `Year` (`Year`,`Term`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_class`
--
ALTER TABLE `tb_class`
  MODIFY `Class_ID` int(5) NOT NULL AUTO_INCREMENT COMMENT 'รหัสกลุ่มเรียน', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_schedule`
--
ALTER TABLE `tb_schedule`
  MODIFY `Schedule_ID` int(5) NOT NULL AUTO_INCREMENT COMMENT 'รหัสตารางสอน', AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tb_schedule_composate`
--
ALTER TABLE `tb_schedule_composate`
  MODIFY `Composite_ID` int(5) NOT NULL AUTO_INCREMENT COMMENT 'รหัสการสอนชดเชย';

--
-- AUTO_INCREMENT for table `tb_subject`
--
ALTER TABLE `tb_subject`
  MODIFY `Subject_PK` int(2) NOT NULL AUTO_INCREMENT COMMENT 'รหัสวิชา', AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `User_ID` int(5) NOT NULL AUTO_INCREMENT COMMENT 'รหัสผู้ใช้งาน', AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `tb_year`
--
ALTER TABLE `tb_year`
  MODIFY `Year_ID` int(5) NOT NULL AUTO_INCREMENT COMMENT 'รหัสปีการศึกษา', AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_checked`
--
ALTER TABLE `tb_checked`
  ADD CONSTRAINT `tb_checked_ibfk_1` FOREIGN KEY (`Class_ID`) REFERENCES `tb_class` (`Class_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_checked_ibfk_2` FOREIGN KEY (`Schedule_ID`) REFERENCES `tb_schedule` (`Schedule_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_checked_ibfk_3` FOREIGN KEY (`Std_No`) REFERENCES `tb_student` (`Std_No`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_class`
--
ALTER TABLE `tb_class`
  ADD CONSTRAINT `tb_class_ibfk_1` FOREIGN KEY (`Subject_PK`) REFERENCES `tb_subject` (`Subject_PK`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_class_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `tb_user` (`User_ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_class_ibfk_3` FOREIGN KEY (`Year_ID`) REFERENCES `tb_year` (`Year_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_schedule`
--
ALTER TABLE `tb_schedule`
  ADD CONSTRAINT `tb_schedule_ibfk_1` FOREIGN KEY (`Class_ID`) REFERENCES `tb_class` (`Class_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_schedule_composate`
--
ALTER TABLE `tb_schedule_composate`
  ADD CONSTRAINT `tb_schedule_composate_ibfk_1` FOREIGN KEY (`Schedule_ID`) REFERENCES `tb_schedule` (`Schedule_ID`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_student`
--
ALTER TABLE `tb_student`
  ADD CONSTRAINT `tb_student_ibfk_1` FOREIGN KEY (`Class_ID`) REFERENCES `tb_class` (`Class_ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
