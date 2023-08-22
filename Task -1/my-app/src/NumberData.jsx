import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NumberData() {
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const [fibonacciNumbers, setFibonacciNumbers] = useState([]);
  const [oddNumbers, setOddNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);

  useEffect(() => {
    async function fetchData(apiURL, setData) {
      try {
        const response = await axios.get(apiURL);
        const numbers = response.data.numbers;
        setData(numbers);
      } catch (error) {
        console.error(`Error fetching data from ${apiURL}:`, error);
      }
    }

    fetchData('http://20.244.56.144/numbers/primes', setPrimeNumbers);
    fetchData('http://20.244.56.144/numbers/fibo', setFibonacciNumbers);
    fetchData('http://20.244.56.144/numbers/odd', setOddNumbers);
    fetchData('http://20.244.56.144/numbers/rand', setRandomNumbers);
  }, []);

  const allNumbers = [
    ...primeNumbers,
    ...fibonacciNumbers,
    ...oddNumbers,
    ...randomNumbers,
  ];

  const uniqueSortedNumbers = [...new Set(allNumbers)].sort((a, b) => a - b);

  return (
    <div>
      <h1>Number Data</h1>
      <ul>
        {uniqueSortedNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default NumberData;
