import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonTextarea, IonToolbar } from "@ionic/react";
import React,{useState, useRef} from "react";
import SearchBar from "../components/MapGoogle/SearchBar";
import ScreenshotButton from "../components/MapGoogle/ScreenshotButton";

import './../theme/assets/pages/style.css';
import FileUploader from "../components/FileUploader";
import "./../theme/assets/pages/InsertMap.css";
import "./../theme/assets/pages/InsertMap.css"

interface Location {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
}

const InsertMap: React.FC = () => {
    const [searchLocation, setSearchLocation] = useState<Location>({id: 1, position:{ lat: -18.777192, lng: 46.854328 }});

    const [draggable, setDraggable] = useState(true);
    const handleEditButtonClick = () => {
        setDraggable(true);
      };

    const handleSearch = (location: Location) => {
      setSearchLocation(location);
    };

    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
  
    function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
    }

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
                    draggable={draggable}
                    defaultValue={null}
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
                        <IonRow>
                            <IonCol size="12">
                                <FileUploader></FileUploader>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <div className="submit-button">
                                    <button className="cButton">Validate</button>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default InsertMap