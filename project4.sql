-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2020 at 12:03 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project4`
--

-- --------------------------------------------------------

--
-- Table structure for table `baskets`
--

CREATE TABLE `baskets` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `qnt` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `done` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `baskets`
--

INSERT INTO `baskets` (`id`, `userId`, `productId`, `qnt`, `date`, `done`, `createdAt`, `updatedAt`) VALUES
(1, 2, 6, 1, '2020-08-23 21:00:00', 1, '2020-08-23 22:01:58', '2020-08-23 22:02:25'),
(2, 2, 4, 1, '2020-08-23 21:00:00', 1, '2020-08-23 22:02:02', '2020-08-23 22:02:25');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'מאפים ועוגות', '2020-08-23 21:35:52', '2020-08-23 21:35:52'),
(2, 'פירות', '2020-08-23 21:36:27', '2020-08-23 21:36:27'),
(3, 'ירקות ', '2020-08-23 21:36:35', '2020-08-23 21:36:35'),
(4, 'מוצרי חלב', '2020-08-23 21:37:11', '2020-08-23 21:37:11'),
(5, 'משקאות', '2020-08-23 21:37:48', '2020-08-23 21:37:48'),
(6, 'ניקיון', '2020-08-23 21:38:32', '2020-08-23 21:38:32'),
(7, 'מזון', '2020-08-23 21:39:03', '2020-08-23 21:39:03');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `basketId` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `address_city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_street` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `card` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ispaid` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `basketId`, `total_price`, `address_city`, `address_street`, `date`, `card`, `ispaid`, `createdAt`, `updatedAt`) VALUES
(1, 2, 2, 35, 'Tel Aviv', '1', '2020-08-25 00:00:00', '1111', 1, '2020-08-23 22:02:25', '2020-08-23 22:02:25');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `img` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `img`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(3, 'חומוס', 10, '1598219082064VRD48_Z_P_7296073224600_1.png', 7, '2020-08-23 21:44:42', '2020-08-23 21:45:12'),
(4, 'ברוקולי מוקפא', 20, '1598219139682QVF66_Z_P_7296073098294_1.png', 3, '2020-08-23 21:45:39', '2020-08-23 21:45:39'),
(5, 'אפונה ירוקה קפואה', 15, '1598219180346WCI60_Z_P_7296073224891_1.png', 3, '2020-08-23 21:46:20', '2020-08-23 21:46:20'),
(6, 'פסטה מק אנדג צ\'יז', 15, '1598219243104ORL60_Z_P_7296073342908_1.png', 7, '2020-08-23 21:47:23', '2020-08-23 21:47:23'),
(7, 'פטוצ\'יני אלפרדו', 20, '1598219272700OQV62_Z_P_7296073342892_1.png', 7, '2020-08-23 21:47:52', '2020-08-23 21:47:52'),
(8, 'ג\'ל כביסה ROSE GARDEN', 20, '1598219434796QNU64_Z_P_7296073379317_1.png', 6, '2020-08-23 21:50:34', '2020-08-23 21:50:34'),
(9, 'ג\'ל כביסה OCEAN REEF', 20, '1598219473403QMX68_Z_P_7296073379294_1.png', 6, '2020-08-23 21:51:13', '2020-08-23 21:51:13'),
(10, 'תרסיס חיטוי למטבח שופרסל', 10, '1598219505942CDM70_Z_P_7296073369585_1.png', 6, '2020-08-23 21:51:45', '2020-08-23 21:51:45'),
(11, 'קוקה קולה בקבוק', 8, '1598219595748DOF24_Z_P_284316_1.png', 5, '2020-08-23 21:53:15', '2020-08-23 21:53:15'),
(12, 'פאנטה אורנג\'', 8, '1598219638651PRQ32_Z_P_3667109_1.png', 5, '2020-08-23 21:53:58', '2020-08-23 21:53:58'),
(13, 'ספרייט ליים', 8, '1598219677520XDC30_Z_P_7290110110611_1.png', 5, '2020-08-23 21:54:37', '2020-08-23 21:54:37'),
(14, 'גבינה לבנה סקי 5% שומן', 9, '1598219759788QTK28_Z_P_2824183_1.png', 4, '2020-08-23 21:55:59', '2020-08-23 21:55:59'),
(15, 'גבינה לבנה 5% טרה', 10, '1598219793395VDQ50_Z_P_7290010945481_1.png', 4, '2020-08-23 21:56:33', '2020-08-23 21:56:33'),
(16, 'חלב', 5, '1598219823580JTJ16_Z_P_42442_1.png', 4, '2020-08-23 21:57:03', '2020-08-23 21:57:03'),
(17, 'קיווי', 10, '1598219883581YYI36_Z_P_966663_1.png', 2, '2020-08-23 21:58:03', '2020-08-23 21:58:03'),
(18, 'אבטיח', 5, '1598219910771WNO24_Z_P_965031_1.png', 2, '2020-08-23 21:58:30', '2020-08-23 21:58:30'),
(19, 'מלון מובחר', 3, '1598219942416WOM30_Z_P_965055_1.png', 2, '2020-08-23 21:59:02', '2020-08-23 21:59:02'),
(20, 'בורקס גבינה', 15, '1598220001888PUF32_Z_P_99248_1.png', 1, '2020-08-23 22:00:01', '2020-08-23 22:00:01'),
(21, 'טורקי פטריות', 15, '1598220044974FZB22_Z_P_92614_1.png', 1, '2020-08-23 22:00:44', '2020-08-23 22:00:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `personal_id` int(11) NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(11) NOT NULL,
  `session` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `personal_id`, `password`, `city`, `street`, `type`, `session`, `createdAt`, `updatedAt`) VALUES
(1, 'shadi', 'abu saleh', 'admin', 203792858, 'admin', NULL, NULL, 0, 81120, '2020-08-23 21:34:54', '2020-08-23 21:34:54'),
(2, 'shadi', 'as', 'sh@gmail.com', 456456546, '12345', 'Tel Aviv', '1', 1, 47926, '2020-08-23 22:01:35', '2020-08-23 22:01:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `baskets`
--
ALTER TABLE `baskets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `basketId` (`basketId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `baskets`
--
ALTER TABLE `baskets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `baskets`
--
ALTER TABLE `baskets`
  ADD CONSTRAINT `baskets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `baskets_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`basketId`) REFERENCES `baskets` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
