create database contactDB;
use contactDB;

CREATE TABLE contactTbl (
id Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
name varchar(30) default '',
title VARCHAR(100) DEFAULT '',
phone varchar(30) default '',
imageUrl varchar(30) default 0
);

INSERT INTO `contactdb`.`contactTbl` (`name`, `title`, `phone`, `imageUrl`) VALUES ('Eli Gold', 'Teacher', '0583279819', 'men/45');
INSERT INTO `contactdb`.`contactTbl` (`name`, `title`, `phone`, `imageUrl`) VALUES ('Debbi Dirtic', 'My Sister', '0548439142', 'women/29');


-- --------------
