import React, { useRef } from 'react';
import { IonRow, IonCol, IonText, IonIcon, IonButton, IonHeader, IonModal, IonContent, IonList, IonItem, IonImg } from '@ionic/react';
import { notificationsOutline, personOutline, closeOutline, createOutline } from 'ionicons/icons';
import NotificationCard from '../CNotificationItem/NotificationCard';

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
          {/* Your user menu content */}
        </IonContent>
      </IonModal>
    </IonHeader>
  );
};

export default HeaderApp;
