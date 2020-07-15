import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {signOut} from "../../../store/actions/authActions";
import {Dropdown} from "react-bootstrap";


const Navbar = ({profile, handleShowHide, signOut, title}) => {


    let initials = profile.firstName[0] + profile.lastName[0];

    return (
        <nav className="pb-5">
            <Link to="/" onClick={handleShowHide} className="nav-item">{title} &#10132;</Link>


            <Dropdown className="float-right" alignRight>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="user__dropdown">
                    {initials ? initials: null}
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    <Dropdown.Item onClick={signOut} href='/'>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </nav>
    )

};

Navbar.propTypes = {
    handleShowHide: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        favCities: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            imgUrl: PropTypes.string,
            lat: PropTypes.number.isRequired,
            lon: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }))
    })
}


const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
