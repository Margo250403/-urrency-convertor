import React, { useEffect, useRef, useState } from 'react';
import {Convertor} from './components/Convertor/Convertor';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const ratesRef = useRef({});
  
  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    })
    .catch(err => {
      console.warn(err);
    });
  },[]);

  const onChangeFromPrice = (value) => {
    const price = value /ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  }
  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  }

  useEffect(() =>{
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() =>{
    onChangeToPrice(toPrice);
  }, [toCurrency]);


  return (
    <div className="App">
      <Convertor value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Convertor value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
