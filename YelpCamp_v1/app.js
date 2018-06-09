const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
    { name: 'Salmon Creak', image: 'https://pixabay.com/get/eb32b7072df5043ed1584d05fb1d4e97e07ee3d21cac104497f8c37fafe5b1bb_340.jpg' },
    { name: 'Granite Hill', image: 'https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f8c37fafe5b1bb_340.jpg' },
    { name: 'Mountain Goat\'s Rest', image: 'https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104497f8c37fafe5b1bb_340.jpg' },
    { name: 'Salmon Creak', image: 'https://pixabay.com/get/eb32b7072df5043ed1584d05fb1d4e97e07ee3d21cac104497f8c37fafe5b1bb_340.jpg' },
    { name: 'Granite Hill', image: 'https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f8c37fafe5b1bb_340.jpg' },
    { name: 'Mountain Goat\'s Rest', image: 'https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104497f8c37fafe5b1bb_340.jpg' }
];

app.get('/', function(req, res) {
    res.render('landing')
});

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});


app.listen(port, () => console.log(`YelpCamp server is listening on port ${ port }`));