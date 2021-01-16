const express = require("express");
const path = require("path");

const app = express();

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/index.html"))
    });

    app.get("/about", function(req,res) {
        res.sendFile(path.join(__dirname + "/../public/about-us.html"))
    })

    app.get("/contact", function(req,res) {
        res.sendFile(path.join(__dirname + "/../public/contact.html"))
    })

    app.get("*", function(req,res) {
        res.sendFile(path.join(__dirname + "/../public/index.html"))
    });
}