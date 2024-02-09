import React, { useState, useRef } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonInput,
  IonList,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';

function Login() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Hello! Welcome Back</h1>
        <IonList>
            <IonItem>
              <IonInput label="Email input" type="email" placeholder="email@domain.com"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label="Password input" type="password" value="password"></IonInput>
            </IonItem>
        </IonList>
        <IonButton expand="block" href='/home'>
          <p>Login</p>
        </IonButton>
        <p>or continue with</p>
        <IonButton expand="block">
          <p>Google</p>
        </IonButton>
        <p>don't have an account? <a id="open-modal">Signin</a></p>

        {/* Modal sections for signin */}

        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <h1>Lets get started!</h1>
            <IonItem>
              <IonInput
                label="Enter your name"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Your name"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Enter your mail address"
                labelPlacement="stacked"
                ref={input}
                type="email"
                placeholder="email@domain.com"
              />
            </IonItem>
            <IonItem>
              <IonInput 
                label="Password" 
                labelPlacement="stacked"
                ref={input}
                type="password"
                placeholder="your password"
              />
            </IonItem>
            <IonItem>
              <IonInput 
                label="Confirm Password" 
                labelPlacement="stacked"
                ref={input}
                type="password"
                placeholder="your password"
              />
            </IonItem>
            <IonButton expand="block" onClick={() => confirm()}>
              <p>Signin</p>
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Login;