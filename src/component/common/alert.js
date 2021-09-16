import React, { useState, useEffect } from 'react';
import ReactJsAlert from 'reactjs-alert';
import 'bootstrap/dist/css/bootstrap.min.css';

//type: success, warning, error, info
const Alert = (props) => {
    const {status, type, title, setIsAlert} = props;

    function HideAlert () {
        setIsAlert(false);
    }

    return (
        <div className="">
            <ReactJsAlert
                status={status}   // true or false
                type={type}   // success, warning, error, info
                title={title}   // title you want to display
                Close={HideAlert}   // callback method for hide
            />
        </div>
    );
};
export default Alert;