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
        addEmployeeSearch();
        break;

      case "Exit":
        console.log("Complete. Thank You.")
        connection.end();
        break;
      }
    });
}

function departmentSearch() {
  inquirer.prompt({
      name: "View Department",
      type: "list",
      message: "What department would you like to view?",
      choices: [
        "Program Management",
        "Accounting",
        "Product Control",
        "Human Resources",
        "Shipping",
        "Exit"
      ]
    })
    .then(function(answer) {
      var query = "SELECT * FROM employeedatabase_db";
      connection.query(query, { Departments: answer.departments }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Departments: " + res[i].position);
        }
        runSearch();
      });
    });
}

function addDepartmentSearch() {
  inquirer.prompt({
      name: "Add Department",
      type: "input",
      message: "What department would you like to add?",
    })
    .then(function(answer) {
      var query = "INSERT INTO department SET ?";
      connection.query(query, { Departments: answer.departments }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Departments: " + res[i].addDepartmentSearch);
        }
        runSearch();
      });
    });
}


// function titleSearch() {
//   var query = "SELECT * FROM employeedatabase_db WHERE ?";
//   connection.query(query, function(err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].title,res[i].titleSearch );
//     }
//     runSearch();
//   });
// }

// function addTitleSearch() {
//   inquirer.prompt([{
    
//     name: "Employee Title",
//     type: "input",
//     message: "What Employee Title would You like to Add ?",
//     choices: [() => {
//       const departmentArr = [];
//       for (var i = 0; i < department.length; i++) {
//           departmentArr.push(department[i].name);
//       }
//       return [...departmentArr]
//   }
//     ]},
//   {
//     name: "Employee Salary",
//     type: "input",
//     message: "What is the Annual Salary for this Title that You are Adding?"
    
// },


// function employeeSearch() {
//   inquirer.prompt({
//     name: "action",
//     type: "list",
//     message: "Here are the Employees Roster in the Database?",
//   })

//   var query = "SELECT position, View, Title FROM employeedatabase_db WHERE ?";
//   connection.query(query, function(err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].employee);
//     }
//     runSearch();
//   });
// },



// function addEmployeeSearch() {
//   inquirer.prompt([{
//     name: "Add Employee First Name",
//     type: "input",
//     message: "What is the First Name of the Employee?",
//   },
//   {
//     name: "Add Employee Last Name",
//     type: "input",
//     message: "What is the Last Name of the Employee?",

//   },
//   {
//     name: "Employee Title",
//     type: "list",
//     message: "What is the Title of the Employee?",
//     choices: () => {
//       const departmentArr = [];
//       for (var i = 0; i < department.length; i++) {
//           departmentArr.push(department[i].name);
//       }
//       return [...departmentArr]
//   }
//   },
//   {
//     name: "Employee Salary",
//     type: "input",
//     message: "What is the annual salary for the role that you would like to add?"
    
// },
// {
// var query = "SELECT * FROM employeedatabase_db WHERE ?";
// connection.query("INSERT INTO role SET ?",
//   {
//     first name: answers.firstname,
//     last name: answers.lastname,
//     title: answers.title,
//     salary: answers.salary,
//     department_id: departmentID

// }
// )},
// {
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



function exit() {
  inquirer.prompt([
      {
      name: "Exit",
      type: "input",
      message: "Enter ending position: ",
      validate: function(value) {
        if (isNaN(value) === false) 
        {
        return true;
        }
        return false;
        }
      }
  ])
    .then(function(answer) {
      var query = "SELECT position,FROM employeedatabase_db WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.runSearch, answer.exit], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) 
        runSearch();
      });
    })
  })
})
}
