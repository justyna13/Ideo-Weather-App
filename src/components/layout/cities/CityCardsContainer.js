import React from "react";
import CityCard from "./CityCard";
import AddCityModal from "./AddCityModal";
import PropTypes from 'prop-types';

const CityCardsContainer = ({favCities, handleSubmit, handleImgChange, handleCurrentCityChange }) => {


    const handleClickOnCard = (id) => {
        handleCurrentCityChange(id);
    }

    return (
        <div  className="fav-cities__wrapper ">
            {favCities && favCities.map(city => {

                return  <CityCard
                            key={city.id}
                            handleCardSelect={handleClickOnCard}
                            id={city.id}
                            name={city.name}
                            imgUrl={city.imgUrl}
                        />
            })}

            <AddCityModal handleImgChange={handleImgChange} handleSubmit={handleSubmit}/>
        </div>
    )
}


CityCardsContainer.propTypes = {
    handleCurrentCityChange: PropTypes.func.isRequired,
    favCities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        imgUrl: PropTypes.string,
        lat: PropTypes.number,
        lon: PropTypes.number
        })),
    handleSubmit: PropTypes.func.isRequired,
    handleImgChange: PropTypes.func
}


export default CityCardsContainer;
