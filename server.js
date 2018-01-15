const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err) {
            console.log('Unable to append to server.log file.')
        }
    });
    next();
});

// Maintenance Mode
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

// HBS Helper: Get the current year
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});

// HBS Helper: Put all text into upper case
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!',
        name: 'Cash',
        likes: [
            'Cooking', 'Woodworking', 'Learning', 'Software Development'
        ],
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

// /bad - send back json with errorMesage
app.get('/bad', (req,res) => {
    res.send({
        statusCode: '303',
        errorMesage: 'Invalid request. Data not available.'
    });
})

app.get('/maintenance', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        maintenanceMessage: 'Working on it. We will be back soon.',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
