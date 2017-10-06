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

connection.connect(function(err) {
  if (err) throw err;
inquirer.prompt([
	{
		message: "What would you like to do?",
		name: "choice",
		type: "list",
		choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
	])
	.then(function(response){
		if (response.choice === "View Products"){
			viewProducts();
		}
		else if (response.choice === "View Low Inventory"){
			viewLowInventory();
		}
		else if (response.choice === "Add to Inventory"){
			addInventory();
		}
		else {
			addProduct();
		}
	});
});

function viewProducts(){
	connection.query("SELECT * FROM catalog", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
   }); 
}

function viewLowInventory(){
	connection.query("SELECT * FROM catalog WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
   }); 
}

function addInventory(){
	inquirer.prompt([
	 {
        name: "id",
        type: "input",
        message: "What is the id of the item you would like to add to?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units do you want to add of that product?"
      }
		])
	.then(function(response){
	connection.query("SELECT * FROM catalog WHERE ?",
	{
		item_id : response.id
	}, 
	function(err, res) {
	if (err) throw err;
	var newtotal = parseInt(res[0].stock_quantity) + parseInt(response.units);
	console.log(newtotal)
	connection.query("UPDATE catalog SET ? WHERE ?",
            [
              {
               stock_quantity : newtotal
              },
              {
                item_id: response.id
              }
            ],  
	function(err, res) {
    	if (err) throw err;
    	console.log("Update Made!")
    	connection.end();
    	});
    	});
	});
}

function addProduct(){
	inquirer.prompt([
	 {
        name: "id",
        type: "input",
        message: "What is the id of the item you would like to add to?"
      },
      {
      	name: "name",
      	type: "input",
      	message: "What is the name of the item you would like to add?"
      },
      {
      	name: "department",
      	type: "input",
      	message: "Where is the department of the item you are adding?"
      },
      {
      	name: "price",
      	type: "input",
      	message: "What is the price of the item?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units do you want to add of that product?"
      }
		])
	.then(function(response){
		connection.query(
        "INSERT INTO catalog SET ?",
        {
          item_id: response.id,
          product_name: response.name,
          department_name: response.department,
          price: response.price,
          stock_quantity: response.units
        },
        function(err) {
          if (err) throw err;
          console.log("Your Product was added to the inventory!");
	       connection.end();
        });
	});
}