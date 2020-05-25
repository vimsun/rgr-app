import React, {useState, useEffect} from 'react';
import TableVoteInfo from './TableVoteInfo'
import AddSongsVoting from './AddSongsVoting'
import axios from 'axios'

function Home() {

  const [enableConcert, setEnableConcert] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log("useEffect");
    fetch("http://localhost:3004/concertEnable/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if(result.length !== 0)
          setEnableConcert(result[0]);
          else setEnableConcert(null);
          console.log("result", result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [isLoaded]);

  let concert = null;
  if(enableConcert===null)

    {concert = null;
      return (
        <div className='div-center'>
          <h3>No voting enable</h3>
        </div>
      );
    }

    concert = enableConcert;
  console.log('then', enableConcert);
    return (
      <div>
        <AddSongsVoting concert={concert}/>
        <TableVoteInfo concert={concert}/>
      </div>
    );
  }

export default Home;