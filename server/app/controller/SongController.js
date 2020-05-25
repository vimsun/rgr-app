'use strict';

var Song = require('../model/Song.js');

exports.list_all_songs = function(req, res) {
    Song.getAllSong(function(err, song) {

    console.log('song controller')
    if (err)
      res.send(err);
      console.log('res', song);
    res.send(song);
  });
};



exports.create_song = function(req, res) {
  var new_song = new Song(req.body);

    Song.createTask(new_song, function(err, song) {
    
    if (err)
      res.send(err);
    res.json(song);
  });

};

