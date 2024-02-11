// FieldCard.tsx

import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonRow, IonCol, IonText, IonIcon } from '@ionic/react';
import MapIcon from '/assets/icons/location-icon.svg';
import './FieldCard.css'; // Custom CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios';

interface FieldCardProps {
  field:
  {
    id: string;
    area: string;
    location: string;
    hashcode: string;
    plots: any[];
  };
}

interface Picture {
  picBase64: string;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  const encodedObject = encodeURIComponent(JSON.stringify(field));

  const [picture, setPicture] = useState<Picture>({
    picBase64: '',
  });

  useEffect(() => {

    if(field!==null){
        // Fetch data from the database using Axios
        axios
        .get('http://localhost:8080/api/picture?hashcode='+field.hashcode)
        .then((response) => {
            // Assuming your data is an array of objects with id and name properties
            setPicture(response.data);
        })
        .catch((error) => {
            console.error('Error fetching pictures: ', error);
        });
    }}, []);

  return (
    <IonCard className="field-card">
      <div className='nb-plot-container'>
        <h3 className='nb-plot'>Plot number : {field.plots.length}</h3>
      </div>
      <div className="image-container">
        <img src={picture.picBase64} alt="Field Image" className="field-image" />
      </div>
      <Link to={`/field?data=${encodedObject}`}>
        <IonCardContent className="field-card-info">
          <IonRow className="field-area-row ion-align-items-center ion-justify-content-center">
            <IonText className="field-area-text" style={{ fontSize: '32px', fontWeight: 'bold' }}>{field.location}</IonText>
          </IonRow>
          <IonRow className="location-row ion-align-items-center ion-justify-content-center">
            <IonIcon icon={MapIcon} className="location-icon" />
            <IonText className="location-text" style={{ fontSize: '20px', fontWeight: 'bold' }}>{field.area}</IonText>
          </IonRow>
        </IonCardContent>
      </Link>
    </IonCard>
  );
};

export default FieldCard;
