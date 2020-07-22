// DEPENDENCIES
const express = require('express');
const cTable = require('console.table');
const router = express.Router();
const db = require('../../db/database');
// REQUESTS
    // CREATE AN EMPLOYEE
    router.post('/employees', (req, res) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                     VALUES (?,?,?,?);`;
        const { first_name, last_name, role_id, manager_id } = req.body;
        const params = [first_name, last_name, role_id, manager_id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        })
    });
    // GET ALL EMPLOYEES
    router.get('/api/employees', (req, res) => {
        const sql = `SELECT employees.id AS ID,
                            CONCAT(employees.first_name, ' ', employees.last_name) AS Name,
                            roles.title AS Role,
                            roles.salary AS Salary,
                            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                            departments.name AS Department
                     FROM employees 
                          LEFT JOIN roles ON employees.role_id = roles.id
                          LEFT JOIN departments ON roles.department_id = departments.id
                          LEFT JOIN employees manager ON employees.manager_id = manager.id;`;
        const params = [];
        db.execute(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // GET SINGLE EMPLOYEE
    router.get('/api/employees/:id', (req, res) => {
        const sql = `SELECT employees.id AS ID,
                            CONCAT(employees.first_name, ' ', employees.last_name) AS Name,
                            roles.title AS Role,
                            roles.salary AS Salary,
                            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                            departments.name AS Department
                    FROM employees 
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments ON roles.department_id = departments.id
                        LEFT JOIN employees manager ON employees.manager_id = manager.id
                     WHERE employees.id = ?;`;
        const params = [req.params.id];
        db.execute(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    }); 
    // GET EMPLOYEES BY MANAGER
    router.get('/api/employees/:id', (req, res) => {
        const sql = `SELECT employees.id AS ID,
                            CONCAT(employees.first_name, ' ', employees.last_name) AS Name,
                            roles.title AS Role,
                            roles.salary AS Salary,
                            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                            departments.name AS Department
                    FROM employees 
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments ON roles.department_id = departments.id
                        LEFT JOIN employees manager ON employees.manager_id = manager.id
                        WHERE employees.manager_id = ?;`;
        const { manager_id } = req.body;
        const params = [manager_id];
        db.execute(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    }); 
    // GET EMPLOYEES BY DEPARTMENT
    router.get('/api/employees/:id', (req, res) => {
        const sql = `SELECT employees.id AS ID,
                            CONCAT(employees.first_name, ' ', employees.last_name) AS Name,
                            roles.title AS Role,
                            roles.salary AS Salary,
                            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                            departments.name AS Department
                    FROM employees 
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN departments ON roles.department_id = departments.id
                        LEFT JOIN employees manager ON employees.manager_id = manager.id
                        WHERE departments.id = ?;`;
        const { department_id } = req.body;
        const params = [department_id];
        db.execute(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    }); 
    // DELETE AN EMPLOYEE
        // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.delete('/api/employees/:id', (req, res) => {
        const sql = `DELETE FROM employees WHERE employees.id = ?;`;
        const params = [req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // UPDATE AN EMPLOYEE ROLE
    // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.put('/api/employees/:id', (req, res) => {
        const sql = `UPDATE employees 
                    SET employees.role_id = ?
                    WHERE employees.id = ?;`;
        const { role_id } = req.body;
        const params = [role_id, req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // UPDATE AN EMPLOYEE'S MANAGER
    // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.put('/api/employees/:id', (req, res) => {
        const sql = `UPDATE employees 
                    SET employees.manager_id = ?
                    WHERE employees.id = ?;`;
        const { manager_id } = req.body;
        const params = [manager_id, req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // TOTAL UTILIZED BUDGET
    router.get('/api/employees', (req, res) => {
        const sql = `SELECT SUM(roles.salary) AS Utilized_Budget,
                            departments.name AS Department
                     FROM employees 
                          LEFT JOIN roles ON employees.role_id = roles.id
                          LEFT JOIN departments ON roles.department_id = departments.id
                          GROUP BY departments.name
                          ORDER BY Utilized_Budget;`;
        const params = [];
        db.execute(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
// EXPORT
module.exports = router;