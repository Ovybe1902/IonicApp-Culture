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
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import Cookies from 'js-cookie';
import Loader from '../components/Loader';

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
  const [isLoading, setIsLoading] = useState(false); // State to control the loader

  const handleLogin = async () => {
    setIsLoading(true); // Set the loader to true (display it
    try {
      // Assuming your API endpoint is at http://example.com/login
      const response = await axios.post('https://d3ds3c.me/api/login', credentials);
      console.log(response.data); // handle response as needed
      Cookies.set('userId', response.data.idOwner);
      Cookies.set('username', response.data.name);
      Cookies.set('email', response.data.email);
      Cookies.set('idWallet', response.data.wallet.idWallet);
      Cookies.set("number", response.data.wallet.number);
      Cookies.set("balance", response.data.wallet.balance);
      setIsLoading(false); // Set the loader to false (hide it)
      history.push('/home'); // Replace '/home' with your target route


    } catch (error) {
      setIsLoading(false); // Set the loader to false (hide it  
      const element = document.getElementById("msg");
      if(element!==null)
        element.innerHTML = "<div class='Error Message'><h4>Wrong email or password '-^-'</h4></div>";
      console.error('Login failed:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true); // Set the loader to true (display it)
      // Assuming your API endpoint is at http://example.com/signup

      if(informations.pwd !== informations.pwdconfirm){
        setIsLoading(false); // Set the loader to false (hide it)
        console.error('Password confirmation failed');
        return;
      }
      const response = await axios.post('https://d3ds3c.me/api/register', informations);
      console.log(response.data); // handle response as needed
      Cookies.set('userId', response.data.idOwner);
      Cookies.set('username', response.data.name);
      Cookies.set('email', response.data.email);
      window.location.href = "/home";
      console.log("hey");
    } catch (error) {
      setIsLoading(false); // Set the loader to false (hide it) 
      console.error('Signin failed:', error);
    }
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
            <div id="msg">
            </div>
            <IonList>
                <IonItem>
                  <div className="inputContain">
                    <IonInput type="email" placeholder="email@domain.com" onIonChange={(e) => setCredentials({ ...credentials, email: e.detail.value! })}></IonInput>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="inputContain">
                    <IonInput type="password" placeholder='Password' onIonChange={(e) => setCredentials({ ...credentials, pwd: e.detail.value! })}></IonInput>
                  </div>
                </IonItem>
            </IonList>
            {isLoading ? 
                (<Loader />) :
                
                <div className="button-log">
                  <IonButton expand="block" onClick={handleLogin}>
                  <p className='label-button'>Login</p>
                  </IonButton>
              </div>
                
            }
            
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
                        onIonChange={(e) => setInformations({ ...informations, name: e.detail.value! })}
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
                        onIonChange={(e) => setInformations({ ...informations, email: e.detail.value! })}
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
                        onIonChange={(e) => setInformations({ ...informations, pwd: e.detail.value! })}
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
                        onIonChange={(e) => setInformations({ ...informations, pwdconfirm: e.detail.value! })}
                      />
                    </div>
                  </IonItem>

                  {isLoading ? 
                    (<Loader />) :
                    
                    <div className="button-log">
                      <IonButton expand="block" onClick={handleSignIn}>
                        SIGNIN
                      </IonButton>
                    </div>
                }
                 
                </div>
              </div>
            </IonContent>
          </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Login;