// DEPENDENCIES
const express = require('express');
const cTable = require('console.table');
const router = express.Router();
const db = require('../../db/database');
// REQUESTS
    // CREATE A DEPARTMENT
    router.post('/departments', (req, res) => {
        const sql = `INSERT INTO departments (name) 
                     VALUES (?);`;
        const { name } = req.body;
        const params = [name];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        })
    });
    // GET ALL DEPARTMENTS
    router.get('/api/departments', (req, res) => {
        const sql = `SELECT id AS ID,
                            name AS Department 
                     FROM departments 
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
    // GET SINGLE DEPARTMENT
    router.get('/api/departments/:id', (req, res) => {
        const sql = `SELECT id AS ID,
                            name AS Department 
                     FROM departments 
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
    // DELETE A DEPARMTNET
        // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
    router.delete('/api/departments/:id', (req, res) => {
        const sql = `DELETE FROM departments WHERE id = ?;`;
        const params = [req.params.id];
        db.execute(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            cTable(result);
        });
    });
    // UPDATE A DEPARTMENT
       // Need to use normal function syntax for the db.run() callback instead of an arrow function, or else we'd lose the context of this.changes.
       router.put('/api/departments/:id', (req, res) => {
        const sql = `UPDATE departments 
                    SET departments.name = ?
                    WHERE id = ?;`;
        const { name } = req.body;
        const params = [name, req.params.id];
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