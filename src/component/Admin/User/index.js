import React from 'react';
import { Route } from 'react-router-dom';
import UserDetail from './UserDetail';

const Users = (props) => {
    const {match} = props;
    const url = match.url;

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id`} component={UserDetail}/>
            </div>

        </div>
    );

};

export default Users;