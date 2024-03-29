const express = require("express");
const path = require("path");
const { resourceUsage } = require("process");

const app = express();

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/index.html"))
    });

    app.get("/about", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/about-us.html"))
    })

    app.get("/contact", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/contact.html"))
    })

    app.get("/careers", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/careers.html"))
    })

    app.get("/customer-survey", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/customer-survey.html"))
    })

    app.get("/snow-ice-management", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/snow.html"))
    })

    app.get("/irrigation", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/irrigation.html"))
    })

    app.get("/landscaping", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/landscaping.html"))
    })

    app.get("/construction", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/construction.html"))
    })

    app.get("/landscaping-installation", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/landscaping-installation.html"))
    })
    app.get("/concrete", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/concrete.html"))
    })

    app.get("/outdoor-living", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/outdoor-living.html"))
    })

    app.get("/roofing-siding", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/roofing-siding.html"))
    })

    app.get("/decks-fences", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/decks-fences.html"))
    })

    app.get("/kitchen-bath", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/kitchen-bath.html"))
    })

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/index.html"))
    });
}