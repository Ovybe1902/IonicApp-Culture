import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

function FloatingButton() {
  return (
    <IonFab>
      <IonFabButton href="/addfield">
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}
export default FloatingButton;