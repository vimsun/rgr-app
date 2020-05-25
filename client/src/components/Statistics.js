import React, {useState, useEffect} from 'react';

import { render } from 'react-dom';
import SelectSearch from 'react-select-search';
import axios from 'axios';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


function Statistics() {
	const [inputConcert, setInputConcert] = useState('');
	const [inputCategory, setInputCategory] = useState('');

	const [concerts, setConcerts] = useState('');
	const [info, setInfo] = useState('');
	const [number, setNumber] = useState('');
	const [labelName, setLabelName] = useState('');
	const options = [
		{name: 'Artists', value: '1'},
		{name: 'Genres', value: '2'},
		{name: 'Years', value: '3'},
		{name: 'Albums', value: '4'},
		{name: 'Languages', value: '5'}];

		let tempLabel = [];
		let tempData = [];

let fetchData = () => {

	  var query = 'http://localhost:3004/concerts/';
	  axios
		.get((query), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(response => 
			{
				let tempConcert = [];
				response.data.map((concertMap) => {
						tempConcert.push({
							name:  'Concert ' + concertMap.id.toString(),
							value: concertMap.id.toString()
						});
				})
			


			console.log("CONCert", response.data);
			setConcerts(tempConcert);
		  }
		)
		.catch(error => console.log(error));

		var queryCategory = 'http://localhost:3004/';
		switch (Number(inputCategory)){
			case 1: {queryCategory += 'groupArtist/' + inputConcert;
			setLabelName("Artists");
			break;}
			case 2: {queryCategory += 'groupGenre/' + inputConcert;
			setLabelName("Genres");
			break;}
			case 3: {queryCategory += 'groupYear/' + inputConcert;
			setLabelName("Years");
			break;}
			case 4: {queryCategory += 'groupAlbum/' + inputConcert;
			setLabelName("Albums");
			break;}
			case 5: {queryCategory += 'groupLanguage/' + inputConcert;
			setLabelName("Languages");
			break;}
			default:break;
		}
		axios
		.get((queryCategory), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then(response => {
			 tempLabel = [];
			 tempData = [];
			for(let i = 0; i < response.data.length; i++ ){
				tempLabel.push(response.data[i].info);
				tempData.push(response.data[i].number);
			}
			setInfo(tempLabel);
			setNumber(tempData);
			console.log("SET resp", response.data);
			console.log("SET info", tempLabel);
			console.log("SET number", tempData);
		  }
		)
		.catch(error => console.log(error));
	
  }

  useEffect(() => {
	
	fetchData();
  }, [inputConcert, inputCategory]);

let dataPie = {
	labels: info,
	datasets: [
	  {
		data: number,
		backgroundColor: [
		  "#52D726",
		  "#FFEC00",
		  "#FF7300",
		  "#FF0000",
		  "#007ED6",
		  "#7CDDDD"
		]
	  }
	]
  };


    return(
	<div>
		<SelectSearch
		className={"select-search"}
		options={concerts}
		placeholder="Select concert"
		onChange={(e) => setInputConcert(e)}
		/>
		<SelectSearch
		className={"select-search"}
		options={options}
		placeholder="Select category"
		onChange={(e) => setInputCategory(e)}
		/>
		<MDBContainer>
        <h3 className="mt-5">{labelName}</h3>
        <Pie data={dataPie} options={{ responsive: true }} />
      </MDBContainer>
	</div>
	
	);
}
export default Statistics;