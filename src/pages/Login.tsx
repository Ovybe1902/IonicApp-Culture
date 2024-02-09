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
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import Cookies from 'js-cookie';




interface UserCredentials {
  email: string;
  pwd: string;
}

interface UserInformations {
  name: string;
  email: string;
  pwd: string;
  pwdconfirm: string;
}


function Login() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }
  
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: '',
    pwd: '',
  });

  const [informations, setInformations] = useState<UserInformations>({
    name: '',
    email: '',
    pwd: '',
    pwdconfirm: ''
  });

  const history = useHistory(); // Access the history object
  const handleLogin = async () => {
    try {
      // Assuming your API endpoint is at http://example.com/login
      const response = await axios.post('http://localhost:8080/api/login', credentials);
      console.log(response.data); // handle response as needed
      Cookies.set('userId', response.data.idOwner);
      Cookies.set('username', response.data.name);
      Cookies.set('email', response.data.email);
      history.push('/home'); // Replace '/home' with your target route


    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      // Assuming your API endpoint is at http://example.com/signup

      if(informations.pwd !== informations.pwdconfirm){
        console.error('Password confirmation failed');
        return;
      }
      const response = await axios.post('http://localhost:8080/api/register', informations);
      console.log(response.data); // handle response as needed
      Cookies.set('userId', response.data.idOwner);
      Cookies.set('username', response.data.name);
      Cookies.set('email', response.data.email);
      window.location.href = "/home";
      console.log("hey");
    } catch (error) {
      console.error('Signin failed:', error);
    }
  }
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Hello! Welcome Back</h1>
        <IonList>
            <IonItem>
              <IonInput label="Email input" type="email" placeholder="email@domain.com" onIonChange={(e) => setCredentials({ ...credentials, email: e.detail.value! })}></IonInput>
            </IonItem>
            <IonItem>
              <IonInput label="Password input" type="password" value="password" onIonChange={(e) => setCredentials({ ...credentials, pwd: e.detail.value! })}></IonInput>
            </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleLogin}>
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
                onIonChange={(e) => setInformations({ ...informations, name: e.detail.value! })}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Enter your mail address"
                labelPlacement="stacked"
                ref={input}
                type="email"
                placeholder="email@domain.com"
                onIonChange={(e) => setInformations({ ...informations, email: e.detail.value! })}
              />
            </IonItem>
            <IonItem>
              <IonInput 
                label="Password" 
                labelPlacement="stacked"
                ref={input}
                type="password"
                placeholder="your password"
                onIonChange={(e) => setInformations({ ...informations, pwd: e.detail.value! })}
              />
            </IonItem>
            <IonItem>
              <IonInput 
                label="Confirm Password" 
                labelPlacement="stacked"
                ref={input}
                type="password"
                placeholder="your password"
                onIonChange={(e) => setInformations({ ...informations, pwdconfirm: e.detail.value! })}
              />
            </IonItem>
            <IonButton expand="block" onClick={handleSignIn}>
              <p>Signin</p>
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Login;