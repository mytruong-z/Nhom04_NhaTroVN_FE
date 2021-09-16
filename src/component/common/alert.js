import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import ReactJsAlert from "reactjs-alert"
import 'bootstrap/dist/css/bootstrap.min.css';

const Alert = (props) => {
    const {alert} = props
    const status = alert.status

    const [alertStatus, setAlertStatus] = useState(status);
   
    function HideAlert() {
        setAlertStatus(false)
    }
    console.log("status" + alertStatus)
    return (
        <div className="">
            <ReactJsAlert 
                status= {alertStatus}   // true or false
                type= {props.type}   // success, warning, error, info
                title= {props.title}   // title you want to display
                Close={HideAlert}   // callback method for hide
            />
        </div>
    );
};
export default Alert;