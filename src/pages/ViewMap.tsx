import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonTextarea, IonToolbar } from "@ionic/react";
import React,{useState, useRef, useEffect} from "react";
import SearchBar from "../components/MapGoogle/SearchBar";
import ScreenshotButton from "../components/MapGoogle/ScreenshotButton";

import './../theme/assets/pages/style.css';
import FileUploader from "../components/FileUploader";
import "./../theme/assets/pages/InsertMap.css";
import "./../theme/assets/pages/ViewMap.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Location {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
}

interface FieldViewMapProps {
      id: string;
      area: string;
      location: string;
      description: string;
      hashcode: string;
      plots: any[];
  }

  interface Picture {
    picBase64: string;
}


const ViewMap: React.FC = (FieldViewMapProps) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedObject = queryParams.get('data');
    var f: { hashcode: string; plots: string | any[]; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; } | null = null;

    // Decode and parse the object
    if(encodedObject !== null){
        f = JSON.parse(decodeURIComponent(encodedObject));
    }

    const [picture, setPicture] = useState<Picture>({
        picBase64: '',
    });

    useEffect(() => {

        if(f!==null){
            // Fetch data from the database using Axios
            axios
            .get('https://d3ds3c.me/api/picture?hashcode='+f.hashcode)
            .then((response) => {
                // Assuming your data is an array of objects with id and name properties
                setPicture(response.data);
            })
            .catch((error) => {
                console.error('Error fetching pictures: ', error);
            });
        }}, []);
    
    const [searchLocation, setSearchLocation] = useState<Location>({id: 1, position:{ lat: -18.777192, lng: 46.854328 }});

    const handleSearch = (location: Location) => {
      setSearchLocation(location);
    };

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
                        {draggable && (
                            <>
                                <IonRow>
                                    <IonCol size="12">
                                        <h1>Update Field!</h1>
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
                            </>
                        )}
                        {!draggable && (
                            <>
                                <IonRow>
                                {f!==null ?(
                                    <IonCol size="12">
                                        <h1>Plot number : <span className="plot">{f.plots.length}</span> </h1>
                                        <div className="descri">
                                            <IonLabel>description</IonLabel>
                                            <p>{f.description}</p>
                                        </div>
                                    </IonCol>
                                ) : (null)}:

                                    
                                    <IonCol size="12">
                                        <div className="previews-scroll">
                                            <div className="previews">
                                            {picture!==null ?(
                                                <IonImg src={picture.picBase64} alt="preview"></IonImg>
                                            ) : (null)}:
                                            </div>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </>
                        )}
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default ViewMap;