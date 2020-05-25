import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';



export default function TableRowVoteInfo({info}) {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [votes, setVotes] = useState(info.votes);

  let handleVote = (event) => {

    event.preventDefault();

    var query = 'http://localhost:3004/vote/' + info.vote_id;
    console.log("Vote for", info.vote_id);
    axios.put((query), {})
    .then(response => {
        console.log(response);
        if(response.data.success === "success") {
          //window.location.reload();
          var selectQuery = 'http://localhost:3004/updatedVotes/' + info.vote_id;
        axios
          .get((selectQuery), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(response => {
            if(response !== null){
              console.log("con log", response.data[0].votes);
              setVotes(response.data[0].votes);
            }
            }
          )
          .catch(error => console.log(error));
        console.log("Vote for", info.vote_id);
        }
    })
    .catch(error => console.log(error));
    setIsButtonDisabled(true);

    

}

    return (
      <tr>
        <td>{info.song_name}</td>
        <td>{info.artist}</td>
        <td>{info.genre}</td>
        <td>{info.song_year}</td>
        <td>{info.album_name}</td>
        <td>{info.language_name}</td>
        <td>{votes}</td>
        <td>
          <Button variant="outline-info" onClick={handleVote} disabled={isButtonDisabled}>
              Vote
          </Button>
        </td>
      </tr>
    );
  
}
