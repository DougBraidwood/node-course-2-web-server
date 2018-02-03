const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware (app.use) is executed in the order it's in the file
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// When not commented out, intercepts all requests and response with maintenance page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    console.log('You been served');
    // res.send('<h1>Hello World Express!</h1>');
    // res.send({
    //     name: 'Doug',
    //     coolness: '100',
    //     likes: ['BJs', 'booze']
    // })
    res.render('home.hbs', {pageTitle: 'Home Page',
                            welcomeMessage: 'You are a smooth mack daddy'});

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {pageTitle: 'About Page'});
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Oh those Russians!'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {pageTitle: 'Projects Page'});
})

app.listen(port, () => {
    console.log(`Server is up and flaming serving stuff on port ${port}`);
});