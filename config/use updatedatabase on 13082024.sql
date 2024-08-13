-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2024 at 04:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `use`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `postNom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `lieuNaiss` varchar(50) DEFAULT NULL,
  `dateNaiss` date DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `sexe` char(1) DEFAULT NULL,
  `etatCivil` varchar(20) DEFAULT NULL,
  `nationalite` varchar(50) DEFAULT NULL,
  `provOrigine` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `territoire` varchar(50) DEFAULT NULL,
  `secteur` varchar(50) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `dateCreation` datetime DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `matricule` varchar(50) DEFAULT NULL,
  `univ` int(11) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `fonction` int(11) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `idFonc` int(11) DEFAULT NULL,
  `lib` varchar(100) DEFAULT NULL,
  `idGrade` int(11) DEFAULT NULL,
  `libGrade` varchar(50) DEFAULT NULL,
  `idParametre` int(11) DEFAULT NULL,
  `nomInstitut` varchar(100) DEFAULT NULL,
  `logoUrl` varchar(100) DEFAULT NULL,
  `num` varchar(10) DEFAULT NULL,
  `login` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `fMatCD` int(11) DEFAULT NULL,
  `fMatD` int(11) DEFAULT NULL,
  `fMatC` varchar(50) DEFAULT NULL,
  `fMatF` int(11) DEFAULT NULL,
  `province` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `faculty_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `institution_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `functions`
--

CREATE TABLE `functions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `institutions`
--

CREATE TABLE `institutions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `province_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `year2022` varchar(10) DEFAULT NULL,
  `year2023` varchar(10) DEFAULT NULL,
  `year2024` varchar(10) DEFAULT NULL,
  `year2025` varchar(10) DEFAULT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `postNom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `lieuNaiss` varchar(50) DEFAULT NULL,
  `dateNaiss` date DEFAULT NULL,
  `tel` varchar(15) DEFAULT NULL,
  `sexe` char(1) DEFAULT NULL,
  `etatCivil` varchar(20) DEFAULT NULL,
  `nationalite` varchar(50) DEFAULT NULL,
  `nomPere` varchar(50) DEFAULT NULL,
  `nomMere` varchar(50) DEFAULT NULL,
  `provOrigine` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `territoire` varchar(50) DEFAULT NULL,
  `secteur` varchar(50) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `faculte` int(11) DEFAULT NULL,
  `promotion` varchar(50) DEFAULT NULL,
  `departement` int(11) DEFAULT NULL,
  `dateCreation` datetime DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `matricule` varchar(50) DEFAULT NULL,
  `univ` int(11) DEFAULT NULL,
  `province` int(11) DEFAULT NULL,
  `f` int(11) DEFAULT NULL,
  `codeFac` int(11) DEFAULT NULL,
  `nomFac` varchar(50) DEFAULT NULL,
  `codeDepartement` int(11) DEFAULT NULL,
  `nomDepartement` varchar(50) DEFAULT NULL,
  `idParametre` int(11) DEFAULT NULL,
  `nomInstitut` varchar(50) DEFAULT NULL,
  `logoUrl` varchar(100) DEFAULT NULL,
  `num` varchar(10) DEFAULT NULL,
  `login` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `fMatCD` int(11) DEFAULT NULL,
  `fMatD` int(11) DEFAULT NULL,
  `fMatC` varchar(50) DEFAULT NULL,
  `fMatF` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super-admin','admin','teacher','agent') NOT NULL,
  `province_id` int(11) DEFAULT NULL,
  `institution_id` int(11) DEFAULT NULL,
  `faculty_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `institution` (`univ`),
  ADD KEY `function` (`idFonc`),
  ADD KEY `grade` (`grade`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `institution_id` (`institution_id`);

--
-- Indexes for table `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `institutions`
--
ALTER TABLE `institutions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `province_id` (`province_id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk` (`univ`),
  ADD KEY `faculty` (`faculte`),
  ADD KEY `faculte` (`codeFac`),
  ADD KEY `departments` (`codeDepartement`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `province_id` (`province_id`),
  ADD KEY `institution_id` (`institution_id`),
  ADD KEY `faculty_id` (`faculty_id`),
  ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faculties`
--
ALTER TABLE `faculties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `institutions`
--
ALTER TABLE `institutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agents`
--
ALTER TABLE `agents`
  ADD CONSTRAINT `function` FOREIGN KEY (`idFonc`) REFERENCES `functions` (`id`),
  ADD CONSTRAINT `grade` FOREIGN KEY (`grade`) REFERENCES `grades` (`id`),
  ADD CONSTRAINT `institution` FOREIGN KEY (`univ`) REFERENCES `institutions` (`id`);

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `faculties`
--
ALTER TABLE `faculties`
  ADD CONSTRAINT `faculties_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`id`);

--
-- Constraints for table `institutions`
--
ALTER TABLE `institutions`
  ADD CONSTRAINT `institutions_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `departments` FOREIGN KEY (`codeDepartement`) REFERENCES `departments` (`id`),
  ADD CONSTRAINT `faculte` FOREIGN KEY (`codeFac`) REFERENCES `faculties` (`id`),
  ADD CONSTRAINT `fk` FOREIGN KEY (`univ`) REFERENCES `institutions` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`),
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
