'use strict';
module.exports = function(app) {
  var songs = require('../controller/SongController');

  // songs Routes
  app.route('/songs')
    .get(songs.list_all_songs)
    .post(songs.create_song);
    };