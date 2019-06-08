CREATE DATABASE  IF NOT EXISTS `tome_raider`;
USE `tome_raider`;

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `idbooks` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `description` blob,
  `imageurl` blob,
  PRIMARY KEY (`isbn`),
  UNIQUE KEY `isbn_UNIQUE` (`isbn`),
  UNIQUE KEY `idbooks_UNIQUE` (`idbooks`)
) 


DROP TABLE IF EXISTS `collections`;

CREATE TABLE `collections` (
  `idcollections` int(11) NOT NULL,
  `raider_id` int(11) DEFAULT NULL,
  `tome_id` int(11) DEFAULT NULL,
  `for_sale` tinyint(1) DEFAULT NULL,
  `to_trade` tinyint(1) DEFAULT NULL,
  `condition` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcollections`),
  KEY `raider_id_idx` (`raider_id`),
  KEY `tome_id_idx` (`tome_id`),
  CONSTRAINT `raider_id` FOREIGN KEY (`raider_id`) REFERENCES `raiders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tome_id` FOREIGN KEY (`tome_id`) REFERENCES `books` (`isbn`) ON DELETE NO ACTION ON UPDATE NO ACTION
) 


CREATE TABLE `raiders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) 
