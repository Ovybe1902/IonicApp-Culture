import React, { useEffect, useRef, useState } from 'react';
import { IonRow, IonCol, IonText, IonIcon, IonButton, IonHeader, IonModal, IonContent, IonList, IonItem, IonImg, IonInput } from '@ionic/react';
import { notificationsOutline, personOutline, closeOutline, createOutline } from 'ionicons/icons';
import NotificationCard from '../CNotificationItem/NotificationCard';
import "./HeaderApp.css";
import Cookies from 'js-cookie';
import axios from 'axios';

interface CHeaderProps {
  notifications: any[];
}

interface wallet_balance{
  idOwner : number;
  amount : number;
}

interface depositRequest{
  idOwner: number;
  amount : number;
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
    Cookies.remove('balance');
    Cookies.remove('number');
    Cookies.remove('idWallet');



    window.location.href = '/login';
  };

  const [wallet_balance, setWallet_balance] = useState<wallet_balance>({
    idOwner: Number.parseInt(Cookies.get('userId')!),
    amount: 0,
  });  

  const [depositRequest, setDepositRequest] = useState<depositRequest>({
    idOwner: Number.parseInt(Cookies.get('userId')!),
    amount: 0,
  });  

  const handleDeposit = async () => {
    const response = await axios.post('http://localhost:8080/api/wallet/deposit', depositRequest);
    if(response.status === 200){
      Cookies.set("balance", response.data.wallet.balance);
    }

  };

   useEffect (() => {
    setWallet_balance({amount: Number.parseInt(Cookies.get('balance')!), idOwner: Number.parseInt(Cookies.get('userId')!)});
  }, [wallet_balance]);

  return (
    <IonHeader className="headerapp">
      <IonRow className="headerapp-row ion-align-items-center">
        <IonCol size="6">
        <IonImg src="assets/image/logo-home.png" alt="logo" />
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
            <IonCol size='12'>
              <div className="wallet">
                <h1> {Cookies.get("balance")}💲</h1>
                <button><h1>+</h1></button>
              </div>
            </IonCol>

            <IonCol size='12'>
              <div className="add wallet">
                <IonInput type='number' onIonChange={(e) => setDepositRequest({ ...depositRequest, amount: Number.parseInt(e.detail.value!) })}></IonInput>
                <button onClick={handleDeposit}><h1>+</h1></button>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="disconnect-button-row ion-align-items-center ion-justify-content-center">
            <button className="disconnect-button" onClick={handleLogout}> 
              Disconnect
            </button>
          </IonRow>
        </div>
        </IonContent>
      </IonModal>
    </IonHeader>
  );
};

export default HeaderApp;
