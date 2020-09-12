// Mysql and Inquirer Variables
var mysql = require("mysql");
var inquirer = require("inquirer");

// Mysql Connection to Port
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "mysql123!@)(",
  database: "employeedatabase_db"
});

// Mysql Connection to Inquirer
connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

// Start Search Function
function runSearch() {
  inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        "View Departments", 
        "Add Departments",
        "View Titles",
        "Add Titles",
        "View Employees",
        "Add Employees",
        "Update Employee Titles",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Departments":
        departmentSearch();
        break;
      
      case "Add Departments":
        addDepartmentSearch();
        break;

      case "View Titles":
        titleSearch();
        break;
      
      case "Add Titles":
        addTitleSearch();
        break;


      case "View Employees":
        employeeSearch();
        break;

      case "Add Employees":
        addEmployeeSearch();
        break;
        
      case "Update Employee Titles":
        updateEmployeeSearch();
        break;

      case "Exit":
        console.log("Complete. Thank You.")
        connection.end();
        break;
      }
    });
}

// View Department Function
function departmentSearch() {

      var query = "SELECT * FROM departments";
      connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Departments: " + res[i].name);
        }
        runSearch();
      });
   
}

// Add Department Function
function addDepartmentSearch() {
  inquirer.prompt({
      name: 'Add Department',
      type: 'input',
      message: 'What Department would you like to add?',
    })
    .then(function(answer) {
      var query = "INSERT INTO departments SET ?";
      connection.query(query,  {name: answer["Add Department"] }, function(err, res) {
        if (err) throw err;
          console.log("Successfully Added");
        runSearch();
      });
    });
}

// View/Role Title Function
function titleSearch() {
  var query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].title);
    }

    runSearch();
  });
}

// Add Title/Role Title Function
function addTitleSearch() {
    var query = "SELECT * FROM departments";
    var departments = []
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      departments.push({name:res[i].name, value:res[i].id});
}

    inquirer.prompt([
    {  
      name: 'Employee Title',
      type: 'input',
      message: 'What Employee Title would You like to Add ?',
      
    },
    {
      name: "Employee Salary",
      type: "input",
      message: "What is the Annual Salary for this Title that You are Adding?"
      
  },
  {
      name: "Employee ID",
      type: "list",
      message: "What is the ID for this Title that You are Adding?",
      choices: departments
  }, 
    ])
    .then(function(answer) {
      var query = "INSERT INTO role SET ?";
      connection.query(query, { title: answer["Employee Title"], department_id:answer["Employee ID"], salary:answer["Employee Salary"] }, function(err, res) {
      if (err) throw err;
      console.log("Title has Been Added");
        
        runSearch();
        });
      });
    });
    
}

// View Employee Function
function employeeSearch() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      console.log("Employee: " + res[i].first_name, res[i].last_name,res[i].title_id, res[i].manager_id);
      }
      runSearch();
    });
}

// Add Employee Function
function addEmployeeSearch() {
    var query = "SELECT * FROM employees";
    var query = "SELECT * FROM departments";
    var departments = []
    connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
    departments.push({name:res[i].first_name, name:res[i].last_name, value:res[i].id, name:res[i].name});
}
var rolesA = []
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
    rolesA.push({name:res[i].title, value: res[i].id});
    }

// Question Prompts to Add Employees
  inquirer.prompt([
{
    name: 'Add Employee First Name',
    type: 'input',
    message: 'What is the First Name of the Employee?',
},
{
    name: 'Add Employee Last Name',
    type: 'input',
    message: 'What is the Last Name of the Employee?',

},
{
    name: 'Employee Title',
    type: 'list',
    message: "What is the Title of the Employee?",
    choices: rolesA
},
{
    name: 'Manager ID',
    type: 'list',
    message: 'What is the ID for this Employee that You are Adding?',
    choices: departments
},
])
    .then(function(one) {
      var query = "INSERT INTO employees SET ?";
      connection.query(query, { first_name: one["Add Employee First Name"], last_name:one["Add Employee Last Name"], title_id:one["Employee Title"] }, function(err, res) {
      if (err) throw err;
      console.log("Title has Been Added");
        
        runSearch();
        });
//     var query = "INSERT INTO employees SET first_name, last_name, title_id = ? WHERE id = ?";
//     connection.query(query, function(err, res) {
//     if (err) throw err;
//     console.log("Successfully Added");
   
//     runSearch();
// });
});   
});
});
}

// Update Employee Function
function updateEmployeeSearch() {
    var query = "SELECT e.first_name, e.last_name, r.title, e.manager_id, e.id FROM employeedatabase_db.employees AS e LEFT JOIN `role` as r on e.title_id= r.id";
    var employees = []
    
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res)
    for (var i = 0; i < res.length; i++) {
    employees.push({name:res[i].first_name + " " + res[i].last_name, value:res[i].id}) 

}

    var departmentsA = []
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
    departmentsA.push({name:res[i].title, value: res[i].id});
    }

});



// Questions Prompt for Update Employee     
inquirer.prompt([
 
{
    name: 'Which Employee',
    type: 'list',
    message: 'Which Employee would You Like to Update?',
    choices: employees
},
{
    name: 'Update Employee Title',
    type: 'list',
    message: 'Which Title would You Like to Change this Employee To?',
    choices: departmentsA
},
])
    .then(function(res) {
    console.log(res)
    var query = "UPDATE employees set title_id = ? WHERE id = ?";
    connection.query(query, [res["Update Employee Title"],res["Which Employee"]], function(err, res) {
    if (err) throw res;
    console.log("Employee Title has been Changed!")
      
    runSearch();
});
});
});

}

