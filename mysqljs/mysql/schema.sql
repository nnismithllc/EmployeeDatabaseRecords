DROP DATABASE IF EXISTS employeedatabase_db;
CREATE database employeedatabase_db;

USE employeedatabase_db;

CREATE TABLE departments (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NULL,
  department_id INT,
  salary DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
title_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id)
);

-- Join tables together --
SELECT e.first_name, e.last_name, r.title, e.manager_id FROM employees AS e LEFT JOIN `role` as r on e.title_id= r.id;

SELECT * FROM `departments`;
SELECT * FROM `employees`;
SELECT * FROM `role`;