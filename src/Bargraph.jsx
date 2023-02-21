import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend
} from 'chart.js'

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend
)

const Bargraph = () => {

	var baseUrl ='https://api.coinranking.com/v2/coins/?limit=10';
	var proxyUrl ='https://cors-anywhere.herokuapp.com';

const data={
	labels:['Mon','Tue','Wed'],
	datasets:[
		{
			label:'Chart',
			data:[3,6,9],
			backgroundColor:'aqua',
			borderColor:'black',
			borderWidth:2
		}
	]
}

const options = {
    
  }



  return (
	<div>
	<h1> Chart Example </h1>
	<div>
	  <Bar data={data}
	  options={options}></Bar>	</div>
	  </div>
  )
}

export default Bargraph
