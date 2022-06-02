"use strict"

const index = (req, res) => {
    res.render("index");
};

const login = (req, res) => {
    res.render("home/login");
};

module.exports = {
    index,
    login
};