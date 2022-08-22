create database db1;
use db1;

CREATE TABLE product (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
name varchar(30) default '',
price float   default 0
);


CREATE TABLE customer (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
firstName varchar(30) default '',
lastName VARCHAR(100) DEFAULT '',
address varchar(30) default '',
birthdate datetime default current_timestamp
);

CREATE TABLE employee (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
firstName varchar(30) default '',
lastName VARCHAR(100) DEFAULT '',
managerId int, CONSTRAINT fk_ee FOREIGN KEY (managerId) REFERENCES employee(id)
);

CREATE TABLE orders (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
customerId int, CONSTRAINT fk_co FOREIGN KEY (customerId) REFERENCES customer(id),
orderDate datetime default current_timestamp,
employeeId int, CONSTRAINT fk_eo FOREIGN KEY (employeeId) REFERENCES employee(id)
);

CREATE TABLE orderItem (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
productId int, CONSTRAINT fk_pi FOREIGN KEY (productId) REFERENCES product(id),
orderId int, CONSTRAINT fk_oi FOREIGN KEY (orderId) REFERENCES orders(id),
shipDate datetime default current_timestamp,
quantity float   default 0
);


-- ---------------------------------
-- 1
select * from product limit 10;		
	
-- 2
select * from product where price=(select max(price) from product);		
	
-- 3
select * from customer where firstName like 'D%';			

-- 4
select count(o.id) as 'number of orders', e.id,e.firstName,e.lastName from employee e
left join orders o on o.employeeId=e.id
group by e.id,e.firstName,e.lastName;

-- 5
select c.id,c.firstName,c.lastName,c.address,c.birthdate from customer c
where (select count(o.id) from orders o where o.customerId=c.id)=0;

-- 6
select e.id,e.firstName,e.lastName,concat( manager.firstName,' ',manager.lastName) as managerName from employee e
left join employee manager on manager.id=e.managerId;

-- 7
select count(customerId) from ( select distinct( o.customerId)  from orders o
join orderItem oi on o.id=oi.orderId
join product p on p.id=oi.productId
where p.name='DVD')f;

