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
  IonImg,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import './Login.css';

function Login() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="deco">

        </div>
        <div className="login">
          <div className="image-logo-log">
            <IonImg src="assets/image/logo.png" alt="logo" />
          </div>
          <h1>Hello! Welcome Back <span className='huhu'>^3^</span></h1>
          <div className="logform">
            <div className="Error Message">
              <h4>This is an error message "-^-</h4>
            </div>
            <div className="Success Message">
              <h4>This is a success message ¨^O^¨</h4>
            </div>
            <IonList>
                <IonItem>
                  <div className="inputContain">
                    <IonInput type="email" placeholder="email@domain.com"></IonInput>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="inputContain">
                    <IonInput type="password" value="password"></IonInput>
                  </div>
                </IonItem>
            </IonList>
            <div className="button-log">
              <IonButton expand="block" href='/home'>
                <p className='label-button'>Login</p>
              </IonButton>
            </div>
              <p className='text-log'>don't have an account?</p>
            <div className="button-log">
              <IonButton expand="block" id="open-modal">
                <p className='label-button'>Signin</p>
              </IonButton>
            </div>
          </div>
        </div>
        
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
              <div className="deco">
            
              </div>
              <div className="login sign">
                <h1>Lets get started! <span className='huhu'>¨^O^¨</span></h1>
                <div className="logform">
                  <IonItem>
                    <div className="inputContain">
                      <IonInput
                        labelPlacement="stacked"
                        ref={input}
                        type="text"
                        placeholder="Your name"
                      />
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="inputContain">
                      <IonInput
                        labelPlacement="stacked"
                        ref={input}
                        type="email"
                        placeholder="email@domain.com"
                      />
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="inputContain">
                      <IonInput 
                        labelPlacement="stacked"
                        ref={input}
                        type="password"
                        placeholder="your password"
                      />
                    </div>
                  </IonItem>
                  <IonItem>
                    <div className="inputContain">
                      <IonInput 
                        labelPlacement="stacked"
                        ref={input}
                        type="password"
                        placeholder="confirm password"
                      />
                    </div>
                  </IonItem>
                  <div className="button-log">
                    <IonButton expand="block" onClick={() => confirm()}>
                      <p className='label-button'>Signin</p>
                    </IonButton>
                  </div>
                </div>
              </div>
            </IonContent>
          </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Login;