DROP DATABASE IF EXISTS dental_ratings;
CREATE DATABASE dental_ratings;
USE dental_ratings;
CREATE TABLE anonymous_feedback ( feedback VARCHAR(250) );
CREATE TABLE five_star_feedback ( name VARCHAR(30), feedback VARCHAR(250), rating int, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP);