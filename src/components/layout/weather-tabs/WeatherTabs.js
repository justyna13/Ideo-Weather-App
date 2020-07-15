import React, {useState} from "react";
import Tabs from "react-bootstrap/Tabs";
import {Tab} from "react-bootstrap";
import WeekForecast from "./WeekForecast";


const WeatherTabs = () => {
    const [key, setKey] = useState('week');

    return (
        <Tabs id="controlled-weather-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab title="Week" eventKey="week">
                <WeekForecast  />
            </Tab>

        </Tabs>
    )
}



export default WeatherTabs;
