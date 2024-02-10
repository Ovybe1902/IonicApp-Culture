// FieldCard.tsx

import React from 'react';
import { IonCard, IonCardContent, IonRow, IonCol, IonText, IonIcon } from '@ionic/react';
import MapIcon from '/assets/icons/location-icon.svg';
import './FieldCard.css'; // Custom CSS file for styling
import { Link } from 'react-router-dom';

interface FieldCardProps {
  field:
  {
    id: string;
    area: string;
    location: string;
    plots: any[];
  };
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  const encodedObject = encodeURIComponent(JSON.stringify(field));
  return (
    <IonCard className="field-card">
      <div className='nb-plot-container'>
        <h3 className='nb-plot'>plot : {field.plots.length}</h3>
      </div>
      <div className="image-container">
        <img src="/assets/icons/map-image.png" alt="Field Image" className="field-image" />
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
