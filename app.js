var express=require("express")
var bodyParser=require("body-parser")
var app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.listen(3000,function(req,res){
    console.log("Your server is running at https://127.0.0.1:3000");
});