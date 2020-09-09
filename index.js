var mysql = require("mysql");
var inquirer = require("inquirer");


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


connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
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

function addDepartmentSearch() {
  inquirer.prompt({
      name: "Add Department",
      type: "input",
      message: "What department would you like to add?",
    })
    .then(function(answer) {
      var query = "INSERT INTO departments SET ?";
      connection.query(query, { name: answer["Add Department"] }, function(err, res) {
        if (err) throw err;
          console.log("Successfully Added");
        runSearch();
      });
    });
}


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
      name: "Employee Title",
      type: "input",
      message: "What Employee Title would You like to Add ?",
      
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
            console.log("Successfully Added");
          runSearch();
        });
      });
    });
    

 
}

function employeeSearch() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log("Employees: " + res[i].first_name, res[i].last_name,res[i].title_id, res[i].manager_id);
      }
      runSearch();
    });
  }


function addEmployeeSearch() {
    var query = "SELECT * FROM employees";
    var departments = []
    var addEmployee = []
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        addEmployee.push({name:res[i].first_name,name:res[i].last_name, role:res[i].title_id, value:res[i].id}), departments.push({name:res[i].name, value:res[i].id});

      }
  inquirer.prompt([
{
    name: "Add Employee First Name",
    type: "input",
    message: "What is the First Name of the Employee?",
},
{
    name: "Add Employee Last Name",
    type: "input",
    message: "What is the Last Name of the Employee?",

},
{
    name: "Employee Title",
    type: "list",
    message: "What is the Title of the Employee?",
    choices: departments
},
{
    name: "Manager ID",
    type: "list",
    message: "What is the ID for this Employee that You are Adding?",
    choices: departments
},
])
    .then(function(answer) {
    var query = "INSERT INTO role set ?";
    console.log("Successfully Added!");
    // console.log("Employees: " + res[i].first_name, res[i].last_name,res[i].title_id, res[i].manager_id);
    // connection.query("INSERT INTO role SET ?",
    // connection.query(query,function(err, res) {
    //     if (err) throw err; 
    //     console.log({first_name: answer["Add Employee First Name"], last_name: answer["Add Employee Last Name"], title_id:answer["Employee Title"], department_id: answer["Manager ID"]}, );
    runSearch();
    // });
    
});
});
}


function updateEmployeeSearch() {
  var query = "SELECT * FROM employees";
  var employees = []
  var role = []
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      employees.push({name:res[i].first_name,name:res[i].last_name}); 
      role.push ({name: res[i].title, name:res[i].department_id}); 
      console.log(res)
      // role.push({name:res[i].name, value:res[i].id});
    }

inquirer.prompt([
 
{
  name: "Which Employee",
  type: "list",
  message: "Which Employee would You Like to Update?",
  choices: employees
},
{
  name: "Update Employee Title",
  type: "List",
  message: "Change Title would You Like to Change this Employee To?",
  choices: role
},

])
  .then(function(answer) {
  var query = "INSERT INTO role set ?";
  console.log(res);
  // console.log("Employees: " + res[i].id, res[i].first_name, res[i].last_name,res[i].title_id, res[i].manager_id);
  // connection.query("INSERT INTO role SET ?",
  // connection.query(query,function(err, res) {
  //     if (err) throw err; 
  //     console.log({first_name: answer["Add Employee First Name"], last_name: answer["Add Employee Last Name"], title_id:answer["Employee Title"], department_id: answer["Manager ID"]}, );
  runSearch();
  // });
  
});
});
}

//   function(err, res) {
//     if (err) throw err;
//     console.log("Set has been inserted!");
// },
// {
//   var query = "SELECT * FROM employeedatabase_db WHERE ?";
//   connection.query(query, function(err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].addTitleSearch,res[i].salary );
// }
//     runSearch();
//   });

