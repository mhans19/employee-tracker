// DEPENDENCIES
const express = require('express');
const cTable = require('console.table');
const router = express.Router();
const db = require('../../db/database');
// REQUESTS
    // CREATE A ROLE
    router.post('/roles', (req, res) => {
        const sql = `INSERT INTO roles (title, salary, department_id) 
                     VALUES (?,?,?);`;
        const { title, salary, department_id } = req.body;
        const params = [title, salary, department_id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        })
    });
    // GET ALL roles
    router.get('/api/roles', (req, res) => {
        const sql = `SELECT roles.id AS ID,
                            roles.title AS Role ,
                            roles.salary AS Salary,
                            departments.name AS Department
                     FROM roles 
                            LEFT JOIN departments ON roles.department_id = departments.id
                     ORDER BY id;`;
        const params = [];
        db.execute(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // GET SINGLE ROLE
    router.get('/api/roles/:id', (req, res) => {
        const sql = `SELECT id AS ID,
                            title AS Role ,
                            salary AS Salary,
                            department_id AS Department
                     FROM roles 
                     WHERE id = ?,
                     ORDER BY id;`;
        const params = [req.params.id];
        db.execute(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    }); 
    // DELETE A ROLE
        // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.delete('/api/roles/:id', (req, res) => {
        const sql = `DELETE FROM roles WHERE id = ?;`;
        const params = [req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // UPDATE A ROLE TITLE
    // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.put('/api/roles/:id', (req, res) => {
        const sql = `UPDATE roles 
                    SET roles.title = ?
                    WHERE roles.id = ?;`;
        const { title } = req.body;
        const params = [title, req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // UPDATE A ROLE'S SALARY
    // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.put('/api/roles/:id', (req, res) => {
        const sql = `UPDATE roles 
                    SET roles.salary = ?
                    WHERE roles.id = ?;`;
        const { salary } = req.body;
        const params = [salary, req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // UPDATE A ROLE'S DEPARTMENT ID
    // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.put('/api/roles/:id', (req, res) => {
        const sql = `UPDATE roles 
                    SET roles.department_id = ?
                    WHERE roles.id = ?;`;
        const { department_id } = req.body;
        const params = [department_id, req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
// EXPORT
module.exports = router;