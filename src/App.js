import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SearchForm from './components/SearchForm.js'

function App() {
  const [breweries, setBreweries] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState('true');

  useEffect(() => {
      fetch('https://api.openbrewerydb.org/breweries')
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
      .then(breweries => {
        setBreweries(breweries)
        console.log(breweries)
      })
      .catch(error => {
        console.error("error fetching data: ", error);
        setError(error); 
      })
      .finally(() => {
        setLoading(false);
      })
    }, []); 
  
    
  



  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </div>
  );
}

export default App;
