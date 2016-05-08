# Dental-Rater
A simple app that processes ratings sent over email

## Dependencies
1. NodeJS
2. npm

## Getting the code
> *git clone https://github.com/ameletyan/Dental-Rater*

## Setting the environmental variables
Setting the GMAIL_PASSWORD variable will allow the program to send emails properly (such that the "sender" of the email is a dummy user called "Dental Rater" at "dental.rater@gmail.com").

> *export GMAIL_PASSWORD=dr12345678*

Setting the MYSQL_PASSWORD variable will allow the program to access your local MySQL shell.

> *export MYSQL_PASSWORD={your MySQL root user password}*

Note that setting both of these variables is required for the program to run properly.

## Building the database
Note that this command will delete any database in your local MySQL shell that is called "dental_ratings" and replace it with its own schema.

> *npm run build:db*

## Install required NodeJS packages
> *npm install*

## Running the program
> *npm start*

If this command executed successfully, you should be able to enter your browser and navigate to "localhost:3000" to see it in action.
Once the email address is entered, a message should be sent to that address that asks for a rating.
