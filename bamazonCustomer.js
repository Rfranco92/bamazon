var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "a",
  database: "bamazon_db"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

  connection.query("SELECT * FROM catalog", function(err, res) {
    if (err) throw err;
    console.log(res);
   }); 

   start();
 
});

function start(){
	inquirer.prompt([
	  {
        name: "id",
        type: "input",
        message: "What is the id of the item you would like to buy?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units do you want to buy of that product?"
      }
	]).then(function(response){
	connection.query("SELECT * FROM catalog WHERE ?",
	{
		item_id : response.id
	}, 
	function(err, res) {
    	if (err) throw err;
    	console.log(res[0].stock_quantity);
    	console.log(response.units);
    	var stockRemoval = parseInt(res[0].stock_quantity) - parseInt(response.units);
		var total = response.units*res[0].price;
    	console.log(stockRemoval);
    	if(res[0].stock_quantity >= response.units){  
    		connection.query(
            "UPDATE catalog SET ? WHERE ?",
            [
              {
               stock_quantity : stockRemoval 
              },
              {
                item_id: response.id
              }
            ],
    		function(error) {
              if (error) throw error;
    		console.log("You have made a purchase!");
    		console.log("Your total amount due is $" + total);
    		})
    	}
    	else{
    	console.log("There is insufficient stock. Sorry!")
    	}
    	 connection.end();
   		}); 	
	});


}