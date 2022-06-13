const express = require("express")
const exphbs = require("express-handlebars");
const path = require('path');
const app = express();

// what view engine are we using
app.engine('handlebars', exphbs());
// set view engine
app.set('view engine', 'handlebars');

//  static folder utilized
app.use('/public', express.static(path.join(__dirname, 'public')));


// route definition
app.get('/contact', (req, res) => {
    res.render('contact', {layout: false});
});

// route definition
app.get('/careers', (req, res) => {
    res.render('careers', {layout: false});
});

// route definition
app.get('/about', (req, res) => {
    res.render('about', {layout: false});
});

// route definition
app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

// route definition
app.get('/customer-survey', (req, res) => {
    res.render('customersurvey', {layout: false});
});

app.get('/thank-you', (req,res) => {
    res.render('thankyou', {layout: false});
})

app.get('/financing', (req,res) => {
    res.render('financing', {layout: false});
})

// services pages

app.get('/construction', (req,res) => {
    res.render('construction', {layout: false});
})

app.get('/landscaping-installation', (req,res) => {
    res.render('landscape-install', {layout: false});
})

app.get('/landscaping', (req,res) => {
    res.render('landscape-maint', {layout: false});
})

app.get('/snow-ice-management', (req,res) => {
    res.render('snow', {layout: false});
})

app.get('/outdoor-living', (req,res) => {
    res.render('outdoor-living', {layout: false});
})

app.get('/roofing-siding', (req,res) => {
    res.render('roofing', {layout: false});
})

app.get('/decks-fences', (req,res) => {
    res.render('decks', {layout: false});
})

app.get('/kitchen-bath', (req,res) => {
    res.render('kitchens', {layout: false});
})

app.get('/irrigation', (req,res) => {
    res.render('irrigation', {layout: false});
})

app.get('/concrete', (req,res) => {
    res.render('concrete', {layout: false});
})

// port declaration - 5000 for heroku 
const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){ 
    console.log("listening on port " + PORT);
})