import React, {useState, useEffect} from 'react';
import AddSongModal from './AddSongModal';
import SelectSearch from 'react-select-search';
import {Button, ButtonToolbar, ButtonGroup, InputGroup} from 'react-bootstrap';
import axios from 'axios'

function AddSongsVoting({concert}) {
    const [data, setData] = useState(null);
    const [songId, setSongId] = useState('');
    let songsList = [];


    let fetchData = () => {

      setData(null);

        var query = 'http://localhost:3004/songs/' + concert.id;
        axios
          .get((query), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(response => {
              setData(response.data);
              
            }
          )
          .catch(error => console.log(error));
      
    }

    useEffect(() => {
      console.log("useEffect AddSongsVoting");
      
      fetchData();
      
    }, [concert]);


    let handleSong = (event) => {

        event.preventDefault();
        if(songId !== ''){
            var query = 'http://localhost:3004/songVote/' + songId;
            console.log("add song", songId);
            axios.post((query), {concert_id: concert.id})
            .then(response => {
                if(response.data.success === "success") {
                window.location.reload();
                }
            })
            .catch(error => console.log(error));
        }
        else{
            console.log("nothing to add");

        }
    }



    

    if(data !== null)
        {
            console.log("data.map");
                data.map((info) => {
                    console.log("info data.map: ", info.id);
                    songsList.push({
                        name:   info.artist + " - " + info.song_name,
                        value: info.id.toString()
                    });
            })
        }



      return (
        <div className="div-center">
            <SelectSearch
                    className={"select-search"}
                    options={songsList}
                    search
                    placeholder="Select song"
                    onChange={(e) => setSongId(e)}
                    />
            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="outline-info" onClick={handleSong}>
                        Add song
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2" aria-label="Second group">
                    <AddSongModal/>
                </ButtonGroup>
            </ButtonToolbar>



            
           
            
        </div>
      );
  
    }
  
  export default AddSongsVoting;