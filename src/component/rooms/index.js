import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import RoomDetail from './RoomDetail';

const Products = (props) => {
    const {match} = props;
    const url = match.url;

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id`} component={RoomDetail}/>
            </div>

        </div>
    );

};

export default Products;