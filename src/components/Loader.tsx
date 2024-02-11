// LeafLoader.tsx
import React from 'react';
import { IonImg } from '@ionic/react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className='loader-container'>
        <IonImg className="loader" src="\assets\image\loader.gif" ></IonImg>
    </div>
  );
};

export default Loader;
