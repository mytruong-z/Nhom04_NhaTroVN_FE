import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Bill from "../Bill/billDetail";

const BillDetails = (props) => {
    const {match} = props;
    const url = match.url;

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id`} component={Bill}/>
            </div>

        </div>
    );

};

export default BillDetails;