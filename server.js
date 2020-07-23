// DEPENDENCIES 
    const express = require('express');
    const inquirer = require("inquirer");
    const consoletable = require('console.table');
    const connection = require('./db/database');
    const router = express.Router();
// GLOBAL OBJECTS
    const deptList = [];
    const roleList = [];
    const mngrList = [];
// GLOBAL FUNCTIONS
    // List of all department options
    function deptOpts() {
        connection.promise().query(`SELECT * FROM departments;`, function (err, res) {
                                if (err) throw err
                                for (var i = 0; i < res.length; i++){
                                    deptList.push(res[i].name);
                                }
                                })
                                return deptList;
    };
    // List of all role options
    function roleOpts() {
        connection.promise().query(`SELECT * FROM roles;`, function (err, res) {
                                if (err) throw err
                                for (var i = 0; i < res.length; i++){
                                    roleList.push(res[i].title);
                                }
                                })
                                return roleList;
    };
    // List of all manager options
    function mngrOpts() {
        connection.promise().query(`SELECT * FROM employees;`, function (err, res) {
                                if (err) throw err
                                for (var i = 0; i < res.length; i++){
                                    let name = (res[i].first_name).concat(' ').concat(res[i].last_name)
                                    mngrList.push(name);
                                }
                                })
                                return mngrList;
    };
// INQUIRE PROMPT FOR MAIN MENU
    const startMenu = () => {
        return inquirer.prompt([
            { // MAIN MENU
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
                choices: ["Create a record", "Update a record", "View a record", "Delete a record", "Exit"]
            }
        ])
    };        
// INQUIRE PROMPT FOR CREATE A RECORD
    const createMenu = () => {
        return inquirer.prompt([
            { // CREATE LOGIC
                type: "list",
                name: "createMenu",
                message: "What would you like to create?",
                choices: ["New department", "New role", "New employee"]
            }
        ])
    };
// INQUIRE PROMPT FOR CREATE DEPTARTMENT
    const createDept = () => {
        return inquirer.prompt([
            { // CREATE DEPT
                type: "input",
                name: "createDepartment",
                message: "What is the name of the new department?",
                validate: createDepartment => {
                    if (createDepartment) {
                    return true;
                    } else {
                    console.log('Please enter the department name!');
                    return false;
                    }
                }
            }
        ])
    };
// INQUIRE PROMPT FOR CREATE ROLE
    const createRole = () => {
        return inquirer.prompt([
            { // CREATE ROLE - TITLE
                type: "input",
                name: "createRoleTitle",
                message: "What is the title of the new role?",
                validate: createRoleTitle => {
                    if (createRoleTitle) {
                    return true;
                    } else {
                    console.log('Please enter the title!');
                    return false;
                    }
                }
            },
            { // CREATE ROLE - SALARY                                                                       //// ADD NUMERIC VALIDATION
                type: "input",
                name: "createRoleSalary",
                message: "What is the salary for the new role?",
                validate: createRoleSalary => {
                    if (createRoleSalary) {
                    return true;
                    } else {
                    console.log('Please enter the salary!');
                    return false;
                    }
                }
            },
            { // CREATE ROLE - DEPARTMENT_CHOICE
                type: "list",
                name: "createRoleDepartment",
                message: "What Department does the role belong to?",
                choices: deptOpts()
            }
        ])
    };        
// INQUIRE PROMPT FOR CREATE EMPLOYEE
    const createEmployee = () => {
        return inquirer.prompt([
            { // Create a new employee - FIRST
                type: "input",
                name: "createEmployeeFirst",
                message: "What is the new employee's first name?",
                validate: createEmployeeFirst => {
                    if (createEmployeeFirst) {
                    return true;
                    } else {
                    console.log('Please enter the first name!');
                    return false;
                    }
                }
            },
            { // Create a new employee - LAST
                type: "input",
                name: "createEmployeeLast",
                message: "What is the new employee's last name?",
                validate: createEmployeeLast => {
                    if (createEmployeeLast) {
                    return true;
                    } else {
                    console.log('Please enter the last name!');
                    return false;
                    }
                }
            },
            { // Create a new employee - ROLE
                type: "list",
                name: "createEmployeeRole",
                message: "Which role will this employee be assigned?",
                choices: roleOpts()
            },
            { // Create a new employee - MANAGER
                type: "list",
                name: "createEmployeeManager",
                message: "Who will be this employee's manager?",
                choices: mngrOpts()
            }
        ])
    };  
// INQUIRE PROMPT FOR UPDATE A RECORD
    const updateMenu = () => {
        return inquirer.prompt([
            { // UPDATE LOGIC
                type: "list",
                name: "updateMenu",
                message: "What would you like to update?",
                choices: ["Department", "Role", "Employee"]
            }
        ])
    };
