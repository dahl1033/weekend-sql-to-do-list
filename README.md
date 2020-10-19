# Project Name

SQL-TO-DO-LIST

## Description

This project creates a to-do list for a person read, write and update tasks when working on a project.

## DATABASE 
CREATE TABLE todo (
	"id" serial PRIMARY KEY,
	"contributor_name" varchar(80),
	"schedule" integer,
	"task" varchar(300),
	"date_assigned" date,
	"finish_date" date,
	"notes" varchar(200)
);

INSERT INTO todo ("contributor_name", "schedule", "task", "date_assigned", "finish_date", "notes") 
	VALUES ('LeRoy', '1', 'create server and link to database', '10-18-2020', '11-01-2020', 'do something cool'),
			('Nick', '1', 'setup client.js', '10-15-2020', '10-18-2020', 'something even cooler'),
			('Bethany', '3', 'style front end with bootstrap', '10-19-2020', '10-27-2020', 'create change color on click with buttons'),
			('Chris', '2', 'append elements to DOM from client.js', '10-20-2020', '11-01-2020', 'do something awesome');
            

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
