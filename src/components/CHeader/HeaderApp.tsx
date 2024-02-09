import React, { useEffect, useRef, useState } from 'react';
import { IonRow, IonCol, IonText, IonIcon, IonButton, IonHeader, IonModal, IonContent, IonList, IonItem, IonImg } from '@ionic/react';
import { notificationsOutline, personOutline, closeOutline, createOutline } from 'ionicons/icons';
import NotificationCard from '../CNotificationItem/NotificationCard';
import "./HeaderApp.css";
import Cookies from 'js-cookie';

interface CHeaderProps {
  notifications: any[];
}




const HeaderApp: React.FC<CHeaderProps> = ({ notifications }) => {
  const notificationsModalRef = useRef<HTMLIonModalElement>(null);
  const userMenuModalRef = useRef<HTMLIonModalElement>(null);

  const openNotificationsModal = () => {
    notificationsModalRef.current?.present();
  };

  const openUserMenuModal = () => {
    userMenuModalRef.current?.present();
  };

  const closeModals = () => {
    notificationsModalRef.current?.dismiss();
    userMenuModalRef.current?.dismiss();
  };



  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('username');
    Cookies.remove('email');
    window.location.href = '/login';
  };

  return (
    <IonHeader className="headerapp">
      <IonRow className="headerapp-row ion-align-items-center">
        <IonCol size="6">
          <IonText className="bold-text">Kultur</IonText>
        </IonCol>
        <IonCol size="6" className="ion-text-right">
          <IonButton className="icon-button" onClick={openNotificationsModal}>
            <IonIcon icon={notificationsOutline} />
          </IonButton>
          <IonButton className="icon-button" onClick={openUserMenuModal}>
            <IonIcon icon={personOutline} />
          </IonButton>
        </IonCol>
      </IonRow>

      {/* Notifications Modal */}
      <IonModal ref={notificationsModalRef} onDidDismiss={closeModals}>
        <IonContent>
          <IonList>
            <IonButton onClick={closeModals} fill="clear" slot="end">
              <IonIcon icon={closeOutline} />
            </IonButton>
            <IonItem>
              <div>
                {notifications.map((notification, index) => (
                  <NotificationCard
                    key={index}
                    userProfileImage="public\assets\image\johnDoe.jpg"
                    username='Admin'
                    message={notification.body}
                  />
                ))}
              </div>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>

      {/* User Menu Modal */}
      <IonModal ref={userMenuModalRef} onDidDismiss={closeModals}>
        <IonContent>
        <div className="user-profile">
          <IonButton onClick={closeModals} fill="clear" slot="end">
            <IonIcon icon={closeOutline} />
          </IonButton>
          <IonRow className="profile-pic-row ion-align-items-center ion-justify-content-center">
            <div className="image-container">
              <IonImg className="profile-pic" src="/assets/image/johnDoe.jpg" alt="Profile Pic" />
            </div> 
          </IonRow>
          <div className="basic-info">
            <IonRow className="username-row ion-align-items-center ion-justify-content-center">
              <div className="username-group">
                <IonText className="username" style={{ fontSize: '32px', fontWeight: 'bold' }}>{Cookies.get('username')}</IonText>
                <IonImg className="certified-icon" src="/assets/icons/certified.png" alt="Certified" />
              </div>
            </IonRow>
            <IonRow className="email-row ion-align-items-center ion-justify-content-center">
              <IonText className="email-address" style={{ fontSize: '16px', fontWeight: '600', opacity: '0.6' }}>{Cookies.get('email')}</IonText>
            </IonRow>
          </div>
          <IonRow>
            <IonCol size='6'>
              <div className="user-info surface">
                <h1>45621 ha</h1>
                <p>owned surface</p>
              </div>
            </IonCol>
            <IonCol size='6'>
              <div className="user-info plot">
                <h1>4512</h1>
                <p>plot number</p>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="disconnect-button-row ion-align-items-center ion-justify-content-center">
            <IonButton className="edit-button" style={{ backgroundColor: 'rgba(231, 255, 226, 0.592)' }} >
            <IonIcon icon={createOutline} />
              Edit
            </IonButton>
            <IonButton className="disconnect-button" onClick={handleLogout}>Disconnect</IonButton>
          </IonRow>
        </div>
        </IonContent>
      </IonModal>
    </IonHeader>
  );
};

export default HeaderApp;
