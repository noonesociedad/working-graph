import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

const Bargraphcoin = () => {
    const [coinData, setCoinData] = useState(null)
    const [coinId, setCoinId] = useState('bitcoin')
    const [days, setDays] = useState('max')
    const [currency, setCurrency] = useState('usd')
    const [chartData, setChartData] = useState({})
    
    const handleCoinChange = (e) => {
      setCoinId(e.target.value);
    }
  
    const handleDaysChange = (e) => {
      setDays(e.target.value);
    }
  
    const handleCurrencyChange = (e) => {
      setCurrency(e.target.value);
    }
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(`https://api.coingecko.com/api/v3/coins/${coinId}`)
        setCoinData(result.data)
      }
      fetchData()
    }, [coinId])
  
    useEffect(() => {
      const fetchChartData = async () => {
        const result = await axios(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
        const chartLabels = []
        const chartPrices = []
        result.data.prices.forEach((data) => {
          chartLabels.push(new Date(data[0]).toDateString())
          chartPrices.push(data[1])
        })
        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: `Price in ${currency.toUpperCase()}`,
              data: chartPrices,
              backgroundColor: 'aqua',
              borderColor: 'black',
              borderWidth: 2
            }
          ]
        })
      }
      fetchChartData()
    }, [coinId, days, currency])
  
    if (!coinData) return <p>Loading...</p>
  
    return (
      <div>
        <h1>{coinData.name} Price Chart</h1>
        <select onChange={handleCoinChange}>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="litecoin">Litecoin</option>
        </select>
        <div>
          <label>
            <input type="radio" name="days" value="max" checked={days === 'max'} onChange={handleDaysChange} />
All
</label>
<label>
<input type="radio" name="days" value="1" checked={days === '1'} onChange={handleDaysChange} />
1 Day
</label>
<label>
<input type="radio" name="days" value="7" checked={days === '7'} onChange={handleDaysChange} />
1 Week
</label>
<label>
<input type="radio" name="days" value="30" checked={days === '30'} onChange={handleDaysChange} />
1 Month
</label>
<label>
<input type="radio" name="days" value="365" checked={days === '365'} onChange={handleDaysChange} />
1 Year
</label>
</div>
<select onChange={handleCurrencyChange}>
<option value="usd">USD</option>
<option value="inr">INR</option>
<option value="eur">EUR</option>
</select>
{chartData.labels && <Bar data={chartData} />}
</div>
)
}

  export default Bargraphcoin