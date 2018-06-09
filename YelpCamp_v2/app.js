const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Schema Setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: 'Granite Hill',
//     image: 'https://farm9.staticflickr.com/8358/8444469474_8f4b935818.jpg'
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });


// var campgrounds = [
//     { name: 'Salmon Creak', image: 'https://farm4.staticflickr.com/3053/2586934044_339a678e73.jpg' },
//     { name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8358/8444469474_8f4b935818.jpg' },
//     { name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3924/14422533026_9be7d49684.jpg' },
//     { name: 'Salmon Creak', image: 'https://farm1.staticflickr.com/82/225912054_690e32830d.jpg' },
//     { name: 'Granite Hill', image: 'https://farm9.staticflickr.com/8041/7930230882_0bb80ca452.jpg' },
//     { name: 'Mountain Goat\'s Rest', image: 'https://farm7.staticflickr.com/6138/5952610874_5bf8a80e15.jpg' }
// ];

app.get('/', function(req, res) {
    res.render('landing')
});

app.get('/campgrounds', function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', { campgrounds: allCampgrounds });
        }
    });
});

app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    })

});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});


app.listen(port, () => console.log(`YelpCamp server is listening on port ${ port }`));