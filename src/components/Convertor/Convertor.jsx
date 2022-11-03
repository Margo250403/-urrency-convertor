import { useState, useEffect } from "react";
import axios from 'axios';
import cc from 'currency-codes';
import { mock } from "../../constants";
import { Input } from "../Input/Input";

export const Convertor = ({ value, currency, onChangeValue, onChangeCurrency }) => {

  const baseCurrencies = [840, 980, 978, 826];
  const [getCurrencyByNumber, setCurrencyByNumber] = useState([]);
  const [currencyRates, setCurrencyRates] = useState([]);
  const [type, setType] = useState('from');
  const [formAmountValue, setFromAmountValue] = useState('');
  const [toAmountValue, setToAmountValue] = useState('');
  const [formCurrencyValue, setFromCurrencyValue] = useState('');
  const [toCurrencyValue, setToCurrencyValue] = useState('');
  const [defaultCurrencies, setDefaultCurrencies] = useState({
    to: { code: "USD", number: 840 },
    from: { code: "UAH", number: 980 },
  })



  const generateCurrencyByNumber = () => {
    return baseCurrencies
      .map((number) => cc.number(number))
      .map(({ code, number }) => ({ code, number }))
  }
  useEffect(() => {
    setCurrencyByNumber(generateCurrencyByNumber());
    setCurrencyRates(mock);
    // axios.get('https://api.monobank.ua/bank/currency')
    //   .then((data)=>{
    //     console.log(data);
    //   })
    //   .catch((e)=>{
    //     console.log(e);
    //   })

  }, []);

  useEffect(() => {
    const fromOrTo = type === 'from' ? 'currencyCodeA' : 'currencyCodeB';
    //{"currencyCodeA":840,"currencyCodeB":980,"date":1666818609,"rateBuy":36.65,"rateSell":37.4406}
    console.log(formAmountValue, toAmountValue, formCurrencyValue, toCurrencyValue)
    const getcurrencyByType = type === 'from' ? formAmountValue : toAmountValue;
    const result = currencyRates.find(item=>item[type] === getcurrencyByType);
    console.log(result);
  }, [formAmountValue, toAmountValue, formCurrencyValue, toCurrencyValue])

  const fromInputValue = (value) => {
    setFromAmountValue(value)
    setType('from')
  }

  const toInputValue = (value) => {
    setToAmountValue(value)
    setType('to')
  }

  const fromSelectValue = (value) => {
    setFromCurrencyValue(value)
    setType('from')
  }

  const toSelectValue = (value) => {
    setToCurrencyValue(value)
    setType('to')
  }

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">Currency Converter</h1>
        <Input
          currencyData={getCurrencyByNumber}
          type='from'
          getInputValue={fromInputValue}
          getSelectValue={fromSelectValue}
          defaultCurrencies={defaultCurrencies.to}
        />
        <Input
          currencyData={getCurrencyByNumber}
          type='to'
          getInputValue={toInputValue}
          getSelectValue={toSelectValue}
          defaultCurrencies={defaultCurrencies.from}
        />
      </div>
    </div>
  )
}
