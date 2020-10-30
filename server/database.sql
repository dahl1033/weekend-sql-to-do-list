-- create table in database
CREATE TABLE todos (
    "id" serial PRIMARY KEY,
    "task" varchar NOT NULL,
    "completed_status" boolean Default FALSE
);

-- insert a items into database
INSERT INTO todos ("task") VALUES ('Feed Randy');
INSERT INTO todos ("task") VALUES ('Take out the trash');
INSERT INTO todos ("task") VALUES ('Shovel driveway');
INSERT INTO todos ("task") VALUES ('Make dinner');
INSERT INTO todos ("task") VALUES ('Drive Amanda to volleyball');

-- test to make sure values were added
SELECT * FROM "todos" ORDER BY "completed_status", "id"