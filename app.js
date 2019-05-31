//jshint esversion: 6

require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 3000; //can this be const or let since Heroku selects port?
const app = express();

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

    console.log(process.env.AUTHORIZATION_ID + " " + process.env.API_KEY);


    let subscribeURL = "https://" + process.env.DC + ".api.mailchimp.com/3.0/lists/" + process.env.AUDIENCE_ID;

    console.log(subscribeURL);

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
            console.log("request failed");
            console.log(error);
            
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(port, function () {
    console.log("server running on port " + port);
});