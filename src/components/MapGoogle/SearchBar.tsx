import React, { useState } from 'react';
import axios from 'axios';
import { IonSearchbar } from '@ionic/react';

interface Location {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
}

interface SearchBarProps {
    onSearch: (location:{id: number; position: { lat: number; lng: number }}) => void;
  }

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [placeName, setPlaceName] = useState('');

  const apiKey = 'AIzaSyBGOok-9EsctgcbD9Cl_a4_EJ7ASkCMZxc';

  const handleSearch = async () => {
    try {
    console.log("PREVIOUS :"+placeName);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          placeName
        )}&key=${apiKey}`
      );

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const foundLocation = response.data.results[0].geometry.location;
        console.log(`Latitude: ${foundLocation.lat}, Longitude: ${foundLocation.lng}`);
        
        const lastFoundLocation = {id:1, position:{lat:foundLocation.lat, lng:foundLocation.lng}}

        onSearch(lastFoundLocation);
      } else {
        console.error('Failed to retrieve location information.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <IonSearchbar
          className="mysearchbar" 
          placeholder="Enter place name"
          value={placeName}
          onIonInput={e => setPlaceName((e.target as any).value)}
          onIonChange={handleSearch}
        /> 
    </div>
  );
};

export default SearchBar;
