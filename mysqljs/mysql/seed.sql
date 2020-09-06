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
  ('Carol', 'Jam', 1, NULL),
  ('Bim', 'Bam', 2, 1),
  ('Lim', 'Lam', 3, NULL),
  ('Mim', 'Mam', 4, 3),
  ('Gim', 'Gam', 5, NULL),
  ('Nim', 'Nam', 6, NULL),
  ('Vim', 'Vam', 7, 6);