CREATE SCHEMA node;

use node;

CREATE TABLE category ( 
  id varchar(22),
  name varchar(255) not null,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime ON UPDATE CURRENT_TIMESTAMP,
  deleted_at datetime,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE template ( 
  id varchar(22),
  name varchar(255) not null,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime ON UPDATE CURRENT_TIMESTAMP,
  deleted_at datetime,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE category_template ( 
  id bigint(20) unsigned AUTO_INCREMENT,
  category_id varchar(22) not null,
  template_id varchar(22) not null,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime ON UPDATE CURRENT_TIMESTAMP,
  deleted_at datetime,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES `category`(id),
  FOREIGN KEY (template_id) REFERENCES `template`(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;