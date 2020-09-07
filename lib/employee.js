
function employeeSearch() {
    inquirer.prompt({
      name: "action",
      type: "list",
      message: "Here are the Employees Roster in the Database?",
    })
  
    var query = "SELECT position, View, Title FROM employeedatabase_db WHERE ?";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].employee);
      }
      runSearch();
    });
  },
  
  
  
  function addEmployeeSearch() {
    inquirer.prompt([{
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
      choices: () => {
        const departmentArr = [];
        for (var i = 0; i < department.length; i++) {
            departmentArr.push(department[i].name);
        }
        return [...departmentArr]
    }
    },
    {
      name: "Employee Salary",
      type: "input",
      message: "What is the annual salary for the role that you would like to add?"
      
  },
  {
  var query = "SELECT * FROM employeedatabase_db WHERE ?";
  connection.query("INSERT INTO role SET ?",
    {
      first name: answers.firstname,
      last name: answers.lastname,
      title: answers.title,
      salary: answers.salary,
      department_id: departmentID
  
  }
  )},
  {
    function(err, res) {
        if (err) throw err;
        console.log("Set has been inserted!");
    },
    {
      var query = "SELECT * FROM employeedatabase_db WHERE ?";
      connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].addTitleSearch,res[i].salary );
    }
        runSearch();
      });
    