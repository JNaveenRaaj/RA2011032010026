import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [trainDetail, setTrainDetails] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://20.244.56.144:80/train/trains';
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI3MTczODYsImNvbXBhbnlOYW1lIjoiVHJhaW4tQ2VudHJhbCIsImNsaWVudElEIjoiNjk1YWNlOGQtOTAxMi00ZDdmLTkzY2EtMmUzYzA3MDVkNzIxIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlJBMjAxMTAzMjAxMDAyNiJ9.4h8yS9iarlIVNqfGpxZ5pNMuRssqr-dxTybTWmdQ9dg';

    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    axios.get(apiUrl, { headers })
      .then(response => setTrainDetails(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Train Details</h1>
      <ul className="train-list">
        {trainDetail.map(train => (
          <li key={train.trainNumber} className="train-item">
            <div className="train-name">{train.trainName}</div>
            <div className="train-info">
              <div>Train Number: {train.trainNumber}</div>
              <div>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}:{train.departureTime.Seconds}</div>
              <div>Seats Available: AC = {train.seatsAvailable.AC}, Sleeper = {train.seatsAvailable.sleeper}</div>
              <div>Price: AC = {train.price.AC}, Sleeper = {train.price.sleeper}</div>
              <div>Delay By: {train.delayedBy}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
