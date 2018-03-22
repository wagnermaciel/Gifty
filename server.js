const express = require('express'),
app = express();

app.set('view engine', 'hbs');

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('', (req, res) => {
    res.render('');
});

app.get('/start/who', (req, res) => {
    res.render('start/who');
});

app.get('/start/age', (req, res) => {
    res.render('start/age');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('\x1b[32m', '=> App running on port', port, '\x1b[0m');
});
