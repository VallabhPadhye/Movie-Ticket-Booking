# Movie-Ticket-Booking

Required Modules to Install:
1. MYSQL Connection - npm install mysql
2. Uppercase - npm install upper-Case
3. console module - predefined in nodejs
4. Table Interface - npm install table

Queries to create database:
1) Creating new database
- create database if not exists movie_ticket_booking;

2) Creating table movie : 
 - CREATE TABLE if not exists movie ( movieName varchar(255) DEFAULT NULL, movieTime varchar(255) DEFAULT NULL, movieDate varchar(255) DEFAULT NULL, movieSeats varchar(255) DEFAULT NULL, moviePrice varchar(255) DEFAULT NULL, movieNumber int NOT NULL AUTO_INCREMENT, PRIMARY KEY(movieNumber));

3) Create table userinfo
 - CREATE TABLE userinfo ( customerName varchar(255) DEFAULT NULL,customerEmail varchar(255) DEFAULT NULL, customerPhone varchar(255) DEFAULT NULL, movieNumber varchar(255) DEFAULT NULL, movieName varchar(255) DEFAULT NULL, movieTime varchar(255) DEFAULT NULL, movieDate varchar(255) DEFAULT NULL, customerSeats varchar(255) DEFAULT NULL, totalPrice varchar(255) DEFAULT NULL );

Contributed By @HarshadFate @GunjanJawarkar @VallabhPadhye
