import React, {useState, useEffect} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import TableSongsConcert from './TableSongsConcert';
import axios from 'axios';
import { Input} from 'reactstrap';

function ConcertAdmin() {

  const [enableConcert, setEnableConcert] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [songsForConcert, setSongsForConcert] = useState([]);
  const [numberSongs, setNumberSongs] = useState('');

  const [prevConcert, setPrevConcert] = useState(null);
  let data = [];
  useEffect(() => {
    console.log("useEffect");
    fetch("http://localhost:3004/concertEnable/")
      .then(res => res.json())
      .then(
        (result) => {
          
          
          console.log("result", result);
          if(result.length === 0){
            /*
            setEnableConcert(null);
            fetch("http://localhost:3004/concertsDESC/")
              .then(res => res.json())
              .then(
                (result) => {
                  console.log("getPrevConcert", result[0])
                  setPrevConcert(result[0]);
                },
                (error) => {
                  setError(error);
                }
              )
              */
          }
          else{
            setEnableConcert(result[0]);

          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [isLoaded]);

    let finishVoting = (event) => {
       console.log("finish it!");

       let fetchSongs = () => {
   
           var query = 'http://localhost:3004/songsVote/' + concert.id;
           axios
             .get((query), {
                 headers: {
                     'Content-Type': 'application/x-www-form-urlencoded'
                 }
             })
             .then(response => {
                data = response.data
                console.log("get songs!", data);
                data.sort(function(a, b){
                    return b.votes - a.votes
                })
                console.log("sort songs!", data);
                let unique_song = [];
                let artist = [];
                let distinct = [];
                let count = 0;
                for( let i = 0; i < data.length; i++ ){
                    if(!artist[data[i].artist])
                    {
                        distinct.push(data[i]);
                        unique_song[data[i].song_name+ " - " + data[i].artist] = 1;
                        artist[data[i].artist] = 1;
                        count++;
                        if (count >= concert.number_songs)
                        break;
                    }
                    else{
                        if( !unique_song[data[i].song_name+ " - " + data[i].artist] && artist[data[i].artist] !==2){
                            distinct.push(data[i]);
                            unique_song[data[i].song_name+ " - " + data[i].artist] = 1;
                            artist[data[i].artist]++;
                            count++;
                            if (count >= concert.number_songs)
                            break;
                        } 
                    }
                }
                console.log("this songs: ", distinct);
                var updateQuery = 'http://localhost:3004/songStatus/';
                for( let i = 0; i < distinct.length; i++ ){
                    axios.put((updateQuery+distinct[i].id), {concert_id: concert.id,})
                    .then(response => {
                        console.log("Song ", i, response);
                    })
                    .catch(error => console.log(error));
                }
               }
             )
             .catch(error => console.log(error));


            var queryFonoshVoting = 'http://localhost:3004/concertVoting/' + concert.id;
            axios.put((queryFonoshVoting), {})
            .then(response => {
                console.log(response);
                if(response.data.success === "success") {
                    window.location.reload();
                }
            })
            .catch(error => console.log(error));
        }
        fetchSongs();
    }
    

    let startVoting = (event) => {
      if (!Number(numberSongs) || Number(numberSongs) < 1) {
        alert("Number of songs must be greater than 0");
      }
      else{console.log("start voting");

        event.preventDefault();
            var query = 'http://localhost:3004/concert/';
            console.log("admin new concert");
            axios.post((query), {number_songs: numberSongs})
            .then(response => {
                if(response.data.success === "success") {
                window.location.reload();
                }
            })
            .catch(error => console.log(error));
          }
           
    }

    let handleNumberSongs = (evt) => {
      setNumberSongs(evt.target.value);
      
    };


let concert = null;
if(enableConcert === null)
    {
      console.log("prevConcert", prevConcert)
      return (
        <div>
          <Col className="rows">
            <div>
              <h3 align = "center">Start voting</h3>
              <Form horizontal>

                  <Form.Group className="formHorizontal">
                  <Form.Label  >
                    Number of songs for concert
                  </Form.Label>
                    <Col >                      
                      <Input
                          type="text"
                          id="exampleNumber"
                          placeholder="Enter number"
                          value={numberSongs}
                          onChange={handleNumberSongs}
                      />
                    </Col>
                  </Form.Group>
                  
                  <p className="buttons button" align='center'>
                  <Button  variant="outline-info" onClick={startVoting}>
               Start voting
            </Button>
                  </p>

              </Form>
            </div>
          </Col>
            <div className='div-center'>
              <h3>Songs from previous concert</h3>
              <TableSongsConcert/>
            </div>
           
        </div>
      );
    }
    else
    {concert = enableConcert;
    console.log("not over yet", enableConcert)}
  if(!enableConcert)
  {console.log("test")}
  console.log('then', enableConcert);
    return (
      <div className='div-center'>
        <h3>Voting is started</h3>
            <Button  variant="outline-info" onClick={finishVoting}>
                Finish voting
            </Button>
      </div>
    );
  }

export default ConcertAdmin;