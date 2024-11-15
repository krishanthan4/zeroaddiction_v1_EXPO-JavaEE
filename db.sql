-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.39-0ubuntu0.24.04.2 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for zeroaddiction_db
CREATE DATABASE IF NOT EXISTS `zeroaddiction_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zeroaddiction_db`;

-- Dumping structure for table zeroaddiction_db.usage_tracking
CREATE TABLE IF NOT EXISTS `usage_tracking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_usage_tracking_user_idx` (`user_email`),
  CONSTRAINT `fk_usage_tracking_user` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=309 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zeroaddiction_db.usage_tracking: ~83 rows (approximately)
DELETE FROM `usage_tracking`;
INSERT INTO `usage_tracking` (`id`, `user_email`, `date`, `count`) VALUES
	(1, 'jason@gmail.com', '2024-11-08', 1),
	(2, 'jason@gmail.com', '2024-11-09', 1),
	(3, 'jason@gmail.com', '2024-11-10', 3),
	(4, 'jason@gmail.com', '2024-11-11', 4),
	(5, 'jason@gmail.com', '2024-11-12', 5),
	(6, 'jason@gmail.com', '2024-01-26', 4),
	(8, 'Anthony@gmail.com', '2024-11-10', 5),
	(9, 'Anthony@gmail.com', '2024-11-11', 4),
	(10, 'Anthony@gmail.com', '2024-11-12', 4),
	(11, 'jason@gmail.com', '2024-05-21', 1),
	(12, 'jason@gmail.com', '2024-02-13', 1),
	(13, 'jason@gmail.com', '2023-11-17', 5),
	(17, 'jason@gmail.com', '2024-08-30', 5),
	(18, 'jason@gmail.com', '2023-12-25', 3),
	(19, 'jason@gmail.com', '2024-06-06', 2),
	(22, 'jason@gmail.com', '2024-03-28', 5),
	(23, 'jason@gmail.com', '2024-02-20', 4),
	(24, 'jason@gmail.com', '2023-11-26', 3),
	(28, 'jason@gmail.com', '2023-11-18', 3),
	(29, 'jason@gmail.com', '2024-09-13', 3),
	(31, 'jason@gmail.com', '2023-12-17', 4),
	(32, 'jason@gmail.com', '2024-09-01', 2),
	(33, 'jason@gmail.com', '2024-03-21', 2),
	(34, 'jason@gmail.com', '2024-09-13', 3),
	(35, 'jason@gmail.com', '2024-05-29', 1),
	(36, 'jason@gmail.com', '2024-02-07', 5),
	(37, 'jason@gmail.com', '2024-01-20', 4),
	(38, 'jason@gmail.com', '2024-08-06', 3),
	(39, 'jason@gmail.com', '2024-03-18', 3),
	(41, 'jason@gmail.com', '2024-08-12', 5),
	(42, 'jason@gmail.com', '2024-06-19', 1),
	(43, 'jason@gmail.com', '2024-03-14', 1),
	(44, 'jason@gmail.com', '2024-06-09', 2),
	(45, 'jason@gmail.com', '2023-12-23', 5),
	(46, 'jason@gmail.com', '2024-01-20', 1),
	(47, 'jason@gmail.com', '2024-10-18', 1),
	(48, 'jason@gmail.com', '2024-10-06', 2),
	(50, 'jason@gmail.com', '2024-03-04', 3),
	(51, 'jason@gmail.com', '2024-10-16', 5),
	(52, 'jason@gmail.com', '2024-08-10', 4),
	(53, 'jason@gmail.com', '2024-03-28', 1),
	(54, 'jason@gmail.com', '2024-06-06', 1),
	(56, 'jason@gmail.com', '2024-08-18', 2),
	(58, 'jason@gmail.com', '2024-03-23', 4),
	(59, 'jason@gmail.com', '2023-11-29', 1),
	(60, 'jason@gmail.com', '2024-04-28', 5),
	(61, 'jason@gmail.com', '2024-01-09', 4),
	(63, 'jason@gmail.com', '2024-09-14', 1),
	(64, 'jason@gmail.com', '2024-08-01', 1),
	(66, 'jason@gmail.com', '2023-12-29', 3),
	(67, 'jason@gmail.com', '2023-11-01', 2),
	(68, 'jason@gmail.com', '2024-06-29', 2),
	(70, 'jason@gmail.com', '2024-08-21', 5),
	(71, 'jason@gmail.com', '2024-08-03', 1),
	(72, 'jason@gmail.com', '2024-04-17', 1),
	(73, 'jason@gmail.com', '2024-01-01', 2),
	(74, 'jason@gmail.com', '2024-03-27', 2),
	(75, 'jason@gmail.com', '2024-06-25', 1),
	(77, 'jason@gmail.com', '2024-08-27', 2),
	(78, 'jason@gmail.com', '2024-09-23', 5),
	(79, 'jason@gmail.com', '2024-03-10', 5),
	(80, 'jason@gmail.com', '2024-03-15', 2),
	(82, 'jason@gmail.com', '2024-09-08', 1),
	(83, 'jason@gmail.com', '2024-05-30', 5),
	(84, 'jason@gmail.com', '2023-12-06', 2),
	(85, 'jason@gmail.com', '2024-03-23', 2),
	(86, 'jason@gmail.com', '2024-04-30', 1),
	(87, 'jason@gmail.com', '2024-07-16', 4),
	(88, 'jason@gmail.com', '2024-08-14', 3),
	(89, 'jason@gmail.com', '2023-11-08', 4),
	(91, 'jason@gmail.com', '2024-06-29', 5),
	(92, 'jason@gmail.com', '2024-09-11', 4),
	(93, 'jason@gmail.com', '2024-07-31', 5),
	(94, 'jason@gmail.com', '2024-05-26', 3),
	(95, 'jason@gmail.com', '2024-04-02', 1),
	(96, 'jason@gmail.com', '2023-11-04', 2),
	(97, 'jason@gmail.com', '2024-04-26', 2),
	(98, 'jason@gmail.com', '2024-04-26', 3),
	(99, 'jason@gmail.com', '2024-04-06', 3),
	(100, 'jason@gmail.com', '2024-04-30', 2),
	(303, 'jason@gmail.com', '2024-11-14', 5),
	(304, 'jason@gmail.com', '2024-11-13', 3),
	(308, 'jason@gmail.com', '2024-11-15', 5);

-- Dumping structure for table zeroaddiction_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(100) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table zeroaddiction_db.user: ~3 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`email`, `username`, `password`) VALUES
	('Anthony@gmail.com', 'ant4', 'Abcd!234'),
	('Hack@gmail.com', 'He21', 'Abcd!234'),
	('jason@gmail.com', 'jason12', 'Abcd!234');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
