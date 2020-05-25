/*
const express = require('express'),
app = express(),
bodyParser = require('body-parser');
port = process.env.PORT || 3005;

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0123456',
    database : 'rgr'
});

connection.connect(function(err) {
    if (err) throw err;
});

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/AppRoutes'); //importing route
routes(app);
*/

var express = require('express');
var app = express();
var cons = require('consolidate');
var path = require('path');
var bodyParser = require('body-parser');
var appController = require('./AppController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

const hostname = 'localhost';
const port = process.env.PORT || 3004;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);


app.post('/concert/', async function(req, res, next) {
    try {
        let newConcert = await appController.createConcert(req);
        res.send(newConcert);
    }
    catch(error) {
        next(error);
    }
});

app.put('/concertVoting/:id', async function(req, res, next) {
    
    try {
        let update = await appController.finishVoting(req);
        res.send(update);
    }
    catch(error) {
        next(error);
    }

});

app.get('/concerts/', async function(req, res, next) {
    
    try {
        let concerts = await appController.allConcerts(req);
        res.send(concerts);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/songs/:id', async function(req, res, next) {
    
    try {
        let songs = await appController.possibleSongsForVoiting(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.post('/song/', async function(req, res, next) {
    try {
        let newSong = await appController.createSong(req);
        res.send(newSong);
    }
    catch(error) {
        next(error);
    }
});

app.put('/vote/:id', async function(req, res, next) {
    
    try {
        let update = await appController.addNewVoteToSong(req);
        console.log("app.put('/vote/:id'");
        res.send(update);
    }
    catch(error) {
        next(error);
    }

});

app.put('/songStatus/:id', async function(req, res, next) {
    
    try {
        let update = await appController.songIsSelected(req);
        res.send(update);
    }
    catch(error) {
        next(error);
    }

});

app.post('/songVote/:id', async function(req, res, next) {
    try {
        let newVote = await appController.addNewSongToVoting(req);
        res.send(newVote);
    }
    catch(error) {
        next(error);
    }
});

app.get('/concertsDESC/', async function(req, res, next) {
    
    try {
        let concerts = await appController.allConcertsDESC(req);
        res.send(concerts);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/songsVote/:id', async function(req, res, next) {
    
    try {
        let songs = await appController.songsForVoiting(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/concertEnable/', async function(req, res, next) {
    
    try {
        let concert = await appController.enableConcert(req);
        res.send(concert);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/updatedVotes/:id', async function(req, res, next) {
    
    try {
        let votes = await appController.selectNewVotes(req);
        res.send(votes);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/selectedSongs/', async function(req, res, next) {
    
    try {
        let songs = await appController.selectedSongsPrevConcert(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/groupArtist/:id', async function(req, res, next) {
    
    try {
        let songs = await appController.songsGroupArtist(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/groupGenre/:id', async function(req, res, next) {
    
    try {
        let songs = await appController.songsGroupGenre(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/groupYear/:id', async function(req, res, next) {
    
    try {
        let songs = await appController.songsGroupYear(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/groupAlbum/:id', async function(req, res, next) {
    
    try {
        let songs = await appController.songsGroupAlbum(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.get('/groupLanguage/:id', async function(req, res, next) {
    
    try {
        let songs = await appController.songsGroupLanguage(req);
        res.send(songs);          
    }
    catch(error) {
        next(error);
    }

});

app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});
