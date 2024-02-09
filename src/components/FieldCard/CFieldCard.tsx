import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import mapImg from '/assets/icons/map-photo.png'


function CFieldCard() {
  return (
    <div className="cCard">
      <div className="imgContainer">
        <img alt="Silhouette of mountains" src={mapImg} />
      </div>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>15.456 km²</IonCardTitle>
          <IonCardSubtitle>Antananarivo</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </div>
  );
}
export default CFieldCard;