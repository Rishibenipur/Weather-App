const fetch = require('node-fetch');
const express=require('express');
const app=express();
const path=require('path');
console.log(__dirname);
const pathval=path.join(__dirname+"/public");
app.use(express.static(pathval));
app.set("view engine","hbs");
//If we use async and await then

// app.get('/', async (req,res)=>{
   
//     const response=await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.cityname}&appid=b7133d8157c15e99af45f23405f9358c`)
//   const json = await response.json();



app.get('/',(req,res)=>{
   
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.cityname}&appid=b7133d8157c15e99af45f23405f9358c`)
.then(res => res.json())
.then(json => {
 
   res.render('index',{
    temp:(json.main.temp-273.1).toFixed(2),
    mintemp:(json.main.temp_min-273.1-5).toFixed(2),
    maxtemp:(json.main.temp_max-273.1+5).toFixed(2),
    city:(json.name).substring(0,5),
    country:json.sys.country,
    val:json.weather[0].main,
   });
 
   
});   
});
app.get('/*',(req,res)=>{
    res.render("404",{
        err:"Opps page couldn't be found",
    });
 }) ;

app.listen(8080,()=>{
    console.log("Listening to port 8080");
});

//query localhost:8080/cityname=pune