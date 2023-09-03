DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- I believe each table wont have a primary key, but one will
    -- and the others will pull from foreign key, but I'll have to double check
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    salary INT NOT NULL
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    -- above will have to be foreign key I think
    salary INT NOT NULL,
    manager TEXT NOT NULL
);