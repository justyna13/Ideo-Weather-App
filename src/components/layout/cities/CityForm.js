import React, {useState} from "react";
import Select from "react-select";
import jsonData from "../../../assets/data/city.list.json";
import {storage} from "../../../config/firebaseConfig";
import Card from "react-bootstrap/Card";

import PropTypes from 'prop-types';

const CityForm = ({handleSubmit, handleImgChange, handleClose}) => {

    const allInputs = {imgUrl: ''};
    const [imageAsFile, setImageAsFile] = useState(allInputs);
    const [imageAsUrl, setImageAsUrl] = useState('');
    const [loadingPhoto, setLoadingPhoto] = useState(false);

    const [cityId, setCityId] = useState(0);
    const [cityLat, setCityLat] = useState(0);
    const [cityLon, setCityLon] = useState(0);
    const [cityName, setCityName] = useState('');

    const handleChange = (val) => {

        let cityCountryName = val.name + ', ' + val.country;
        setCityName(cityCountryName);
        setCityLon(val.coord.lon);
        setCityLat(val.coord.lat);
        setCityId(val.id);
    }

    const handleNewChange = (field, e) => {
        handleImgChange(field, e);
    }


    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(imageFile => (image));


    }

    const handleFirebaseUpload = (e) => {
        e.preventDefault();
        console.log('start upload', imageAsUrl);

        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`);
        }

        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);


        uploadTask.on('state_changed',
            (snapShot) => {
            setLoadingPhoto(true);
            }, (error) => {
                console.log(error);
            }, () => {
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        console.log(fireBaseUrl);
                        setImageAsUrl(prevObj => ({...prevObj, imgUrl: fireBaseUrl}));
                        handleNewChange('imgUrl', fireBaseUrl);
                        setLoadingPhoto(false);
                    })
            })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        handleClose();
        handleSubmit = handleSubmit.bind(this);
        handleSubmit(e, cityId, cityLat, cityLon, cityName);

    }

    const resultLimit = 10;
    let i = 0;

    return (

       <form onSubmit={handleFormSubmit}>


           <p>Select new city to follow</p>

           <Select
               isSearchable={true}
               options={jsonData}
               getOptionLabel={option => {
                   if (option.state)
                       return `${option.name}, ${option.state}, ${option.country}`;
                   else
                       return `${option.name}, ${option.country}`;
               }}
               getOptionValue={option => `${option.id}`}
               onChange={handleChange}
               maxMenuHeight={300}
               filterOption={({label}, query) => label.indexOf(query) >= 0 && i++ < resultLimit} onInputChange={() => { i = 0 }}
           />

           <div className="my-5">
               <p>Customize followed city by adding your own photo (optional) </p>
               <input
                   onChange={handleImageAsFile}
                   type="file" />

               <button className="btn btn-success" onClick={handleFirebaseUpload} disabled={loadingPhoto}>Upload photo</button>
           </div>

           {loadingPhoto ?
               <span className="d-flex justify-content-end align-items-center">
                   <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                   </div>

                   <p className="px-2 mb-0">Photo uploading, please wait</p>
                     <button className="btn btn-outline-dark btn-city-save" disabled={loadingPhoto}>Add city</button>
               </span>
           :   <button className="btn btn-outline-dark btn-city-save" disabled={loadingPhoto}>Add city</button> }


       </form>

    )

}


CityForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleImgChange: PropTypes.func.isRequired
}

export default CityForm;
