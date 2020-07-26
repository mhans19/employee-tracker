# <div align="center">**EMPLOYEE TRACKER**</div>

## **TABLE OF CONTENTS**    
[1. TABLE OF CONTENTS](#TABLE-OF-CONTENTS)  
[2. LICENSE](#LICENSE)  
[3. PROJECT DESCRIPTION](#PROJECT-DESCRIPTION)  
[4. APPLICATION LINKS](#APPLICATION-LINKS)  
[5. CONTRIBUTIONS](#CONTRIBUTIONS)  
[6. DEVELOPMENT](#DEVELOPMENT)  
[7. INSTALLATION](#INSTALLATION)   
[8. USAGE](#USAGE)   
[9. TESTING](#TESTING)  
[10. USER STORY](#USER-STORY)  
[11. ACCEPTANCE CRITERIA](#ACCEPTANCE-CRITERIA)   
[12. GRADING REQUIREMENTS](#GRADING-REQUIREMENTS)    
[13. FUNCTIONALITY](#FUNCTIONALITY)  

---

## **LICENSE**  
![MIT](https://img.shields.io/badge/License-MIT-blue.svg)
> This application is covered under the [MIT License](https://opensource.org/licenses/MIT)    

---

## **PROJECT DESCRIPTION**
> The purpose of this challenge was to build a [content management system (CMS)](https://en.wikipedia.org/wiki/Content_management_system) that makes viewing and interacting with database information easy for non-developers.  
  
> The challenge was to build a command-line application using [Node.js](https://nodejs.org/en/), [NPM Inquirer](https://www.npmjs.com/package/inquirer), and [MySQL](https://www.mysql.com/).  

---

## **APPLICATION LINKS**
> Live Application (Not relevant for this project)  
> [GitHub Repository](https://github.com/mhans19/employee-tracker)  
> [Video Demonstration](https://youtu.be/3EbHnpkqybE)  

---

## **CONTRIBUTIONS**   
Please contact **MORGAN HANSEN** for all application inqueries.
| Email | GitHub | LinkedIn |  
| :------: | :------: |  :------: |  
| <mdhansen19@gmail.com> | [GitHub](https://github.com/mhans19?tab=repositories) |  [LinkedIn](https://www.linkedin.com/in/morgan-hansen-47235872/?challengeId=AQF6MR471a-pZgAAAXMTL5e4xLqg_LNW5yawcXgk_uUmLrzsXk5ehOnzlQuK2dOVeX4ARtJwxmcHQrQhtgL_jM96wbBzhLvmAA&submisksionId=813167e8-8027-1e16-5911-1c143c23561f) |  
  
---

## **DEVELOPMENT**  
This application was developed with the following application structures:  
1. [Node.js](https://nodejs.org/en/)  
2. [Node Package Manager (NPM)](https://www.npmjs.com/)
    + [NPM Inquirer](https://www.npmjs.com/package/inquirer)    
    + [NPM Express](https://www.npmjs.com/package/express)
    + [NPM console.table](https://www.npmjs.com/package/console.table)  
    + [MySQL2](https://www.npmjs.com/package/mysql2)  
3. [JavaScript (js)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)    

---

## **INSTALLATION**
> Prior to using the application, a user *must* complete the following:  
> 1. Download the [GitHub repository](https://github.com/mhans19/employee-tracker) to a local repository. 
> 2. [Install dependencies](#DEVELOPMENT) such as Node.js and NPM packages.  
> 3. Ensure installation of a Command Line Interface (CLI) utility such as *Git Bash* or *Terminal*.

---

## **USAGE**
> The application must be operated with a Command Line Interface (CLI) software. Using the command line, navigate to the local repository containing the *server.js* file. Then, call upon node followed by the file name - *node server.js*.   
[Walkthrough Demonstration](https://youtu.be/3EbHnpkqybE)  

---

## **TESTING**
> During development efforts, the MySQL command-line was used to test CRUD contributions.    

---

## **USER STORY**  
> AS A business owner  
> I WANT to be able to view and manage the departments, roles, and employees in my company  
> SO THAT I can organize and plan my business  

---

## **ACCEPTANCE CRITERIA**
> GIVEN a command-line application that accepts user input  
> WHEN I start the application  
> THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role  
> WHEN I choose to view all departments  
> THEN I am presented with a formatted table showing department names and department ids  
> WHEN I choose to view all roles  
> THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role  
> WHEN I choose to view all employees  
> THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to  
> WHEN I choose to add a department  
> THEN I am prompted to enter the name of the department and that department is added to the database  
> WHEN I choose to add a role  
> THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database  
> WHEN I choose to add an employee  
> THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database  
> WHEN I choose to update an employee role  
> THEN I am prompted to select an employee to update and their new role and this information is updated in the database   
  

### **<div align="center">BONUS</div>**
>
>  See if you can add some additional functionality to your application, such as the ability to:  
> 1. Update employee managers.  
> 2. View employees by manager.  
> 3. View employees by department.  
> 4. Delete departments, roles, and employees.  
> 5. View the total utilized budget of a department—i.e., the combined salaries of all employees in that department.  

---

## **GRADING REQUIREMENTS**
#### <div align="center">This Challenge is graded based on the following criteria:</div>
### **<div align="center">Deliverables: 10%</div>**
- [x] Your GitHub repository containing your application code.

### **<div align="center">Walkthrough Video: 27%</div>**
- [x] A walkthrough video that demonstrates the functionality of the Employee Tracker must be submitted, and a link to the video should be included in your README file.
- [x] The walkthrough video must show all of the technical acceptance criteria being met.
- [x] The walkthrough video must demonstrate how a user would invoke the application from the command line.
- [x] The walkthrough video must demonstrate a functional menu with the options outlined in the acceptance criteria.

### **<div align="center">Technical Acceptance Criteria: 40%</div>**
#### **Satisfies all of the preceding acceptance criteria plus the following:**
- [x] Uses the [Inquirer package](https://www.npmjs.com/package/inquirer)
- [x] Uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to a MySQL database.
- [x] Uses the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.
- [x] Follows the table schema outlined in the Challenge instructions.

### **<div align="center">Repository Quality: 13%</div>**
- [x] Repository has a unique name.
- [x] Repository follows best practices for file structure and naming conventions.
- [x] Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.
- [x] Repository contains multiple descriptive commit messages.
- [x] Repository contains a high-quality README with description and a link to a walkthrough video.

### **<div align="center">Application Quality: 10%</div>**
- [x] The application user experience is intuitive and easy to navigate.

---

## **FUNCTIONALITY**  
1. From the command line interface (CLI), navigate to the local repository containing the *server.js* file.   
![](/assets/images/localRepo.PNG)  
2. Once in the local repository, type *node server.js* into the command line. Then press 'Enter'.    
![](/assets/images/startApp.PNG)  
3. The content management system (CMS) will open and options will appear for Creating, Updating, Viewing, and Deleting records.  
![](/assets/images/mainMenu.PNG)   
4. Use the arrow keys on the keyboard to navigate through the system. Select options by pressing the 'Enter' button on the keyboard.   
![](/assets/images/navMenu.PNG)  
5. Find and click the 'Exit' option to close the application.  
![](/assets/images/exitApp.PNG)  

