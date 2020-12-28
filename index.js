const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
var _=require("lodash");
const app=express();
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(express.static("public"));
app.set('view engine','ejs');
let query="";
let apiKey="";
let response="";
let temp="";
let description="";
let temp_min="";
let temp_max="";
let pressure="";
let humidity="";
let speed=re="";
let visibility="";
let icon="";
let img="";
let queryModified="";
app.listen(process.env.PORT||8080,function(){
})
app.get("/",function(req,res){
    res.sendFile(`${__dirname}/html/index.html`);
})
app.post("/", async function(req,res){
    query=(req.body.cityName);
    queryModified=query.toUpperCase();
    number= '5027810f4b6800992552f405a3ba57c3';    
     await  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${number}&units=metric`)
    .then(response=>{
        temp=response.data.main.temp;
        description=response.data.weather[0].description;
        temp_min =response.data.main.temp_min;
        temp_max=response.data.main.temp_max;  
        pressure=response.data.main.pressure;
        humidity=response.data.main.humidity;
        speed=response.data.wind.speed;
        visibility=response.data.visibility;
        icon=response.data.weather[0].icon;
        img=`http://openweathermap.org/img/wn/${icon}@2x.png`;
        if(res.statusCode===200){
            res.redirect("/temperature");
        }
    })
    .catch(err=>{
        res.sendFile(`${__dirname}/html/failure.html`);
    })     
})
app.get("/temperature",function(req,res){
    res.render("list",{name:queryModified,temperature:temp,minimum:temp_min,maximum:temp_max,des:description,image: img,press:pressure,
        hum:humidity,speed:speed,vis:visibility});

}); 