// INQUIRE PROMPT FOR UPDATE DEPTARTMENT
const updateDept = () => {
    return inquirer.prompt([
        { // UPDATE DEPT - CHOICE
            type: "list",
            name: "updateDepartment",
            message: "What department do you want to update?",
            choices: deptOpts()
        },
        { // UPDATE DEPT - NAME
            type: "input",
            name: "updateDepartmentName",
            message: "What is the updated name of the Department?",
            validate: updateDepartmentName => {
                if (updateDepartmentName) {
                return true;
                } else {
                console.log('Please enter the department name!');
                return false;
                }
            }
        }
    ])
};
// INQUIRE PROMPT FOR UPDATE ROLE
const updateRole = () => {
    return inquirer.prompt([
        { // UPDATE ROLE - CHOICE
            type: "list",
            name: "updateRoleID",
            message: "Which role would you like to update?",
            choices: roleOpts()
        },
        {// UPDATE SELECTION
            type: "list",
            name: "updateRoleList",
            message: "What would you like to update?",
            choices: ["Title", "Salary", "Department"]
        },
        { // UPDATE ROLE - TITLE
            type: "input",
            name: "updateRoleTitle",
            message: "What is the updated title for this role?",            
            when: function(responses) {
                return responses.updateRoleList === "Title";
            }
        },
        { // UPDATE DEPT - SALARY
            type: "input",
            name: "updateRoleSalary",
            message: "What is the updated salary for this role?",            
            when: function(responses) {
                return responses.updateRoleList === "Salary";
            }
        },
        { // UPDATE DEPT - DEPARTMENT
            type: "list",
            name: "updateRoleDept",
            message: "What is the updated department for this role?",  
            choices: deptOpts(),          
            when: function(responses) {
                return responses.updateRoleList === "Department";
            }
        }
    ])
};
// INQUIRE PROMPT FOR UPDATE EMPLOYEE
const updateEmployee = () => {
    return inquirer.prompt([
        { // UPDATE EMPLOYEE - CHOICE
            type: "list",
            name: "updateEmployeeID",
            message: "Which employee do you want to update update?",
            choices: mngrOpts()
        },
        {// UPDATE SELECTION
            type: "list",
            name: "updateEmployeeList",
            message: "What would you like to update?",
            choices: ["First Name", "Last Name", "Role", "Manager"]
        },
        { // UPDATE EMOLOYEE - FIRST NAME
            type: "input",
            name: "updateEmployeeFirst",
            message: "What is the updated first name?",            
            when: function(responses) {
                return responses.updateEmployeeList === "First Name";
            }
        },
        { // UPDATE EMOLOYEE - FIRST NAME
            type: "input",
            name: "updateEmployeeLast",
            message: "What is the updated last name?",            
            when: function(responses) {
                return responses.updateEmployeeList === "Last Name";
            }
        },
        { // UPDATE EMOLOYEE - ROLE
            type: "list",
            name: "updateEmployeeRole",
            message: "What is the updated role?",  
            choices: roleOpts(),          
            when: function(responses) {
                return responses.updateEmployeeList === "Role";
            }
        },
        { // UPDATE EMOLOYEE - MANAGER
            type: "list",
            name: "updateEmployeeManager",
            message: "What is the updated manager?",     
            choices: mngrOpts(),       
            when: function(responses) {
                return responses.updateEmployeeList === "Manager";
            }
        }
    ])
};
// INQUIRE PROMPT TO VIEW RECORDS
const viewMenu = () => {
    return inquirer.prompt([
        { // VIEW LOGIC
            type: "list",
            name: "viewMenu",
            message: "What would you like to view?",
            choices: ["Departments", "Roles", "Employees"]
        }
    ])
};
// INQUIRE PROMPT TO DELETE RECORDS
const deleteMenu = () => {
    return inquirer.prompt([
        { // DELETE LOGIC
            type: "list",
            name: "deleteMenu",
            message: "What type of record would you like to delete?",
            choices: ["Department", "Role", "Employee"]
        }
    ])
};
// INQUIRE PROMPT TO DELETE DEPARTMENT
const deleteDept = () => {
    return inquirer.prompt([
        { // DELETE DEPARTMENT
            type: "list",
            name: "deleteDept",
            message: "What department would you like to delete?",   
            choices: deptOpts(),         
            when: function(responses) {
                return responses.deleteMenu === "Department";
            }
        }
    ])
};
// INQUIRE PROMPT TO DELETE ROLE
const deleteRole = () => {
    return inquirer.prompt([
        { // DELETE ROLE
            type: "list",
            name: "deleteRole",
            message: "What role do you want to delete?",  
            choices: roleOpts(),          
            when: function(responses) {
                return responses.deleteMenu === "Role";
            }
        }
    ])
};
// INQUIRE PROMPT TO DELETE EMPLOYEE
const deleteEmployee = () => {
    return inquirer.prompt([
        { // DELETE EMPLOYEE
            type: "list",
            name: "deleteEmployee",
            message: "What employee do you want to delete?",    
            choices: mngrOpts(),        
            when: function(responses) {
                return responses.deleteMenu === "Employee";
            }
        }
    ])
};
// MAIN APPLICATION
console.log(`
======================
   EMPLOYEE TRACKER
======================
`);
startMenu() // Prompt main menu
.then(menuData => {
    if (menuData.mainMenu === "Create a record"){
        createMenu()
        .then(createMenuData => {
            if (createMenuData.createMenu === "New department"){
                createDept()
                .then(responses => {
                    let post = {name: responses.createDepartment};
                    connection.query(`INSERT INTO departments SET ?`, post);
                    console.log(post.name + " was added as a new department!");
                })                
            } else if (createMenuData.createMenu === "New role"){
                createRole()
                .then(responses => {
                    let department = deptOpts().indexOf(responses.createRoleDepartment) + 1
                    let post = {title: responses.createRoleTitle,
                                salary: responses.createRoleSalary,
                                department_id: department
                                };
                    connection.query(`INSERT INTO roles SET ?`, post);
                    console.log(post.title + " was added as a new role!");
                })
            } else if (createMenuData.createMenu === "New employee"){
                createEmployee()
                .then(responses => {
                    let role = roleOpts().indexOf(responses.createEmployeeRole) + 1
                    let manager = mngrOpts().indexOf(responses.createEmployeeManager) + 1
                    let post = {first_name: responses.createEmployeeFirst,
                                last_name: responses.createEmployeeLast,
                                role_id: role,
                                manager_id: manager
                                };
                    connection.query(`INSERT INTO employees SET ?`, post);
                    console.log(post.first_name + " " + post.last_name + " was added as a new employee!");
                })
            } 
        });
    } else if (menuData.mainMenu === "Update a record"){
        updateMenu()
        .then(updateMenuData => {
            if (updateMenuData.updateMenu === "Department"){
                updateDept()
                .then(responses => {
                    let department = deptOpts().indexOf(responses.updateDepartment) + 1
                    let post = {name: responses.updateDepartmentName,
                                id: department};
                                connection.query(`UPDATE departments SET departments.name = ? WHERE id = ?;`, post);
                                console.log("You updated the department!");
                })
            } else if (updateMenuData.updateMenu === "Role"){
                return updateRole();
            } else if (updateMenuData.updateMenu === "Employee"){
                return updateEmployee();
            };   
        })
    } else if (menuData.mainMenu === "View a record"){
        viewMenu()
        .then(viewMenuData => {
            if (viewMenuData.viewMenu === "Departments"){
                    connection.promise().query(`SELECT id AS ID,
                                                    name AS Department 
                                                FROM departments 
                                                ORDER BY id;`)
                                                .then( ([results]) => {
                                                    console.table(results);
                                                    return startMenu(); 
                                                })                
            } else if (viewMenuData.viewMenu === "Roles"){
                connection.promise().query(`SELECT roles.id AS ID,
                                                    roles.title AS Role ,
                                                    roles.salary AS Salary,
                                                    departments.name AS Department
                                            FROM roles 
                                                    LEFT JOIN departments ON roles.department_id = departments.id
                                            ORDER BY id;`)
                                            .then( ([results]) => {
                                                console.table(results);
                                                return startMenu(); 
                                            })    
            } else if (viewMenuData.viewMenu === "Employees"){
                connection.promise().query(`SELECT employees.id AS ID,
                                                    CONCAT(employees.first_name, ' ', employees.last_name) AS Name,
                                                    roles.title AS Role,
                                                    roles.salary AS Salary,
                                                    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                                                    departments.name AS Department
                                            FROM employees 
                                                LEFT JOIN roles ON employees.role_id = roles.id
                                                LEFT JOIN departments ON roles.department_id = departments.id
                                                LEFT JOIN employees manager ON employees.manager_id = manager.id;`)
                                            .then( ([results]) => {
                                                console.table(results);
                                                return startMenu(); 
                                            })  
            };   
        })
    } else if (menuData.mainMenu === "Delete a record") {
        return deleteMenu()
        .then(deleteMenuData => {
            if (deleteMenuData.deleteMenu === "Department"){
                return deleteDept();
            } else if (deleteMenuData.deleteMenu === "Role"){
                return deleteRole();
            } else if (deleteMenuData.deleteMenu === "Employee"){
                return deleteEmployee();
            }
        })
    } else if (menuData.mainMenu === "Exit"){
        console.log(`
        ===========================
        THANK YOU. HAVE A NICE DAY!
        ===========================
        `);
        process.exit();
    }
});