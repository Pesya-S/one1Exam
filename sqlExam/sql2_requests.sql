create database db2;
use db2;

CREATE TABLE client (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
name varchar(30) default '',
genter VARCHAR(10) DEFAULT '',
date_of_birth datetime default current_timestamp
);

CREATE TABLE request (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
name varchar(30) default '',
status varchar(1) default 'x',
clientId int, CONSTRAINT fk_cr FOREIGN KEY (clientId) REFERENCES client(id)
);

CREATE TABLE sample (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
name varchar(30) default '',
status varchar(1) default 'x',
requestId int, CONSTRAINT fk_rs FOREIGN KEY (requestId) REFERENCES request(id)
);

CREATE TABLE test (
id int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
name varchar(30) default '',
status varchar(1) default 'x',
sampleId int, CONSTRAINT fk_st FOREIGN KEY (sampleId) REFERENCES sample(id)
);
 -- 8
select distinct(r.name) from request r
join sample s on s.requestId=r.id
join test t on t.sampleId=s.id
where t.status='x';

-- 9
select distinct(r.name) from request r
where (select count(r2.id) from request r2 where r2.clientId=r.clientId)>1 
and (select count(r2.id) from request r2 where r2.clientId=r.clientId and r2.status='v')>=1;
