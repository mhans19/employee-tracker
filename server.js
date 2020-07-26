// DEPENDENCIES 
    const inquirer = require("inquirer");
    const cTable = require('console.table');
    const connection = require('./db/database');
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
    function empOpts() {
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
// EXIT FUNCTION
const exitMenu = () => {
    console.log(
`
=============================================
|      THANK YOU FOR FOR VISITING YOUR      |
|      CONTENT MANAGEMENT SYSTEM (CMS)      |
|             HAVE A NICE DAY!              |
=============================================
`);
    process.exit();
};
// CREATE FUNCTIONS
    // CREATE A RECORD MENU
    const createMenu = () => {
        return inquirer.prompt([
            { // CREATE MENU OPTS
                type: "list",
                name: "createMenu",
                message: "What would you like to create?",
                choices: ["New department", "New role", "New employee", "Main Menu"]
            }
        ])
        .then(response => {
            if (response.createMenu === "New department"){
                createDept()
            } else if (response.createMenu === "New role"){
                createRole()
            } else if (response.createMenu === "New employee"){
                createEmployee()
            } else if (response.createMenu == "Main Menu"){
                startMenu()
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
                message: "What department does the new role belong to?",
                choices: deptOpts()
            }
        ])
        .then(response => {
            const deptSelection = response.createRoleDepartment;
            const salarySelection = response.createRoleSalary;
            const roleSelection = response.createRoleTitle;
            var deptID = '';
            connection.promise().query(`SELECT * FROM departments;`, function (err, res) {
                if (err) {throw err};
                for (var i = 0; i < res.length; i++) {
                    if (deptSelection === res[i].name){
                    deptID = (res[i].id);
                    }
                }
                let post = {title: roleSelection,
                            salary: salarySelection,
                            department_id: deptID
                            };
                        connection.query(`INSERT INTO roles SET ?`, post);
                        console.log(post.title + " was added as a new role!");
                        return returnMenu();
            })
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
                message: "Which role will this new employee be assigned?",
                choices: roleOpts()
            },
            { // Create a new employee - MANAGER
                type: "list",
                name: "createEmployeeManager",
                message: "Who will be this new employee's manager?",
                choices: empOpts()
            }
        ])
        .then(response => {
            const empFirst = response.createEmployeeFirst;
            const empLast = response.createEmployeeLast;
            const empRole = response.createEmployeeRole;
            const empMngr = response.createEmployeeManager;
            var roleID = '';
            var mngrID = '';

            connection.promise().query(`SELECT * FROM roles;`, function (err, res) {
                if (err) {throw err};
                for (var i = 0; i < res.length; i++) {
                    if (empRole === res[i].title){
                    roleID = (res[i].id);
                    }
                }
                connection.promise().query(`SELECT * FROM employees;`, function (err, result) {
                    if (err) {throw err};
                    for (var i = 0; i < result.length; i++) {
                        let resMngr = (result[i].first_name).concat(' ').concat(result[i].last_name)
                        if (empMngr === resMngr){
                            mngrID = (result[i].id);
                        }
                    }
                    let post = {first_name: empFirst,
                                last_name: empLast,
                                role_id: roleID,
                                manager_id: mngrID
                                };
                    connection.query(`INSERT INTO employees SET ?`, post);
                    console.log(post.first_name + " " + post.last_name + " was added as a new employee!");
                    return returnMenu();
                })
            })
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
                choices: ["Department", "Role", "Employee", "Main Menu"]
            }
        ])
        .then(response => {
            if (response.updateMenu === "Department"){
                updateDept()
            } else if (response.updateMenu === "Role"){
                updateRole()
            } else if (response.updateMenu === "Employee"){
                updateEmployee()
            } else if (response.updateMenu === "Main Menu"){
                startMenu()
            }
        })
    };
    // UPDATE DEPTARTMENT
    const updateDept = () => {
        return inquirer.prompt([
            { // UPDATE DEPT - NAME
                type: "input",
                name: "updateDepartmentName",
                message: "What will the updated department name be?",
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
                message: "Which department should this update be assigned to?",
                choices: deptOpts()
            }
        ])
        .then(response => {
                let targetDept = response.updateDepartment;
                let newDept = response.updateDepartmentName;
            connection.query(`UPDATE departments SET departments.name = ? WHERE name = ?;`, [newDept, targetDept]);
            console.log("You updated the department name from " + targetDept + " to " + newDept);
            return returnMenu();
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
                message: "What is the updated title for the role?",            
                when: function(responses) {
                    return responses.updateRoleList === "Title";
                }
            },
            { // UPDATE DEPT - SALARY
                type: "input",                                                                  // NUMERIC VALIDATION
                name: "updateRoleSalary",
                message: "What is the updated salary for the role?",            
                when: function(responses) {
                    return responses.updateRoleList === "Salary";
                }
            },
            { // UPDATE DEPT - DEPARTMENT
                type: "list",
                name: "updateRoleDept",
                message: "What is the updated department for the role?",  
                choices: deptOpts(),          
                when: function(responses) {
                    return responses.updateRoleList === "Department";
                }
            },
            { // UPDATE ROLE - CHOICE
                type: "list",
                name: "updateRoleID",
                message: "Which role should this update be assigned to?",
                choices: roleOpts()
            }
        ])
        .then(response => {
            if (response.updateRoleList === "Title"){
                let targetRole = response.updateRoleID;
                let newTitle = response.updateRoleTitle;
                connection.query(`UPDATE roles SET roles.title = ? WHERE title = ?;`, [newTitle, targetRole]);
                console.log("You updated the role title from " + targetRole + " to " + newTitle);
                return returnMenu();
            } else if (response.updateRoleList === "Salary"){
                let targetRole = response.updateRoleID;
                let newSalary = response.updateRoleSalary;
                connection.query(`UPDATE roles SET roles.salary = ? WHERE title = ?;`, [newSalary, targetRole]);
                console.log("For the " + targetRole + " role, you updated the salary to " + newSalary);
                return returnMenu();
            } else if (response.updateRoleList === "Department"){            
                let targetRole = response.updateRoleID;
                let newDept = response.updateRoleDept;
                var deptID = '';
                connection.promise().query(`SELECT * FROM departments;`, function (err, res) {
                    if (err) {throw err};
                    for (var i = 0; i < res.length; i++) {
                        if (newDept === res[i].name){
                        deptID = (res[i].id);
                        }
                    }
                    connection.query(`UPDATE roles SET roles.department_id = ? WHERE title = ?;`, [deptID, targetRole]);
                    console.log("For the " + targetRole + " role, you updated the department to " + newDept);
                    return returnMenu();
                })
            }
        })
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
                choices: empOpts(),       
                when: function(responses) {
                    return responses.updateEmployeeList === "Manager";
                }
            },
            { // UPDATE EMPLOYEE - CHOICE
                type: "list",
                name: "updateEmployeeID",
                message: "Which employee should this update be assigned to?",
                choices: empOpts()
            }
        ])
        .then(response => {
            if (response.updateEmployeeList === "First Name"){
                let targetEmployee = response.updateEmployeeID;
                let newFirst = response.updateEmployeeFirst;
                connection.query(`UPDATE employees SET employees.first_name = ? WHERE CONCAT(employees.first_name, ' ', employees.last_name) = ?;`, [newFirst, targetEmployee]);
                console.log("You updated " + targetEmployee + "'s first name to " + newFirst);
                return returnMenu();
            } else if (response.updateEmployeeList === "Last Name"){
                let targetEmployee = response.updateEmployeeID;
                let newLast = response.updateEmployeeLast;
                connection.query(`UPDATE employees SET employees.last_name = ? WHERE CONCAT(employees.first_name, ' ', employees.last_name) = ?;`, [newLast, targetEmployee]);
                console.log("You updated " + targetEmployee + "'s last name to " + newLast);
                return returnMenu();
            } else if (response.updateEmployeeList === "Role"){
                let targetEmployee = response.updateEmployeeID;
                let newRole = response.updateEmployeeRole;
                var roleID = '';
                connection.promise().query(`SELECT * FROM roles;`, function (err, res) {
                    if (err) {throw err};
                    for (var i = 0; i < res.length; i++) {
                        if (newRole === res[i].title){
                            roleID = (res[i].id);
                        }
                    }
                    connection.query(`UPDATE employees SET employees.role_id = ? WHERE CONCAT(employees.first_name, ' ', employees.last_name) = ?;`, [roleID, targetEmployee]);
                    console.log("You updated " + targetEmployee + "'s role to " + newRole);
                    return returnMenu();
                })
            } else if (response.updateEmployeeList === "Manager"){                                                               
                let targetEmployee = response.updateEmployeeID;
                let newManager = response.updateEmployeeManager;
                var mngrID = '';
                connection.promise().query(`SELECT * FROM employees;`, function (err, res) {
                    if (err) {throw err};
                    for (var i = 0; i < res.length; i++) {
                        let resMngr = (res[i].first_name).concat(' ').concat(res[i].last_name)
                        if (newManager === resMngr){
                            mngrID = (res[i].id);
                        }
                    }
                    connection.query(`UPDATE employees SET employees.manager_id = ? WHERE CONCAT(employees.first_name, ' ', employees.last_name) = ?;`, [mngrID, targetEmployee]);
                    console.log("You updated " + targetEmployee + "'s manager to " + newManager);
                    return returnMenu();
                })
            }
        })
    };
