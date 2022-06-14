"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const category = require("./src/routes/category.router");
app.use("/category", category);

const template = require("./src/routes/template.router");
app.use("/template", template);

module.exports = app;

