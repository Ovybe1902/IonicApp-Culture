import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/styleguide.css';
import './theme/variables.css';

import Login from './pages/Login';
import InsertMap from './pages/InsertMap';
import Create from './pages/Create';
import Home from './pages/Home';
import ViewMap from './pages/ViewMap';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <Route path="/addfield">
            <InsertMap/>
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/create">
            <Create/>
          </Route>
          <Route exact path="/field">
            <ViewMap/>
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
