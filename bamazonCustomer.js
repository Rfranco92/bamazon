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
    for (var i = 0; i < res.length; i++){
    	console.log("ID: " + res[i].item_id);
    	console.log("Product Name: " + res[i].product_name);
    	console.log("Department Name: " + res[i].department_name);
    	console.log("Price: $" + res[i].price);
    	console.log("Stock left: " + res[i].stock_quantity);
    	console.log("-----------------")
    }
   start();
   }); 

 
});


//function which starts the program, begins with inquirer.
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
		//selects the item which has the id inputed
	connection.query("SELECT * FROM catalog WHERE ?",
	{
		item_id : response.id
	}, 
	function(err, res) {
    	if (err) throw err;
   		//gets the stock and then subtracts it from the amount 	
    	console.log(res[0].stock_quantity);
    	console.log(response.units);
    	var stockRemoval = parseInt(res[0].stock_quantity) - parseInt(response.units);
		var total = response.units*res[0].price;
    	console.log(stockRemoval);
    	//if the quantity is greater or equal to the demanded input, it changes the stock to the removed total.
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
            //total
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