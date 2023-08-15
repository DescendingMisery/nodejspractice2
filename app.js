const fs = require('fs');
const express = require('express');
const path = require('path');


const app = express();
app.use(express.static('public'));//allowing ExpressJS to access and display CSS/JS files
app.use(express.urlencoded({extended:false}));
//main page
app.get('/', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilePath);
});
//restaurants page
app.get('/restaurants', function(req, res){
    const htmlFilePath = path.join(__dirname, 'views','restaurants.html');
    res.sendFile(htmlFilePath);
});
//recommend page reading
app.get('/recommend', function(req,res){
    const htmlFilePath = path.join(__dirname, 'views','recommend.html');
    res.sendFile(htmlFilePath);
});
//recommend page writing
app.post('/recommend',function(req,res){
    const restaurant = req.body;
    const filePath = path.join(__dirname,'data','restaurants.json');
    
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    storedRestaurants.push(restaurant);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm');
});
//confirm page
app.get('/confirm', function(req,res){
    const htmlFilePath = path.join(__dirname, 'views','confirm.html');
    res.sendFile(htmlFilePath);
});
//about page
app.get('/about', function(req,res){
    const htmlFilePath = path.join(__dirname, 'views','about.html');
    res.sendFile(htmlFilePath);
});

app.listen(3000);