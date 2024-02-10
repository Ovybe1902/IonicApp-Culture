import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonSelectOption, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonTextarea, IonToolbar } from "@ionic/react";
import React,{useState, useRef, useEffect} from "react";
import SearchBar from "../components/MapGoogle/SearchBar";
import ScreenshotButton from "../components/MapGoogle/ScreenshotButton";

import './../theme/assets/pages/style.css';
import FileUploader from "../components/FileUploader";
import "./../theme/assets/pages/InsertMap.css";
import "./../theme/assets/pages/InsertMap.css"
import axios from "axios";

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

    //this is my code
    const [plotNumber, setPlotNumber] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [groundType, setGroundType] = useState<number | undefined>(undefined);

    const handlePlotNumberChange = (event: CustomEvent) => {
        setPlotNumber(event.detail.value as number);
    };

    const handleDescriptionChange = (event: CustomEvent) => {
        setDescription(event.detail.value as string);
    };

    const handleGroundTypeChange = (event: CustomEvent) => {
        setGroundType(event.detail.value as number);
        console.log(groundType);
    };

    const handleValidate = () => {
        // You can access plotNumber and description here and perform any actions needed
        console.log("Plot Number:", plotNumber);
        console.log("Description:", description);
        console.log("Surface:", surfaceValue);

    };


    const [surfaceValue, setSurfaceValue] = useState(0);

    // Callback function to receive surface value from MapGoogle component
    const updateSurfaceValue = (value: number) => {
        setSurfaceValue(value);
        console.log("surface hehe="+value);
    };


    const [groundTypes, setgroundTypes] = useState([]);

    useEffect(() => {
        // Fetch data from the database using Axios
        axios
            .get('http://localhost:8080/api/groundtypes')
            .then((response) => {
                // Assuming your data is an array of objects with id and name properties
                console.log(response.data);
                setgroundTypes(response.data);

            })
            .catch((error) => {
                console.error('Error fetching ground types: ', error);
            });
    }, []);



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
                                <IonInput label="plot number" type="number" onIonChange={handlePlotNumberChange} >

                                </IonInput>
                                <IonSelect onIonChange={handleGroundTypeChange}>
                                    {groundTypes.map((groundType: any) => (
                                        <IonSelectOption value={groundType.idGroundType}>{groundType.name}</IonSelectOption>
                                    ))}
                                </IonSelect>
                                <IonTextarea
                                    onIonChange={handleDescriptionChange}
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
                                    <button className="cButton" onClick={handleValidate}>Validate</button>
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