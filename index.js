var express=require("express");
var bodyParser=require("body-parser");
var https=require("https");
var app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html");
});
app.post("/",function(req,res)
{
    var city=req.body.Cityname;
    var unit="metric";
    var key="42ed77b1d78add98288feebc69f29cbd";
    var url1="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units="+unit;
    https.get(url1,function(response)
    {
       response.on("data",function(data)
        {
            var weatherData=JSON.parse(data);
            var tm=weatherData.main.temp;
            var desc=weatherData.weather[0].description;
            var weadata={
                cityname: city,
                temp: tm,
                description: desc
            };
            res.render("result.ejs",{wdata:weadata});
        });
    });
});


app.listen(3000,function(req,res){
    console.log("Your server is running at port:3000");
});
