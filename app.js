const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
//only this "views" can be named however.
app.set('views', path.join(__dirname, 'views')); //the first "views" is an ejs word, you cant just name it.
app.set('view engine', 'ejs'); //"view engine" is an ejs word, you can't just name it.
app.use(express.static('public'));//allowing ExpressJS to access and display CSS/JS files
app.use(express.urlencoded({ extended: false }));
//main page
app.get('/', function (req, res) {
    res.render('index'); // no need to add the .ejs, since it will auto look for it. Check line 7.
});
//restaurants page
app.get('/restaurants', function (req, res) {

    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', { numberOfRestaurants: storedRestaurants.length, 
        restaurants: storedRestaurants });
    //old expressjs code, keep it for reference in the future..
    //const htmlFilePath = path.join(__dirname, 'views','restaurants.html');
    //res.sendFile(htmlFilePath);
});
//recommend page reading
app.get('/recommend', function (req, res) {
    res.render('recommend');
});
//recommend page writing
app.post('/recommend', function (req, res) {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    storedRestaurants.push(restaurant);
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
    res.redirect('/confirm');
});
//confirm page
app.get('/confirm', function (req, res) {
    res.render('confirm');
});
//about page
app.get('/about', function (req, res) {
    res.render('about');
});

app.listen(3000);