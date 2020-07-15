import React from "react";
import {Card} from "react-bootstrap";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudSun} from "@fortawesome/free-solid-svg-icons";

const CityCard = ({ id, name, handleCardSelect, imgUrl}) => {

    return (
        <Card key={id} className="city-card" onClick={() => handleCardSelect(id)}>

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

export default CityCard;
