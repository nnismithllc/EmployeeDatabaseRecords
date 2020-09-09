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
('Program Manager', 67000.00,1),
('Accountant', 43000.50,2),
('Product Controller', 32000.25,3),
('Human Resource Assistant', 55000.30,4),
('Shipping Clerk', 28000.50,5);

INSERT INTO employees
  (first_name, last_name, title_id, manager_id)
VALUES
('Linda', 'Peters', '3', 201),
('Jackie', 'Robinson','2' , 435),
('Mark', 'Laddle', '5',521),
('David', 'Tereisze', '4',217),
('April', 'Handle', '3', 201),
('Nina', 'Lipsette', '2', 435),
('Jackie', 'Robinson', '4', 217),
('Derek', 'June', '5', 521),
('Mary', 'Owens', '3',201);