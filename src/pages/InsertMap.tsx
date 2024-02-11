import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonSelectOption, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonTextarea, IonToolbar } from "@ionic/react";
import React,{useState, useRef, useEffect} from "react";
import SearchBar from "../components/MapGoogle/SearchBar";
import ScreenshotButton from "../components/MapGoogle/ScreenshotButton";

import './../theme/assets/pages/style.css';
import FileUploader from "../components/FileUploader";
import "./../theme/assets/pages/InsertMap.css";
import "./../theme/assets/pages/InsertMap.css"
import axios from "axios";
import Cookies from "js-cookie";

interface Location {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
}

interface Request {
    idOwner: number;
    plotNumber: number;
    location: string;
    description: string;
    groundType: number;
    area: number;
    pictures: string[];
    localisation: Location[];
}

const InsertMap: React.FC = () => {
    const [searchLocation, setSearchLocation] = useState<Location>({id: 1, position:{ lat: -18.777192, lng: 46.854328 }});
    const [request, setRequest] = useState<Request | undefined>();
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
        // Retrieve necessary data from localStorage
        const area = localStorage.getItem('surface');
        const location = localStorage.getItem('placeName');
        const localisation = localStorage.getItem('markers');
        const pictures = localStorage.getItem('pictures');
    
        // Parse data if necessary
        const parsedLocalisation: Location[] = JSON.parse(localisation || '[]');
        const parsedPictures: string[] = JSON.parse(pictures || '[]');

        const l1 = JSON.parse(localStorage.getItem('1') || '');
        const l2 = JSON.parse(localStorage.getItem('2') || '');
        const l3 = JSON.parse(localStorage.getItem('3') || '');
        const l4 = JSON.parse(localStorage.getItem('4') || '');

        const loc1 : Location = {
            id: 1,
            position: {
                lat: l1.lat,
                lng: l1.lng
            }
        }

        const loc2 : Location = {
            id: 2,
            position: {
                lat: l2.lat,
                lng: l2.lng
            }
        }
        const loc3 : Location = {
            id: 3,
            position: {
                lat: l3.lat,
                lng: l3.lng
            }
        }
        const loc4 : Location = {
            id: 4,
            position: {
                lat: l4.lat,
                lng: l4.lng
            }
        }

        const locs : Location[] = [loc1, loc2, loc3, loc4];
        const userIdString: string | undefined = Cookies.get('userId');
        const userId: number = userIdString !== undefined ? parseInt(userIdString, 10) : 0; // Provide a default value, such as 0, if the cookie is not found or undefined

        // Construct the request object using the state variables and retrieved data
        const newRequest: Request = {
            idOwner: userId,
            plotNumber: plotNumber || 0,
            location: location || '',
            description: description || '',
            groundType: groundType || 0,
            area: parseFloat(area || '0'),
            pictures: parsedPictures,
            localisation: locs
        };
    
        // Set the request state
        // setRequest(newRequest);
    
        console.log("newRequest");
        console.log(newRequest);

        axios.post('http://localhost:8080/api/notification', newRequest)
        .then((response) => {
            // Assuming your data is an array of objects with id and name properties
            console.log(response.data);

        })
        .catch((error) => {
            console.error('Error fetching ground types: ', error);
        });
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
                                <h1>Insert Field</h1>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <IonInput label="Plot number" type="number" onIonChange={handlePlotNumberChange} >

                                </IonInput>
                                <IonSelect onIonChange={handleGroundTypeChange} label="Ground Type">
                                    {groundTypes.map((groundType: any) => (
                                        <IonSelectOption value={groundType.idGroundType}>{groundType.name}</IonSelectOption>
                                    ))}
                                </IonSelect>
                                <IonTextarea
                                    onIonChange={handleDescriptionChange}
                                    label="Description"
                                    labelPlacement="stacked"
                                    placeholder="Type your field description"
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