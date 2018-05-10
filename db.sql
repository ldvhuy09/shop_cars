create database CAR_SHOP;
use CAR_SHOP;


create table _USER (
	_userID varchar(30) not null,
  _password varchar(30) not null,
  _fullname nvarchar(40),
  _gender nvarchar(5),
  _birthOfDay date,
  _address nvarchar(50),
  _email varchar(30),
  _phone char(11),
  
  primary key (_userID)
);

create table _PRODUCT (
	_productID smallint(5) not null auto_increment,
  _name varchar(30) not null,
  _type char(10),
  _brand char(20),
  _origin char(10),
  _viewed integer,
  _price money,

  primary key (_productID)
);

create table _ORDER (
  _orderID char(10) not null,
  _userID varchar(30) not null, 
  _state integer,
  _receiverName nvarchar(40),
  _address nvarchar(50),
  _email varchar(30),
  _phone varchar(11),
  _typeOfShipping integer,
  _typeOfPaying integer,
  _notes nvarchar(50)

  primary key (_orderID),

)

