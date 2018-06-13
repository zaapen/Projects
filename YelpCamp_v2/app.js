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
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granate Hill",
//     image: "https://farm2.staticflickr.com/1086/882244782_d067df2717.jpg",
//     description: "This is a huge granate hill, no bathrooms and no water."
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND: ");
//         console.log(campground);
//     }
// });

app.get('/', function(req, res) {
    res.render('landing')
});

// INDEX - Display a list of campgrounds
app.get('/campgrounds', function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { campgrounds: allCampgrounds });
        }
    });
});

// CREATE - Adds a new campground
app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = { name: name, image: image, description: description };
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

// NEW - Displays a form to make new campgrounds
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render show template with that campground
            res.render('show', { campground: foundCampground });
        }
    });
});


app.listen(port, () => console.log(`YelpCamp server is listening on port ${ port }`));