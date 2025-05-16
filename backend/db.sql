DROP DATABASE IF EXISTS HR_application_db;

CREATE DATABASE HR_application_db;

USE HR_application_db;

CREATE TABLE
    Department (
        DepId INT AUTO_INCREMENT PRIMARY KEY,
        DepName VARCHAR(50) NOT NULL UNIQUE
    );

CREATE TABLE
    Post (
        PostId INT AUTO_INCREMENT PRIMARY KEY,
        PostTitle VARCHAR(50) NOT NULL
    );

CREATE TABLE
    Staff (
        EmployeeId INT AUTO_INCREMENT PRIMARY KEY,
        PostId INT NOT NULL,
        FirstName VARCHAR(50) NOT NULL,
        LastName VARCHAR(50) NOT NULL,
        Gender ENUM ('MALE', 'FEMALE') NOT NULL,
        Email VARCHAR(80) NOT NULL UNIQUE,
        Phone VARCHAR(14) NOT NULL UNIQUE,
        Address TEXT NOT NULL,
        DepId INT NOT NULL,
        FOREIGN KEY (PostId) REFERENCES Post (PostId) ON DELETE CASCADE,
        FOREIGN KEY (DepId) REFERENCES Department (DepId) ON DELETE CASCADE
    );

CREATE TABLE
    Users (
        UserId INT AUTO_INCREMENT PRIMARY KEY,
        EmployeeId INT NOT NULL,
        Username VARCHAR(255) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        FOREIGN KEY (EmployeeId) REFERENCES Staff (EmployeeId) ON DELETE CASCADE
    );

CREATE TABLE
    Recruitment (
        RecId INT AUTO_INCREMENT PRIMARY KEY,
        HireDate TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
        Salary INT NOT NULL,
        Status ENUM ('pending', 'active', 'terminated') NOT NULL DEFAULT 'pending',
        EmployeeId INT NULL,
        FOREIGN KEY (EmployeeId) REFERENCES Staff (EmployeeId) ON DELETE CASCADE
    );


INSERT INTO Department (DepName) VALUES ('Baby'),('Boys');

INSERT INTO Post(PostTitle) VALUES ('Human Resource'),("Umugaga");
