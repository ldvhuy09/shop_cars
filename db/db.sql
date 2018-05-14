create database if not exists CAR_SHOP;
use CAR_SHOP;


drop table if exists _USER;
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

drop table if exists _TYPE_CAR;
create table _TYPE_CAR (
	_type char(20),
    primary key (_type)
);

drop table if exists _BRAND_CAR;
create table _BRAND_CAR (
	_brand char(20),
    primary key (_brand)
);

drop table if exists _PRODUCT;
create table _PRODUCT (
	_productID smallint(5) not null auto_increment,
	_name varchar(30) not null,
	_type char(20),
	_brand char(20),
	_origin char(10),
	_viewed int,
	_price decimal(11, 0),
    _link varchar(100),

	primary key (_productID),
    foreign key (_brand) references _BRAND_CAR(_brand),
    foreign key (_type) references _TYPE_CAR(_type)
);

drop table if exists _SHIPPING_TYPE;
create table _SHIPPING_TYPE (
  _type smallint(5) not null,
  _price decimal(11, 0),
  _daysForDelivery smallint(5),

  primary key (_type)
);

drop table if exists _ORDER;
create table _ORDER (
  _orderID smallint(5) not null auto_increment,
  _userID varchar(30) not null, 
  _state integer,
  _receiverName nvarchar(40),
  _address nvarchar(50),
  _email varchar(30),
  _phone varchar(11),
  _typeOfShipping smallint(5),
  _typeOfPaying smallint(5),
  _notes nvarchar(50),

  primary key (_orderID),
  foreign key (_userID) references _USER(_userID),
  foreign key (_typeOfShipping) references _SHIPPING_TYPE(_type)
);

drop table if exists _ORDER_DETAIL;
create table _ORDER_DETAIL (
  _orderID smallint(5),
  _productID smallint(5),
  _quantity smallint(5),
  _price decimal(11, 0),
  primary key (_orderID, _productID),
  foreign key (_orderID) references _ORDER(_orderID),
  foreign key (_productID) references _PRODUCT(_productID)
);

drop table if exists _SHOP_CART;
create table _SHOP_CART (
  _shopcartID int not null auto_increment,
  _userID varchar(30),

  primary key (_shopcartID),
  foreign key (_userID) references _USER(_userID)
);

drop table if exists _SHOP_CART_DETAIL;
create table _SHOP_CART_DETAIL (
  _shopcartID int not null,
  _productID smallint(5),
  _quantity smallint(5),

  primary key (_shopcartID, _productID),
  foreign key (_shopcartID) references _SHOP_CART(_shopcartID),
  foreign key (_productID) references _PRODUCT(_productID)
);

drop table if exists _PURCHASE_HISTORY;
create table _PURCHASE_HISTORY (
  _userID varchar(30),
  _orderID smallint(5),
  _dateOfPurchase date,

  primary key (_userID, _orderID),
  foreign key (_userID) references _USER(_userID),
  foreign key (_orderID) references _ORDER(_orderID)
);

