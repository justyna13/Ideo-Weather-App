import React, {useState} from "react";
import { connect } from 'react-redux';
import Navbar from "../layout/navbar/Navbar";
import CurrentWeather from "./CurrentWeather";
import FollowedPlacesList from "./FollowedPlacesList";


const UserProfile = () => {

    let [showWeather, setShowWeather] = useState(true);


    const onClick = () => setShowWeather(!showWeather);


    return (
        <div className="user-dashboard col-md-4 px-5">

            <Navbar handleShowHide={onClick} title={showWeather ? 'Places' : 'Current weather'}/>

            {showWeather ?
                <CurrentWeather />
                :
                <FollowedPlacesList />
            }
        </div>
    )
};



const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};



export default connect(mapStateToProps)(UserProfile);
