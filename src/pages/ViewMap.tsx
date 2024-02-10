import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonTextarea, IonToolbar } from "@ionic/react";
import React,{useState, useRef, useEffect} from "react";
import SearchBar from "../components/MapGoogle/SearchBar";
import ScreenshotButton from "../components/MapGoogle/ScreenshotButton";

import './../theme/assets/pages/style.css';
import FileUploader from "../components/FileUploader";
import "./../theme/assets/pages/InsertMap.css";
import "./../theme/assets/pages/InsertMap.css";
import { useLocation } from 'react-router-dom';

interface Location {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
}

const ViewMap: React.FC = () => {
    const [searchLocation, setSearchLocation] = useState<Location>({id: 1, position:{ lat: -18.777192, lng: 46.854328 }});

    const handleSearch = (location: Location) => {
      setSearchLocation(location);
    };

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const encodedObject = queryParams.get('data');

    // // Decode and parse the object
    // const field = JSON.parse(decodeURIComponent(encodedObject));

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
  
    function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
    }

    const [draggable, setDraggable] = useState(false);
    const handleEditButtonClick = () => {
        setDraggable(true);
      };

    /*
        get value form webservice by mapId
    */

        const example = [
            { id: 1, position: { lat: -19.777192, lng: 48.854328 } },
            { id: 2, position: { lat: -18.777192, lng: 47.854328 } },
            { id: 3, position: { lat: -18.417192, lng: 45.854328 } },
            { id: 4, position: { lat: -16.157192, lng: 46.854328 } }
            ];

    return(
        <IonPage>
            <div className="header-search">
                <button>
                    <a className='cButton back' href="/home">back</a>
                </button>
                <SearchBar onSearch={handleSearch} />
            </div>
            <IonContent>
                <ScreenshotButton 
                    searchLocation={searchLocation} 
                    defaultValue={example} 
                    draggable={draggable}
                    onEditButtonClick={handleEditButtonClick}
                />
                
                <IonModal ref={modal} trigger="open-modal" className="modal-insert-field">
                    <IonHeader>
                        <IonToolbar>
                        <IonButtons slot="start">
                            <button onClick={() => modal.current?.dismiss()}>
                                <a className='cButton back'>back</a>
                            </button>
                        </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonRow>
                            <IonCol size="12">
                                <h1>Insert Field!</h1>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonInput label="plot number" type="number">

                                </IonInput>
                                <IonTextarea
                                    label="Description"
                                    labelPlacement="stacked"
                                    placeholder="Description"
                                />
                            </IonCol>
                        </IonRow>
                        {draggable && (
                            <IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <FileUploader></FileUploader>
                                    </IonCol>
                                </IonRow>
                                <IonCol size="12">
                                    <div className="submit-button">
                                        <button className="cButton">Validate</button>
                                    </div>
                                </IonCol>
                            </IonRow>
                        )}
                        {!draggable && (
                            <IonRow>
                                <IonRow>
                                    <h1>Image Previews</h1>
                                    {/* Image Previews */}
                                </IonRow>
                            </IonRow>
                        )}
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default ViewMap;