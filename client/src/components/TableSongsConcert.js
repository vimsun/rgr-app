import React, {useState, useEffect} from 'react';
import axios from 'axios'

function TableSongsConcert() {

    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    let fetchData = () => {

      setData(null);

        var query = 'http://localhost:3004/selectedSongs/';
        axios
          .get((query), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
          .then(response => {
              setData(response.data);
              setIsLoaded(true);
            }
          )
          .catch(error => console.log(error));
      
    }

    useEffect(() => {
      
      fetchData();
    }, [isLoaded]);


    if(data != null) {

      if (data.length === 0){
        return( <div>Error</div>);
      }

      console.log(data)

      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Album</th>
              <th>Language</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>{data.map((info) => {return (<tr>
        <td>{info.song_name}</td>
        <td>{info.artist}</td>
        <td>{info.genre}</td>
        <td>{info.song_year}</td>
        <td>{info.album_name}</td>
        <td>{info.language_name}</td>
        <td>{info.votes}</td>
      </tr>);})}</tbody>
        </table>
      );
    } else {
      //return( <Error flag={"wait"}/>);
      return( <div> Error</div>);
    }

}

export default TableSongsConcert;

