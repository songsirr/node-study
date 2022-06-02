"use strict"

const index = (req, res) => {
    res.render("index");
};

const login = (req, res) => {
    res.render("home/index");
};

module.exports = {
    index,
    login
};