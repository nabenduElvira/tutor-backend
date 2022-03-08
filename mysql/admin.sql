-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2022 at 09:04 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `accentes`
--

CREATE TABLE `accentes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accentes`
--

INSERT INTO `accentes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(4, 'Canadian English', '2022-01-07 09:25:47', '2022-01-07 09:25:47'),
(5, 'US English', '2022-01-07 09:26:01', '2022-01-07 09:26:01'),
(6, 'American English', '2022-01-12 11:03:18', '2022-01-12 11:03:18'),
(7, 'Indian English', '2022-01-12 11:03:18', '2022-01-12 11:03:18');

-- --------------------------------------------------------

--
-- Table structure for table `certifications`
--

CREATE TABLE `certifications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `from_year` varchar(255) NOT NULL,
  `to_year` varchar(255) NOT NULL,
  `upload_doc` longtext NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `msg` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `from_id`, `to_id`, `msg`, `created_at`, `updated_at`) VALUES
(47, 12, 1, 'hi', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 1, 12, 'Hlw', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 1, 12, 'Ggggg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 12, 1, 'ghcfhvhbn', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 12, 1, 'hbhvbhgjh', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 12, 1, '5555555', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 1, 12, 'Fffff', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 12, 1, 'hhhhh', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 1, 12, 'Ggggggg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(56, 12, 1, 'hi', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `learn` longtext DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `details` longtext DEFAULT NULL,
  `ratings` int(11) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `add_date` datetime DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1,
  `videos` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`, `learn`, `content`, `details`, `ratings`, `price`, `add_date`, `status`, `videos`, `created_at`, `updated_at`) VALUES
(1, 'node js ', 'test', 'test', 'test', 'test', 5, '5000', '2022-03-02 19:24:55', 1, 'https://www.youtube.com/watch?v=xn9ef5pod18', '2022-03-02 19:24:55', '2022-03-02 19:24:55');

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `from_year` varchar(255) DEFAULT NULL,
  `to_year` varchar(255) DEFAULT NULL,
  `upload_doc` longtext DEFAULT NULL,
  `teacher_id` int(11) NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `from_year` varchar(255) NOT NULL,
  `to_year` varchar(255) NOT NULL,
  `upload_doc` longtext NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `favourite_teacher`
--

CREATE TABLE `favourite_teacher` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourite_teacher`
--

INSERT INTO `favourite_teacher` (`id`, `user_id`, `teacher_id`, `created_at`, `updated_at`) VALUES
(43, 2, 1, '2022-01-04 06:54:54', '2022-01-04 06:54:54'),
(47, 1, 11, '2022-01-13 06:38:16', '2022-01-13 06:38:16');

-- --------------------------------------------------------

--
-- Table structure for table `job_requests`
--

CREATE TABLE `job_requests` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `request` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_requests`
--

INSERT INTO `job_requests` (`id`, `request_id`, `teacher_id`, `request`, `created_at`, `updated_at`) VALUES
(1, 1, 12, 'Build Your Next Project on Mongodb Atlas, the Cloud-Native Document Database as a Service.', '2022-02-21 19:10:50', '2022-02-21 19:10:50'),
(2, 1, 17, 'Build Your Next Project on Mongodb Atlas, the Cloud-Native Document Database as a Service.', '2022-02-21 19:26:13', '2022-02-21 19:26:13'),
(3, 2, 25, 'Hi, I am Nabendu Bose. I have 2 years experience in Nodejs, Please book my class.', '2022-02-22 12:27:10', '2022-02-22 12:27:10'),
(5, 4, 18, 'Hi, I am Sujan Bag. I have 7 years experience in Nodejs, Please book my class.', '2022-02-24 17:21:01', '2022-02-24 17:21:01'),
(8, 1, 12, 'final test', '2022-02-25 20:56:36', '2022-02-25 20:56:36'),
(9, 1, 12, 'final test', '2022-02-25 21:04:53', '2022-02-25 21:04:53'),
(10, 1, 12, 'jfjfffhjhfjhfj', '2022-02-25 21:09:43', '2022-02-25 21:09:43'),
(11, 1, 12, 'final test today', '2022-02-28 11:02:43', '2022-02-28 11:02:43');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `created_at`, `updated_at`) VALUES
(5, 'Bengali', '2021-12-08 12:27:50', '2021-12-08 12:27:50'),
(6, 'Hindi', '2021-12-08 12:27:58', '2021-12-08 12:27:58'),
(7, 'English', '2021-12-08 12:28:08', '2021-12-08 12:28:08');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `title`, `time`, `teacher_id`, `subject`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(86, 'Hooks', '', 9, 'Javascript', '', '1500', '2022-01-10 12:05:16', '2022-01-10 12:05:16'),
(132, 'Hooks', '', 7, 'Javascript', '', '1500', '2022-01-25 06:58:18', '2022-01-25 06:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `msg` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `msg`, `status`, `created_at`, `updated_at`) VALUES
(64, 1, 'Your class has been booked for Teacher : Rahul Dey , Date & Time : 01-02-2022   9:30 pm- 11:30 pm , Title : Coding.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 12, 'Your class has been booked by Student : Raven Rajput , Date & Time : 01-02-2022   9:30 pm- 11:30 pm , Title : Coding.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(66, 1, 'your joining link is ~514715-26-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(67, 12, 'your joining link is ~514715-26-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, 1, 'Your class has been booked for Teacher : Rahul Dey , Date & Time : 03-02-2022   2:30 pm- 3:30 pm , Title : Demo.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, 12, 'Your class has been booked by Student : Raven Rajput , Date & Time : 03-02-2022   2:30 pm- 3:30 pm , Title : Demo.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, 1, 'Your class has been booked for Teacher : Rahul Dey , Date & Time : 03-02-2022   4:00 pm- 5:00 pm , Title : Demo2.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, 12, 'Your class has been booked by Student : Raven Rajput , Date & Time : 03-02-2022   4:00 pm- 5:00 pm , Title : Demo2.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(72, 1, 'your joining link is ~635345-27-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, 12, 'your joining link is ~635345-27-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, 1, 'your joining link is ~491103-28-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, 12, 'your joining link is ~491103-28-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, 1, 'Your class has been booked for Teacher : Rahul Dey , Date & Time : 03-02-2022   5:30 pm- 6:30 pm , Title : Demo3.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, 12, 'Your class has been booked by Student : Raven Rajput , Date & Time : 03-02-2022   5:30 pm- 6:30 pm , Title : Demo3.', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 1, 'your joining link is ~910635-29-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 12, 'your joining link is ~910635-29-1', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `private_lessons`
--

CREATE TABLE `private_lessons` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `lessons` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `private_lessons`
--

INSERT INTO `private_lessons` (`id`, `teacher_id`, `subject`, `lessons`, `amount`, `created_at`, `updated_at`) VALUES
(1, 12, 'nodejs', '1', '5000', '2022-02-28 15:27:00', '2022-02-28 15:27:00'),
(2, 12, 'nodejs', '5', '4000', '2022-02-28 15:29:34', '2022-02-28 15:29:34'),
(3, 12, 'nodejs', '10', '3000', '2022-02-28 15:30:11', '2022-02-28 15:30:11'),
(4, 17, 'Laravel', '1', '9000', '2022-03-01 15:18:38', '2022-03-01 15:18:38');

-- --------------------------------------------------------

--
-- Table structure for table `request_teachers`
--

CREATE TABLE `request_teachers` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request_teachers`
--

INSERT INTO `request_teachers` (`id`, `student_id`, `subject`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'nodejs', 'i want to learn node js', '2022-02-18 17:06:21', '2022-02-18 17:06:21'),
(2, 1, 'javascript', 'abc', '2022-02-18 17:44:43', '2022-02-18 17:44:43'),
(3, 23, 'laravel', 'hello world', '2022-02-18 17:45:27', '2022-02-18 17:45:27'),
(4, 24, 'node js', 'I want to learn advance node js.', '2022-02-18 17:48:36', '2022-02-18 17:48:36');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `teacher_id`, `title`, `start`, `end`, `created_at`, `updated_at`) VALUES
(26, 7, 'Coding', '2022-02-01 9:30:00 pm', '2022-02-01 11:30:00 pm', '2022-02-01 15:49:37', '2022-02-01 15:49:37'),
(27, 7, 'Demo', '2022-02-03 2:30:00 pm', '2022-02-03 3:30:00 pm', '2022-02-03 08:49:58', '2022-02-03 08:49:58'),
(28, 7, 'Demo2', '2022-02-03 4:00:00 pm', '2022-02-03 5:00:00 pm', '2022-02-03 08:50:14', '2022-02-03 08:50:14'),
(29, 7, 'Demo3', '2022-02-03 5:30:00 pm', '2022-02-03 6:30:00 pm', '2022-02-03 11:37:07', '2022-02-03 11:37:07'),
(30, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:50', '2022-02-10 05:54:50'),
(31, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:52', '2022-02-10 05:54:52'),
(32, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:53', '2022-02-10 05:54:53'),
(33, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:54', '2022-02-10 05:54:54'),
(34, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:54', '2022-02-10 05:54:54'),
(35, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:54', '2022-02-10 05:54:54'),
(36, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:55', '2022-02-10 05:54:55'),
(37, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:56', '2022-02-10 05:54:56'),
(38, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:56', '2022-02-10 05:54:56'),
(39, 7, 'coding', '2022-02-11 12:00:00 pm', '2022-02-11 2:00:00 pm', '2022-02-10 05:54:56', '2022-02-10 05:54:56'),
(40, 7, 'Coding ', '2022-02-16 10:00:00 am', '2022-02-16 9:00:00 pm', '2022-02-16 06:29:06', '2022-02-16 06:29:06'),
(41, 7, 'React Js', '2022-02-17 12:00:00 pm', '2022-02-17 4:00:00 pm', '2022-02-16 07:41:40', '2022-02-16 07:41:40'),
(42, 7, 'Onboarding', '2022-02-16 9:00:00 am', '2022-02-16 11:00:00 am', '2022-02-16 09:11:22', '2022-02-16 09:11:22'),
(43, 7, 'Onboarding', '2022-02-16 1:00:00 pm', '2022-02-16 11:00:00 am', '2022-02-16 09:11:28', '2022-02-16 09:11:28'),
(44, 7, 'Onboarding', '2022-02-16 9:00:00 am', '2022-02-16 11:00:00 am', '2022-02-16 09:12:12', '2022-02-16 09:12:12'),
(45, 7, 'Onboarding', '2022-02-16 9:00:00 am', '2022-02-16 11:00:00 am', '2022-02-16 09:12:14', '2022-02-16 09:12:14'),
(46, 7, 'Onboarding', '2022-02-16 9:00:00 am', '2022-02-16 11:00:00 am', '2022-02-16 09:12:15', '2022-02-16 09:12:15'),
(47, 7, 'Onboarding', '2022-02-16 1:00:00 pm', '2022-02-16 3:00:00 pm', '2022-02-16 09:13:07', '2022-02-16 09:13:07');

-- --------------------------------------------------------

--
-- Table structure for table `schedules_booking`
--

CREATE TABLE `schedules_booking` (
  `id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `linkid` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedules_booking`
--

INSERT INTO `schedules_booking` (`id`, `schedule_id`, `student_id`, `linkid`, `status`, `created_at`, `updated_at`) VALUES
(44, 26, 1, '514715-26-1', 0, '2022-02-01 15:56:52', '2022-02-01 15:56:52'),
(45, 27, 1, '635345-27-1', 0, '2022-02-03 08:51:01', '2022-02-03 08:51:01'),
(46, 28, 1, '491103-28-1', 0, '2022-02-03 08:51:07', '2022-02-03 08:51:07'),
(47, 29, 1, '910635-29-1', 0, '2022-02-03 11:37:32', '2022-02-03 11:37:32'),
(48, 47, 1, '328969-47-1', 0, '2022-02-16 09:45:48', '2022-02-16 09:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `user_id`) VALUES
(1, 1),
(15, 19),
(16, 23),
(17, 24);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `created_at`, `updated_at`) VALUES
(7, 'Javascript', '2021-12-08 11:32:06', '2021-12-08 11:32:06'),
(8, 'C', '2021-12-08 11:32:10', '2021-12-08 11:32:10'),
(9, 'C++', '2021-12-08 11:32:18', '2021-12-08 11:32:18');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `teaches` longtext DEFAULT NULL,
  `teaches_from` varchar(255) DEFAULT NULL,
  `topics` longtext DEFAULT NULL,
  `about` longtext DEFAULT NULL,
  `response_time` varchar(255) DEFAULT NULL,
  `ratting` varchar(255) DEFAULT NULL,
  `accents` varchar(255) DEFAULT NULL,
  `lession_include` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `subject` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `education` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `work_exp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `certificate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `youtube_id` varchar(255) DEFAULT NULL,
  `upload_video` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `teaches`, `teaches_from`, `topics`, `about`, `response_time`, `ratting`, `accents`, `lession_include`, `subject`, `location`, `education`, `work_exp`, `certificate`, `youtube_id`, `upload_video`, `created_at`, `updated_at`) VALUES
(7, 12, '[\"Beginner\",\"Upper Beginner\",\"Upper Advanced\",\"Advanced\"]', NULL, NULL, '<p><strong>This </strong>Hi there! Thanks for visiting my profile. My name is Robin. I have over seven years teaching experience from elementary to advanced learners along with certifications to teach English as a second language. I have a wide range of interests in music, photography, outdoor adventure, teaching and travelling in various countries.<i><strong>Description</strong>. Updated <strong>recently</strong>.</i></p>', '20 mins', NULL, 'Please Select Accents', NULL, 'NodeJs', NULL, NULL, NULL, NULL, '4DAbnHv6VHs', NULL, '2022-01-04 14:06:35', '2022-01-04 14:06:35'),
(11, 16, NULL, NULL, NULL, '<p>Hi there! Thanks for visiting my profile. My name is Robin. I have over seven years teaching experience from elementary to advanced learners along with certifications to teach English as a second language. I have a wide range of interests in music, photography, outdoor adventure, teaching and travelling in various countries.</p>', NULL, NULL, 'US English', NULL, 'HTML', NULL, NULL, NULL, NULL, 'k043OByAG-4', NULL, '2022-01-11 13:09:10', '2022-01-11 13:09:10'),
(12, 17, NULL, '', '', '<p>Hi there! Thanks for visiting my profile. My name is Robin. I have over seven years teaching experience from elementary to advanced learners along with certifications to teach English as a second language. I have a wide range of interests in music, photography, outdoor adventure, teaching and travelling in various countries.</p>', '', '', '', '', 'Laravel', '', '', '', '', '', NULL, '2022-01-20 11:42:18', '2022-01-20 11:42:18'),
(15, 21, NULL, '', '', '<p><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\">A recurring </span><i><strong>appointment</strong></i><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\"> is an </span><i><strong>appointment</strong></i><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\"> that is repeated after a specified time. An object that defines such an </span><i><strong>appointment</strong></i><span style=\"background-color:rgb(255,255,255);color:rgb(77,81,86);\"> should contain the rRule field.</span></p>', '', '', '', '', 'Python', '', '', '', '', '', NULL, '2022-02-15 11:53:39', '2022-02-15 11:53:39'),
(16, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-16 12:37:45', '2022-02-16 12:37:45'),
(17, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'React js', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-16 13:03:43', '2022-02-16 13:03:43');

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

CREATE TABLE `teaches` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teaches`
--

INSERT INTO `teaches` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Beginner', '2022-01-12 12:21:36', '2022-01-12 12:21:36'),
(2, 'Upper Beginner', '2022-01-12 12:21:52', '2022-01-12 12:21:52'),
(3, 'Upper Advanced', '2022-01-12 12:22:09', '2022-01-12 12:22:09'),
(4, 'Advanced', '2022-01-12 12:22:17', '2022-01-12 12:22:17');

-- --------------------------------------------------------

--
-- Table structure for table `trials`
--

CREATE TABLE `trials` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `start_times` varchar(255) NOT NULL,
  `end_times` varchar(255) NOT NULL,
  `lessons` varchar(255) NOT NULL,
  `users` longtext DEFAULT NULL,
  `links` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL COMMENT 'free_class->1, paid class->2',
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trials`
--

INSERT INTO `trials` (`id`, `student_id`, `teacher_id`, `start_times`, `end_times`, `lessons`, `users`, `links`, `type`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 7, '', '', '', '12', '/video?id=1', 1, 0, '2021-12-17 07:23:40', '2021-12-17 07:23:40'),
(2, 0, 7, '', '', '', '8', '/video?id=2', 1, 0, '2021-12-20 06:13:47', '2021-12-20 06:13:47'),
(33, 1, 17, '', '', 'nodejs', '', '', 0, 0, '2022-03-04 12:26:41', '2022-03-04 12:26:41'),
(34, 1, 17, '', '', 'jbcjbcjf', '', '', 0, 0, '2022-03-04 12:35:17', '2022-03-04 12:35:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(55) DEFAULT NULL,
  `last_name` varchar(55) DEFAULT NULL,
  `email` varchar(55) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `password` varchar(55) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `googleid` varchar(255) DEFAULT NULL,
  `facebookid` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `time_zone` varchar(255) DEFAULT NULL,
  `paypal_email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `clock` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `gender`, `password`, `type`, `googleid`, `facebookid`, `country`, `state`, `city`, `address`, `zip_code`, `currency`, `time_zone`, `paypal_email`, `image`, `language`, `clock`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Raven', 'Rajput', 'student@gmail.com', '9635840254', 'male', 'e10adc3949ba59abbe56e057f20f883e', 0, '', '', 'India', NULL, NULL, 'Bharatpur', '742301', 'INR', 'GMT+5:30', NULL, '', 'English', '12', 1, '2021-12-30 10:43:03', '2021-12-30 10:43:03'),
(12, 'Rahul', 'Dey', 'teacher@gmail.com', '8392084103', 'male', 'e10adc3949ba59abbe56e057f20f883e', 1, '', '', 'India', 'West Bengal', 'Kolkata', 'Belgharia', '700056', NULL, 'India (GMT+5:30)', 'rahul.paypal@gmail.com', '', 'English', NULL, 1, '2022-01-04 14:06:35', '2022-01-04 14:06:35'),
(16, 'Kawotek', 'Sanjay', 'kawonice@gmail.com', '2340144001.0', 'male', '', 1, '111527139610616769175', '', 'Australia', 'West Bengal', 'Kolkata', 'Abeerdeen', '23101', NULL, 'Nepal (GMT+5:45)', 'hgd@ht.mail', NULL, 'English', NULL, 1, '2022-01-11 13:09:10', '2022-01-11 13:09:10'),
(17, 'Nabendu', 'Bose', 'sujanbag58@gmail.com', '12345678', '', 'b47214ad106a4aaf3c379313fc4b9189', 1, '', '', 'India', 'West Bengal', 'Kolkata', 'Sodepur', '700083', 'INR', 'India (GMT+5:30)', 'nabendu@gmail.com', NULL, 'English', '12', 1, '2022-01-20 11:42:18', '2022-01-20 11:42:18'),
(19, 'Abbey', 'Sender', 'kawo@gmail.com', '014789', '', '3ddbc47582ae729adfd8ae761c8940a6', 0, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2022-02-02 01:25:26', '2022-02-02 01:25:26'),
(21, 'test', 'test', 'test@gmail.com', '09898989898', '', 'e10adc3949ba59abbe56e057f20f883e', 1, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2022-02-15 11:53:39', '2022-02-15 11:53:39'),
(23, 'Sudeshna', 'Banerjee', 'sudeshnabanerjee72@gmail.com', '09055331001', '', 'e10adc3949ba59abbe56e057f20f883e', 0, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2022-02-16 12:38:49', '2022-02-16 12:38:49'),
(24, 'test', 'bose', 'test1@gmail.com', '9898989898', '', 'e10adc3949ba59abbe56e057f20f883e', 0, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2022-02-16 12:39:51', '2022-02-16 12:39:51'),
(25, 'Always_', 'Happy', 'adi2323basu@gmail.com', '8888888888', '', '', 1, '110903810990889486260', '', 'India', 'West Bengal', 'Kolkata', 'Agarpara', '700083', 'INR', NULL, NULL, NULL, NULL, NULL, 1, '2022-02-16 13:03:43', '2022-02-16 13:03:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accentes`
--
ALTER TABLE `accentes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `certifications`
--
ALTER TABLE `certifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favourite_teacher`
--
ALTER TABLE `favourite_teacher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_requests`
--
ALTER TABLE `job_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `private_lessons`
--
ALTER TABLE `private_lessons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_teachers`
--
ALTER TABLE `request_teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules_booking`
--
ALTER TABLE `schedules_booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teaches`
--
ALTER TABLE `teaches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trials`
--
ALTER TABLE `trials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accentes`
--
ALTER TABLE `accentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `certifications`
--
ALTER TABLE `certifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `educations`
--
ALTER TABLE `educations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `favourite_teacher`
--
ALTER TABLE `favourite_teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `job_requests`
--
ALTER TABLE `job_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `private_lessons`
--
ALTER TABLE `private_lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `request_teachers`
--
ALTER TABLE `request_teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `schedules_booking`
--
ALTER TABLE `schedules_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `teaches`
--
ALTER TABLE `teaches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `trials`
--
ALTER TABLE `trials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
