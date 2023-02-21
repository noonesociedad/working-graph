import React, { useState } from 'react';
import Bargraphcoin from './Bargraphcoin';
import Coingraph from './Coingraph';

const GraphSwitcher = () => {
  const [graphType, setGraphType] = useState('bar');

  return (
    <div>
      <h1>Coin Price Graph</h1>
      <div>
        <button onClick={() => setGraphType('bar')}>Bar Graph</button>
        <button onClick={() => setGraphType('line')}>Line Graph</button>
      </div>
      {graphType === 'bar' ? <Bargraphcoin /> : <Coingraph />}
    </div>
  );
};

export default GraphSwitcher;