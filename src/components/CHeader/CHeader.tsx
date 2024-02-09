import React, { useRef } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { notificationsOutline, personOutline, closeOutline } from 'ionicons/icons';
import CNotificationItem from '../CNotificationItem/CNotificationItem';

const CHeader: React.FC = () => {
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

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={openNotificationsModal}>
            <IonIcon slot="icon-only" icon={notificationsOutline} />
            <IonBadge color="danger">3</IonBadge>
          </IonButton>
        </IonButtons>

        <IonButtons slot="end">
          <IonButton onClick={openUserMenuModal}>
            <IonIcon slot="icon-only" icon={personOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Notifications Modal */}
      <IonModal ref={notificationsModalRef} onDidDismiss={closeModals}>
        <IonContent>
          <IonList>
            {/* Add your notification items here */}
            <IonButton onClick={closeModals} fill="clear" slot="end">
              <IonIcon icon={closeOutline} />
            </IonButton>
            <IonItem>
              <CNotificationItem username='Jean' message="vous a envoyé une demande d'amis" read={false}></CNotificationItem>
            </IonItem>
            <IonItem>
              <CNotificationItem username='Koto' message="vous a envoyé une demande d'amis" read={false}></CNotificationItem>
            </IonItem>
            <IonItem>
              <CNotificationItem username='Laitsa' message="vous a envoyé une demande d'amis" read={true}></CNotificationItem>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>

      {/* User Menu Modal */}
      <IonModal ref={userMenuModalRef} onDidDismiss={closeModals}>
        <IonContent>
          <IonList>
            <IonButton onClick={closeModals} fill="clear" slot="end">
              <IonIcon icon={closeOutline} />
            </IonButton>
            <IonItem>
              <IonButton>Show Profile</IonButton>
            </IonItem>
            <IonItem>
              <IonButton href='/login'>Disconnect</IonButton>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </IonHeader>
  );
};

export default CHeader;
