import { IonContent, IonIcon, IonImg, IonInput, IonPage, IonSearchbar, IonTitle } from "@ionic/react";
import React from "react";
import NotificationCard from "../components/CNotificationItem/NotificationCard";
import HeaderApp from "../components/CHeader/HeaderApp";
import FieldCard from "../components/FieldCard/FieldCard";

const Create: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <HeaderApp></HeaderApp>
                <h1 className="ctitle">
                    Bonjour, lol
                </h1>
                <h2 className="ctitle">
                    bonjour ihany fa kelikely
                </h2>
                <div className="searchbar">
                    <IonInput></IonInput>
                    <IonImg className="searchbar-icon" src="/assets/icons/SearchIcon.png"></IonImg>
                </div>
                
                <div className="Field-Scroll">
                    <div className="fieldList">
                        <a href="/field">
                            <FieldCard
                                fieldAreaText="451,156 km²"
                                locationText="452RH+, Analamanga, Antananarivo"
                            />
                        </a>
                        <a href="/field">
                            <FieldCard
                                fieldAreaText="451,156 km²"
                                locationText="452RH+, Analamanga, Antananarivo"
                            />
                        </a>
                        <a href="/field">
                            <FieldCard
                                fieldAreaText="451,156 km²"
                                locationText="452RH+, Analamanga, Antananarivo"
                            />
                        </a>

                    </div>
                </div>
            </IonContent>
        </IonPage>
    );

}

export default Create;