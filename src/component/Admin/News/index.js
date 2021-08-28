import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import News from "../News/newsDetail";

const NewsDetails = (props) => {
    const {match} = props;
    const url = match.url;

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id`} component={News}/>
            </div>

        </div>
    );

};

export default NewsDetails;