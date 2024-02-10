import { IonContent, IonIcon, IonImg, IonInput, IonPage, IonSearchbar, IonTitle } from "@ionic/react";
import React from "react";
import {useEffect, useState} from "react";
import NotificationCard from "../components/CNotificationItem/NotificationCard";
import HeaderApp from "../components/CHeader/HeaderApp";
import FieldCard from "../components/FieldCard/FieldCard";
import axios from 'axios';

interface Field {
    field: any;
  }

const Create: React.FC = () => {
    const[fields, setFields] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        // setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 500));
        const endpoint = `http://localhost:8080/api/fields`;
    
        try {
          const response = await axios.get<Field[]>(endpoint);
          setFields(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }finally{
        //   setLoading(false);
        }
      };

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
                            {fields.map((field, index) => (
                                <FieldCard key={index} field={field} />
                            ))}
                        </a>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );

}

export default Create;