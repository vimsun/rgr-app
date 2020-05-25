'user strict';
var sql = require('./DB.js');

//Song object constructor
var Song = function(song){
    this.song_name = song.song_name;
    this.artist = song.artist;
    this.genre = song.genre;
    this.song_year = song.song_year;
    this.album_name = song.album_name;
    this.language_name = song.language_name;
};

Song.createSong = function (newSong, result) {    
        sql.query("INSERT INTO song set ?", newSong, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};

Song.getAllSong = function (result) {
        sql.query("Select * from song", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('songs : ', res);  

                 result(null, res);
                }
            });   
};

module.exports= Song;