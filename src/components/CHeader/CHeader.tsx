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
import CNotificationCard from '../CNotificationCard/CNotificationCard';

interface CHeaderProps{
  notifications: any[];
}
const CHeader: React.FC<CHeaderProps> = ({notifications}) => {
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
            <IonBadge color="danger">{notifications.length}</IonBadge>
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
            {notifications.map((notification) => (
              <CNotificationCard
                userProfileImage="public\assets\image\johnDoe.jpg"
                username='Admin'
                message={notification.body}
              />
            ))}
           
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
