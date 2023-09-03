INSERT INTO departments (name)
VALUES ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales"),
    ("Service");

INSERT INTO roles (title, salary, department)
VALUES ("Sales Lead", 100000, 4),
    ("Salesperson", 80000, 4),
    ("Lead Engineer", 200000, 1),
    ("Software Engineer", 150000, 1),
    ("Account Manager", 75000, 4),
    ("Accountant", 70000, 2),
    ("Legal Team Lead", 120000, 3),
    ("Lawyer", 100000, 3),
    ("Customer Service", 60000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Freeman", 1, null),
    ("Archit", "Veeravalli", 2, 1),
    ("Addison", "Churay", 7, null),
    ("Cody", "Rademacher", 3, null),
    ("Lane", "Rademacher", 4, 4),
    ("Erica", "Kilps", 6, null),
    ("Otto", "Veeravalli", 8, 3),
    ("Alicia", "Riazzi", 1, null),
    ("Owen", "Riazzi", 5, 8),
    ("Brian", "Riazzi", 9, 8);