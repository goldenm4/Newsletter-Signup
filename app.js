//jshint esversion: 6

require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

const request = require("request");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    let data = {
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.fName,
                    LNAME: req.body.lName
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);

    let subscribeURL = "https://" + process.env.DC + ".api.mailchimp.com/3.0/lists/" + process.env.AUDIENCE_ID;

    let options = {
        url: subscribeURL,
        method: "POST",
        headers: {
            "Authorization": process.env.AUTHORIZATION_ID + " " + process.env.API_KEY
        },
        body: jsonData,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log("request posting to mailchimp failed");
            console.log(error);
            res.render("response", { shortResponse: error, detailedResponse: "something went wrong", buttonResponse: "try again" });
        } else {
            if (response.statusCode === 200) {
                res.render("response", { shortResponse: "yey", detailedResponse: "your signup was complete!", buttonResponse: "add another" });
            } else {
                res.render("response", { shortResponse: error, detailedResponse: "something went wrong", buttonResponse: "try again" });
                console.log("there was an error");
                console.log(error);
            }
        }
    });

});

app.listen(port, function () {
    console.log("server running on port " + port);
});