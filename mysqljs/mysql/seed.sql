USE employeedatabase_db;

INSERT INTO departments 
(name)
VALUES 
('Program Management'),
('Accounting'),
('Product Control'),
('Human Resources'),
('Shipping');

INSERT INTO role
(title,salary,department_id)
VALUES
('Program Management', 67000.00,1),
('Accounting', 43000.50,2),
('Product Control', 32000.25,3),
('Human Resources', 55000.30,4),
('Shipping', 28000.50,5);

INSERT INTO employees
  (first_name, last_name, title_id, manager_id)
VALUES
('Linda', 'Peters', '3', 3),
('Jackie', 'Robinson','2' , 4),
('Mark', 'Laddle', '5',5),
('David', 'Tereisze', '4',2),
('April', 'Handle', '3', 3),
('Nina', 'Lipsette', '2', 4),
('Jackie', 'Robinson', '2', 4),
('Derek', 'June', '5', 5),
('Mary', 'Owens', '3',3);