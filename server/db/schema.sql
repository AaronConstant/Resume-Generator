DROP DATABASE IF EXISTS resume_coverletter_app;

CREATE DATABASE resume_coverletter_app;

\c resume_coverletter_app;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    dob DATE NOT NULL,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    -- file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cover_letters (
    id SERIAL PRIMARY KEY,
    resume_id INT NOT NULL,
    user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL, 
    job_title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, 
    -- file_path TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
