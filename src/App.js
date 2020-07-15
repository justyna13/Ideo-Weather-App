import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './styles/mainStyles.scss';

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import UserProfile from "./components/dashboard/UserProfile";
import ForecastContainer from "./components/dashboard/WeatherContainer";
import WeatherCharts from "./components/charts/WeatherCharts";




function App() {

  return (
    <Router>
        <Switch>
            <Route exact path={['/', '/home'] } component={ForecastContainer} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/user/:id' component={UserProfile} />
            <Route path='/charts' component={WeatherCharts} />
        </Switch>

    </Router>
  );
}

export default App;