// VIEW FUNCTIONS
    // VIEW RECORDS
    const viewMenu = () => {
        return inquirer.prompt([
            { // VIEW LOGIC
                type: "list",
                name: "viewMenu",
                message: "What would you like to view?",
                choices: ["Departments", "Roles", "Employees", "Employees by Manager", "Employees by Department", "Total Utilized Budget", "Main Menu"]
            },
            { // EMPLOYEES BY MANAGER
                type: "list",
                name: "viewEmpByMngr",
                message: "For which manager would you like to view assigned employees?",
                choices: empOpts(),
                when: function(responses) {
                    return responses.viewMenu === "Employees by Manager";
                }
            },
            { // EMPLOYEES BY DEPARTMENT
                type: "list",
                name: "viewEmpByDept",
                message: "For which department would you like to view assigned employees?",
                choices: deptOpts(),
                when: function(responses) {
                    return responses.viewMenu === "Employees by Department";
                }
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
            } else if (response.viewMenu === "Employees by Manager"){
                let targetManager = response.viewEmpByMngr;
                connection.promise().query(`SELECT employees.id AS ID,
                                        CONCAT(employees.first_name, ' ', employees.last_name) AS Name,
                                        roles.title AS Role,
                                        roles.salary AS Salary,
                                        CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                                        departments.name AS Department
                                FROM employees 
                                    LEFT JOIN roles ON employees.role_id = roles.id
                                    LEFT JOIN departments ON roles.department_id = departments.id
                                    LEFT JOIN employees manager ON employees.manager_id = manager.id
                                    WHERE CONCAT(manager.first_name, ' ', manager.last_name) = ?;`, [targetManager])
                                    .then( ([results]) => {
                                        console.table(results);
                                        return returnMenu(); 
                                    }) 
            } else if (response.viewMenu === "Employees by Department"){
                let targetDepartment = response.viewEmpByDept;
                connection.promise().query(`SELECT employees.id AS ID,
                                        CONCAT(employees.first_name, ' ', employees.last_name) AS Name,
                                        roles.title AS Role,
                                        roles.salary AS Salary,
                                        CONCAT(manager.first_name, ' ', manager.last_name) AS Manager,
                                        departments.name AS Department
                                FROM employees 
                                    LEFT JOIN roles ON employees.role_id = roles.id
                                    LEFT JOIN departments ON roles.department_id = departments.id
                                    LEFT JOIN employees manager ON employees.manager_id = manager.id
                                    WHERE departments.name = ?;`, [targetDepartment])
                                    .then( ([results]) => {
                                        console.table(results);
                                        return returnMenu(); 
                                    }) 
            } else if (response.viewMenu === "Total Utilized Budget"){
                connection.promise().query(`SELECT SUM(roles.salary) AS Utilized_Budget,
                                                    departments.name AS Department
                                            FROM employees 
                                                LEFT JOIN roles ON employees.role_id = roles.id
                                                LEFT JOIN departments ON roles.department_id = departments.id
                                                GROUP BY departments.name
                                                ORDER BY Utilized_Budget;`)
                                    .then( ([results]) => {
                                        console.table(results);
                                        return returnMenu(); 
                                    })   
            } else if (response.viewMenu === "Main Menu"){
                startMenu();
            }
        });
    };
