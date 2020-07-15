import React from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint} from '@fortawesome/free-solid-svg-icons'


const DayForecast = ({day, temp, iconUrl, humidity}) => {

    return (

            <div className="daily-forecast__row">
                <p>{day}</p>

                <span>
                    <FontAwesomeIcon
                        icon={faTint}
                        style={{color: '#378aaa'}}
                    /> &nbsp;
                    {humidity} %</span>

                <span>
                    <img src={iconUrl} alt="icon"/>
                </span>

                <p>{Math.round(temp)} &deg; C</p>
            </div>

    )
}


DayForecast.propTypes = {
    day: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    iconUrl: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired
}

export default DayForecast;
