const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=771f0834aa1e5c5f33710d4a4ff9f557&units=metric";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>" + "<h2>The weather is currently " + desc + ".</h2>");
            res.write("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'" + " height='100'/>");
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});