import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CityForm from "./CityForm";
import Card from "react-bootstrap/Card";

import PropTypes from 'prop-types';


const AddCityModal = ({handleSubmit, handleImgChange}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
       <>
           <Card className="add-city__card">
               <Card.Body onClick={handleShow} >
                   <div>
                       <span>+</span>
                       <p>Add new city</p>

                   </div>

               </Card.Body>

           </Card>

           <Modal show={show} onHide={handleClose} size="lg" >
               <Modal.Header closeButton>
                   <Modal.Title>Add new city</Modal.Title>
               </Modal.Header>

               <Modal.Body>
                   <CityForm
                       handleClose={handleClose}
                       handleSubmit={handleSubmit}
                       handleImgChange={handleImgChange} />
               </Modal.Body>
           </Modal>
       </>

    )
}


AddCityModal.propTypes = {
    handleImgChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default AddCityModal;
