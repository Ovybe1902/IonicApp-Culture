import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, PolygonF } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import MyPngImage from './map-location-icon.svg';
import './MapGoogle.css';
import { IonButton, IonCol, IonRow, IonTitle } from '@ionic/react';

interface Location {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
}

const defaultMarkerPositions = [
  { id: 1, position: { lat: -18.777192, lng: 46.854328 } },
  { id: 2, position: { lat: -18.777192, lng: 46.854328 } },
  { id: 3, position: { lat: -18.777192, lng: 46.854328 } },
  { id: 4, position: { lat: -18.777192, lng: 46.854328 } }
];

interface MapGoogleProps {
  searchLocation: Location;
  draggable: boolean;
  defaultValue : Location[] | null;
  onEditButtonClick: () => void;
}

const MapGoogle: React.FC<MapGoogleProps> = ({ searchLocation, draggable, defaultValue, onEditButtonClick }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  const [markers, setMarkers] = useState<Location[]>(defaultValue || defaultMarkerPositions);

  const [surface, setSurface] = useState(0);

  const handleMarkerDrag = (markerId: number, newPosition: { lat: number; lng: number }) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) => (marker.id === markerId ? { ...marker, position: newPosition } : marker))
    );
  };

  useEffect(() => {
    if (searchLocation && draggable == true) {
    console.log(searchLocation);
    setMarkers((prevMarkers) => [
        { id: 1, position: { lat: searchLocation.position.lat, lng: searchLocation.position.lng } },
        { id: 2, position: { lat: searchLocation.position.lat, lng: searchLocation.position.lng } },
        { id: 3, position: { lat: searchLocation.position.lat, lng: searchLocation.position.lng } },
        { id: 4, position: { lat: searchLocation.position.lat, lng: searchLocation.position.lng } },
        ]);
    }
  }, [searchLocation]);

  const coordinates = markers.map((marker) => ({ lat: marker.position.lat, lng: marker.position.lng }));

  useEffect(() => {
    if (markers.length >= 3) {
      try {
        const coordinates = markers.map((marker) => [marker.position.lng, marker.position.lat]);
        coordinates.push(coordinates[0]);
        const polygon = turf.polygon([coordinates]);
        const area = turf.area(polygon);
        setSurface(area);
      } catch (error) {
        console.log('NOT WORKING : ' + error);
      }
    } else {
      setSurface(0);
    }
  }, [markers]);

  const calculateCenterCoordinate = () => {
    const centerLat = markers.reduce((sum, marker) => sum + marker.position.lat, 0) / markers.length;
    const centerLng = markers.reduce((sum, marker) => sum + marker.position.lng, 0) / markers.length;
    return { lat: centerLat, lng: centerLng };
  };

  const [centerCoordinate, setCenterCoordinate] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    setCenterCoordinate(calculateCenterCoordinate());
  }, [markers]);

  const [placeName, setPlaceName] = useState<string | null>(null);

  const getPlaceName = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBGOok-9EsctgcbD9Cl_a4_EJ7ASkCMZxc`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch place information');
      }

      const data = await response.json();
      const results = data.results;

      if (results && results.length > 0) {
        setPlaceName(results[0].formatted_address);
      } else {
        setPlaceName(null);
      }
    } catch (error) {
      console.error('Error fetching place information:', error);
      setPlaceName(null);
    }
  };

  useEffect(() => {
    if (centerCoordinate) {
      getPlaceName(centerCoordinate.lat, centerCoordinate.lng);
      console.log(placeName);
    }
  }, [centerCoordinate]);

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBGOok-9EsctgcbD9Cl_a4_EJ7ASkCMZxc">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={markers[0].position} zoom={14} mapTypeId="satellite">
        {markers.map((marker) => (
            <MarkerF
            key={marker.id}
            position={{ lat: marker.position.lat, lng: marker.position.lng }}
            icon={{
                url: MyPngImage,
                scaledSize: { width: 80, height: 80 },
                fillColor: '#569ed2',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 1,
              }}
            draggable={typeof draggable === 'boolean' ? draggable : false} 
            onDragEnd={(e) => {
                if (e.latLng) {
                handleMarkerDrag(marker.id, { lat: e.latLng.lat(), lng: e.latLng.lng() });
                }
            }}
            />
        ))}

          {markers.length >= 3 && (
            <PolygonF
              path={coordinates}
              options={{
                strokeColor: '#ffffff',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#1CBA70',
                fillOpacity: 0.35,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div className="infos">
        {!draggable && (
          <IonRow>
            <IonCol size="12">
              <button onClick={onEditButtonClick} className='edit-button'>Edit</button>
            </IonCol>
          </IonRow>
        )}
        <IonRow>
          <IonCol size='6'> 
          <div className="info-item up">
            <h1>{surface.toFixed(2)} m²</h1>
            <h2>Surface</h2>
          </div>
          </IonCol>
          <IonCol size='6'> 
          <div className="info-item up">
            <h1>{placeName || 'Unknown Place'}</h1>
            <h2>Place</h2>
          </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='6'>
            <div className="info-item">
              <h1>{centerCoordinate?.lng.toFixed(6) || '-'}</h1>
              <h2>Long</h2>
            </div>
          </IonCol>
          <IonCol size='6'>
            <div className="info-item">
              <h1>{centerCoordinate?.lat.toFixed(6) || '-'}</h1>
              <h2>Lat</h2>
            </div>
          </IonCol>
        </IonRow>
      </div>
    </>
  );
};

export default MapGoogle;
