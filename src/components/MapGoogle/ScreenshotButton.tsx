import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import MapGoogle from './MapGoogle';
import { IonButton, IonCol, IonRow } from '@ionic/react';

interface Location {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
}
  
interface MapGoogleProps {
    searchLocation: Location;
    draggable: boolean;
    defaultValue : Location[] | null;
    onEditButtonClick: () => void;
}

const ScreenshotButton:  React.FC<MapGoogleProps> = ({ searchLocation, defaultValue, draggable , onEditButtonClick}) => {
  const containerRef = useRef(null);

  const handleCaptureScreenshot = () => {
    if (!containerRef.current) {
      console.error('Container reference not found.');
      return;
    }

    html2canvas(containerRef.current, {
        allowTaint: true,
        useCORS: true,
        scale: 1.5,
      }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');
      
        console.log(dataURL);
      
        const blob = dataURLtoBlob(dataURL);
      
        if (blob) {
          saveAs(blob, 'screenshot.png');
      
          const previewImage = new Image();
          previewImage.src = dataURL;
          previewImage.alt = 'Captured Image Preview';
          previewImage.width = 300;

        } else {
          console.error("Failed to convert data URL to Blob");
        }
      });
      
  };

  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
  
    if (arr.length < 2) {
      console.error("Invalid dataURL format");
      return null;
    }
  
    const mimeMatch = arr[0].match(/:(.*?);/);
  
    if (!mimeMatch) {
      console.error("MIME type not found in dataURL");
      return null;
    }
  
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div>
      <div ref={containerRef}>
        <MapGoogle 
          searchLocation={searchLocation} 
          defaultValue={ defaultValue} 
          draggable={draggable}
          onEditButtonClick={onEditButtonClick}
        ></MapGoogle>
      </div>
      <IonRow>
        <IonCol size='12'>
          <div className="continue">
            {draggable && (
                console.log("draggable ambony" + draggable),
                <button className='cButton' onClick={handleCaptureScreenshot} id="open-modal"><h2>Continue</h2></button>
            )}
            {!draggable && (
                console.log("draggable ambany " + draggable),
                <button className='cButton' id="open-modal"><h2>Preview</h2></button>
            )}
          </div>
        </IonCol>
      </IonRow>
    </div>
  );
};

export default ScreenshotButton;
