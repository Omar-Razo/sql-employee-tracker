-- department seed data
INSERT INTO department (id, dept_name)
    VALUES
        (1, 'Sales'),
        (2, 'Public Relations'),
        (3, 'Legal'),
        (4, 'Human Resources'),
        (5, 'Cyber Security'),
        (6, 'Networking');

INSERT INTO role (id, title, salary, department_id)
    VALUES
        (1, 'Junior Sales Rep', 58000, 1),
        (2, 'Senior Sales Rep', 60000, 1),
        (3, 'Public Relations Secretary', 48000, 2),
        (4, 'Chief Relations Officer', 560000, 2),
        (5, 'Primary Attorney', 280000, 3),
        (6, 'Pen Tester', 54000, 5),
        (7, 'Security Network Officer', 81000, 5),
        (8, 'Lead Engineer', 120000, 6),
        (9, 'Paralegal', 60000, 3),
        (10, 'Sales Manager', 68000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
        (3, 'Allen', 'Wattson', 7, null),
        (4, 'Mercury', 'Washington', 4, null),
        (5, 'Ian', 'Masters', 8, null),
        (6, 'Janet', 'Weiss', 10, null),
        (7, 'Vince', 'McIntyre', 2, 6),
        (1, 'Nancy', 'Powers', 1, 6),
        (2, 'Matthew', 'Winters', 6, 3);