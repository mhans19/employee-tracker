// DEPENDENCIES 
    const express = require('express');
    const inquirer = require("inquirer");
    const consoleTable = require('console.table');
    const connection = require('./db/database');
    const router = express.Router();
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
// INQUIRE PROMPT FOR CREAT A RECORD
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
                message: "What is the new role title?",
                validate: createRoleTitle => {
                    if (createRoleTitle) {
                    return true;
                    } else {
                    console.log('Please enter the title!');
                    return false;
                    }
                }
            },
            { // CREATE ROLE - SALARY
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
            { // CREATE ROLE - DEPARTMENT_ID
                type: "input",
                name: "createRoleDepartment",
                message: "What Department ID will the role belong to (See table above)?",
                validate: createRoleDepartment => {
                    if (createRoleDepartment) {
                    return true;
                    } else {
                    console.log('Please enter the department!');
                    return false;
                    }
                }
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
                type: "input",
                name: "createEmployeeRole",
                message: "Which role will this employee be assigned?",
                validate: createEmployeeRole => {
                    if (createEmployeeRole) {
                    return true;
                    } else {
                    console.log('Please enter the employee role!');
                    return false;
                    }
                }
            },
            { // Create a new employee - MANAGER
                type: "input",
                name: "createEmployeeManager",
                message: "Who will be this employee's manager?",
                validate: createEmployeeManager => {
                    if (createEmployeeManager) {
                    return true;
                    } else {
                    console.log('Please enter the manager!');
                    return false;
                    }
                }
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
        { // UPDATE DEPT - ID
            type: "input",
            name: "updateDepartmentID",
            message: "What is the ID of the department to update?",
            validate: updateDepartmentID => {
                if (updateDepartmentID) {
                return true;
                } else {
                console.log('Please enter the department ID!');
                return false;
                }
            }
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
        { // UPDATE ROLE - ID
            type: "input",
            name: "updateRoleID",
            message: "What is the ID of the role to update?",
            validate: updateRoleID => {
                if (updateRoleID) {
                return true;
                } else {
                console.log('Please enter the role ID!');
                return false;
                }
            }
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
            type: "input",
            name: "updateRoleDept",
            message: "What is the updated department ID for this role?",            
            when: function(responses) {
                return responses.updateRoleList === "Department";
            }
        }
    ])
};
// INQUIRE PROMPT FOR UPDATE EMPLOYEE
const updateEmployee = () => {
    return inquirer.prompt([
        { // UPDATE EMPLOYEE - ID
            type: "input",
            name: "updateEmployeeID",
            message: "What is the ID of the employee to update?",
            validate: updateEmployeeID => {
                if (updateEmployeeID) {
                return true;
                } else {
                console.log('Please enter the employee ID!');
                return false;
                }
            }
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
            type: "input",
            name: "updateEmployeeRole",
            message: "What is the updated role ID?",            
            when: function(responses) {
                return responses.updateEmployeeList === "Role";
            }
        },
        { // UPDATE EMOLOYEE - MANAGER
            type: "input",
            name: "updateEmployeeManager",
            message: "What is the updated Manager ID?",            
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
// INQUIRE PROMPT TO VIEW DEPARTMENTS
const viewDept = () => {
    return inquirer.prompt([
        { // VIEW DEPT
            type: "list",
            name: "viewDeptList",
            message: "Please select what you'd like to view.",
            choices: ["All Departments", "Single Department"]
        },
        { // VIEW SINGLE DEPT
            type: "input",
            name: "viewDeptID",
            message: "What is the ID of the department you'd like to view?",            
            when: function(responses) {
                return responses.viewDeptList === "Single Department";
            },
            validate: viewDeptID => {
                if (viewDeptID) {
                return true;
                } else {
                console.log('Please enter the department ID!');
                return false;
                }
            }
        }
    ])
};
// INQUIRE PROMPT TO VIEW ROLES
const viewRole = () => {
    return inquirer.prompt([
        { // VIEW ROLES
            type: "list",
            name: "viewRoleList",
            message: "Please select what you'd like to view.",
            choices: ["All Roles", "Single Role"]
        },
        { // VIEW SINGLE ROLE
            type: "input",
            name: "viewRoleID",
            message: "What is the ID of the role you'd like to view?",            
            when: function(responses) {
                return responses.viewRoleList === "Single Role";
            },
            validate: viewRoleID => {
                if (viewRoleID) {
                return true;
                } else {
                console.log('Please enter the Role ID!');
                return false;
                }
            }
        }
    ])
};
// INQUIRE PROMPT TO VIEW EMPLOYEES
const viewEmployee = () => {
    return inquirer.prompt([
        { // VIEW EMPLOYEES
            type: "list",
            name: "viewEmployeeList",
            message: "Please select what you'd like to view.",
            choices: ["All Employees", "Single Employee"]
        },
        { // VIEW SINGLE EMPLOYEE
            type: "input",
            name: "viewEmployeeID",
            message: "What is the ID of the employee you'd like to view?",            
            when: function(responses) {
                return responses.viewEmployeeList === "Single Employee";
            },
            validate: viewEmployeeID => {
                if (viewEmployeeID) {
                return true;
                } else {
                console.log('Please enter the Employee ID!');
                return false;
                }
            }
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
            type: "input",
            name: "deleteDept",
            message: "What is the ID of the department to delete?",            
            when: function(responses) {
                return responses.deleteMenu === "Department";
            },
            validate: deleteMenu => {
                if (deleteMenu) {
                return true;
                } else {
                console.log('Please enter the department ID!');
                return false;
                }
            }
        }
    ])
};
// INQUIRE PROMPT TO DELETE ROLE
const deleteRole = () => {
    return inquirer.prompt([
        { // DELETE ROLE
            type: "input",
            name: "deleteRole",
            message: "What is the ID of the role to delete?",            
            when: function(responses) {
                return responses.deleteMenu === "Role";
            },
            validate: deleteRole => {
                if (deleteRole) {
                return true;
                } else {
                console.log('Please enter the role ID!');
                return false;
                }
            }
        }
    ])
};
// INQUIRE PROMPT TO DELETE EMPLOYEE
const deleteEmployee = () => {
    return inquirer.prompt([
        { // DELETE EMPLOYEE
            type: "input",
            name: "deleteEmployee",
            message: "What is the ID of the employee to delete?",            
            when: function(responses) {
                return responses.deleteMenu === "Employee";
            },
            validate: deleteEmployee => {
                if (deleteEmployee) {
                return true;
                } else {
                console.log('Please enter the employee ID!');
                return false;
                }
            }
        }
    ])
};
// BACK TO MAIN MENU
const returnMenu = () => {
    inquirer.prompt[(
        {// RETURN TO MAIN MENU
            type: "confirm",
            name: "returnMenu",
            message: "Would you like to do something else?",
            default: true
        }
    )]
    .then(choice => {
        if (choice.returnMenu === true){
            startMenu();
        } else {
            console.log(`
            ===========================
            THANK YOU. HAVE A NICE DAY!
            ===========================
            `);
            process.exit();
        }
    })
};

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
                createDept();
                return;
            } else if (createMenuData.createMenu === "New role"){
                createRole();
                return;
            } else if (createMenuData.createMenu === "New employee"){
                createEmployee();
                return;
            };   
        })
        return;
    } else if (menuData.mainMenu === "Update a record"){
        updateMenu()
        .then(updateMenuData => {
            if (updateMenuData.updateMenu === "Department"){
                updateDept();
                return;
            } else if (updateMenuData.updateMenu === "Role"){
                updateRole();
                return;
            } else if (updateMenuData.updateMenu === "Employee"){
                updateEmployee();
                return;
            };   
        })
        return;
    } else if (menuData.mainMenu === "View a record"){
        viewMenu()
        .then(viewMenuData => {
            if (viewMenuData.viewMenu === "Departments"){
                viewDept();
                return;
            } else if (viewMenuData.viewMenu === "Roles"){
                viewRole();
                return;
            } else if (viewMenuData.viewMenu === "Employees"){
                viewEmployee();
                return;
            };   
        })
        return;
    } else if (menuData.mainMenu === "Delete a record") {
        deleteMenu()
        .then(deleteMenuData => {
            if (deleteMenuData.deleteMenu === "Department"){
                deleteDept();
                return;
            } else if (deleteMenuData.deleteMenu === "Role"){
                deleteRole();
                return;
            } else if (deleteMenuData.deleteMenu === "Employee"){
                deleteEmployee();
                return;
            }
        })
        return;
    } else if (menuData.mainMenu === "Exit"){
        console.log(`
        ===========================
        THANK YOU. HAVE A NICE DAY!
        ===========================
        `);
        process.exit();
    }
});
returnMenu();