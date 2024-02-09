import React, { useState } from 'react';
import { IonRow, IonCol, IonAvatar, IonLabel } from '@ionic/react';

const CNotificationItem: React.FC<{ username: string; message: string; read: boolean }> = ({
  username,
  message,
  read,
}) => {
  const [isRead, setIsRead] = useState(read);

  const markAsRead = () => {
    setIsRead(true);
  };

  return (
    <IonRow
      style={{
        backgroundColor: isRead ? '#f0f0f0' : '#fff',
        padding: '10px',
        borderBottom: '1px solid #ddd',
      }}
    >
      <IonCol size="2">
        <IonAvatar>
          <img src="/assets/image/user-profile.png" alt="Profile" />
        </IonAvatar>
      </IonCol>
      <IonCol size="8">
        <IonLabel>
          <strong>{username}</strong>
        </IonLabel>
      </IonCol>
      <IonCol size="2">
        {!isRead && (
          <IonLabel style={{ color: '#387ef5', cursor: 'pointer' }} onClick={markAsRead}>
            Mark as Read
          </IonLabel>
        )}
      </IonCol>
      <IonRow>
        <IonCol>
          <IonLabel>{message}</IonLabel>
        </IonCol>
      </IonRow>
    </IonRow>
  );
};

export default CNotificationItem;
