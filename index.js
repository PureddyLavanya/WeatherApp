var express=require("express")
var bodyParser=require("body-parser")
var https=require("https")
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
            var icon=weatherData.weather[0].icon;
            var url2="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently"+desc+"</p>");
            res.write("<h2>The temperature in"+city+"is"+tm+"</h2>");
            res.write("<img src="+url2+">");
            res.send();
        });
    });
});


app.listen(3000,function(req,res){
    console.log("Your server is running at https://127.0.0.1:3000");
});