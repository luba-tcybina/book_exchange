CREATE DATABASE 'tome_raider';
USE 'tome_raider';

CREATE TABLE 'books' (
  'idbooks' int(11) NOT NULL AUTO_INCREMENT,
  'isbn' bigint(14) NOT NULL,
  'title' varchar(255) DEFAULT NULL,
  'author' varchar(100) DEFAULT NULL,
  'genre' varchar(45) DEFAULT NULL,
  'description' longtext,
  'imageurl' longtext,
  PRIMARY KEY ('isbn'),
  UNIQUE KEY 'isbn_UNIQUE' ('isbn'),
  UNIQUE KEY 'idbooks_UNIQUE' ('idbooks')
) ;

CREATE TABLE 'collections' (
  'collection_id' int(11) NOT NULL AUTO_INCREMENT,
  'raider_id' int(11) DEFAULT NULL,
  'tome_id' bigint(14) DEFAULT NULL,
  'for_sale' tinyint(1) DEFAULT NULL,
  'to_trade' tinyint(1) DEFAULT NULL,
  'condition' varchar(45) DEFAULT NULL,
  PRIMARY KEY ('collection_id'),
  UNIQUE KEY 'collection_id_UNIQUE' ('collection_id'),
  KEY 'raider_id_idx' ('raider_id'),
  KEY 'tome_id_idx' ('tome_id'),
  CONSTRAINT 'raider_id' FOREIGN KEY ('raider_id') REFERENCES 'raiders' ('id') ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT 'tome_id' FOREIGN KEY ('tome_id') REFERENCES 'books' ('isbn') ON DELETE NO ACTION ON UPDATE NO ACTION
); 

CREATE TABLE 'raiders' (
  'id' int(11) NOT NULL AUTO_INCREMENT,
  'username' varchar(45) NOT NULL,
  'email' varchar(45) DEFAULT NULL,
  PRIMARY KEY ('id'),
  UNIQUE KEY 'id_UNIQUE' ('id'),
  UNIQUE KEY 'username_UNIQUE' ('username'),
  UNIQUE KEY 'email_UNIQUE' ('email')
);
