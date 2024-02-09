// NotificationCard.tsx

import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonRow, IonCol, IonToggle } from '@ionic/react';
import './NotificationCard.css'; // Custom CSS file for styling

interface NotificationCardProps {
  userProfileImage: string;
  username: string;
  message: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ userProfileImage, username, message }) => {
  const [isMarkAsRead, setIsMarkAsRead] = useState(false);

  const handleToggleChange = () => {
    setIsMarkAsRead(!isMarkAsRead);
  };

  return (
    <IonCard className={`notification-card ${isMarkAsRead ? 'read' : 'unread'}`}>
      <IonCardHeader>
        <IonRow className="header-row ion-align-items-center">
          <IonCol size="2" className="ion-align-self-center">
            <div className="image-container">
              <img src={userProfileImage} alt="User Profile" className="user-profile-img" />
            </div>
          </IonCol>
          <IonCol size="6">
            <IonCardSubtitle className="username" text-wrap="wrap">{username}</IonCardSubtitle>
          </IonCol>
          <IonCol size="4" className="ion-align-self-center">
            <IonToggle className="mark-as-read-toggle" checked={isMarkAsRead} onIonChange={handleToggleChange}>Read</IonToggle>
          </IonCol>
        </IonRow>
      </IonCardHeader>
      <IonCardContent>
        <IonRow className="message-row">
          <p>{message}</p>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default NotificationCard;
