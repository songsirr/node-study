"use strict";

const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "node",
  port : process.env.DB_PORT || "3306",
  multipleStatements: true
});

db.connect();

module.exports = db;