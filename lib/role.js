
function titleSearch() {
    var query = "SELECT * FROM employeedatabase_db WHERE ?";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].title,res[i].titleSearch );
      }
      runSearch();
    });
  }
  
  function addTitleSearch() {
    inquirer.prompt([{
      
      name: "Employee Title",
      type: "input",
      message: "What Employee Title would You like to Add ?",
      choices: [() => {
        const departmentArr = [];
        for (var i = 0; i < department.length; i++) {
            departmentArr.push(department[i].name);
        }
        return [...departmentArr]
    }
      ]},
    {
      name: "Employee Salary",
      type: "input",
      message: "What is the Annual Salary for this Title that You are Adding?"
      
  },