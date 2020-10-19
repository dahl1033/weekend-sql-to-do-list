-- create table in database
CREATE TABLE todo (
	"id" serial PRIMARY KEY,
	"contributor_name" varchar(80),
	"schedule" integer,
	"task" varchar(300),
	"date_assigned" date,
	"finish_date" date,
	"notes" varchar(200)
);

-- insert a few items into database
INSERT INTO todo ("contributor_name", "schedule", "task", "date_assigned", "finish_date", "notes") 
	VALUES ('LeRoy', '1', 'create server and link to database', '10-18-2020', '11-01-2020', 'do something cool'),
			('Nick', '1', 'setup client.js', '10-15-2020', '10-18-2020', 'something even cooler'),
			('Bethany', '3', 'style front end with bootstrap', '10-19-2020', '10-27-2020', 'create change color on click with buttons'),
            ('Chris', '2', 'append elements to DOM from client.js', '10-20-2020', '11-01-2020', 'do something awesome'),
            ('Chris', '2', 'append elements to DOM from client.js', '10-20-2020', '11-01-2020', 'do something awesome'),
			('Chris', '2', 'append elements to DOM from client.js', '10-20-2020', '11-01-2020', 'do something awesome');