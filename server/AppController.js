'use strict'
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0123456',
    database : 'rgr'
});

const statuses = ['REQUESTED', 'ANSWERED', 'ACCEPTED', 'REJECTED'];

module.exports = {
    createConcert: function(req, res){

        return new Promise((resolve, reject) => {
            
            let body = req.body;
    
            connection.query('INSERT INTO concert(voting_enable, number_songs) VALUES (true, ?)', [body.number_songs],
                function(error, results) {
                if ( error ){
                    console.log("Error when adding data, reason: " + error);
                    reject({"success": false, "error": "Cannot add data!"});
                }
                else {
                    resolve({"insertId": results.insertId, "success": 'success', "error": ''});
                }
            });
        })
    },

    finishVoting : function(req, res){
    
        return new Promise((resolve, reject) => {

            let concert_id = req.params.id;

            let query = "UPDATE concert SET voting_enable=false WHERE id=?";

            connection.query(query,  [concert_id], function(error, results){
                if ( error ){
                    reject({"success": false, "error": "Cannot update status!"});
                } else {
                    resolve({"success": 'success', "error": ''});
                }
            });    
        })
    },

    allConcerts: function(req, res) {
        
        return new Promise((resolve, reject) => {

            let query = "SELECT c.id, c.voting_enable, c.number_songs FROM concert c";
        
            connection.query(query, [], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    for(var i = 0; i < results.length; i++) {
                        results[i].status_code = results[i].status;
                        results[i].status = statuses[parseInt(results[i].status)];
                    }   
                    resolve(results);
                }    
            })
 
        })
    },


    possibleSongsForVoiting: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let concert_id = req.params.id;

            let query = "SELECT s.id, s.song_name, s.artist, s.genre, s.song_year, s.album_name, s.language_name FROM song s LEFT JOIN vote v on s.id = v.song_id AND v.concert_id = ? WHERE v.id IS NULL;";
        
            connection.query(query, [concert_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    createSong: function(req, res){

        return new Promise((resolve, reject) => {
            
            let body = req.body;
            
    
            connection.query('INSERT INTO song (song_name, artist, genre, song_year, album_name, language_name) VALUES (?, ?, ?, ?, ?, ?)', [body.song_name, body.artist, body.genre, body.song_year, body.album_name, body.language_name],
                function(error, results) {
                if ( error ){
                    console.log("Error when adding data, reason: " + error);
                    reject({"success": false, "error": "Cannot add data!"});
                }
                else {
                    resolve({"insertId": results.insertId, "success": 'success', "error": ''});
                }
            });
        })
    },

    addNewVoteToSong : function(req, res){
    
        return new Promise((resolve, reject) => {

            //let song_id = req.params.id;

            //let query = "UPDATE vote SET votes=votes+1 WHERE concert_id=(Select id from concert where voting_enable=true) AND song_id=?;";

            let vote_id = req.params.id;
            let query = "UPDATE vote SET votes=votes+1 WHERE id=?;";

            connection.query(query,  [vote_id], function(error, results){
                if ( error ){
                    reject({"success": false, "error": "Cannot update status!"});
                } else {
                    resolve({"success": 'success', "error": ''});
                }
            });    
        })
    },

    songIsSelected : function(req, res){
    
        return new Promise((resolve, reject) => {

            let song_id = req.params.id;
            let body = req.body;

            let query = "UPDATE vote SET is_selected=true WHERE concert_id=? AND song_id=?;";

            connection.query(query,  [body.concert_id, song_id], function(error, results){
                if ( error ){
                    reject({"success": false, "error": "Cannot update status!"});
                } else {
                    resolve({"success": 'success', "error": ''});
                }
            });    
        })
    },

    addNewSongToVoting: function(req, res){

        return new Promise((resolve, reject) => {
            
            let song_id = req.params.id;
            let body = req.body;
    
            connection.query('INSERT INTO vote(song_id, concert_id, votes, is_selected)  VALUES (?, ?, 0, false)', [song_id, body.concert_id],
                function(error, results) {
                if ( error ){
                    console.log("Error when adding data, reason: " + error);
                    reject({"success": false, "error": "Cannot add data!"});
                }
                else {
                    resolve({"insertId": results.insertId, "success": 'success', "error": ''});
                }
            });
        })
    },

    allConcertsDESC: function(req, res) {
        
        return new Promise((resolve, reject) => {

            let query = "SELECT c.id, c.voting_enable, c.number_songs FROM concert c ORDER BY id DESC";
        
            connection.query(query, [], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    for(var i = 0; i < results.length; i++) {
                        results[i].status_code = results[i].status;
                        results[i].status = statuses[parseInt(results[i].status)];
                    }   
                    resolve(results);
                }    
            })
 
        })
    },


    songsForVoiting: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let concert_id = req.params.id;

            let query = "SELECT s.id, s.song_name, s.artist, s.genre, s.song_year, s.album_name, s.language_name, v.votes, v.id as vote_id FROM vote v INNER JOIN song s on s.id = v.song_id INNER JOIN concert c on c.id = v.concert_id WHERE c.id=?";
        
            connection.query(query, [concert_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    enableConcert: function(req, res) {
        
        return new Promise((resolve, reject) => {

            let query = "SELECT * FROM concert where voting_enable=true;";
        
            connection.query(query, [], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    for(var i = 0; i < results.length; i++) {
                        results[i].status_code = results[i].status;
                        results[i].status = statuses[parseInt(results[i].status)];
                    }   
                    resolve(results);
                    console.log(results[0]);
                }    
            })
 
        })
    },

    selectNewVotes: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let vote_id = req.params.id;

            let query = "SELECT v.votes FROM vote v WHERE v.id = ?;";
        
            connection.query(query, [vote_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    selectedSongsPrevConcert: function(req, res) {
        
        return new Promise((resolve, reject) => {

            let query = "SELECT s.id, s.song_name, s.artist, s.genre, s.song_year, s.album_name, s.language_name, v.votes, v.id as vote_id FROM vote v INNER JOIN song s on s.id = v.song_id INNER JOIN concert c on v.concert_id = c.id WHERE v.is_selected=true AND v.concert_id = (SELECT id from concert where id = (SELECT MAX(id) from concert)) ORDER BY v.votes DESC;";
        
            connection.query(query, [], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    songsGroupArtist: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let concert_id = req.params.id;

            let query = "SELECT s.artist as info, COUNT(s.artist) as number FROM vote v INNER JOIN song s on s.id = v.song_id INNER JOIN concert c on c.id = v.concert_id WHERE c.id=? GROUP BY s.artist;";
        
            connection.query(query, [concert_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    songsGroupGenre: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let concert_id = req.params.id;

            let query = "SELECT s.genre as info, COUNT(s.genre) as number FROM vote v INNER JOIN song s on s.id = v.song_id INNER JOIN concert c on c.id = v.concert_id WHERE c.id=? GROUP BY s.genre;";
        
            connection.query(query, [concert_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    songsGroupYear: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let concert_id = req.params.id;

            let query = "SELECT s.song_year as info, COUNT(s.song_year) as number FROM vote v INNER JOIN song s on s.id = v.song_id INNER JOIN concert c on c.id = v.concert_id WHERE c.id=? GROUP BY s.song_year;";
        
            connection.query(query, [concert_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    songsGroupAlbum: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let concert_id = req.params.id;

            let query = "SELECT s.album_name as info, COUNT(s.album_name) as number FROM vote v INNER JOIN song s on s.id = v.song_id INNER JOIN concert c on c.id = v.concert_id WHERE c.id=? GROUP BY s.album_name;";
        
            connection.query(query, [concert_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },

    songsGroupLanguage: function(req, res) {
        
        return new Promise((resolve, reject) => {


            let concert_id = req.params.id;

            let query = "SELECT s.language_name as info, COUNT(s.language_name) as number FROM vote v INNER JOIN song s on s.id = v.song_id INNER JOIN concert c on c.id = v.concert_id WHERE c.id=? GROUP BY s.language_name;";
        
            connection.query(query, [concert_id], function(error, results, fields){
                if ( error ){
                    console.log("Error when fetching data, reason: " + error);
                    reject({"success": false, "error": "Cannot fetch data!"});
                } else {
                    console.log(results);
                    resolve(results);
                }    
            })
 
        })
    },
}