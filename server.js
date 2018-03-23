const express = require('express'),
app = express();

app.set('view engine', 'hbs');

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('', (req, res) => {
    res.render('');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('\x1b[32m', '=> App running on port', port, '\x1b[0m');
});
