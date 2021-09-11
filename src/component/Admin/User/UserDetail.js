import React, { useState, useEffect } from 'react';
import {Image, Button} from 'react-bootstrap';
import {API_URL} from "/src/config";

const UserDetail = (props) => {
    const {match} = props;
    const id = match.params.id;

    const [room, setRoom] = useState({});

    useEffect(() => {

    }, []);

    return (
        <div className="mb-4">
            Details
        </div>

    );
};

export default UserDetail;