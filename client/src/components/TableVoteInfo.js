import React, {useState, useEffect} from 'react';
import TableRowVoteInfo from './TableRowVoteInfo'
import axios from 'axios'
import Error from './Error'

function TableVoteInfo({concert}) {

    const [data, setData] = useState(null);


    let fetchData = () => {

      setData(null);

        var query = 'http://localhost:3004/songsVote/' + concert.id;
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
      
      fetchData();
    }, [concert]);


    if(concert === null)
    {
    setData(null);
    console.log("concert", concert)}
    console.log("data", data)
    if(data != null) {

      if (data.length === 0){
        return( <h3 align = "center">No songs added</h3>);
      }

      console.log(data)

      return (
        <table className="table_info">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Album</th>
              <th>Language</th>
              <th>Votes</th>
              <th>Vote for song</th>
            </tr>
          </thead>
          <tbody>{data.map((info) => {return <TableRowVoteInfo info={info} />})}</tbody>
        </table>
      );
    } else {
      //return( <Error flag={"wait"}/>);
      return( <div> Error</div>);
    }

}

export default TableVoteInfo;