// DELETE FUNCTIONS
    // DELETE RECORDS
    const deleteMenu = () => {
        return inquirer.prompt([
            { // DELETE LOGIC
                type: "list",
                name: "deleteMenu",
                message: "What type of record would you like to delete?",
                choices: ["Department", "Role", "Employee", "Main Menu"]
            }
        ])
        .then(response => {
            if (response.deleteMenu === "Department"){
                deleteDept();
            } else if (response.deleteMenu === "Role"){
                deleteRole();
            } else if (response.deleteMenu === "Employee"){
                deleteEmployee();
            } else if (response.deleteMenu === "Main Menu"){
                startMenu();
            }
        })
    };
    // DELETE DEPARTMENT
    const deleteDept = () => {
        return inquirer.prompt([
            { // DELETE CONFIRM
                type: "list",
                name: "deleteConfirmDept",
                message: "Are you sure you'd like to delete a department? This action cannot be undone.",
                choices: ["Yes", "No"]
            },
            { // DELETE DEPARTMENT
                type: "list",
                name: "deleteDeptSelection",
                message: "What department would you like to delete?",
                choices: deptOpts(),
                when: function(responses) {
                    return responses.deleteConfirmDept === "Yes";
                }
            }
        ])
        .then(response => {
            if (response.deleteConfirmDept === "Yes"){
                let targetDept = response.deleteDeptSelection;
                connection.query(`DELETE FROM departments WHERE name = ?;`, [targetDept]);
                console.log("You deleted the " + targetDept + " department");
                return returnMenu();
            } else if (response.deleteConfirmDept === "No"){
                return returnMenu();
            }
        })
    };
    // DELETE ROLE
    const deleteRole = () => {
        return inquirer.prompt([
            { // DELETE CONFIRM
                type: "list",
                name: "deleteConfirmRole",
                message: "Are you sure you'd like to delete a role? This action cannot be undone.",
                choices: ["Yes", "No"]
            },
            { // DELETE ROLE
                type: "list",
                name: "deleteRoleSelection",
                message: "What role do you want to delete?",  
                choices: roleOpts(),          
                when: function(responses) {
                    return responses.deleteConfirmRole === "Yes";
                }
            }
        ])
        .then(response => {
            if (response.deleteConfirmRole === "Yes"){
                let targetRole = response.deleteRoleSelection;
                connection.query(`DELETE FROM roles WHERE title = ?;`, [targetRole]);
                console.log("You deleted the " + targetRole + " role");
                return returnMenu();
            } else if (response.deleteConfirmRole === "No"){
                return returnMenu();
            }
        })
    };
    // DELETE EMPLOYEE
    const deleteEmployee = () => {
        return inquirer.prompt([
            { // DELETE CONFIRM
                type: "list",
                name: "deleteConfirmEmp",
                message: "Are you sure you'd like to delete an employee? This action cannot be undone.",
                choices: ["Yes", "No"]
            },
            { // DELETE EMPLOYEE
                type: "list",
                name: "deleteEmpSelection",
                message: "Which employee do you want to delete?",    
                choices: empOpts(),        
                when: function(responses) {
                    return responses.deleteConfirmEmp === "Yes";
                }
            }
        ])
        .then(response => {
            if (response.deleteConfirmEmp === "Yes"){
                let targetEmployee = response.deleteEmpSelection;
                connection.query(`DELETE FROM employees WHERE CONCAT(employees.first_name, ' ', employees.last_name) = ?;`, [targetEmployee]);
                console.log("You deleted " + targetEmployee);
                return returnMenu();
            } else if (response.deleteConfirmEmp === "No"){
                return returnMenu();
            }
        })
    }; 
// MAIN APPLICATION
    console.log(
`
=============================================
|             WELCOME TO YOUR               |
|      CONTENT MANAGEMENT SYSTEM (CMS)      |
|     Let's manage your employee system!    |
=============================================
`);
    startMenu();