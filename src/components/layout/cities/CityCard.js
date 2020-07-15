import React from "react";
import {Card} from "react-bootstrap";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudSun} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";

const CityCard = ({ id, name, handleCardSelect, imgUrl, selectedCity}) => {


    return (
        <Card key={id} className={(selectedCity === id) ? "city-card city-card-active": "city-card"} onClick={() => handleCardSelect(id)}>

            <Card.Body className={imgUrl ? "city-card__body": "city-card__body city-card-with-border"}>
                {imgUrl ?
                    <Card.Img variant="top" src={imgUrl} alt="No photo uploaded" className="card__photo"/>
                    :
                    <span className="city-card__icon">
                        <FontAwesomeIcon
                            icon={faCloudSun}
                            size={"3x"}
                        />
                    </span>
                }
            </Card.Body>



            <Card.Text className="my-2">
                {name}
            </Card.Text>
        </Card>
    )
}


CityCard.propTypes = {
    handleCardSelect: PropTypes.func.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    imgUrl: PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        selectedCity: state.cities.currentCity.id,
    }
}

export default connect(mapStateToProps)(CityCard);
