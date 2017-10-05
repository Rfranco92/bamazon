DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE catalog(
 	item_id VARCHAR (100) NOT NULL,
	product_name VARCHAR (100) NOT NULL,
	department_name VARCHAR (100) NOT NULL,
	price decimal (10, 2) default 0.00,
	stock_quantity int (10) default 0
);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("it-eb", "Stephen King's It", "E-Books", 11.99, 10000);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("sc-eb", "Snow Crash", "E-Books", 9.99, 5000);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("wf-el", "wafflemaker", "electronics", 9.99, 20);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("tdk-m", "The Dark Knight", "movies", 9.99, 50);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("tpb-m", "The Princess Bride", "movies", 5.99, 5000);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("bscpt-f", "Brown Sugar Cinammon Pop-Tarts", "food", 1.99, 1);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("sw-j", "Seiko Watch", "Jewelry", 299.99, 5);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("m-e", "Mindle", "Electronic", 99.99, 20);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("rr-ic", "Rocky Road", "Ice Cream", 3.99, 0);

INSERT INTO catalog (item_id, product_name, department_name, price, stock_quantity)
VALUES ("SUPER SPECIAL ITEM", "A Hawaiian Island", "Island", 323256.24, 1);
