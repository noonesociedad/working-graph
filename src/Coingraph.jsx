import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

const Coingraph = () => {
  const [chartData, setChartData] = useState({});
  const [search, setSearch] = useState('bitcoin');
  const [days, setDays] = useState('365');
  const [currency, setCurrency] = useState('usd');

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  }

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://api.coingecko.com/api/v3/coins/${search}/market_chart?vs_currency=${currency}&days=${days}`);
      const json = await result.json();
      if(json.prices) {
        const labels = json.prices.map(price => new Date(price[0]).toLocaleDateString());
        const prices = json.prices.map(price => price[1]);
        let color="";
        if(prices[0]>prices[prices.length-1]) {
          color = 'red'
        } else {
          color = 'green'
        }

        setChartData({
          labels,
          datasets: [
            {
              label: `${search} Price (${currency.toUpperCase()})`,
              data: prices,
              borderColor: color,
              tension:0.4,
              fill:true,
      pointBorderColor:"none"
            },
          ],
        });
      } 
    };
    fetchData();
  }, [search,days, currency]);

  return (
         <div className='bg-white border-2 border-gray rounded mx-auto' style={{height:'500px',width:'900px'}}>
         <form className='flex flex-col justify-center items-center'>
         <select className='bg-red-400 border-2 border-white py-2 px-3 hover:bg-red-500 rounded-md w-full' value={search} onChange={e => setSearch(e.target.value)}>
         <option value="bitcoin">Bitcoin</option>
         <option value="ethereum">Ethereum</option>
         <option value="litecoin">Litecoin</option>
          <option value="ripple">Ripple</option>
          <option value="bitcoin-cash">Bitcoin Cash</option>
          <option value="tether">Tether</option>
        </select>
        <select className="bg-white border-2 border-blue-500 py-2 px-3 rounded-md w-full" value={currency} onChange={handleCurrencyChange}>
<option value="usd">USD</option>
<option value="inr">INR</option>
<option value="eur">EUR</option>
</select>
<div>
<label>
<input type="radio" name="days" value="1" checked={days === '1'} onChange={handleDaysChange} />
1 Day
</label>
<label>
<input type="radio" name="days" value="7" checked={days === '7'} onChange={handleDaysChange} />
7 Days
</label>
<label>
<input type="radio" name="days" value="30" checked={days === '30'} onChange={handleDaysChange} />
30 Days
</label>
<label>
<input type="radio" name="days" value="365" checked={days === '365'} onChange={handleDaysChange} />
365 Days
</label>
</div>
</form>
{ chartData.labels && chartData.labels.length > 0 ?
<Line className="w-full h-64 bg-red-50 shadow-md rounded border-2 border-gray-500" data={chartData}
options={{
scales: {
xAxes: [{
type: 'time',
time: {
displayFormats: {
quarter: 'MMM YYYY'
}
},
distribution: 'series'
}],
yAxes: [{
scaleLabel: {
display: true,
labelString: `Price (${currency.toUpperCase()})`
}
}]
}
}}
/>
: null
}
</div>
);
};
export default Coingraph;
