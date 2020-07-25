// DEPENDENCIES 
    const express = require('express');
    const inquirer = require("inquirer");
    const consoletable = require('console.table');
    const connection = require('./db/database');
    // const { changeUser } = require('./db/database');
    const router = express.Router();
// GLOBAL FUNCTIONS
    // List of all department options
    const deptOpts = () => {
        const deptList = [];
        connection.promise().query('SELECT * FROM departments;', function(err, res) {
            if (err) {throw err}
            for (var i = 0; i < res.length; i++) {
                deptList.push(res[i].name);
            }
        }) 
        return deptList;
    };
    // List of all role options
    const roleOpts = () => {
        const roleList = [];
        connection.promise().query(`SELECT * FROM roles;`, function (err, res) {
            if (err) {throw err}
            for (var i = 0; i < res.length; i++){
                roleList.push(res[i].title);
            }
        })
        return roleList;
    };
    // List of all manager options
    function mngrOpts() {
        const mngrList = [];
        connection.promise().query(`SELECT * FROM employees;`, function (err, res) {
            if (err) {throw err}
            for (var i = 0; i < res.length; i++){
                let name = (res[i].first_name).concat(' ').concat(res[i].last_name)
                mngrList.push(name);
            }
        })
        return mngrList;
    };
// MAIN MENU FUNCTION
    const startMenu = () => {
        inquirer.prompt(
            { // MAIN MENU
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
                choices: ["Create a record", "Update a record", "View a record", "Delete a record", "Exit"]
            }
        )
        .then(response => {
            if (response.mainMenu === "Create a record"){
                return createMenu()
            } else if (response.mainMenu === "Update a record"){
                return updateMenu()
            } else if (response.mainMenu === "View a record"){
                return viewMenu()
            } else if (response.mainMenu === "Delete a record"){
                return deleteMenu()
            } else if (response.mainMenu === "Exit"){
                return exitMenu()
            }
        })
    };
// RETURN MENU FUNCTION
    const returnMenu = () => {
        return inquirer.prompt([
            {// RETURN MENU OPTS
                type: "list",
                name: "returnMenu",
                message: "Would you like to return to the main menu or exit?",
                choices: ["Main Menu", "Exit"]
            }
        ])
        .then(response => {
            if (response.returnMenu === "Main Menu"){
                return startMenu()
            } else if (response.returnMenu === "Exit"){
                return exitMenu()
            }
        })
    };
// CREATE FUNCTIONS
    // CREATE A RECORD MENU
    const createMenu = () => {
        return inquirer.prompt([
            { // CREATE MENU OPTS
                type: "list",
                name: "createMenu",
                message: "What would you like to create?",
                choices: ["New department", "New role", "New employee"]
            }
        ])
        .then(response => {
            if (response.createMenu === "New department"){
                createDept()
            } else if (response.createMenu === "New role"){
                createRole()
            } else if (response.createMenu === "New employee"){
                createEmployee()
            } 
        })
    };
    // CREATE DEPTARTMENT
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
        .then(responses => {
            let post = {name: responses.createDepartment};
            connection.query(`INSERT INTO departments SET ?`, post);
            console.log(post.name + " was added as a new department!");
            return returnMenu();
        }) 
    };
    // CREATE ROLE
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
        .then(responses => {
            let department = deptOpts().indexOf(responses.createRoleDepartment) + 1
            let post = {title: responses.createRoleTitle,
                        salary: responses.createRoleSalary,
                        department_id: department
                        };
            connection.query(`INSERT INTO roles SET ?`, post);
            console.log(post.title + " was added as a new role!");
            return returnMenu();
        })
    };        
    // CREATE EMPLOYEE
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
            return returnMenu();
        })
    }; 
// UPDATE FUNCTIONS
    // UPDATE MENU
    const updateMenu = () => {
        return inquirer.prompt([
            { // UPDATE MANU
                type: "list",
                name: "updateMenu",
                message: "What would you like to update?",
                choices: ["Department", "Role", "Employee"]
            }
        ])
        .then(response => {
            if (response.updateMenu === "Department"){
                updateDept()
            } else if (response.updateMenu === "Role"){
                updateRole()
            } else if (response.updateMenu === "Employee"){
                updateEmployee()
            } 
        })
    };
    // UPDATE DEPTARTMENT
    const updateDept = () => {
        return inquirer.prompt([
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
            },
            { // UPDATE DEPT - CHOICE
                type: "list",
                name: "updateDepartment",
                message: "What department do you want to update?",
                choices: deptOpts()
            }
        ])
        .then(response => {
                let oldDept = response.updateDepartment;
                let newDept = response.updateDepartmentName;
            connection.query(`UPDATE departments SET departments.name = ? WHERE name = ?;`, [newDept, oldDept]);
            console.log("You updated the department!");
        })
    };














    // UPDATE ROLE
    const updateRole = () => {
        return inquirer.prompt([
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
            },
            { // UPDATE ROLE - CHOICE
                type: "list",
                name: "updateRoleID",
                message: "Which role would you like to save these updates for?",
                choices: roleOpts()
            }
        ])
    };
    // UPDATE EMPLOYEE
    const updateEmployee = () => {
        return inquirer.prompt([
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
            },
            { // UPDATE EMPLOYEE - CHOICE
                type: "list",
                name: "updateEmployeeID",
                message: "Which employee do you want to update this record for?",
                choices: mngrOpts()
            }
        ])
    };
// VIEW FUNCTIONS
    // VIEW RECORDS
    const viewMenu = () => {
        return inquirer.prompt([
            { // VIEW LOGIC
                type: "list",
                name: "viewMenu",
                message: "What would you like to view?",
                choices: ["Departments", "Roles", "Employees"]
            }
        ])
        .then(response => {
            if (response.viewMenu === "Departments"){
                connection.promise().query(`SELECT id AS ID,
                                                   name AS Department 
                                            FROM departments 
                                            ORDER BY id;`)
                                            .then( ([results]) => {
                                                console.table(results);
                                                return returnMenu(); 
                                            })                
            } else if (response.viewMenu === "Roles"){
                connection.promise().query(`SELECT roles.id AS ID,
                                                    roles.title AS Role ,
                                                    roles.salary AS Salary,
                                                    departments.name AS Department
                                            FROM roles 
                                                    LEFT JOIN departments ON roles.department_id = departments.id
                                            ORDER BY id;`)
                                            .then( ([results]) => {
                                                console.table(results);
                                                return returnMenu(); 
                                            })    
            } else if (response.viewMenu === "Employees"){
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
                                                return returnMenu(); 
                                            })  
            }; 
        });
    };
// DELETE FUNCTIONS

// EXIT FUNCTION
    const exitMenu = () => {
        console.log(`
        ===========================
        THANK YOU. HAVE A NICE DAY!
        ===========================
        `);
        process.exit();
    };




// MAIN APPLICATION
    console.log(`
    ======================
    EMPLOYEE TRACKER
    ======================
    `);
    startMenu();
    












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